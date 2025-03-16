
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Cpu, Gauge } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AICustomization() {
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4");
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(70);
  const [enableAdvancedAnalytics, setEnableAdvancedAnalytics] = useState<boolean>(false);
  
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    localStorage.setItem("selectedAIModel", JSON.stringify({
      name: value,
      provider: value.includes("gpt") ? "OpenAI" : value.includes("gemini") ? "Google" : "Custom"
    }));
  };
  
  const handleSaveSettings = () => {
    localStorage.setItem("aiConfidenceThreshold", confidenceThreshold.toString());
    localStorage.setItem("aiAdvancedAnalytics", enableAdvancedAnalytics.toString());
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            AI Model Selection
          </CardTitle>
          <CardDescription>
            Choose which AI model to use for startup analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model-select">Select Model</Label>
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="custom-model">Custom VC Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 pt-2">
            <div className="flex justify-between">
              <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
              <span className="text-sm text-muted-foreground">{confidenceThreshold}%</span>
            </div>
            <Slider 
              id="confidence-threshold"
              min={50} 
              max={95} 
              step={5}
              value={[confidenceThreshold]} 
              onValueChange={(value) => setConfidenceThreshold(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Higher threshold means analysis will be more conservative
            </p>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <Switch 
              id="advanced-analytics" 
              checked={enableAdvancedAnalytics}
              onCheckedChange={setEnableAdvancedAnalytics}
            />
            <Label htmlFor="advanced-analytics">Enable Advanced Analytics</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </CardFooter>
      </Card>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Model Performance</AlertTitle>
        <AlertDescription>
          Different models have different specialties. GPT-4 provides most comprehensive analysis
          while Custom VC Model specializes in early-stage startups.
        </AlertDescription>
      </Alert>
    </div>
  );
}
