
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RiskToRewardMeter from "@/components/RiskToRewardMeter";
import { BarChart4, Scale, Users, LineChart, ArrowRight, Brain, Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sampleData } from "@/utils/sampleData";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStartAnalysis = () => {
    navigate("/analyze");
  };

  const handleFormSubmit = (formData: any) => {
    // In a real app, we would submit this data to an API
    console.log("Form submitted with data:", formData);
    toast({
      title: "Analysis started",
      description: "Your startup is being analyzed. You'll be redirected to the dashboard shortly.",
    });
    
    // Redirect to analyze page after a short delay
    setTimeout(() => {
      navigate("/analyze");
    }, 1500);
  };
  
  // Show only the first 4 sample reports
  const featuredSamples = sampleData.slice(0, 4);
  
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
                <Button size="lg" variant="outline" onClick={() => {
                  // Scroll to samples section for better UX
                  document.getElementById('samples-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}>
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
      
      {/* Sample Reports Section - MOVED UP */}
      <section id="samples-section" className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Sample Reports</h2>
              <p className="text-slate-600 dark:text-slate-400">
                View example analyses to see what insights Investometer provides.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSamples.map((sample) => (
                <Card key={sample.id} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle>{sample.startupName}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {sample.investibilityScore > 75 
                        ? "Highly investible startup with strong potential" 
                        : sample.investibilityScore > 60 
                        ? "Promising startup with moderate risk factors"
                        : "Startup with significant risk factors to consider"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Investibility Score:</span>
                      <span className={`font-medium ${
                        sample.investibilityScore > 75 
                          ? 'text-green-600' 
                          : sample.investibilityScore > 60 
                          ? 'text-yellow-600' 
                          : 'text-red-600'
                      }`}>{sample.investibilityScore}/100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Risk Level:</span>
                      <span className={`font-medium ${
                        sample.overallRisk < 35 
                          ? 'text-green-600' 
                          : sample.overallRisk < 50 
                          ? 'text-yellow-600' 
                          : 'text-red-600'
                      }`}>
                        {sample.overallRisk < 35 ? 'Low' : sample.overallRisk < 50 ? 'Moderate' : 'High'}
                      </span>
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link to={`/analysis/${sample.id}`}>View Full Analysis</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/dashboard">
                  View All Sample Analyses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
       <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto text-center space-y-4">
             <h2 className="text-3xl font-bold mb-2">Ready to Analyze Your Startup?</h2>
             <p className="text-slate-600 dark:text-slate-400">
               When youre ready to go deeper, start a full analysis and get the same level of insight as the sample reports above.
             </p>
             <Button size="lg" className="mt-2" onClick={handleStartAnalysis}>
               Start Full Analysis
               <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
           </div>
         </div>
       </section>
     </div>
   );
 };
 
 export default Index;
