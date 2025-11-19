// src/pages/AddClient.tsx

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Bell, 
  Maximize2, 
  Star,
  Calendar as CalendarIcon,
  Plus
} from "lucide-react";

// Data for Selects
const statesOfIndia = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", 
  "Karnataka", "Kenmore", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", 
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Narora", "Natwar", "Odisha", 
  "Paschim Medinipur", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "Vaishali", "West Bengal"
];

const industries = [
  "Apparel", "Banking", "Biotechnology", "Chemicals", "Communications", "Construction", 
  "Consulting", "Electronics", "Education", "Healthcare", "Media", "Retail", "Energy", 
  "Engineering", "Entertainment", "Environmental", "Finance", "Food & Beverage", 
  "Government", "Hospitality", "Insurance", "Machinery", "Manufacturing", 
  "Not For Profit", "Shipping", "Technology", "Telecommunications", "Transportation", 
  "Utilities", "Other"
];

const clientSources = [
  "Web", "Phone Inquiry", "Partner Referral", "Purchased List", "Other"
];

const AddClientPage = () => {
  const [dob, setDob] = useState<Date>();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              {/* Breadcrumb Navigation */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/client-list">Client List</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Add Client/Vendor</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-3">
              {/* Header Icons */}
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Maximize2 className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Star className="h-5 w-5 text-muted-foreground" />
              </button>
              {/* User Profile */}
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center text-white font-semibold shadow-lg">
                  SA
                </div>
                <div className="text-sm">
                  <p className="font-m-medium text-foreground">SAdmin</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Form Content */}
        <div className="p-6">
          <form className="space-y-6">
            
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client Name*</Label>
                  <Input id="client-name" placeholder="Enter client name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone*</Label>
                  <Input id="phone" placeholder="Enter phone number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="e.g. https://example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gst-no">GST No.</Label>
                  <Input id="gst-no" placeholder="Enter GST number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state-no">State No.</Label>
                  <Input id="state-no" placeholder="Enter state number" />
                </div>
              </CardContent>
            </Card>

            {/* Contact Person Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Person Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input id="contact-person" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="Enter designation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-no">Contact No.</Label>
                  <Input id="contact-no" placeholder="Enter contact number" />
                </div>
                <div className="space-y-2">
                  <Label>DOB</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dob} onSelect={setDob} /></PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
              </CardContent>
            </Card>

            {/* Billing Address Information */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Address Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select defaultValue="india">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>State/Province*</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {statesOfIndia.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City*</Label>
                  <Input id="city" placeholder="Enter city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" placeholder="Enter postal code" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Textarea id="street" placeholder="Enter street address" />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Customer Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Industry*</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label>Sub Industry*</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sub Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* This should be populated based on Industry selection */}
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Client Source</Label>
                  {/* This is the component that had the typo. It's fixed here. */}
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client Source" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientSources.map(source => (
                        <SelectItem key={source} value={source}>{source}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="skype">Skype</Label>
                  <Input id="skype" placeholder="Enter Skype ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" placeholder="Enter Twitter URL" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" placeholder="Enter Facebook URL" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">Linkedin</Label>
                  <Input id="linkedin" placeholder="Enter Linkedin URL" />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddClientPage;