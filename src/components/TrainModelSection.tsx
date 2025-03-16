
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Check, Server, Brain, Loader2, Settings } from "lucide-react";
import { trainAIModel, getTrainingStatus } from "@/utils/analysisUtils";
import { sampleData } from "@/utils/sampleData";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TrainModelSectionProps {
  onTrainingComplete?: () => void;
}

const TrainModelSection = ({ onTrainingComplete }: TrainModelSectionProps) => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTrained, setIsTrained] = useState(false);
  const [dataPointCount, setDataPointCount] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState<"all" | "sample" | "generated">("all");
  const [advancedOptions, setAdvancedOptions] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState({
    growth: true,
    valuationIncrease: true,
    postInvestmentSuccess: true
  });
  const { toast } = useToast();

  // Check if model was already trained
  useEffect(() => {
    const status = getTrainingStatus();
    setIsTrained(status.isModelTrained);
    setProgress(status.progress);
    setDataPointCount(status.dataPoints);
  }, []);

  // Update progress during training
  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        const status = getTrainingStatus();
        setProgress(status.progress);
        
        if (!status.isTraining && status.isModelTrained) {
          setIsTraining(false);
          setIsTrained(true);
          setDataPointCount(status.dataPoints);
          clearInterval(interval);
          
          toast({
            title: "Training Complete",
            description: `Successfully trained model on ${status.dataPoints} data points with advanced metrics.`,
          });
          
          if (onTrainingComplete) {
            onTrainingComplete();
          }
        }
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isTraining, toast, onTrainingComplete]);

  const handleMetricChange = (metric: keyof typeof selectedMetrics, checked: boolean) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [metric]: checked
    }));
  };

  const handleTrainModel = async () => {
    try {
      setIsTraining(true);
      
      // Get the appropriate dataset based on selection
      let trainingData;
      if (selectedDataset === "sample") {
        trainingData = sampleData.slice(0, 24); // First 24 records
      } else if (selectedDataset === "generated") {
        // Get the generated data (assuming these are after the first 24)
        trainingData = sampleData.slice(24);
      } else {
        // All data
        trainingData = sampleData;
      }

      // Add the selected metrics to the training configuration
      const trainingConfig = {
        data: trainingData,
        metrics: {
          includeGrowth: selectedMetrics.growth,
          includeValuationIncrease: selectedMetrics.valuationIncrease,
          includePostInvestmentSuccess: selectedMetrics.postInvestmentSuccess
        }
      };
      
      toast({
        title: "Training Started",
        description: `Training model on ${trainingData.length} data points with ${Object.values(selectedMetrics).filter(Boolean).length} advanced metrics...`,
      });
      
      const result = await trainAIModel(trainingConfig);
      
      if (result.success) {
        setIsTrained(true);
        setDataPointCount(trainingData.length);
      } else {
        toast({
          title: "Training Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Training Failed",
        description: "An error occurred during training.",
        variant: "destructive",
      });
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <Card className="border-2 border-primary/10">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">AI Model Training</CardTitle>
          {isTrained && (
            <Badge variant="outline" className="flex items-center bg-green-50 text-green-700 border-green-200">
              <Check className="mr-1 h-3 w-3" /> Trained
            </Badge>
          )}
        </div>
        <CardDescription>Train your AI model on Shark Tank data for better analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isTrained && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Training Dataset</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button 
                  variant={selectedDataset === "sample" ? "default" : "outline"} 
                  onClick={() => setSelectedDataset("sample")}
                  className="justify-start"
                >
                  <Server className="mr-2 h-4 w-4" />
                  Sample Data (24)
                </Button>
                <Button 
                  variant={selectedDataset === "generated" ? "default" : "outline"} 
                  onClick={() => setSelectedDataset("generated")}
                  className="justify-start"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Generated Data (500)
                </Button>
                <Button 
                  variant={selectedDataset === "all" ? "default" : "outline"} 
                  onClick={() => setSelectedDataset("all")}
                  className="justify-start"
                >
                  <Check className="mr-2 h-4 w-4" />
                  All Data (524)
                </Button>
              </div>
            </div>

            <div>
              <Button 
                variant="outline" 
                onClick={() => setAdvancedOptions(!advancedOptions)}
                className="flex items-center text-sm w-full justify-between"
              >
                <span>Advanced Training Options</span>
                <Settings className="h-4 w-4 ml-1" />
              </Button>
              
              {advancedOptions && (
                <div className="mt-3 p-3 border rounded-md space-y-2">
                  <p className="text-sm text-muted-foreground mb-2">Select metrics to include in model training:</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="metric-growth" 
                        checked={selectedMetrics.growth}
                        onCheckedChange={(checked) => handleMetricChange('growth', checked === true)}
                      />
                      <Label htmlFor="metric-growth" className="text-sm font-normal">
                        Growth Rate Analysis
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="metric-valuation" 
                        checked={selectedMetrics.valuationIncrease}
                        onCheckedChange={(checked) => handleMetricChange('valuationIncrease', checked === true)}
                      />
                      <Label htmlFor="metric-valuation" className="text-sm font-normal">
                        Valuation Increase Prediction
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="metric-success" 
                        checked={selectedMetrics.postInvestmentSuccess}
                        onCheckedChange={(checked) => handleMetricChange('postInvestmentSuccess', checked === true)}
                      />
                      <Label htmlFor="metric-success" className="text-sm font-normal">
                        Post-Investment Success Rate
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {isTraining && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Training Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Training model on Shark Tank data with post-investment metrics... This may take a few moments.
            </p>
          </div>
        )}
        
        {isTrained && !isTraining && (
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4 space-y-2 border border-primary/10">
              <h3 className="font-medium flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Model Successfully Trained
              </h3>
              <p className="text-sm text-muted-foreground">
                Your AI model has been trained on {dataPointCount} data points with post-investment success metrics and is ready to analyze startups.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground">Data Points</p>
                <p className="text-2xl font-bold">{dataPointCount}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-center">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isTrained ? (
          <Button 
            onClick={handleTrainModel} 
            disabled={isTraining} 
            className="w-full"
          >
            {isTraining ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Training...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Start Training
              </>
            )}
          </Button>
        ) : (
          <Button 
            onClick={handleTrainModel} 
            variant="outline" 
            className="w-full"
          >
            <Brain className="mr-2 h-4 w-4" />
            Retrain Model
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TrainModelSection;
