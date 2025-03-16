
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Database, BarChart2, TrendingUp, FileCheck, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { trainAIModel, getTrainingStatus } from "@/utils/analysisUtils";
import { useToast } from "@/components/ui/use-toast";

export default function TrainingData() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [trainingData, setTrainingData] = useState<any[]>([]);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingProgress, setTrainingProgress] = useState<number>(0);
  const [includeMetrics, setIncludeMetrics] = useState({
    includeGrowth: true,
    includeValuationIncrease: true,
    includePostInvestmentSuccess: false
  });
  
  // Check saved training status
  React.useEffect(() => {
    const status = getTrainingStatus();
    if (status.isModelTrained) {
      setTrainingProgress(100);
    } else if (status.isTraining) {
      setIsTraining(true);
      setTrainingProgress(status.progress);
      
      // Poll for updates if training is in progress
      const interval = setInterval(() => {
        const updatedStatus = getTrainingStatus();
        setTrainingProgress(updatedStatus.progress);
        
        if (!updatedStatus.isTraining) {
          setIsTraining(false);
          clearInterval(interval);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate file reading and processing
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        // Try to parse as JSON
        const data = JSON.parse(event.target?.result as string);
        
        // Validate data format (simplified validation)
        if (Array.isArray(data) && data.length > 0) {
          setTrainingData(data);
          toast({
            title: "Data uploaded successfully",
            description: `${data.length} startup records loaded for training`,
          });
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Invalid data format",
          description: "Please upload a valid JSON file with startup data",
        });
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Error reading file",
        description: "Please try again with a different file",
      });
      setIsUploading(false);
    };
    
    reader.readAsText(file);
  };
  
  const handleTrainModel = async () => {
    if (trainingData.length === 0) {
      // Use sample data if no data uploaded
      setTrainingData(Array(50).fill(0).map((_, i) => ({ 
        id: i.toString(),
        name: `Sample Startup ${i}`,
        data: { /* sample data structure */ }
      })));
    }
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    try {
      const result = await trainAIModel({
        data: trainingData.length > 0 ? trainingData : Array(50).fill(0), 
        metrics: includeMetrics
      });
      
      if (result.success) {
        toast({
          title: "Model trained successfully",
          description: result.message,
        });
        setTrainingProgress(100);
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Training failed",
        description: error.message || "An error occurred during training",
      });
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Training Data
          </CardTitle>
          <CardDescription>
            Upload historical startup data to train the AI model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="data-file">Upload Data (CSV or JSON)</Label>
              <input
                id="data-file"
                type="file"
                accept=".json,.csv"
                onChange={handleFileUpload}
                disabled={isUploading || isTraining}
                className="rounded-md border border-input px-3 py-2"
              />
              <p className="text-xs text-muted-foreground">
                {trainingData.length > 0 
                  ? `${trainingData.length} records ready for training`
                  : "No data uploaded. Sample data will be used if you train the model."}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Advanced Metrics to Include</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="growth-metrics" 
                    checked={includeMetrics.includeGrowth}
                    onCheckedChange={(checked) => 
                      setIncludeMetrics({...includeMetrics, includeGrowth: !!checked})
                    }
                  />
                  <Label htmlFor="growth-metrics">Post-Investment Growth Rate</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="valuation-metrics" 
                    checked={includeMetrics.includeValuationIncrease}
                    onCheckedChange={(checked) => 
                      setIncludeMetrics({...includeMetrics, includeValuationIncrease: !!checked})
                    }
                  />
                  <Label htmlFor="valuation-metrics">Valuation Increase</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="success-metrics" 
                    checked={includeMetrics.includePostInvestmentSuccess}
                    onCheckedChange={(checked) => 
                      setIncludeMetrics({...includeMetrics, includePostInvestmentSuccess: !!checked})
                    }
                  />
                  <Label htmlFor="success-metrics">Success Probability</Label>
                </div>
              </div>
            </div>
          </div>
          
          {trainingProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Training Progress</Label>
                <span className="text-sm text-muted-foreground">{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleTrainModel}
            disabled={isTraining}
          >
            {isTraining ? "Training..." : trainingProgress === 100 ? "Retrain Model" : "Train Model"}
          </Button>
          
          {trainingProgress === 100 && (
            <div className="flex items-center text-sm text-muted-foreground">
              <FileCheck className="h-4 w-4 mr-1 text-green-500" />
              Model trained successfully
            </div>
          )}
        </CardFooter>
      </Card>
      
      {trainingProgress === 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Model Not Trained</AlertTitle>
          <AlertDescription>
            You need to train the model before performing startup analyses to get the most accurate results.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
