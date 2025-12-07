import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- CONFIGURATION ---
const API_URL = "http://localhost:5011";

// Data Lists
const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];
const industries = ["Apparel", "Banking", "Construction", "Consulting", "Education", "Finance", "Healthcare", "Manufacturing", "Technology", "Retail", "Other"];
const clientSources = ["Web", "Phone Inquiry", "Partner Referral", "Other"];

const AddClientPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Form State - Matches the unified Client model
  const [formData, setFormData] = useState({
    type: "Client",
    clientName: "",
    phone: "",
    website: "",
    gstNo: "",
    stateNo: "",
    // Contact Person
    contactPerson: "",
    designation: "",
    contactNo: "",
    contactEmail: "",
    // Billing
    country: "India",
    state: "",
    city: "",
    postalCode: "",
    street: "",
    // Additional
    customerPriority: "",
    industry: "",
    subIndustry: "",
    clientSource: "",
    skype: "",
    twitter: "",
    facebook: "",
    linkedin: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Single POST request to save everything to Clients table
      const response = await fetch(`${API_URL}/api/clients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Client and Contact added successfully." });
        navigate("/client-list");
      } else {
        const errorText = await response.text();
        toast({ title: "Error", description: "Failed to save. Check required fields.", variant: "destructive" });
        console.error("API Error:", errorText);
      }
    } catch (error) {
      toast({ title: "Network Error", description: "Could not connect to server.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur flex h-16 items-center justify-between px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="/client-list">Client List</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Add Client</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
             <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-muted"><Bell className="h-5 w-5 text-muted-foreground" /></button>
            </div>
        </header>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader><CardTitle>Client Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Type*</Label>
                  <Select onValueChange={(val) => handleSelectChange("type", val)} defaultValue="Client">
                    <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Client">Client</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name*</Label>
                  <Input id="clientName" placeholder="Enter client name" required value={formData.clientName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone*</Label>
                  <Input id="phone" placeholder="Enter phone number" required value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://example.com" value={formData.website} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNo">GST No.</Label>
                  <Input id="gstNo" placeholder="Enter GST number" value={formData.gstNo} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateNo">State No.</Label>
                  <Input id="stateNo" placeholder="Enter state number" value={formData.stateNo} onChange={handleInputChange} />
                </div>
              </CardContent>
            </Card>

            {/* Contact Person Information - Now mapped to the same formData */}
            <Card>
              <CardHeader><CardTitle>Contact Person Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person Name</Label>
                  <Input id="contactPerson" placeholder="Enter name" value={formData.contactPerson} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="Enter designation" value={formData.designation} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNo">Contact No.</Label>
                  <Input id="contactNo" placeholder="Enter contact number" value={formData.contactNo} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input id="contactEmail" type="email" placeholder="Enter email" value={formData.contactEmail} onChange={handleInputChange} />
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader><CardTitle>Billing Address</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>State/Province*</Label>
                  <Select onValueChange={(val) => handleSelectChange("state", val)}>
                    <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                    <SelectContent className="max-h-60">
                      {statesOfIndia.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" placeholder="Enter postal code" value={formData.postalCode} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Textarea id="street" placeholder="Enter street address" value={formData.street} onChange={handleInputChange} />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader><CardTitle>Additional Information</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select onValueChange={(val) => handleSelectChange("industry", val)}>
                    <SelectTrigger><SelectValue placeholder="Select Industry" /></SelectTrigger>
                    <SelectContent className="max-h-60">
                      {industries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label>Sub Industry</Label>
                  <Select onValueChange={(val) => handleSelectChange("subIndustry", val)}>
                    <SelectTrigger><SelectValue placeholder="Select Sub Industry" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Client Source</Label>
                  <Select onValueChange={(val) => handleSelectChange("clientSource", val)}>
                    <SelectTrigger><SelectValue placeholder="Select Source" /></SelectTrigger>
                    <SelectContent>
                      {clientSources.map(src => <SelectItem key={src} value={src}>{src}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2 pb-10">
              <Button type="button" variant="outline" onClick={() => navigate('/client-list')}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Client"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddClientPage;