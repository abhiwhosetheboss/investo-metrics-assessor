
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StartupForm from "@/components/StartupForm";
import RiskToRewardMeter from "@/components/RiskToRewardMeter";
import { BarChart4, Scale, Users, LineChart, ArrowRight, Brain, Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("form");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStartAnalysis = () => {
    navigate("/dashboard");
  };

  const handleFormSubmit = (formData: any) => {
    // In a real app, we would submit this data to an API
    console.log("Form submitted with data:", formData);
    toast({
      title: "Analysis started",
      description: "Your startup is being analyzed. You'll be redirected to the dashboard shortly.",
    });
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Make Data-Driven <span className="text-primary">Investment Decisions</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Investometer analyzes startups using proven metrics and AI-powered insights to help investors evaluate risk and potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="gap-2" onClick={handleStartAnalysis}>
                  Start Analysis
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab("examples")}>
                  View Examples
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Scale className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Risk-Reward Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Growth Predictions</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              {/* Sample Risk-to-Reward Meter */}
              <RiskToRewardMeter risk={35} reward={75} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Investometer Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Our platform combines quantitative metrics with qualitative assessments to provide a comprehensive view of startup potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="mb-4">
                  <BarChart4 className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Comprehensive Analysis</CardTitle>
                <CardDescription>
                  Evaluate startups across multiple dimensions and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  From financial health and market fit to team dynamics and founder capabilities, we analyze all aspects of startup potential.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-4">
                  <Scale className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Risk-Reward Balance</CardTitle>
                <CardDescription>
                  Understand the balance between potential returns and risks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Our risk-to-reward meter helps investors quickly assess if a startup's potential reward justifies the associated risks.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-4">
                  <LineChart className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Data-Driven Insights</CardTitle>
                <CardDescription>
                  Make decisions backed by historical patterns and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Our algorithms analyze thousands of previous startup outcomes to identify patterns that lead to success or failure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="form" value={activeTab} className="space-y-8" onValueChange={setActiveTab}>
              <div className="flex justify-center">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                  <TabsTrigger value="form">Startup Analysis</TabsTrigger>
                  <TabsTrigger value="examples">Sample Reports</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="form" className="space-y-4">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Analyze Your Startup</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Fill out the form below to get a comprehensive analysis of your startup's investibility.
                  </p>
                </div>
                <StartupForm onSubmit={handleFormSubmit} />
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-2">Sample Reports</h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    View example analyses to see what insights Investometer provides.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sample cards with links to the example analyses */}
                  <Card className="hover:shadow-md transition-all">
                    <CardHeader>
                      <CardTitle>EcoTech Solutions</CardTitle>
                      <CardDescription>Clean energy startup with strong team</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Investibility Score:</span>
                        <span className="font-medium text-green-600">78/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Risk Level:</span>
                        <span className="font-medium text-yellow-600">Moderate</span>
                      </div>
                      <Button asChild className="w-full mt-4">
                        <Link to="/analysis/startup-1">View Full Analysis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-all">
                    <CardHeader>
                      <CardTitle>HealthMinder AI</CardTitle>
                      <CardDescription>Healthcare AI with regulatory challenges</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Investibility Score:</span>
                        <span className="font-medium text-yellow-600">65/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Risk Level:</span>
                        <span className="font-medium text-orange-600">High</span>
                      </div>
                      <Button asChild className="w-full mt-4">
                        <Link to="/analysis/startup-2">View Full Analysis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-all md:col-span-2">
                    <CardHeader>
                      <CardTitle>LogisticsHub</CardTitle>
                      <CardDescription>Supply chain optimization platform with industry veterans</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Investibility Score:</span>
                        <span className="font-medium text-green-600">82/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Risk Level:</span>
                        <span className="font-medium text-green-600">Low</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Risk-to-Reward Ratio:</span>
                        <span className="font-medium text-green-600">2.48</span>
                      </div>
                      <Button asChild className="w-full mt-4">
                        <Link to="/analysis/startup-3">View Full Analysis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button asChild>
                    <Link to="/dashboard">
                      View All Sample Analyses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
