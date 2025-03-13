
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu, ServerCog } from "lucide-react";

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
  const { toast } = useToast();

  const handleModelChange = (value: string) => {
    setSelectedModelId(value);
  };

  const handleConfirm = () => {
    const model = availableModels.find(m => m.id === selectedModelId);
    if (model) {
      onModelSelect(model);
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
            return (
              <div
                key={model.id}
                className={`flex items-start space-x-3 border rounded-lg p-3 transition-colors ${
                  selectedModelId === model.id
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
          Use Selected Model
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIModelSelector;
