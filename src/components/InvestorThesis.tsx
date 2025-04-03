
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Check } from "lucide-react";

interface InvestorThesisProps {
  thesis: {
    investmentThesis: string;
    preferredIndustries: string[];
    minRevenue: string;
    maxValuation: string;
    stagePreference: string;
    riskTolerance: number;
    teamImportance: number;
    marketSizePreference: number;
    requiresRevenue: boolean;
    minGrowthRate?: string;
    expectedValuationIncrease?: string;
    postInvestmentSuccess?: string;
  };
  onChange: (field: string, value: any) => void;
}

const industryOptions = [
  "SaaS", "Fintech", "Healthcare", "E-commerce", "EdTech", 
  "AI/ML", "Consumer", "Enterprise", "Hardware", "Marketplace",
  "Gaming", "Mobile", "Clean Tech", "Biotech", "AgTech"
];

const stageOptions = [
  "Pre-seed", "Seed", "Series A", "Series B", "Series C+", "Growth", "Any"
];

const successMetricOptions = [
  "Revenue Growth", "User Acquisition", "Market Share", "Profitability", "Exit Value"
];

const revenueOptions = [
  { value: "0", label: "Pre-revenue is fine" },
  { value: "10000", label: "$10K+ ARR" },
  { value: "50000", label: "$50K+ ARR" },
  { value: "100000", label: "$100K+ ARR" },
  { value: "500000", label: "$500K+ ARR" },
  { value: "1000000", label: "$1M+ ARR" },
  { value: "5000000", label: "$5M+ ARR" }
];

const valuationOptions = [
  { value: "1000000", label: "Up to $1M" },
  { value: "3000000", label: "Up to $3M" },
  { value: "5000000", label: "Up to $5M" },
  { value: "10000000", label: "Up to $10M" },
  { value: "20000000", label: "Up to $20M" },
  { value: "50000000", label: "Up to $50M" },
  { value: "100000000", label: "Up to $100M" },
  { value: "no-limit", label: "No limit" }
];

const valuationIncreaseOptions = [
  { value: "2x", label: "2x" },
  { value: "3x", label: "3x" },
  { value: "5x", label: "5x" },
  { value: "10x", label: "10x" },
  { value: "100x", label: "100x or more" }
];

const InvestorThesis = ({ thesis, onChange }: InvestorThesisProps) => {
  const [industryInput, setIndustryInput] = React.useState("");

  const handleIndustryAdd = () => {
    if (industryInput.trim() && !thesis.preferredIndustries.includes(industryInput.trim())) {
      onChange("preferredIndustries", [...thesis.preferredIndustries, industryInput.trim()]);
      setIndustryInput("");
    }
  };

  const handleIndustryToggle = (industry: string) => {
    const currentIndustries = [...thesis.preferredIndustries];
    
    if (currentIndustries.includes(industry)) {
      onChange("preferredIndustries", currentIndustries.filter(i => i !== industry));
    } else {
      onChange("preferredIndustries", [...currentIndustries, industry]);
    }
  };

  const handleIndustryRemove = (industry: string) => {
    onChange(
      "preferredIndustries", 
      thesis.preferredIndustries.filter(item => item !== industry)
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="investmentThesis">Your Investment Thesis</Label>
        <Textarea
          id="investmentThesis"
          placeholder="Describe your overall investment philosophy and what you look for in startups..."
          value={thesis.investmentThesis}
          onChange={(e) => onChange("investmentThesis", e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <div className="space-y-3">
        <Label>Preferred Industries</Label>
        
        {/* Industry selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {industryOptions.map((industry) => (
            <div 
              key={industry} 
              onClick={() => handleIndustryToggle(industry)}
              className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                thesis.preferredIndustries.includes(industry) 
                  ? "bg-primary/10 border-primary" 
                  : "bg-background hover:bg-accent"
              }`}
            >
              <div className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                thesis.preferredIndustries.includes(industry) 
                  ? "bg-primary text-primary-foreground" 
                  : "border border-input"
              }`}>
                {thesis.preferredIndustries.includes(industry) && <Check className="h-3 w-3" />}
              </div>
              <span className="text-sm">{industry}</span>
            </div>
          ))}
        </div>

        {/* Custom industry input */}
        <div className="flex items-center gap-2 mt-2">
          <Input
            placeholder="Add custom industry..."
            value={industryInput}
            onChange={(e) => setIndustryInput(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleIndustryAdd();
              }
            }}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={handleIndustryAdd}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Selected industries badges */}
        {thesis.preferredIndustries.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {thesis.preferredIndustries.map(industry => (
              <Badge key={industry} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                {industry}
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => handleIndustryRemove(industry)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="minRevenue">Minimum Revenue Expectation</Label>
          <div className="grid grid-cols-1 gap-2">
            {revenueOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => onChange("minRevenue", option.value)}
                className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                  thesis.minRevenue === option.value
                    ? "bg-primary/10 border-primary"
                    : "bg-background hover:bg-accent"
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  thesis.minRevenue === option.value
                    ? "border-4 border-primary"
                    : "border border-input"
                }`} />
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxValuation">Maximum Valuation</Label>
          <div className="grid grid-cols-1 gap-2 h-[300px] overflow-y-auto pr-1">
            {valuationOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => onChange("maxValuation", option.value)}
                className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                  thesis.maxValuation === option.value
                    ? "bg-primary/10 border-primary"
                    : "bg-background hover:bg-accent"
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  thesis.maxValuation === option.value
                    ? "border-4 border-primary"
                    : "border border-input"
                }`} />
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="minGrowthRate">Minimum Growth Rate</Label>
          <Input
            id="minGrowthRate"
            placeholder="e.g. 20% YoY"
            value={thesis.minGrowthRate || ""}
            onChange={(e) => onChange("minGrowthRate", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedValuationIncrease">Expected Valuation Increase</Label>
          <div className="grid grid-cols-1 gap-2">
            {valuationIncreaseOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => onChange("expectedValuationIncrease", option.value)}
                className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                  thesis.expectedValuationIncrease === option.value
                    ? "bg-primary/10 border-primary"
                    : "bg-background hover:bg-accent"
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  thesis.expectedValuationIncrease === option.value
                    ? "border-4 border-primary"
                    : "border border-input"
                }`} />
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stagePreference">Preferred Investment Stage</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {stageOptions.map((stage) => (
            <div
              key={stage}
              onClick={() => onChange("stagePreference", stage.toLowerCase())}
              className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                thesis.stagePreference === stage.toLowerCase()
                  ? "bg-primary/10 border-primary"
                  : "bg-background hover:bg-accent"
              }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                thesis.stagePreference === stage.toLowerCase()
                  ? "border-4 border-primary"
                  : "border border-input"
              }`} />
              <span className="text-sm">{stage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postInvestmentSuccess">Key Success Metric</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {successMetricOptions.map((metric) => (
            <div
              key={metric}
              onClick={() => onChange("postInvestmentSuccess", metric.toLowerCase())}
              className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                thesis.postInvestmentSuccess === metric.toLowerCase()
                  ? "bg-primary/10 border-primary"
                  : "bg-background hover:bg-accent"
              }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                thesis.postInvestmentSuccess === metric.toLowerCase()
                  ? "border-4 border-primary"
                  : "border border-input"
              }`} />
              <span className="text-sm">{metric}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="riskTolerance">Risk Tolerance</Label>
            <span className="text-sm text-muted-foreground">{thesis.riskTolerance}/100</span>
          </div>
          <Slider
            id="riskTolerance"
            value={[thesis.riskTolerance]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onChange("riskTolerance", value[0])}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Conservative</span>
            <span>Aggressive</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="teamImportance">Team Importance</Label>
            <span className="text-sm text-muted-foreground">{thesis.teamImportance}/100</span>
          </div>
          <Slider
            id="teamImportance"
            value={[thesis.teamImportance]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onChange("teamImportance", value[0])}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Less critical</span>
            <span>Most critical</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="marketSizePreference">Market Size Preference</Label>
            <span className="text-sm text-muted-foreground">{thesis.marketSizePreference}/100</span>
          </div>
          <Slider
            id="marketSizePreference"
            value={[thesis.marketSizePreference]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => onChange("marketSizePreference", value[0])}
            className="my-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Niche markets</span>
            <span>Massive TAM</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Switch 
          id="requiresRevenue" 
          checked={thesis.requiresRevenue}
          onCheckedChange={(checked) => onChange("requiresRevenue", checked === true)}
        />
        <Label htmlFor="requiresRevenue">Must have revenue</Label>
      </div>
    </div>
  );
};

export default InvestorThesis;
