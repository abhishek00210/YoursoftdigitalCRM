import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, CheckCircle, Search, Plus, Star } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';

// --- Types ---
interface Service { id: number; name: string; durationMinutes: number; price: number; }
interface Provider { id: number; name: string; specialization: string; }
interface Client { id: number; name: string; email: string; phone: string; }

export default function Bookings() {
  // --- State ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [services, setServices] = useState<Service[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [clients, setClients] = useState<Client[]>([]); 
  
  // Selection State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Client Selection
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [manualClient, setManualClient] = useState({ name: '', phone: '', email: '', notes: '' });

  // --- Fetch Data ---
  useEffect(() => {
    // 1. Fetch Services (Mock fallback if API fails)
    fetch('http://localhost:5011/api/services')
      .then(res => res.ok ? res.json() : MOCK_SERVICES)
      .then(data => setServices(data.length ? data : MOCK_SERVICES))
      .catch(() => setServices(MOCK_SERVICES));

    // 2. Fetch Clients (Mock fallback)
    fetch('http://localhost:5011/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(() => setClients(MOCK_CLIENTS));

    setProviders(MOCK_PROVIDERS); 
  }, []);

  // --- Filter Clients ---
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  // --- Reset Form Helper ---
  const resetForm = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedProvider(null);
    setSelectedTime(null);
    setSelectedClientId(null);
    setManualClient({ name: '', phone: '', email: '', notes: '' });
  };

  // --- Handlers ---
  const handleBooking = async () => {
    setLoading(true);
    
    // Prepare Payload
    const payload = {
      clientId: selectedClientId || 0, 
      providerId: selectedProvider?.id,
      serviceId: selectedService?.id,
      appointmentDate: selectedDate.toISOString(),
      startTime: selectedTime,
      notes: manualClient.notes,
      isNewClient: !selectedClientId,
      newClientDetails: !selectedClientId ? manualClient : null
    };

    try {
      const res = await fetch('http://localhost:5011/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error(await res.text());
      
      alert("✅ Booking Confirmed Successfully!");
      resetForm(); // Reset UI instead of reloading page
    } catch (err) {
      alert(`Booking Failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---
  return (
    <div className="p-6 h-full flex flex-col font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
          <p className="text-gray-500">Schedule appointments for clients</p>
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* --- LEFT SIDEBAR (Progress & Summary) --- */}
        <div className="w-full md:w-80 bg-gray-900 p-6 text-white flex flex-col relative shrink-0">
           <div className="z-10">
             <div className="mb-8">
                <h2 className="text-xl font-bold">New Appointment</h2>
                <p className="text-gray-400 text-sm">Follow steps to book</p>
             </div>
             
             <div className="space-y-6">
               <StepIndicator step={1} current={step} label="Service" />
               <StepIndicator step={2} current={step} label="Date & Time" />
               <StepIndicator step={3} current={step} label="Client" />
             </div>
           </div>

           {/* Live Summary Box */}
           <div className="mt-auto bg-gray-800 rounded-xl p-4 border border-gray-700 transition-all">
             <h3 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">Booking Summary</h3>
             <div className="space-y-3 text-sm">
               {selectedService ? (
                 <div className="flex justify-between border-b border-gray-700 pb-2">
                   <span className="text-gray-300">{selectedService.name}</span>
                   <span className="font-semibold text-green-400">${selectedService.price}</span>
                 </div>
               ) : <span className="text-gray-500 italic">Select service...</span>}
               
               {selectedProvider && (
                 <div className="flex items-center gap-2 text-gray-300">
                   <User size={14} className="text-indigo-400"/> {selectedProvider.name}
                 </div>
               )}

               {selectedDate && selectedTime && (
                 <div className="flex items-center gap-2 text-gray-300">
                   <Calendar size={14} className="text-indigo-400"/> {format(selectedDate, 'MMM dd')} at {selectedTime}
                 </div>
               )}
             </div>
           </div>
        </div>

        {/* --- RIGHT CONTENT AREA --- */}
        <div className="flex-1 p-8 overflow-y-auto bg-gray-50/30">
          
          {step > 1 && (
             <button onClick={() => setStep(s => s - 1)} className="mb-4 flex items-center text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
                <ArrowLeft size={16} className="mr-1"/> Back
             </button>
          )}

          {/* STEP 1: SERVICES */}
          {step === 1 && (
            <div className="max-w-3xl animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Select Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => { setSelectedService(service); setStep(2); }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md bg-white group
                      ${selectedService?.id === service.id ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-indigo-300'}`}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{service.name}</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-bold">${service.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <ClockIcon /> {service.durationMinutes} Minutes
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: PROVIDER & TIME */}
          {step === 2 && (
            <div className="max-w-3xl animate-in fade-in slide-in-from-right-4">
               <h2 className="text-xl font-bold text-gray-800 mb-6">Select Availability</h2>
               
               {/* Provider Chips */}
               <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                 {providers.map(prov => (
                   <button
                     key={prov.id}
                     onClick={() => setSelectedProvider(prov)}
                     className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap
                       ${selectedProvider?.id === prov.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'}`}
                   >
                     <User size={16} /> {prov.name}
                   </button>
                 ))}
               </div>

               {/* Calendar Strip */}
               <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                 {[0, 1, 2, 3, 4, 5, 6].map(offset => {
                    const date = addDays(startOfToday(), offset);
                    const isSelected = isSameDay(date, selectedDate);
                    return (
                      <button 
                        key={offset}
                        onClick={() => setSelectedDate(date)}
                        className={`min-w-[64px] flex flex-col items-center p-2 rounded-lg border transition-all
                          ${isSelected ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}
                      >
                         <span className="text-xs font-medium uppercase opacity-80">{format(date, 'EEE')}</span>
                         <span className="text-lg font-bold">{format(date, 'd')}</span>
                      </button>
                    )
                 })}
               </div>

               {/* Slots */}
               <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Available Slots</h3>
               <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                 {['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30'].map(time => (
                   <button
                     key={time}
                     onClick={() => { setSelectedTime(time); setStep(3); }}
                     className="py-2 rounded border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700 transition-colors"
                   >
                     {time}
                   </button>
                 ))}
               </div>
            </div>
          )}

          {/* STEP 3: CLIENT SELECTION (CRM STYLE) */}
          {step === 3 && (
            <div className="max-w-2xl animate-in fade-in slide-in-from-right-4">
               <h2 className="text-xl font-bold text-gray-800 mb-6">Select Client</h2>
               
               {/* Tab Switcher */}
               <div className="flex gap-6 border-b border-gray-200 mb-6">
                 <button 
                   onClick={() => setSelectedClientId(null)} 
                   className={`pb-2 text-sm font-medium transition-colors ${selectedClientId === null ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   <div className="flex items-center gap-2"><Plus size={16}/> New Client</div>
                 </button>
                 <button 
                   onClick={() => setSelectedClientId(0)} // 0 acts as a flag to show search
                   className={`pb-2 text-sm font-medium transition-colors ${selectedClientId !== null ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   <div className="flex items-center gap-2"><Search size={16}/> Existing Client</div>
                 </button>
               </div>

               {/* Existing Client Search */}
               {selectedClientId !== null && (
                 <div className="space-y-4">
                   <div className="relative">
                     <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                     <input 
                       className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                       placeholder="Search client by name or phone..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       autoFocus
                     />
                   </div>
                   <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto bg-white shadow-inner">
                     {filteredClients.length > 0 ? filteredClients.map(client => (
                       <div 
                         key={client.id} 
                         onClick={() => setSelectedClientId(client.id)}
                         className={`p-3 border-b border-gray-100 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors
                           ${selectedClientId === client.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''}`}
                       >
                         <div>
                           <p className="font-medium text-gray-800">{client.name}</p>
                           <p className="text-xs text-gray-500">{client.phone} • {client.email}</p>
                         </div>
                         {selectedClientId === client.id && <CheckCircle size={18} className="text-indigo-600" />}
                       </div>
                     )) : (
                        <div className="p-4 text-center text-gray-400 text-sm">No clients found.</div>
                     )}
                   </div>
                 </div>
               )}

               {/* New Client Form */}
               {selectedClientId === null && (
                 <div className="space-y-4 animate-in fade-in">
                   <div className="grid grid-cols-2 gap-4">
                      <input 
                        placeholder="Full Name" 
                        className="p-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                        value={manualClient.name}
                        onChange={e => setManualClient({...manualClient, name: e.target.value})} 
                      />
                      <input 
                        placeholder="Phone Number" 
                        className="p-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                        value={manualClient.phone}
                        onChange={e => setManualClient({...manualClient, phone: e.target.value})} 
                      />
                   </div>
                   <input 
                     placeholder="Email Address" 
                     className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" 
                     value={manualClient.email}
                     onChange={e => setManualClient({...manualClient, email: e.target.value})} 
                   />
                   <textarea 
                     placeholder="Notes / Symptoms" 
                     className="w-full p-3 border border-gray-200 rounded-lg bg-white h-24 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none" 
                     value={manualClient.notes}
                     onChange={e => setManualClient({...manualClient, notes: e.target.value})} 
                   />
                 </div>
               )}

               <button 
                 onClick={handleBooking}
                 disabled={loading}
                 className="w-full mt-8 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
               >
                 {loading ? "Confirming..." : "Confirm Appointment"}
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const StepIndicator = ({ step, current, label }: { step: number; current: number; label: string }) => (
  <div className={`flex items-center gap-3 transition-opacity duration-300 ${step > current ? 'opacity-40' : 'opacity-100'}`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border transition-colors duration-300
      ${step === current ? 'bg-white text-gray-900 border-white' : 
        step < current ? 'bg-green-500 border-green-500 text-white' : 'border-gray-500 text-gray-400'}`}>
      {step < current ? <CheckCircle size={14} /> : step}
    </div>
    <span className={`font-medium text-sm ${step === current ? 'text-white' : 'text-gray-400'}`}>{label}</span>
  </div>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

// --- MOCK DATA ---
const MOCK_SERVICES: Service[] = [
  { id: 1, name: "General Consultation", durationMinutes: 30, price: 50 },
  { id: 2, name: "Dental Cleaning", durationMinutes: 60, price: 120 },
  { id: 3, name: "Therapy Session", durationMinutes: 45, price: 90 },
];
const MOCK_PROVIDERS: Provider[] = [
  { id: 1, name: "Dr. Sarah Smith", specialization: "General" },
  { id: 2, name: "Dr. James Doe", specialization: "Dentist" },
];
const MOCK_CLIENTS: Client[] = [
  { id: 101, name: "Alice Johnson", email: "alice@example.com", phone: "+1 555-0101" },
  { id: 102, name: "Bob Williams", email: "bob@example.com", phone: "+1 555-0102" },
  { id: 103, name: "Charlie Brown", email: "charlie@example.com", phone: "+1 555-0103" },
];