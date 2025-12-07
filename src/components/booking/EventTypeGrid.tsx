import React, { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import AvatarStack from "@/components/AvatarStack";

type EventType = {
  id: number;
  title: string;
  durationMinutes: number;
  isGroup: boolean;
  hostsCsv?: string;
  description?: string;
};

export default function EventTypeGrid({ api }: { api: string }) {
  const [types, setTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/eventtypes`);
      const data = await res.json();
      setTypes(data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">All Event Types</h2>
        <div className="flex items-center gap-3">
          <input placeholder="Search Service" className="border rounded px-3 py-2 w-64" />
          <button className="px-3 py-2 rounded bg-primary text-white">+ New Event Type</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {types.map(et => (
          <div key={et.id} className="p-4 rounded-lg bg-white shadow-sm border">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-lg font-bold">{et.title}</div>
                <div className="text-sm text-muted-foreground mt-1">{et.durationMinutes} mins • {et.isGroup ? "Group" : "One-on-One"}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button className="text-sm px-3 py-1 border rounded flex items-center gap-2"><Share2 className="h-4 w-4" /> Share</button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <AvatarStack users={[]} />
              <div className="text-sm text-muted-foreground"> {/* hosts or count */ } </div>
            </div>
          </div>
        ))}

        {types.length === 0 && !loading && (
          <div className="col-span-3 text-muted-foreground">No event types yet.</div>
        )}
      </div>
    </div>
  );
}
