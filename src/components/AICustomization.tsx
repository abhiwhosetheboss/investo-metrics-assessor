
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, CheckCircle, Settings, SparklesIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getTrainingStatus } from "@/utils/analysisUtils";
import AIModelSelector from "./AIModelSelector";

export default function AICustomization() {
  const [trainingStatus, setTrainingStatus] = useState(getTrainingStatus());
  const modelTrained = trainingStatus.isModelTrained;
  
  // Check training status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrainingStatus(getTrainingStatus());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" /> AI Model Selection
          </CardTitle>
          <CardDescription>
            Select and configure the AI model to be used for your startup analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {modelTrained ? (
            <Alert className="mb-4 bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                AI model is trained on {trainingStatus.dataPoints} data points and ready to use
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mb-4">
              <Settings className="h-4 w-4" />
              <AlertDescription>
                Please train the AI model in the Training Data tab before using it for analyses
              </AlertDescription>
            </Alert>
          )}
          
          <AIModelSelector />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5" /> AI Features
          </CardTitle>
          <CardDescription>
            Configure which AI features to enable
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="investor-match">Investor Match Analysis</Label>
              <p className="text-xs text-muted-foreground">
                Analyze how well startups match your investment criteria
              </p>
            </div>
            <Switch id="investor-match" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="risk-assessment">Advanced Risk Assessment</Label>
              <p className="text-xs text-muted-foreground">
                Detailed risk analysis for various aspects of the startup
              </p>
            </div>
            <Switch id="risk-assessment" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="suggestions">AI-powered Suggestions</Label>
              <p className="text-xs text-muted-foreground">
                Get tailored suggestions for improving startup viability
              </p>
            </div>
            <Switch id="suggestions" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" /> Model Performance
          </CardTitle>
          <CardDescription>
            View and improve AI model performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {modelTrained && (
            <>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Data Points</Label>
                  <Badge variant="outline">{trainingStatus.dataPoints}</Badge>
                </div>
                
                <div className="flex justify-between">
                  <Label>Model Version</Label>
                  <Badge variant="outline">1.0</Badge>
                </div>
                
                <div className="flex justify-between">
                  <Label>Included Metrics</Label>
                  <div className="flex gap-1">
                    {trainingStatus.includedMetrics.map((metric, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  The model improves with more training data. Visit the Training Data tab to add more startup data.
                </p>
              </div>
            </>
          )}
          
          {!modelTrained && (
            <p className="text-muted-foreground text-sm">
              Model has not been trained yet. Go to the Training Data tab to train the model.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            Add Custom Feedback
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
