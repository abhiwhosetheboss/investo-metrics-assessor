
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, BarChart4, Scale, LineChart, Target, Users } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">About Investometer</h1>
        <p className="text-xl text-muted-foreground">
          The data-driven approach to startup investment decisions
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              Making investment decisions more transparent and data-driven
            </CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Investometer was created to bring data-driven clarity to the often intuition-based 
              world of startup investments. We combine quantitative metrics with qualitative 
              assessments to provide a comprehensive view of a startup's potential.
            </p>
            <p>
              Our platform serves investors of all sizes - from angel investors to venture capital 
              firms - who want to make more informed decisions based on historical patterns of 
              success and failure.
            </p>
            <p>
              For founders, Investometer provides valuable insight into how investors might 
              evaluate their startup, helping them identify areas of strength and opportunities 
              for improvement before they pitch.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">How Investometer Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our models are trained on thousands of historical startup pitches and outcomes
                to identify patterns that lead to success or failure.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <BarChart4 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Comprehensive Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We evaluate startups across multiple dimensions, from financials and
                market fit to team dynamics and founder capabilities.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Risk-Reward Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform helps investors understand the balance between potential
                returns and the various risk factors unique to each startup.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Continuous Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Investometer platform continuously improves as new startup
                outcomes are added to our database of success and failure patterns.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Actionable Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Beyond raw scores, we provide specific recommendations for
                both investors and founders to improve outcomes.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="space-y-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Human + AI Collaboration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We combine the pattern-recognition power of AI with the human
                expertise needed for nuanced investment decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Start Making Better Investment Decisions</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of investors who use Investometer to evaluate startups more effectively.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Investometer Today
        </a>
      </div>
    </div>
  );
};

export default About;
