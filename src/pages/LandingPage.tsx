import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle2, 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  FolderKanban, 
  ShieldCheck,
  Zap
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Yoursoft CRM</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6">
              v2.0 is now live
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto">
              Manage your customer relationships <br className="hidden md:block" />
              <span className="text-primary">with intelligence and ease.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              All-in-one CRM platform for managing projects, clients, invoices, and teams. 
              Streamline your workflow and boost productivity today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="h-12 px-8 text-lg">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run your business</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Stop juggling multiple apps. Yoursoft CRM brings your projects, clients, and finances together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl border bg-slate-50 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Project Management</h3>
                <p className="text-slate-600">Track project progress, assign tasks, and manage timelines efficiently.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl border bg-slate-50 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Client Database</h3>
                <p className="text-slate-600">Keep all client details, contacts, and history in one organized place.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl border bg-slate-50 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Invoicing & Expenses</h3>
                <p className="text-slate-600">Create professional invoices and track expenses to stay on top of finances.</p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl border bg-slate-50 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 mb-4">
                  <FolderKanban className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Kanban Boards</h3>
                <p className="text-slate-600">Visualize your workflow with drag-and-drop Kanban boards for tasks.</p>
              </div>

               {/* Feature 5 */}
               <div className="p-6 rounded-2xl border bg-slate-50 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                <p className="text-slate-600">Enterprise-grade security to keep your sensitive business data safe.</p>
              </div>

               {/* Feature 6 */}
               <div className="p-6 rounded-2xl border bg-slate-50 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Performance</h3>
                <p className="text-slate-600">Built with modern technology for lightning-fast interactions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-10 text-lg">
              Join thousands of businesses managing their relationships better with Yoursoft CRM.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-semibold">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xs">Y</span>
                </div>
                <span className="text-lg font-bold text-white tracking-tight">Yoursoft CRM</span>
              </div>
              <p className="text-sm">Making business management simple, efficient, and enjoyable.</p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center md:text-left text-sm">
            © 2024 Yoursoft Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;