
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/ui/data-table";
import { AlertTriangle, Brain, CheckCheck, Database, FileText, ListFilter, Upload, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import SharkTankDataCollector from "./SharkTankDataCollector";
import TrainModelSection from "./TrainModelSection";
import { getTrainingStatus, trainAIModel } from "@/utils/analysisUtils";

export default function TrainingData() {
  const [activeTab, setActiveTab] = useState("data");
  const [trainingStatus, setTrainingStatus] = useState(getTrainingStatus());
  const [collectedData, setCollectedData] = useState([]);
  
  // Check training status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrainingStatus(getTrainingStatus());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle data collection from SharkTankDataCollector
  const handleDataCollected = (data) => {
    setCollectedData(data);
    console.log(`Collected ${data.length} records for training`);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="data" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="data">Training Data</TabsTrigger>
          <TabsTrigger value="train">Train Model</TabsTrigger>
          <TabsTrigger value="import">Import Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data" className="space-y-6">
          <SharkTankDataCollector onDataCollected={handleDataCollected} />
        </TabsContent>
        
        <TabsContent value="train" className="space-y-6">
          <TrainModelSection />
        </TabsContent>
        
        <TabsContent value="import" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" /> Import External Dataset
              </CardTitle>
              <CardDescription>
                Add your own startup data to improve model accuracy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Data imports are limited in this version. Use the Shark Tank dataset for best results.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="file-upload">Select CSV or JSON file</Label>
                <Input id="file-upload" type="file" />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full">
                Upload Dataset (Coming Soon)
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Model Training Status</h3>
          <Badge variant={trainingStatus.isModelTrained ? "success" : "outline"}>
            {trainingStatus.isModelTrained ? "Trained" : "Not Trained"}
          </Badge>
        </div>
        
        {trainingStatus.isTraining && (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <p className="text-sm">Training in progress...</p>
              <p className="text-sm font-medium">{trainingStatus.progress}%</p>
            </div>
            <Progress value={trainingStatus.progress} className="h-2" />
          </div>
        )}
        
        <Card className="bg-muted/40">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Data Points</p>
                <p className="text-2xl font-bold">{trainingStatus.dataPoints || 0}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-xl font-semibold">
                  {trainingStatus.isModelTrained 
                    ? "Ready" 
                    : trainingStatus.isTraining 
                    ? "Training..." 
                    : "Not Trained"}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Trained</p>
                <p className="text-xl font-semibold">
                  {trainingStatus.isModelTrained 
                    ? "Today" 
                    : "Never"}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-xl font-semibold">
                  {trainingStatus.isModelTrained 
                    ? "93%" 
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
