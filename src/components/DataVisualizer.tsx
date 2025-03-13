
import { useState } from "react";
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataCategory {
  name: string;
  value: number;
  description?: string;
}

interface DataVisualizerProps {
  categories: DataCategory[];
  className?: string;
}

const COLORS = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#ECF5FF"];

const DataVisualizer = ({ categories, className }: DataVisualizerProps) => {
  const [chartType, setChartType] = useState<"pie" | "radar">("radar");
  
  const totalValue = categories.reduce((acc, category) => acc + category.value, 0);
  const percentages = categories.map(category => ({
    ...category,
    percentage: Math.round((category.value / totalValue) * 100)
  }));

  return (
    <div className={cn("", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Data Breakdown</h3>
        <div className="flex space-x-2">
          <Button
            variant={chartType === "radar" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("radar")}
          >
            Radar
          </Button>
          <Button
            variant={chartType === "pie" ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType("pie")}
          >
            Pie
          </Button>
        </div>
      </div>
      
      <div className="h-72 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${Math.round((value / totalValue) * 100)}%`, 'Weight']}
                contentStyle={{ 
                  borderRadius: '0.375rem', 
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white' 
                }}
              />
            </PieChart>
          ) : (
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categories}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={5} />
              <Radar
                name="Value"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.4}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Tooltip 
                formatter={(value: number) => [value, 'Score']}
                contentStyle={{ 
                  borderRadius: '0.375rem', 
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white' 
                }}
              />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Category Breakdown</h4>
        {percentages.map((category, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{category.name}</span>
              <span className="text-sm font-medium">{category.value}/100</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out rounded-full"
                style={{ 
                  width: `${category.value}%`, 
                  backgroundColor: COLORS[index % COLORS.length] 
                }}
              ></div>
            </div>
            {category.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{category.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataVisualizer;
