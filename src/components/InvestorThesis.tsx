
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const InvestorThesis = ({ thesis, onChange }: InvestorThesisProps) => {
  const [industryInput, setIndustryInput] = useState("");
  const [activeTab, setActiveTab] = useState("popular");

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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="popular">Popular Industries</TabsTrigger>
            <TabsTrigger value="custom">Custom Industry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="popular" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="flex items-center gap-2 mt-2">
              <Input
                placeholder="Add custom industry..."
                value={industryInput}
                onChange={(e) => setIndustryInput(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleIndustryAdd();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleIndustryAdd}
              >
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected industries badges */}
        {thesis.preferredIndustries.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 p-3 border rounded-md bg-background">
            <h4 className="w-full text-sm font-medium mb-2">Selected Industries:</h4>
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
          <Input 
            id="minRevenue"
            placeholder="e.g. $10,000 ARR"
            value={thesis.minRevenue}
            onChange={(e) => onChange("minRevenue", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Enter the minimum revenue you expect from startups</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxValuation">Maximum Valuation</Label>
          <Input 
            id="maxValuation"
            placeholder="e.g. $10,000,000"
            value={thesis.maxValuation}
            onChange={(e) => onChange("maxValuation", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Enter the maximum valuation you would consider</p>
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
          <p className="text-xs text-muted-foreground">Enter the minimum growth rate you expect</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedValuationIncrease">Expected Valuation Increase</Label>
          <Input 
            id="expectedValuationIncrease"
            placeholder="e.g. 3x, 5x, 10x"
            value={thesis.expectedValuationIncrease || ""}
            onChange={(e) => onChange("expectedValuationIncrease", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Enter your expected return multiple</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stagePreference">Preferred Investment Stage</Label>
        <Input
          id="stagePreference"
          placeholder="e.g. Seed, Series A, Growth"
          value={thesis.stagePreference}
          onChange={(e) => onChange("stagePreference", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Enter your preferred investment stage</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postInvestmentSuccess">Key Success Metric</Label>
        <Input 
          id="postInvestmentSuccess"
          placeholder="e.g. Revenue Growth, Market Share, Profitability"
          value={thesis.postInvestmentSuccess || ""}
          onChange={(e) => onChange("postInvestmentSuccess", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Enter your main post-investment success metric</p>
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
