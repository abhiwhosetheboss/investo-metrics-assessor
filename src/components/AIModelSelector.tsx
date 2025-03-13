
import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Brain, Cpu, ServerCog, Check } from "lucide-react";

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
  const { toast } = useToast();

  // Check for previously saved model on component mount
  useEffect(() => {
    const savedModel = localStorage.getItem("selectedAIModel");
    if (savedModel) {
      try {
        const model = JSON.parse(savedModel);
        setSelectedModelId(model.id);
        setIsActivated(true);
      } catch (e) {
        console.error("Failed to parse saved model", e);
      }
    }
  }, []);

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
      onModelSelect(model);
      setIsActivated(true);
      console.log("Selected model:", model);
      
      toast({
        title: "AI Model Selected",
        description: `Now using ${model.name} by ${model.provider} for analysis.`,
      });
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Select AI Model</CardTitle>
        <CardDescription>Choose which AI model to use for startup analysis</CardDescription>
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
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm text-muted-foreground">
          {isActivated ? (
            <div className="flex items-center justify-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              Model is active and ready for analysis
            </div>
          ) : (
            "Select a model and click the button above to activate"
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIModelSelector;
