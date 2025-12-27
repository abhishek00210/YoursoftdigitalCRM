// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Page Imports
import LandingPage from "./pages/LandingPage";
import InvoiceList from "./components/invoices/InvoiceList";
import CreateInvoice from "./components/invoices/CreateInvoice";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/Projects";
import ClientListPage from "./pages/ClientList";
import ClientContactListPage from "./pages/ClientContactList";
import AddProjectPage from "./pages/AddProject";
import KanbanPage from "./pages/Kanban";
import AddClientPage from "./pages/AddClient";
import LetterBoxPage from "./pages/LetterBoxPage";
import FileManagerPage from "./pages/FileManager";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import BookingPagesPage from "@/pages/BookingPages";
import BookingsPage from "@/pages/Bookings";
import UsersPage from "@/pages/Users";
import InvoicePage from "./pages/Invoice";
import ExpensesPage from "./pages/Expenses";
import EmployeePage from "./pages/Employee";  

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* --- EXISTING ROUTES (Self-Contained Layouts) --- */}
          {/* These pages handle their own Sidebar/Layout, so we do NOT wrap them in <Layout> to avoid double margins */}
          <Route path="/dashboard" element={<Index />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/add" element={<AddProjectPage />} />
          <Route path="/client-list" element={<ClientListPage />} />
          <Route path="/client-list/add" element={<AddClientPage />} />
          <Route path="/client-contact-list" element={<ClientContactListPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/letterbox" element={<LetterBoxPage />} />
          <Route path="/filemanager" element={<FileManagerPage />} />
          <Route path="/booking-pages" element={<BookingPagesPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/employee" element={<EmployeePage />} />
          <Route path="/users" element={<UsersPage />} />

          {/* --- NEW INVOICE ROUTES (Wrapped in Layout) --- */}
          {/* These are the new pages we built, which need the Sidebar and Header wrapper */}
          <Route element={<Layout />}>
            <Route path="/invoices" element={<InvoiceList />} /> 
            <Route path="/invoices/create" element={<CreateInvoice />} />
          </Route>

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;