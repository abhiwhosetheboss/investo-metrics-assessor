
import { ArrowRight, BarChart3, LineChart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const features = [
  "AI-powered investment analysis",
  "Quantitative & qualitative metrics",
  "Risk assessment & scoring",
  "Custom improvement strategies"
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="pt-28 pb-16 md:pt-32 md:pb-24 max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center space-y-6">
        <div className={cn(
          "inline-flex items-center px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-sm text-slate-600 dark:text-slate-400 transition-all duration-500 mb-4",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Powered by advanced AI analytics
        </div>
        
        <h1 className={cn(
          "text-4xl md:text-6xl font-semibold tracking-tight leading-tight md:leading-tight max-w-3xl mx-auto transition-all duration-700 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Evaluate startup investments with <span className="text-primary relative inline-block">
            precision
            <span className="absolute bottom-2 left-0 w-full h-2 bg-primary/10 rounded-full -z-10"></span>
          </span>
        </h1>
        
        <p className={cn(
          "text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          Investometer helps investors make data-driven decisions by analyzing both the numbers and the intangibles that make startups successful.
        </p>
        
        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 transition-all duration-700 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button asChild className="rounded-full px-8 py-6 text-md font-medium group">
            <Link to="/dashboard">
              Start Analysis
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full px-8 py-6 text-md font-medium">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mt-8 transition-all duration-700 delay-400",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {features.map((feature, i) => (
            <div key={i} className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full text-sm">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className={cn(
        "mt-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm transition-all duration-700 delay-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 dark:to-background/80 z-10"></div>
          <div className="flex justify-center items-center py-16 px-4 md:px-8 bg-slate-50 dark:bg-slate-900/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <div className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Investibility Score</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Comprehensive analysis of startup potential</p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Risk Assessment</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Detailed risk evaluation and mitigation</p>
              </div>
              
              <div className="flex flex-col items-center p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Improvement Strategy</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center">Actionable insights for growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
