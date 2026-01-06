
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RiskToRewardMeter from "@/components/RiskToRewardMeter";
import { BarChart4, Scale, LineChart, ArrowRight, Brain, TrendingUp, Building2, Rocket, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sampleData } from "@/utils/sampleData";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/CompanyLogo";

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
      <section className="relative bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-16 md:py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 animate-fade-in">
              <Badge variant="outline" className="mb-2 py-1.5 px-4 backdrop-blur-sm bg-background/50 border-primary/20 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Live Market Data
                <Sparkles className="h-3 w-3 ml-2 text-primary" />
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                AI-Powered <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">Stock & Startup</span> Analysis
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Investometer analyzes listed stocks using real-time market data and AI-powered insights. Also supports custom startup analysis for investors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90" onClick={handleAnalyzeStocks}>
                  <TrendingUp className="h-4 w-4" />
                  Analyze Stocks
                </Button>
                <Button size="lg" variant="outline" className="gap-2 hover:scale-105 transition-all duration-300 backdrop-blur-sm" onClick={handleAnalyzeStartup}>
                  <Rocket className="h-4 w-4" />
                  Analyze Startup
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-6 pt-6">
                <div className="flex items-center gap-2 group">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Real-Time Stock Data</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Scale className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Risk-Reward Assessment</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              {/* Sample Risk-to-Reward Meter */}
              <RiskToRewardMeter risk={35} reward={75} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Investometer Works</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform combines real-time market data with AI analysis to provide comprehensive investment insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 bg-gradient-to-b from-card to-card/50">
              <CardHeader>
                <div className="mb-4 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-7 w-7 text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardTitle className="text-xl">Stock Analysis</CardTitle>
                <CardDescription className="text-base">
                  Analyze top US stocks with real-time market data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get investibility scores, risk assessments, and AI-generated insights for the top 50 US stocks updated daily.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 bg-gradient-to-b from-card to-card/50">
              <CardHeader>
                <div className="mb-4 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="h-7 w-7 text-accent" />
                  </div>
                  <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardTitle className="text-xl">Startup Analysis</CardTitle>
                <CardDescription className="text-base">
                  Evaluate early-stage companies and startups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Input your own startup data to get comprehensive analysis including founder assessment and growth predictions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 bg-gradient-to-b from-card to-card/50">
              <CardHeader>
                <div className="mb-4 relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Scale className="h-7 w-7 text-green-500" />
                  </div>
                  <div className="absolute inset-0 bg-green-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardTitle className="text-xl">Risk-Reward Balance</CardTitle>
                <CardDescription className="text-base">
                  Understand the balance between potential returns and risks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our risk-to-reward meter helps investors quickly assess if an investment's potential reward justifies the associated risks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Stock Analysis Section */}
      <section id="samples-section" className="py-20 bg-muted/30 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Featured Stocks</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Stock Analysis Reports</h2>
              <p className="text-muted-foreground text-lg">
                View AI-generated analysis for top US stocks with real-time market data.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSamples.map((sample, index) => (
                <Card 
                  key={sample.id} 
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/50 bg-gradient-to-b from-card to-card/80 backdrop-blur-sm overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <CompanyLogo 
                        symbol={sample.id} 
                        companyName={sample.startupName}
                        size="md"
                      />
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
                        sample.investibilityScore > 75 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                          : sample.investibilityScore > 60 
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                      }`}>
                        {sample.investibilityScore}/100
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                        {sample.industry || 'Technology'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">{sample.startupName}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {sample.investibilityScore > 75 
                        ? "Strong buy candidate with excellent fundamentals" 
                        : sample.investibilityScore > 60 
                        ? "Hold position with moderate growth potential"
                        : "High risk investment requiring caution"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Risk Level:</span>
                      <span className={`font-semibold text-sm ${
                        sample.overallRisk < 35 
                          ? 'text-green-600 dark:text-green-400' 
                          : sample.overallRisk < 50 
                          ? 'text-yellow-600 dark:text-yellow-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {sample.overallRisk < 35 ? 'Low' : sample.overallRisk < 50 ? 'Moderate' : 'High'}
                      </span>
                    </div>
                    <Button asChild className="w-full group-hover:bg-primary/90 transition-all">
                      <Link to={`/analysis/${sample.id}`}>
                        View Analysis
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
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
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Stock Analysis CTA */}
              <Card className="group border-2 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-card to-primary/[0.02]">
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Analyze Listed Stocks</CardTitle>
                  <CardDescription className="text-base">
                    Access AI-powered analysis for top 50 US stocks with real-time market data and investibility scores.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full shadow-lg hover:shadow-xl transition-all" onClick={handleAnalyzeStocks}>
                    Browse Stock Reports
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
              
              {/* Startup Analysis CTA */}
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-border/50 bg-gradient-to-br from-card to-accent/[0.02]">
                <CardHeader>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl">Analyze Your Startup</CardTitle>
                  <CardDescription className="text-base">
                    Have a startup to evaluate? Input your own data for a comprehensive AI-powered analysis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full hover:bg-accent/10 transition-all" onClick={handleAnalyzeStartup}>
                    Start Startup Analysis
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
