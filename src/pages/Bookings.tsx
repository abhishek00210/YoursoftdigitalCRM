import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import AppointmentList from "@/components/booking/AppointmentList"  
import EventTypeGrid from "@/components/booking/EventTypeGrid";
import BookingPagesPage from "@/pages/BookingPages";
import UsersPage from "@/pages/Users";

const API = "http://localhost:5011";

type Tab = "appointments" | "eventtypes" | "users" | "pages";

export default function BookingsPage() {
  const [tab, setTab] = useState<Tab>("appointments");

  return (
    <div className="flex min-h-screen w-full bg-surface">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <div className="flex gap-2">
            <button className={`px-3 py-2 rounded ${tab==='appointments' ? 'bg-primary text-white' : 'bg-white border'}`} onClick={()=>setTab('appointments')}>Appointments</button>
            <button className={`px-3 py-2 rounded ${tab==='eventtypes' ? 'bg-primary text-white' : 'bg-white border'}`} onClick={()=>setTab('eventtypes')}>Event Type</button>
            <button className={`px-3 py-2 rounded ${tab==='users' ? 'bg-primary text-white' : 'bg-white border'}`} onClick={()=>setTab('users')}>Users</button>
            <button className={`px-3 py-2 rounded ${tab==='pages' ? 'bg-primary text-white' : 'bg-white border'}`} onClick={()=>setTab('pages')}>Booking Pages</button>
            <button className="ml-4 px-4 py-2 rounded bg-primary text-white">+ New Appointment</button>
          </div>
        </div>

        {tab === "appointments" && <AppointmentList api={API} />}
        {tab === "eventtypes" && <EventTypeGrid api={API} />}
        {tab === "users" && <UsersPage />}
        {tab === "pages" && <BookingPagesPage />}
      </main>
    </div>
  );
}
