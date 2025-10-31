// src/pages/Booking.tsx

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
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Bell, 
  Maximize2, 
  Star,
  Plus,
  Clock,
  Video
} from "lucide-react";
import { AddBookingDialog } from "@/components/booking/AddBookingDialog";
import { format } from "date-fns";

const initialBookings = [
  { 
    id: 1, 
    client: "Harsh Sharma", 
    date: new Date(), 
    time: "14:30", 
    type: "Meeting" 
  },
  { 
    id: 2, 
    client: "Ansh Construction", 
    date: new Date(), 
    time: "16:00", 
    type: "Call" 
  },
];

const BookingPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookings, setBookings] = useState(initialBookings);

  const handleAddBooking = (booking: any) => {
    setBookings((prev) => [booking, ...prev]);
    console.log("New Booking:", booking);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300 flex flex-col h-screen">
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
                    <BreadcrumbPage>Bookings</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
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
                  SA
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">SAdmin</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Booking Layout */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6">
          
          {/* Main Calendar Area */}
          <Card className="flex-1">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-0 [&_td]:w-14 [&_th]:w-14"
                classNames={{
                  day: "h-14 w-14 text-base",
                  head_cell: "h-14 w-14 text-base",
                  cell: "h-14 w-14 text-base",
                }}
              />
            </CardContent>
          </Card>

          {/* Upcoming Bookings Sidebar */}
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>
                {date ? format(date, "PPP") : "No date selected"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{booking.client.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{booking.client}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {booking.time}
                    </p>
                  </div>
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                    <Video className="h-5 w-5" />
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  No bookings for this day.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <AddBookingDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onBookingCreate={handleAddBooking}
      />
    </div>
  );
};

export default BookingPage;