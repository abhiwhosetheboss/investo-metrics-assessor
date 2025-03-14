
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { analyzeStartupWithAI, getTrainingStatus } from "@/utils/analysisUtils";
import { Brain, Loader2, ArrowRight } from "lucide-react";

interface AnalysisInputFormProps {
  modelId: string;
}

type FormValues = {
  name: string;
  revenue: string;
  grossMargin: string;
  netMargin: string;
  burnRate: string;
  teamSize: string;
  customerCount: string;
};

const AnalysisInputForm = ({ modelId }: AnalysisInputFormProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      revenue: "",
      grossMargin: "",
      netMargin: "",
      burnRate: "",
      teamSize: "",
      customerCount: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Check if model is trained
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
      
      // Convert form data to format expected by analysis function
      const analysisData = {
        name: data.name,
        revenue: data.revenue,
        margins: `${data.grossMargin}% Gross, ${data.netMargin}% Net`,
        burnRate: data.burnRate,
        teamSize: data.teamSize,
        // Add other fields with default values for analysis
        pmfScore: 60,
        domainExpertise: 70,
        keyRolesFilled: true,
        technicalSkills: 75,
        businessSkills: 65,
        passionLevel: 80,
        // Add customer count as additional field
        customerCount: data.customerCount
      };
      
      console.log("Starting analysis with data:", analysisData);
      
      const result = await analyzeStartupWithAI(analysisData, modelId);
      
      toast({
        title: "Analysis Complete",
        description: "Your startup analysis is ready to view."
      });
      
      // Save result in localStorage for demo purposes
      // In a real app this would be saved to a database
      localStorage.setItem(`analysis-${result.id}`, JSON.stringify(result));
      
      // Navigate to results page
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
    <Card>
      <CardHeader>
        <CardTitle>Quick Analysis</CardTitle>
        <CardDescription>
          Enter key metrics about your startup for an AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4">Financial Metrics</h3>
            
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
            </div>
            
            <Separator className="my-4" />
            <h3 className="text-sm font-medium mb-4">Team & Traction</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            <div className="pt-2">
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
                    Run Analysis
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                This will generate an investibility report for your startup
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AnalysisInputForm;
