
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RiskToRewardMeter from "@/components/RiskToRewardMeter";
import { BarChart4, Scale, LineChart, ArrowRight, Brain, TrendingUp, Building2, Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sampleData } from "@/utils/sampleData";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAnalyzeStocks = () => {
    navigate("/dashboard");
  };

  const handleAnalyzeStartup = () => {
    navigate("/analyze");
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
              <Badge variant="outline" className="mb-2 py-1.5 px-3">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Live Market Data
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                AI-Powered <span className="text-primary">Stock & Startup</span> Analysis
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Investometer analyzes listed stocks using real-time market data and AI-powered insights. Also supports custom startup analysis for investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="gap-2" onClick={handleAnalyzeStocks}>
                  <TrendingUp className="h-4 w-4" />
                  Analyze Stocks
                </Button>
                <Button size="lg" variant="outline" className="gap-2" onClick={handleAnalyzeStartup}>
                  <Rocket className="h-4 w-4" />
                  Analyze Startup
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
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Real-Time Stock Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Scale className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Risk-Reward Assessment</span>
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
              Our platform combines real-time market data with AI analysis to provide comprehensive investment insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="mb-4">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Stock Analysis</CardTitle>
                <CardDescription>
                  Analyze top US stocks with real-time market data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Get investibility scores, risk assessments, and AI-generated insights for the top 50 US stocks updated daily.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-4">
                  <Rocket className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Startup Analysis</CardTitle>
                <CardDescription>
                  Evaluate early-stage companies and startups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  Input your own startup data to get comprehensive analysis including founder assessment and growth predictions.
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
                  Our risk-to-reward meter helps investors quickly assess if an investment's potential reward justifies the associated risks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Stock Analysis Section */}
      <section id="samples-section" className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4">Featured Stocks</Badge>
              <h2 className="text-3xl font-bold mb-2">Stock Analysis Reports</h2>
              <p className="text-slate-600 dark:text-slate-400">
                View AI-generated analysis for top US stocks with real-time market data.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSamples.map((sample) => (
                <Card key={sample.id} className="hover:shadow-md transition-all group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Building2 className="h-3 w-3 mr-1" />
                        {sample.industry || 'Technology'}
                      </Badge>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        sample.investibilityScore > 75 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : sample.investibilityScore > 60 
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {sample.investibilityScore}/100
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{sample.startupName}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {sample.investibilityScore > 75 
                        ? "Strong buy candidate with excellent fundamentals" 
                        : sample.investibilityScore > 60 
                        ? "Hold position with moderate growth potential"
                        : "High risk investment requiring caution"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    <Button asChild className="w-full mt-4 group-hover:bg-primary/90">
                      <Link to={`/analysis/${sample.id}`}>View Analysis</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  View All Stock Analyses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Stock Analysis CTA */}
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Analyze Listed Stocks</CardTitle>
                  <CardDescription>
                    Access AI-powered analysis for top 50 US stocks with real-time market data and investibility scores.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={handleAnalyzeStocks}>
                    Browse Stock Reports
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Startup Analysis CTA */}
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Rocket className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle>Analyze Your Startup</CardTitle>
                  <CardDescription>
                    Have a startup to evaluate? Input your own data for a comprehensive AI-powered analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={handleAnalyzeStartup}>
                    Start Startup Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
