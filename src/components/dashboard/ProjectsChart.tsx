import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", value1: 150, value2: 200, value3: 100 },
  { month: "Feb", value1: 180, value2: 220, value3: 130 },
  { month: "Mar", value1: 280, value2: 180, value3: 200 },
  { month: "Apr", value1: 200, value2: 250, value3: 150 },
  { month: "May", value1: 350, value2: 280, value3: 250 },
  { month: "Jun", value1: 250, value2: 300, value3: 200 },
  { month: "Jul", value1: 280, value2: 250, value3: 220 },
  { month: "Aug", value1: 320, value2: 280, value3: 240 },
  { month: "Sep", value1: 380, value2: 320, value3: 300 },
  { month: "Oct", value1: 300, value2: 280, value3: 250 },
  { month: "Nov", value1: 420, value2: 350, value3: 320 },
  { month: "Dec", value1: 380, value2: 400, value3: 280 },
];

export function ProjectsChart() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-1 w-8 bg-primary rounded" />
          <h3 className="text-xl font-semibold text-foreground">Projects Overview</h3>
        </div>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}K`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value1" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={false}
              name="Projects"
            />
            <Line 
              type="monotone" 
              dataKey="value2" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              dot={false}
              name="Completed"
            />
            <Line 
              type="monotone" 
              dataKey="value3" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              dot={false}
              name="Pending"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
