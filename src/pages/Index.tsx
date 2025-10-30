import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProjectsChart } from "@/components/dashboard/ProjectsChart";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { FolderKanban, DollarSign, Users, Bell, Maximize2, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Project</h1>
              <p className="text-sm text-muted-foreground">Home • Dashboard • Project</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Maximize2 className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Star className="h-5 w-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center text-white font-semibold shadow-lg">
                  TU
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Test123@gmail.com</p>
                  <p className="text-xs text-muted-foreground">UI Designer</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Active Projects"
              value="106"
              subtitle="Projects this month"
              trend={50}
              icon={FolderKanban}
              color="primary"
              progress={56}
            />
            <StatCard
              title="Projects Earnings"
              value="$202"
              subtitle="From last Week"
              trend={60}
              icon={DollarSign}
              color="secondary"
            />
            <StatCard
              title="Total Clients"
              value="930"
              subtitle="Compare to last month"
              trend={20}
              icon={Users}
              color="success"
            />
          </div>

          {/* Charts and Calendar Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProjectsChart />
            </div>
            <div>
              <CalendarWidget />
            </div>
          </div>

          {/* Projects Table */}
          <ProjectsTable />
        </div>
      </main>
    </div>
  );
};

export default Index;
