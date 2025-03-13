
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, Database, ArrowDown, Download } from "lucide-react";

interface SharkTankEpisode {
  id: string;
  season: number;
  episode: number;
  startupName: string;
  description: string;
  ask: string;
  valuation: number;
  outcome: "deal" | "no deal";
  investors: string[];
  amount?: number;
  equity?: number;
  source: string;
}

// More sample episodes to demonstrate the functionality better
const sampleEpisodes: SharkTankEpisode[] = [
  {
    id: "st-us-s12e01-1",
    season: 12,
    episode: 1,
    startupName: "Liquid Death Mountain Water",
    description: "Canned water with punk marketing",
    ask: "$400,000 for 5% equity",
    valuation: 8000000,
    outcome: "deal",
    investors: ["Mark Cuban"],
    amount: 400000,
    equity: 5,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s11e24-2",
    season: 11,
    episode: 24,
    startupName: "Bite Toothpaste Bits",
    description: "Plastic-free toothpaste tablets",
    ask: "$325,000 for 5% equity",
    valuation: 6500000,
    outcome: "no deal",
    investors: [],
    source: "US Shark Tank"
  },
  {
    id: "st-in-s2e12-1",
    season: 2,
    episode: 12,
    startupName: "Revamp Moto",
    description: "Electric bikes with modular utility",
    ask: "₹1 crore for 1% equity",
    valuation: 100000000,
    outcome: "deal",
    investors: ["Aman Gupta", "Anupam Mittal"],
    amount: 10000000,
    equity: 1.5,
    source: "Shark Tank India"
  },
  {
    id: "st-us-s10e15-1",
    season: 10,
    episode: 15,
    startupName: "Squatty Potty",
    description: "Toilet stool for better posture",
    ask: "$350,000 for 10% equity",
    valuation: 3500000,
    outcome: "deal",
    investors: ["Lori Greiner"],
    amount: 350000,
    equity: 10,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s9e24-3",
    season: 9,
    episode: 24,
    startupName: "Scrub Daddy",
    description: "Texture-changing sponge",
    ask: "$100,000 for 10% equity",
    valuation: 1000000,
    outcome: "deal",
    investors: ["Lori Greiner"],
    amount: 200000,
    equity: 20,
    source: "US Shark Tank"
  },
  {
    id: "st-au-s3e05-2",
    season: 3,
    episode: 5,
    startupName: "Hegs Pegs",
    description: "Innovative clothes pegs with hooks",
    ask: "$100,000 for 10% equity",
    valuation: 1000000,
    outcome: "deal",
    investors: ["Naomi Simson"],
    amount: 100000,
    equity: 15,
    source: "Shark Tank Australia"
  }
];

// Sample episodes by region for more realistic filtering
const regionData = {
  US: sampleEpisodes.filter(ep => ep.source.includes("US")),
  India: sampleEpisodes.filter(ep => ep.source.includes("India")),
  Australia: sampleEpisodes.filter(ep => ep.source.includes("Australia")),
  UK: sampleEpisodes.filter(ep => ep.source.includes("UK"))
};

interface SharkTankDataCollectorProps {
  onDataCollected: (episodes: SharkTankEpisode[]) => void;
  className?: string;
}

const SharkTankDataCollector = ({ onDataCollected, className }: SharkTankDataCollectorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [collectedData, setCollectedData] = useState<SharkTankEpisode[]>([]);
  const [source, setSource] = useState<string>("US");
  const [customData, setCustomData] = useState<string>("");
  const { toast } = useToast();

  const handleImportSample = () => {
    setIsLoading(true);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        // Get the appropriate data based on selected region
        const dataToImport = regionData[source as keyof typeof regionData] || [];
        setCollectedData(dataToImport);
        onDataCollected(dataToImport);
        setIsLoading(false);
        
        toast({
          title: "Data Imported Successfully",
          description: `Imported ${dataToImport.length} Shark Tank episodes for analysis.`,
        });
      }
    }, 200);
  };

  const handleCustomImport = () => {
    try {
      const parsedData = JSON.parse(customData);
      
      if (Array.isArray(parsedData)) {
        setCollectedData(parsedData);
        onDataCollected(parsedData);
        
        toast({
          title: "Custom Data Imported",
          description: `Successfully imported ${parsedData.length} custom entries.`,
        });
      } else {
        throw new Error("Data must be an array");
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Please check your JSON format and try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportData = () => {
    if (collectedData.length === 0) {
      toast({
        title: "Export Failed",
        description: "No data available to export.",
        variant: "destructive",
      });
      return;
    }

    // Create a blob from the data
    const dataStr = JSON.stringify(collectedData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    
    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shark-tank-data-${source.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Data Exported Successfully",
      description: `Exported ${collectedData.length} Shark Tank episodes.`,
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Shark Tank Data Collection</CardTitle>
        <CardDescription>Import data from Shark Tank episodes to train the AI model</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Data Source Selection</label>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger>
              <SelectValue placeholder="Select Data Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">Shark Tank US</SelectItem>
              <SelectItem value="India">Shark Tank India</SelectItem>
              <SelectItem value="Australia">Shark Tank Australia</SelectItem>
              <SelectItem value="UK">Dragons' Den UK</SelectItem>
              <SelectItem value="custom">Custom Data</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {source === "custom" ? (
          <div className="space-y-2">
            <label className="text-sm font-medium">Custom JSON Data</label>
            <Textarea
              value={customData}
              onChange={(e) => setCustomData(e.target.value)}
              placeholder='[{"id": "custom-1", "season": 1, "episode": 1, "startupName": "Example", ...}]'
              className="min-h-32"
            />
            <Button onClick={handleCustomImport} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Import Custom Data
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={handleImportSample}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Import {source} Shark Tank Data
                </>
              )}
            </Button>
            
            {isLoading && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Downloading episode data...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        )}

        {collectedData.length > 0 && (
          <div className="border rounded-md overflow-hidden mt-4">
            <div className="bg-muted p-2 font-medium text-sm">
              Collected Episodes ({collectedData.length})
            </div>
            <div className="max-h-60 overflow-y-auto p-2">
              {collectedData.map((episode) => (
                <div key={episode.id} className="py-2 border-b last:border-0">
                  <div className="flex justify-between">
                    <div className="font-medium">{episode.startupName}</div>
                    <div className="text-sm text-muted-foreground">
                      S{episode.season}E{episode.episode}
                    </div>
                  </div>
                  <div className="text-sm">{episode.description}</div>
                  <div className="text-sm flex justify-between mt-1">
                    <span>Ask: {episode.ask}</span>
                    <span className={episode.outcome === "deal" ? "text-green-600" : "text-red-600"}>
                      {episode.outcome === "deal" ? "Deal" : "No Deal"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {collectedData.length > 0
            ? `${collectedData.length} episodes will be used for AI training`
            : "No data collected yet"}
        </div>
        {collectedData.length > 0 && (
          <Button size="sm" variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SharkTankDataCollector;
