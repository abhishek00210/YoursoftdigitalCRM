// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import BookingPage from "./pages/Booking";
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
          {/* App Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/add" element={<AddProjectPage />} />
          <Route path="/client-list" element={<ClientListPage />} />
          <Route path="/client-list/add" element={<AddClientPage />} />
          <Route path="/client-contact-list" element={<ClientContactListPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/letterbox" element={<LetterBoxPage />} />
          <Route path="/filemanager" element={<FileManagerPage />} /> {/* <-- Correct route */}
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/employee" element={<EmployeePage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;