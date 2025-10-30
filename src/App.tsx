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
import FileManagerPage from "./pages/FileManagerPage"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/add" element={<AddProjectPage />} />
          <Route path="/client-list" element={<ClientListPage />} />
          <Route path="/client-list/add" element={<AddClientPage />} /> 
          <Route path="/client-contact-list" element={<ClientContactListPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/letterbox" element={<LetterBoxPage />} /> 
          <Route path="/filemanager" element={<FileManagerPage />} /> {/* <-- This route is now correct */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;