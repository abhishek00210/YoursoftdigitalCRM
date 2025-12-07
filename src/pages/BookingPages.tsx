import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";

const API = "http://localhost:5011";

type BookingPage = { id:number; title:string; description:string; ownerUserId:number; themeName:string; createdAt:string; };

export default function BookingPagesPage(){
  const [pages, setPages] = useState<BookingPage[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [pRes, uRes] = await Promise.all([fetch(`${API}/api/bookingpages`), fetch(`${API}/api/users`)]);
      const [pData, uData] = await Promise.all([pRes.json(), uRes.json()]);
      setPages(pData);
      setUsers(uData);
    } catch (e){ console.error(e); } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div className="flex min-h-screen w-full bg-surface">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Booking Pages</h1>
          <button className="px-4 py-2 rounded bg-primary text-white">+ New Booking Page</button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: workspace page (bigger card) */}
          <div className="bg-white rounded shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">ZS</div>
              <div className="flex-1">
                <div className="text-lg font-semibold">Zylker Sales</div>
                <div className="text-sm text-muted-foreground mt-1">This is the workspace booking page. It lists all the event types under this workspace.</div>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-3 py-2 border rounded">Open Page</button>
              <button className="px-3 py-2 border rounded">Share</button>
              <button className="px-3 py-2 border rounded">Themes and Layouts</button>
            </div>

            <div className="mt-6">
              <input placeholder="Search users" className="border rounded px-3 py-2 w-full" />
              <div className="mt-4 divide-y">
                {pages.map(p => (
                  <div key={p.id} className="py-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-sm text-muted-foreground">{p.description}</div>
                    </div>
                    <div className="text-sm text-muted-foreground"> {/* count */} </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: user-specific booking page cards (list) */}
          <div className="space-y-4">
            {users.map(u => (
              <div key={u.id} className="bg-white rounded shadow-sm p-4 flex items-start justify-between">
                <div>
                  <div className="font-semibold">{u.fullName ?? u.fullname ?? u.fullname}</div>
                  <div className="text-sm text-muted-foreground">{u.email}</div>
                  <div className="text-xs text-muted-foreground mt-2">This is your unique booking page. It lists all the event types you offer.</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-3 py-1 border rounded">Open Page</button>
                  <button className="px-3 py-1 border rounded">Share</button>
                </div>
              </div>
            ))}
            {users.length === 0 && <div className="text-muted-foreground">No users to show</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
