import { Card } from "@/components/ui/card";
import { Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

const meetings = [
  { 
    title: "Meeting with Client", 
    time: "09:00", 
    lead: "Jaskren Rao",
    color: "primary" 
  },
  { 
    title: "Deal with New Client", 
    time: "09:00", 
    lead: "Ashkista Jain",
    color: "secondary" 
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [14, 15, 16, 17, 18, 19, 20, 21, 22];

export function CalendarWidget() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-1 w-8 bg-primary rounded" />
          <h3 className="text-xl font-semibold text-foreground">Calendar</h3>
        </div>
        <button className="text-sm text-primary hover:underline">
          Report →
        </button>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-xs text-muted-foreground mb-2">{day}</div>
            <div className={cn(
              "h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
              index === 5 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}>
              {dates[index]}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Meetings */}
      <div className="space-y-3">
        {meetings.map((meeting, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 shadow-md",
              index === 0 ? "bg-gradient-to-br from-primary via-accent to-secondary" : "bg-gradient-to-br from-secondary to-accent"
            )}>
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground mb-1">{meeting.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{meeting.time} am</span>
                <span>•</span>
                <span>Lead by <span className={cn(
                  "font-medium",
                  meeting.color === "primary" ? "text-primary" : "text-secondary"
                )}>{meeting.lead}</span></span>
              </div>
            </div>
            <button className="text-sm text-primary hover:underline flex-shrink-0">
              View
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
