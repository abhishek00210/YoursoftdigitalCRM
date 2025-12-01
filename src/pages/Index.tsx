import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectsChart } from "@/components/dashboard/ProjectsChart";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { FolderKanban, DollarSign, Users, Bell, Maximize2, Star } from "lucide-react";

// --- DYNAMIC: API URL ---
const API_URL = "http://localhost:5011";

const Index = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    clientsCount: 0,
    earnings: 0
  });

  // --- DYNAMIC: Fetch real data for stats ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, clientsRes, invoicesRes] = await Promise.all([
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/clients`),
          fetch(`${API_URL}/api/invoices`)
        ]);

        const projects = await projectsRes.json();
        const clients = await clientsRes.json();
        const invoices = await invoicesRes.json();

        // Calculate total earnings from Paid invoices
        const totalEarnings = invoices
          .filter((inv: any) => inv.status === "Paid")
          .reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0);

        setStats({
          projectsCount: projects.length || 0,
          clientsCount: clients.length || 0,
          earnings: totalEarnings
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur flex h-16 items-center justify-between px-6">
           <div><h1 className="text-2xl font-bold">Dashboard</h1></div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid - Using Real Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Active Projects"
              value={stats.projectsCount.toString()}
              subtitle="Total projects"
              trend={10}
              icon={FolderKanban}
              color="primary"
            />
            <StatCard
              title="Total Earnings"
              value={`$${stats.earnings.toLocaleString()}`}
              subtitle="Paid invoices"
              trend={25}
              icon={DollarSign}
              color="secondary"
            />
            <StatCard
              title="Total Clients"
              value={stats.clientsCount.toString()}
              subtitle="Active clients"
              trend={5}
              icon={Users}
              color="success"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><ProjectsChart /></div>
            <div><CalendarWidget /></div>
          </div>
          
          {/* You can also make this table dynamic similarly to ProjectsPage */}
          <ProjectsTable />
        </div>
      </main>
    </div>
  );
};

export default Index;