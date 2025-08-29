
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, BarChart4, Scale, LineChart, Target, Users, Heart, Mail, Github, Linkedin } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto py-16 space-y-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <BrainCircuit className="w-4 h-4 mr-2" />
            AI-Powered Investment Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Investometer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The data-driven approach to startup investment decisions, making complex financials accessible through AI
          </p>
        </div>
      
        {/* Meet Abhinav Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-2xl">Meet the Creator</CardTitle>
              <CardDescription className="text-lg">
                The mind behind Investometer
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="max-w-2xl mx-auto">
                <p className="text-lg leading-relaxed text-foreground">
                  Hello :) I'm <span className="font-semibold text-primary">Abhinav</span>, an 18 year old trying to figure out a way to make AI accessible to Angels, Startups and Investors to better quantize the numbers and financials of a Company. Feel free to reach out anytime for any suggestions and/or queries
                </p>
              </div>
              <div className="flex justify-center space-x-4 pt-4">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-elegant border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
              <CardDescription className="text-lg">
                Making investment decisions more transparent and data-driven
              </CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none space-y-4">
              <p className="text-lg leading-relaxed">
                Investometer was created to bring data-driven clarity to the often intuition-based 
                world of startup investments. We combine quantitative metrics with qualitative 
                assessments to provide a comprehensive view of a startup's potential.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform serves investors of all sizes - from angel investors to venture capital 
                firms - who want to make more informed decisions based on historical patterns of 
                success and failure.
              </p>
              <p className="text-lg leading-relaxed">
                For founders, Investometer provides valuable insight into how investors might 
                evaluate their startup, helping them identify areas of strength and opportunities 
                for improvement before they pitch.
              </p>
            </CardContent>
          </Card>
        </div>
      
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How Investometer Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful features that make investment analysis more accurate and accessible
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-glow transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <BrainCircuit className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our models are trained on thousands of historical startup pitches and outcomes
                  to identify patterns that lead to success or failure.
                </p>
              </CardContent>
            </Card>
          
            <Card className="group hover:shadow-glow transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <BarChart4 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">Comprehensive Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We evaluate startups across multiple dimensions, from financials and
                  market fit to team dynamics and founder capabilities.
                </p>
              </CardContent>
            </Card>
          
            <Card className="group hover:shadow-glow transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">Risk-Reward Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform helps investors understand the balance between potential
                  returns and the various risk factors unique to each startup.
                </p>
              </CardContent>
            </Card>
          
            <Card className="group hover:shadow-glow transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <LineChart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">Continuous Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  The Investometer platform continuously improves as new startup
                  outcomes are added to our database of success and failure patterns.
                </p>
              </CardContent>
            </Card>
          
            <Card className="group hover:shadow-glow transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">Actionable Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond raw scores, we provide specific recommendations for
                  both investors and founders to improve outcomes.
                </p>
              </CardContent>
            </Card>
          
            <Card className="group hover:shadow-glow transition-all duration-300 border-primary/10 hover:border-primary/30">
              <CardHeader className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">Human + AI Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We combine the pattern-recognition power of AI with the human
                  expertise needed for nuanced investment decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      
        <div className="max-w-4xl mx-auto text-center py-16">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-elegant">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Start Making Better Investment Decisions
              </h2>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
                Join thousands of investors who use Investometer to evaluate startups more effectively and make data-driven investment decisions.
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-glow transition-all duration-300"
              >
                <a href="/">
                  Try Investometer Today
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
