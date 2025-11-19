import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: number;
  icon?: LucideIcon;
  color?: "primary" | "secondary" | "success";
  progress?: number;
}

export function StatCard({ 
  title, // <-- Added this to match the interface
  value, 
  subtitle, 
  trend, 
  icon: Icon,
  color = "primary",
  progress
}: StatCardProps) {
  const isPositive = trend > 0;
  
  const colorClasses = {
    primary: "bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-sm",
    secondary: "bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary shadow-sm",
    success: "bg-gradient-to-br from-success/20 to-success/10 text-success shadow-sm",
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          {/* Note: Your interface has 'title', 'subtitle', and 'value'.
            You are currently using 'subtitle' for the small text 
            and 'value' for the large text. The 'title' prop is unused.
            You may want to use {title} here instead of {subtitle}.
          */}
          <p className="text-sm text-muted-foreground mb-1">{subtitle}</p>
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        </div>
        {Icon && (
          <div className={cn("p-3 rounded-xl", colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-medium flex items-center gap-1",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {Math.abs(trend)}%
          </span>
        </div>
        {progress !== undefined && (
          <span className="text-sm font-medium text-success">{progress}%</span>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}