import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

const API = "http://localhost:5011";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  avatarUrl?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error("Failed loading users", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setShowForm(true); };
  const openEdit = (u: User) => { setEditing(u); setShowForm(true); };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    const res = await fetch(`${API}/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Delete failed");
    setUsers(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Users</h1>
          <div className="flex gap-2">
            <Button onClick={openCreate}>+ New User</Button>
            <Button onClick={load} variant="ghost">Refresh</Button>
          </div>
        </div>

        {loading ? <div>Loading...</div> : (
          <div className="grid grid-cols-3 gap-4">
            {users.map(u => (
              <div key={u.id} className="p-4 bg-white rounded shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-semibold">{u.fullName}</div>
                  <div className="text-sm text-muted-foreground">{u.email}</div>
                  <div className="text-xs text-muted-foreground">Role: <span className="text-primary">{u.role}</span></div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={()=>openEdit(u)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={()=>handleDelete(u.id)}>Delete</Button>
                </div>
              </div>
            ))}
            {users.length === 0 && <div className="col-span-3 text-muted-foreground">No users yet.</div>}
          </div>
        )}

        {showForm && (
          <UserForm initial={editing} onClose={() => { setShowForm(false); load(); }} />
        )}
      </main>
    </div>
  );
}

/* --- UserForm component --- */
function UserForm({ initial, onClose }: { initial: any | null; onClose: ()=>void }) {
  const [fullName, setFullName] = useState(initial?.fullName ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [role, setRole] = useState(initial?.role ?? "Staff");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!fullName.trim() || !email.trim()) return alert("Full name and email are required");
    setSaving(true);
    try {
      const payload = { fullName, email, role, avatarUrl: "" };
      let res;
      if (initial) {
        res = await fetch(`${API}/api/users/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error(await res.text());
      onClose();
    } catch (e) {
      alert("Save failed: " + (e as any).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[560px] bg-white rounded p-6">
        <h3 className="text-lg font-semibold mb-3">{initial ? "Edit User" : "New User"}</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input className="w-full border rounded p-2" value={fullName} onChange={e=>setFullName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded p-2" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <select className="border rounded p-2" value={role} onChange={e=>setRole(e.target.value)}>
              <option>Staff</option>
              <option>Admin</option>
              <option>Manager</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </div>
    </div>
  );
}
