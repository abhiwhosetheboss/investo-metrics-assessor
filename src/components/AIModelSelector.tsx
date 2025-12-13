
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, Cpu, ServerCog, Check } from "lucide-react";
import TrainModelSection from "./TrainModelSection";
import AnalysisInputForm from "./AnalysisInputForm";
import { getTrainingStatus } from "@/utils/analysisUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: React.ElementType;
  apiEndpoint?: string;
}

const availableModels: AIModel[] = [
  {
    id: "openai-gpt4",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Advanced model for investment analysis with deep financial knowledge.",
    icon: Brain,
    apiEndpoint: "https://api.openai.com/v1/chat/completions"
  },
  {
    id: "huggingface-finbert",
    name: "FinBERT",
    provider: "Hugging Face",
    description: "Financial domain-specific BERT model trained on financial text.",
    icon: ServerCog,
    apiEndpoint: "https://api-inference.huggingface.co/models/ProsusAI/finbert"
  },
  {
    id: "local-tensorflow",
    name: "Custom TensorFlow.js",
    provider: "Local",
    description: "Browser-based machine learning model trained on Shark Tank data.",
    icon: Cpu
  }
];

interface AIModelSelectorProps {
  onModelSelect: (model: AIModel) => void;
  className?: string;
}

const AIModelSelector = ({ onModelSelect, className }: AIModelSelectorProps) => {
  const [selectedModelId, setSelectedModelId] = useState<string>("openai-gpt4");
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("select");
  const [isModelTrained, setIsModelTrained] = useState<boolean>(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Check for previously saved model on component mount
  useEffect(() => {
    const savedModel = localStorage.getItem("selectedAIModel");
    if (savedModel) {
      try {
        const model = JSON.parse(savedModel);
        setSelectedModelId(model.id);
        setIsActivated(true);
        // Also notify parent component
        const foundModel = availableModels.find(m => m.id === model.id);
        if (foundModel) {
          onModelSelect(foundModel);
        }
      } catch (e) {
        console.error("Failed to parse saved model", e);
      }
    }
    
    // Check if model is trained
    const trainStatus = getTrainingStatus();
    setIsModelTrained(trainStatus.isModelTrained);
  }, [onModelSelect]);

  const handleModelChange = (value: string) => {
    setSelectedModelId(value);
    // Reset activation state when a new model is selected, unless it's the currently active model
    const savedModel = localStorage.getItem("selectedAIModel");
    if (savedModel) {
      try {
        const model = JSON.parse(savedModel);
        if (model.id === value) {
          setIsActivated(true);
          return;
        }
      } catch (e) {
        console.error("Failed to parse saved model", e);
      }
    }
    setIsActivated(false);
  };

  const handleConfirm = () => {
    const model = availableModels.find(m => m.id === selectedModelId);
    if (model) {
      // Save to localStorage
      localStorage.setItem("selectedAIModel", JSON.stringify(model));
      
      // Notify parent component
      onModelSelect(model);
      
      // Update UI state
      setIsActivated(true);
      
      toast({
        title: "AI Model Selected",
        description: `Now using ${model.name} by ${model.provider} for analysis.`,
      });
      
      // If we're on mobile, just confirm and don't change tabs
      if (!isMobile) {
        // If model is trained, move to the analysis tab
        if (isModelTrained) {
          setActiveTab("analyze");
        } else {
          // Otherwise, move to the training tab
          setActiveTab("train");
        }
      }
    }
  };

  // Navigate to dashboard training section
  const goToTraining = () => {
    navigate('/dashboard');
    // Use localStorage to indicate we want the "data" tab open
    localStorage.setItem('dashboardTab', 'data');
  };

  // For mobile, show the model selection and training options
  if (isMobile) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Select AI Model</CardTitle>
          <CardDescription>Choose an AI model for startup analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedModelId}
            onValueChange={handleModelChange}
            className="space-y-4"
          >
            {availableModels.map((model) => {
              const Icon = model.icon;
              const isSelected = selectedModelId === model.id;
              return (
                <div
                  key={model.id}
                  className={`flex items-start space-x-3 border rounded-lg p-3 transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted-foreground/20"
                  }`}
                >
                  <RadioGroupItem
                    value={model.id}
                    id={`mobile-${model.id}`}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Label
                        htmlFor={`mobile-${model.id}`}
                        className="text-base font-medium cursor-pointer"
                      >
                        {model.name}
                      </Label>
                      <Icon className="ml-2 h-4 w-4 text-muted-foreground" />
                      {isSelected && isActivated && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          <Check className="mr-1 h-3 w-3" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {model.description}
                    </p>
                    <p className="text-xs mt-1 text-muted-foreground/70">
                      Provider: {model.provider}
                    </p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>

          <Button onClick={handleConfirm} className="mt-6 w-full">
            {isActivated && selectedModelId === availableModels.find(m => m.id === selectedModelId)?.id 
              ? "Update Model Selection" 
              : "Use Selected Model"}
          </Button>
          
          {isActivated && (
            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded-md bg-muted/20">
                <h3 className="text-sm font-medium mb-2">Model Status: {isModelTrained ? "Trained" : "Not Trained"}</h3>
                {!isModelTrained && (
                  <p className="text-sm text-muted-foreground mb-3">
                    Your model needs to be trained before you can analyze startups.
                  </p>
                )}
                <Button 
                  variant={isModelTrained ? "outline" : "default"}
                  className="w-full"
                  onClick={goToTraining}
                >
                  {isModelTrained ? "Retrain Model" : "Train Model Now"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Desktop version with tabs
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>AI-Powered Analysis</CardTitle>
        <CardDescription>Select, train, and use an AI model for startup analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="select">1. Select Model</TabsTrigger>
            <TabsTrigger value="train" disabled={!isActivated}>
              2. Train Model
            </TabsTrigger>
            <TabsTrigger value="analyze" disabled={!isActivated || !isModelTrained}>
              3. Analyze
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="select">
            <RadioGroup
              value={selectedModelId}
              onValueChange={handleModelChange}
              className="space-y-4"
            >
              {availableModels.map((model) => {
                const Icon = model.icon;
                const isSelected = selectedModelId === model.id;
                return (
                  <div
                    key={model.id}
                    className={`flex items-start space-x-3 border rounded-lg p-3 transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground/20"
                    }`}
                  >
                    <RadioGroupItem
                      value={model.id}
                      id={model.id}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Label
                          htmlFor={model.id}
                          className="text-base font-medium cursor-pointer"
                        >
                          {model.name}
                        </Label>
                        <Icon className="ml-2 h-4 w-4 text-muted-foreground" />
                        {isSelected && isActivated && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {model.description}
                      </p>
                      <p className="text-xs mt-1 text-muted-foreground/70">
                        Provider: {model.provider}
                      </p>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>

            <Button onClick={handleConfirm} className="mt-6 w-full">
              {isActivated && selectedModelId ? "Update Model Selection" : "Use Selected Model"}
            </Button>
          </TabsContent>
          
          <TabsContent value="train">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Train Your Model</h3>
              <p className="text-muted-foreground mb-4">
                Go to the Dashboard and select the Training Data tab to train your model on Shark Tank data.
              </p>
              <Button onClick={goToTraining}>
                Go to Dashboard
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="analyze">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Model Ready for Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Your model is trained and ready to analyze startup data. Fill out the form to get started.
              </p>
              <div className="flex items-center justify-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-green-600 font-medium">Ready for analysis</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm text-muted-foreground">
          {activeTab === "select" && (
            isActivated ? (
              <div className="flex items-center justify-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Model is active. Proceed to training.
              </div>
            ) : (
              "Select a model and click the button above to activate"
            )
          )}
          
          {activeTab === "train" && (
            isModelTrained ? (
              <div className="flex items-center justify-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Model training complete. Proceed to analysis.
              </div>
            ) : (
              "Train your model on Shark Tank data for better analysis"
            )
          )}
          
          {activeTab === "analyze" && (
            <div className="flex items-center justify-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Your model is ready for startup analysis
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIModelSelector;
