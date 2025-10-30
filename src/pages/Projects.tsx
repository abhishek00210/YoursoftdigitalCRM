import { Sidebar } from "@/components/Sidebar";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const ProjectsPage = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Include the Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 ml-64 p-6 transition-all duration-300"> {/* Added padding */}
        {/* Header Section */}
        <header className="mb-6">
           <h1 className="text-2xl font-bold text-foreground mb-1">Projects</h1>
           {/* Breadcrumb Navigation */}
           <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Projects Table Section */}
        {/* Render the existing ProjectsTable component */}
        <ProjectsTable />

        {/* You can add more project-specific components or sections here later */}
        {/* For example: Filters, Search Bar, Create Project Button, etc. */}

      </main>
    </div>
  );
};

export default ProjectsPage;