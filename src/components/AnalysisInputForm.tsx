import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"; // Added missing Slider import
import { analyzeStartupWithAI, getTrainingStatus } from "@/utils/analysisUtils";
import { Brain, Loader2, Building2, Users, BookOpen, Briefcase, LineChart, DollarSign, ShoppingCart, Heart, ClipboardList } from "lucide-react";

interface AnalysisInputFormProps {
  modelId: string;
  onAnalyze?: (formData: any) => Promise<any>;
}

type FormValues = {
  // Basic Info
  name: string;
  businessModel: string;
  
  // Market & Product
  pmfScore: number;
  repeatRate: number;
  customerFeedback: string;
  socialMediaEngagement: string;
  
  // Financial Metrics
  revenue: string;
  valuation: string;
  growthExpected: string;
  grossMargin: string;
  netMargin: string;
  burnRate: string;
  marketingSpend: string;
  ebitda: string;
  unitEconomics: string;
  
  // Team & Founder - removed the fields you specified
  foundersEducation: string;
  foundersHistory: string;
  teamSize: string;
  
  // Operations
  supplyChain: string;
  customerCount: string;
  
  // Investor Thesis
  investmentThesis: string;
  preferredIndustries: string[];
  minRevenue: string;
  maxValuation: string;
  stagePreference: string;
  riskTolerance: number;
  teamImportance: number;
  marketSizePreference: number;
  requiresRevenue: boolean;
  minGrowthRate: string;
  expectedValuationIncrease: string;
  postInvestmentSuccess: string;
};

const industryOptions = [
  "SaaS", "Fintech", "Healthcare", "E-commerce", "EdTech", 
  "AI/ML", "Consumer", "Enterprise", "Hardware", "Marketplace",
  "Gaming", "Mobile", "Clean Tech", "Biotech", "AgTech"
];

const AnalysisInputForm = ({ modelId, onAnalyze }: AnalysisInputFormProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      businessModel: "b2c",
      pmfScore: 50,
      repeatRate: 50,
      customerFeedback: "",
      socialMediaEngagement: "",
      revenue: "",
      valuation: "",
      growthExpected: "",
      grossMargin: "",
      netMargin: "",
      burnRate: "",
      marketingSpend: "",
      ebitda: "",
      unitEconomics: "",
      foundersEducation: "",
      foundersHistory: "",
      // Removed the fields you specified
      teamSize: "",
      supplyChain: "",
      customerCount: "",
      investmentThesis: "",
      preferredIndustries: [],
      minRevenue: "0",
      maxValuation: "no-limit",
      stagePreference: "any",
      riskTolerance: 50,
      teamImportance: 70,
      marketSizePreference: 50,
      requiresRevenue: false,
      minGrowthRate: "",
      expectedValuationIncrease: "",
      postInvestmentSuccess: ""
    }
  });

  const handleIndustryToggle = (industry: string) => {
    const currentIndustries = form.getValues("preferredIndustries") || [];
    
    if (currentIndustries.includes(industry)) {
      form.setValue("preferredIndustries", currentIndustries.filter(i => i !== industry));
    } else {
      form.setValue("preferredIndustries", [...currentIndustries, industry]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const trainStatus = getTrainingStatus();
      if (!trainStatus.isModelTrained) {
        toast({
          title: "Error",
          description: "Please train the AI model before running analysis",
          variant: "destructive"
        });
        return;
      }
      
      setIsAnalyzing(true);
      
      toast({
        title: "Analysis Started",
        description: "Analyzing your startup data..."
      });
      
      const analysisData = {
        name: data.name,
        businessModel: data.businessModel,
        revenue: data.revenue,
        valuation: data.valuation,
        growthExpected: data.growthExpected,
        margins: `${data.grossMargin}% Gross, ${data.netMargin}% Net`,
        burnRate: data.burnRate,
        marketingSpend: data.marketingSpend,
        ebitda: data.ebitda,
        unitEconomics: data.unitEconomics,
        teamSize: data.teamSize,
        pmfScore: data.pmfScore,
        repeatRate: data.repeatRate,
        customerFeedback: data.customerFeedback,
        socialMediaEngagement: data.socialMediaEngagement,
        foundersEducation: data.foundersEducation,
        foundersHistory: data.foundersHistory,
        // Removed the fields you specified
        keyRolesFilled: false,
        technicalSkills: 0,
        businessSkills: 0,
        passionLevel: 0,
        investorThesis: {
          investmentThesis: data.investmentThesis,
          preferredIndustries: data.preferredIndustries,
          minRevenue: data.minRevenue,
          maxValuation: data.maxValuation,
          stagePreference: data.stagePreference,
          riskTolerance: data.riskTolerance,
          teamImportance: data.teamImportance,
          marketSizePreference: data.marketSizePreference,
          requiresRevenue: data.requiresRevenue,
          minGrowthRate: data.minGrowthRate,
          expectedValuationIncrease: data.expectedValuationIncrease,
          postInvestmentSuccess: data.postInvestmentSuccess
        }
      };
      
      console.log("Starting analysis with data:", analysisData);
      
      let result;
      if (onAnalyze) {
        result = await onAnalyze(analysisData);
      } else {
        result = await analyzeStartupWithAI(analysisData, modelId);
      }
      
      toast({
        title: "Analysis Complete",
        description: "Your startup analysis is ready to view."
      });
      
      localStorage.setItem(`analysis-${result.id}`, JSON.stringify(result));
      
      navigate(`/analysis/${result.id}`);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An error occurred during analysis",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comprehensive Startup Analysis</CardTitle>
        <CardDescription>
          Enter detailed metrics about your startup and investor preferences for a comprehensive AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Startup Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your startup name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Model</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 sm:flex-row sm:space-x-4 sm:space-y-0"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="b2b" id="b2b" />
                          <FormLabel htmlFor="b2b" className="font-normal">B2B</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="b2c" id="b2c" />
                          <FormLabel htmlFor="b2c" className="font-normal">B2C</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="d2c" id="d2c" />
                          <FormLabel htmlFor="d2c" className="font-normal">D2C</FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="marketplace" id="marketplace" />
                          <FormLabel htmlFor="marketplace" className="font-normal">Marketplace</FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4 flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Market & Product
            </h3>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="pmfScore"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Product-Market Fit</FormLabel>
                      <span className="text-sm text-muted-foreground">{field.value}/100</span>
                    </div>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      How well does your product fit the market needs?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatRate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Customer Repeat Rate</FormLabel>
                      <span className="text-sm text-muted-foreground">{field.value}/100</span>
                    </div>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Percentage of customers who make repeat purchases
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerFeedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Feedback</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Summarize key customer feedback" {...field} className="h-20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialMediaEngagement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Engagement</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2.5% engagement rate, 10K followers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Financial Metrics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Revenue</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $10,000" {...field} />
                    </FormControl>
                    <FormDescription>
                      Current monthly revenue (MRR)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="valuation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Valuation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $2,000,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="growthExpected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Growth Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 20% MoM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="burnRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Burn Rate</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $25,000" {...field} />
                    </FormControl>
                    <FormDescription>
                      How much you spend monthly
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="grossMargin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Margin (%)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 65" {...field} />
                    </FormControl>
                    <FormDescription>
                      Percentage of revenue after COGS
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="netMargin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Margin (%)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 15" {...field} />
                    </FormControl>
                    <FormDescription>
                      Percentage of revenue after all expenses
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketingSpend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marketing Spend</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $5,000/month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ebitda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EBITDA</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. -$15,000/month" {...field} />
                    </FormControl>
                    <FormDescription>
                      Earnings before interest, taxes, depreciation, and amortization
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitEconomics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Economics</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. CAC $50, LTV $250" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Team & Founders
            </h3>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="foundersEducation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founders' Education</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g. MBA from Stanford, BS in Computer Science from MIT" 
                        {...field} 
                        className="h-20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foundersHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Founders' History</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g. Previously founded a successful startup, 5 years at Google" 
                        {...field} 
                        className="h-20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 8" {...field} />
                    </FormControl>
                    <FormDescription>
                      Number of team members
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4 flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Operations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="supplyChain"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Supply Chain Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your supply chain and logistics" 
                        {...field} 
                        className="h-20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Count</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 120" {...field} />
                    </FormControl>
                    <FormDescription>
                      Number of active customers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4 flex items-center">
              <ClipboardList className="h-4 w-4 mr-2" />
              Investor Preferences
            </h3>
            
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 mb-6 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Define your investment preferences to get a more personalized analysis that matches your criteria.
                  This will affect the risk-reward assessment and recommendations.
                </p>
              </div>
              
              <FormField
                control={form.control}
                name="investmentThesis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Investment Thesis</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your overall investment philosophy and what you look for in startups..."
                        {...field}
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Preferred Industries</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                  {industryOptions.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`industry-${industry}`}
                        checked={form.getValues("preferredIndustries")?.includes(industry)}
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
                <FormField
                  control={form.control}
                  name="minRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Revenue Expectation</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $10K ARR" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxValuation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Valuation</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $10M" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="minGrowthRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Growth Rate</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 20% YoY"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expectedValuationIncrease"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Valuation Increase</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 3x, 5x, 10x" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="stagePreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Investment Stage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Seed, Series A, Growth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postInvestmentSuccess"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Success Metric</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Revenue Growth, Market Share" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="riskTolerance"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Risk Tolerance</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value}/100</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Conservative</span>
                        <span>Aggressive</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teamImportance"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Team Importance</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value}/100</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Less critical</span>
                        <span>Most critical</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marketSizePreference"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Market Size Preference</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value}/100</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Niche markets</span>
                        <span>Massive TAM</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="requiresRevenue"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Must have revenue</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="pt-8">
              <Button 
                type="submit"
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Run Comprehensive Analysis
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                This will generate a detailed investibility report for your startup
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AnalysisInputForm;
