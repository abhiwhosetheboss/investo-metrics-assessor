
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Info, Brain, AlarmClock, BarChart4 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { trainAIModel, getTrainingStatus } from "@/utils/analysisUtils";

interface TrainModelSectionProps {
  initialData?: any[];
  onTrainingComplete?: () => void;
}

export default function TrainModelSection({ initialData = [], onTrainingComplete }: TrainModelSectionProps) {
  const [trainingStatus, setTrainingStatus] = useState(getTrainingStatus());
  const [isTraining, setIsTraining] = useState(false);
  const [metrics, setMetrics] = useState({
    includeGrowth: true,
    includeValuationIncrease: true,
    includePostInvestmentSuccess: true
  });
  const { toast } = useToast();
  
  // Start training the model
  const handleTrainModel = async () => {
    if (initialData.length === 0) {
      toast({
        title: "No Data Available",
        description: "Please provide training data before training the model.",
        variant: "destructive"
      });
      return;
    }
    
    setIsTraining(true);
    
    try {
      // Configure training with data and selected metrics
      const config = {
        data: initialData,
        metrics
      };
      
      // Start training
      const result = await trainAIModel(config);
      
      toast({
        title: "Training Complete",
        description: result.message,
      });
      
      // Update status
      setTrainingStatus(getTrainingStatus());
      
      // Call the onTrainingComplete callback if provided
      if (onTrainingComplete) {
        onTrainingComplete();
      }
    } catch (error) {
      toast({
        title: "Training Failed",
        description: error.message || "There was an error training the model",
        variant: "destructive"
      });
    } finally {
      setIsTraining(false);
    }
  };
  
  // Toggle advanced metrics
  const handleMetricToggle = (metricName, checked) => {
    setMetrics(prev => ({
      ...prev,
      [metricName]: checked
    }));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" /> Train AI Model
          </CardTitle>
          <CardDescription>
            Train your AI model on startup investment data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Training Data</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{initialData.length || 0} Startup Records</Badge>
              {initialData.length > 500 && (
                <Badge variant="success">Large Dataset</Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Advanced Metrics</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="includeGrowth">
                    Post-Investment Growth Rate
                  </Label>
                </div>
                <Switch 
                  id="includeGrowth" 
                  checked={metrics.includeGrowth}
                  onCheckedChange={(checked) => handleMetricToggle("includeGrowth", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="includeValuationIncrease">
                    Valuation Increase Prediction
                  </Label>
                </div>
                <Switch 
                  id="includeValuationIncrease" 
                  checked={metrics.includeValuationIncrease}
                  onCheckedChange={(checked) => handleMetricToggle("includeValuationIncrease", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="includePostInvestmentSuccess">
                    Success Probability Estimation
                  </Label>
                </div>
                <Switch 
                  id="includePostInvestmentSuccess" 
                  checked={metrics.includePostInvestmentSuccess}
                  onCheckedChange={(checked) => handleMetricToggle("includePostInvestmentSuccess", checked)}
                />
              </div>
            </div>
          </div>
          
          {initialData.length > 0 && (
            <Alert className="bg-primary/10 border-primary/20">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your model will be trained on {initialData.length} startup records with {Object.values(metrics).filter(Boolean).length} advanced metrics.
              </AlertDescription>
            </Alert>
          )}
          
          {initialData.length === 0 && (
            <Alert>
              <AlertDescription>
                Please select training data before training the model.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleTrainModel}
            disabled={isTraining || initialData.length === 0}
          >
            {isTraining ? "Training..." : "Train Model"}
          </Button>
        </CardFooter>
      </Card>
      
      {isTraining && (
        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Training in progress...</p>
              <p className="text-sm font-medium">{trainingStatus.progress}%</p>
            </div>
            <Progress value={trainingStatus.progress} className="h-2" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
