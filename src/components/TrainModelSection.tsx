
import React, { useState, useEffect } from "react";
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
  const [trainingStatus, setTrainingStatus] = useState(() => {
    // Get initial status, but make sure progress is at least 0
    const status = getTrainingStatus();
    return {
      ...status,
      progress: status.progress || 0
    };
  });
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState({
    includeGrowth: true,
    includeValuationIncrease: true,
    includePostInvestmentSuccess: true
  });
  const { toast } = useToast();
  
  // Use the initialData count or get from localStorage if available
  const getDataCount = () => {
    const savedTrainingData = localStorage.getItem('trainingData');
    if (savedTrainingData) {
      try {
        const parsed = JSON.parse(savedTrainingData);
        return parsed.count || initialData.length || 0;
      } catch (e) {
        console.error("Error parsing training data from localStorage", e);
      }
    }
    return initialData.length || 0;
  };
  
  const [dataCount, setDataCount] = useState(getDataCount());
  
  useEffect(() => {
    // Update data count if initialData changes
    setDataCount(getDataCount());
  }, [initialData]);
  
  // Start training the model with a simulated progress
  const handleTrainModel = async () => {
    if (dataCount === 0) {
      toast({
        title: "No Data Available",
        description: "Please provide training data before training the model.",
        variant: "destructive"
      });
      return;
    }
    
    setIsTraining(true);
    setProgress(0);
    
    try {
      // Configure training with data and selected metrics
      const config = {
        data: initialData,
        metrics,
        dataCount
      };
      
      // Start simulated training progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 6) + 1;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 800);
      
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Complete training after progress reaches 100%
      const checkProgress = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(checkProgress);
            completeTraining(config);
            return 100;
          }
          return prev;
        });
      }, 500);
      
    } catch (error) {
      setIsTraining(false);
      toast({
        title: "Training Failed",
        description: error.message || "There was an error training the model",
        variant: "destructive"
      });
    }
  };
  
  const completeTraining = async (config) => {
    try {
      // Simulate successful training result
      const result = await trainAIModel(config);
      
      // Update localStorage to mark model as trained
      localStorage.setItem('modelTrained', JSON.stringify({
        isModelTrained: true,
        timestamp: new Date().toISOString(),
        dataPoints: dataCount
      }));
      
      // Update status
      setTrainingStatus({
        ...getTrainingStatus(),
        isModelTrained: true,
        progress: 100,
        dataPoints: dataCount
      });
      
      setIsTraining(false);
      
      toast({
        title: "Training Complete",
        description: "Your AI model has been successfully trained on " + dataCount + " records.",
      });
      
      // Call the onTrainingComplete callback if provided
      if (onTrainingComplete) {
        onTrainingComplete();
      }
    } catch (error) {
      setIsTraining(false);
      toast({
        title: "Training Failed",
        description: error.message || "There was an error training the model",
        variant: "destructive"
      });
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
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{dataCount} Startup Records</Badge>
              {dataCount > 500 && (
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
          
          {dataCount > 0 && (
            <Alert className="bg-primary/10 border-primary/20">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Your model will be trained on {dataCount} startup records with {Object.values(metrics).filter(Boolean).length} advanced metrics.
              </AlertDescription>
            </Alert>
          )}
          
          {dataCount === 0 && (
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
            disabled={isTraining || dataCount === 0}
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
              <p className="text-sm font-medium">{progress}%</p>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
