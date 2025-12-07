// src/components/bookings/NewAppointmentModal.tsx
import React, { useEffect, useState } from "react";

/**
 * NewAppointmentModal
 * - apiBase: base URL for API, e.g. http://localhost:5011
 * - onClose: callback when modal closes
 *
 * After successful create it dispatches window.dispatchEvent(new Event('bookings:reload'))
 * so AppointmentList will refresh.
 */

type EventTypeOption = { id: number; title: string; durationMinutes?: number };
type UserOption = { id: number; fullName: string };

export default function NewAppointmentModal({ apiBase, onClose }: { apiBase: string; onClose: ()=>void }) {
  const [eventTypes, setEventTypes] = useState<EventTypeOption[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);

  // form fields
  const [eventTypeId, setEventTypeId] = useState<number | "">("");
  const [hostUserId, setHostUserId] = useState<number | "">("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [date, setDate] = useState<string>(() => {
    // default to today yyyy-mm-dd
    const d = new Date();
    return d.toISOString().slice(0,10);
  });
  const [time, setTime] = useState<string>("09:00");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // load event types and users in parallel
    const load = async () => {
      try {
        const [etRes, uRes] = await Promise.all([
          fetch(`${apiBase}/api/eventtypes`),
          fetch(`${apiBase}/api/users`)
        ]);
        const [ets, us] = await Promise.all([etRes.json(), uRes.json()]);
        setEventTypes(ets || []);
        setUsers(us || []);
        // preselect first values if available
        if (ets?.length) setEventTypeId(ets[0].id);
        if (us?.length) setHostUserId(us[0].id);
      } catch (e) {
        console.error("Failed to load supporting data for New Appointment", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [apiBase]);

  const handleSave = async () => {
    // validation
    if (!eventTypeId) return alert("Please select event type");
    if (!date || !time) return alert("Please provide date and time");
    if (!customerName.trim()) return alert("Please enter customer name");

    // find duration from event type, fallback 30 mins
    const et = eventTypes.find(x => x.id === Number(eventTypeId));
    const dur = et?.durationMinutes ?? 30;

    // create startAt and endAt ISO strings (UTC)
    const startLocal = new Date(`${date}T${time}:00`);
    const endLocal = new Date(startLocal.getTime() + dur * 60000);

    const payload = {
      eventTypeId: Number(eventTypeId),
      hostUserId: hostUserId ? Number(hostUserId) : null,
      customerName: customerName,
      customerEmail: customerEmail,
      startAt: startLocal.toISOString(),
      endAt: endLocal.toISOString(),
      paymentStatus: "Free",
      status: "Upcoming"
    };

    setSaving(true);
    try {
      const res = await fetch(`${apiBase}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `${res.status}`);
      }
      // success -> notify appointment list to reload
      window.dispatchEvent(new Event("bookings:reload"));
      onClose();
    } catch (e:any) {
      console.error("Failed to create booking", e);
      alert("Create failed: " + (e.message || e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[760px] max-w-full bg-white rounded p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">New Appointment</h3>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Event Type</label>
              <select className="w-full border rounded p-2" value={String(eventTypeId)} onChange={e => setEventTypeId(e.target.value === "" ? "" : Number(e.target.value))}>
                <option value="">-- select --</option>
                {eventTypes.map(et => <option key={et.id} value={et.id}>{et.title} • {et.durationMinutes ?? 30} min</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Host / Resource</label>
              <select className="w-full border rounded p-2" value={String(hostUserId)} onChange={e => setHostUserId(e.target.value === "" ? "" : Number(e.target.value))}>
                <option value="">-- none --</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.fullName ?? u.fullname ?? u.email}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Customer name</label>
              <input className="w-full border rounded p-2" value={customerName} onChange={e => setCustomerName(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Customer email</label>
              <input className="w-full border rounded p-2" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Date</label>
              <input type="date" className="w-full border rounded p-2" value={date} onChange={e=>setDate(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm mb-1">Time</label>
              <input type="time" className="w-full border rounded p-2" value={time} onChange={e=>setTime(e.target.value)} />
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-3">
              <button className="px-4 py-2 border rounded" onClick={onClose} disabled={saving}>Cancel</button>
              <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Create Appointment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
