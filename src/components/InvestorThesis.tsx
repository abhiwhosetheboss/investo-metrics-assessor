
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

const InvestorThesis = ({ thesis, onChange }: InvestorThesisProps) => {
  const handleIndustryToggle = (industry: string) => {
    const currentIndustries = [...thesis.preferredIndustries];
    
    if (currentIndustries.includes(industry)) {
      onChange("preferredIndustries", currentIndustries.filter(i => i !== industry));
    } else {
      onChange("preferredIndustries", [...currentIndustries, industry]);
    }
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

      <div className="space-y-2">
        <Label>Preferred Industries</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
          {industryOptions.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox 
                id={`industry-${industry}`} 
                checked={thesis.preferredIndustries.includes(industry)}
                onCheckedChange={() => handleIndustryToggle(industry)}
              />
              <Label htmlFor={`industry-${industry}`} className="text-sm font-normal">
                {industry}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="minRevenue">Minimum Revenue Expectation</Label>
          <Select
            value={thesis.minRevenue}
            onValueChange={(value) => onChange("minRevenue", value)}
          >
            <SelectTrigger id="minRevenue">
              <SelectValue placeholder="Select minimum revenue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Pre-revenue is fine</SelectItem>
              <SelectItem value="10000">$10K+ ARR</SelectItem>
              <SelectItem value="50000">$50K+ ARR</SelectItem>
              <SelectItem value="100000">$100K+ ARR</SelectItem>
              <SelectItem value="500000">$500K+ ARR</SelectItem>
              <SelectItem value="1000000">$1M+ ARR</SelectItem>
              <SelectItem value="5000000">$5M+ ARR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxValuation">Maximum Valuation</Label>
          <Select
            value={thesis.maxValuation}
            onValueChange={(value) => onChange("maxValuation", value)}
          >
            <SelectTrigger id="maxValuation">
              <SelectValue placeholder="Select maximum valuation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000000">Up to $1M</SelectItem>
              <SelectItem value="3000000">Up to $3M</SelectItem>
              <SelectItem value="5000000">Up to $5M</SelectItem>
              <SelectItem value="10000000">Up to $10M</SelectItem>
              <SelectItem value="20000000">Up to $20M</SelectItem>
              <SelectItem value="50000000">Up to $50M</SelectItem>
              <SelectItem value="100000000">Up to $100M</SelectItem>
              <SelectItem value="no-limit">No limit</SelectItem>
            </SelectContent>
          </Select>
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
          <Select
            value={thesis.expectedValuationIncrease || ""}
            onValueChange={(value) => onChange("expectedValuationIncrease", value)}
          >
            <SelectTrigger id="expectedValuationIncrease">
              <SelectValue placeholder="Select expected increase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2x">2x</SelectItem>
              <SelectItem value="3x">3x</SelectItem>
              <SelectItem value="5x">5x</SelectItem>
              <SelectItem value="10x">10x</SelectItem>
              <SelectItem value="100x">100x or more</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stagePreference">Preferred Investment Stage</Label>
        <Select
          value={thesis.stagePreference}
          onValueChange={(value) => onChange("stagePreference", value)}
        >
          <SelectTrigger id="stagePreference">
            <SelectValue placeholder="Select preferred stage" />
          </SelectTrigger>
          <SelectContent>
            {stageOptions.map((stage) => (
              <SelectItem key={stage} value={stage.toLowerCase()}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postInvestmentSuccess">Key Success Metric</Label>
        <Select
          value={thesis.postInvestmentSuccess || ""}
          onValueChange={(value) => onChange("postInvestmentSuccess", value)}
        >
          <SelectTrigger id="postInvestmentSuccess">
            <SelectValue placeholder="Select primary success metric" />
          </SelectTrigger>
          <SelectContent>
            {successMetricOptions.map((metric) => (
              <SelectItem key={metric} value={metric.toLowerCase()}>
                {metric}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Niche markets</span>
            <span>Massive TAM</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id="requiresRevenue" 
          checked={thesis.requiresRevenue}
          onCheckedChange={(checked) => onChange("requiresRevenue", checked)}
        />
        <Label htmlFor="requiresRevenue">Must have revenue</Label>
      </div>
    </div>
  );
};

export default InvestorThesis;
