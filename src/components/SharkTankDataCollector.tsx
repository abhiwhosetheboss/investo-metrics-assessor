import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Loader2, Upload, Database, ArrowDown, Download, RefreshCw } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

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

const usEpisodes: SharkTankEpisode[] = [
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
    id: "st-us-s13e01-1",
    season: 13,
    episode: 1,
    startupName: "Soapen",
    description: "Soap crayon for children",
    ask: "$200,000 for 10% equity",
    valuation: 2000000,
    outcome: "deal",
    investors: ["Daymond John", "Mark Cuban"],
    amount: 200000,
    equity: 15,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s14e02-1",
    season: 14,
    episode: 2,
    startupName: "Collars & Co",
    description: "Dressy collared shirts for comfort",
    ask: "$300,000 for 10% equity",
    valuation: 3000000,
    outcome: "deal",
    investors: ["Mark Cuban"],
    amount: 300000,
    equity: 12,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s12e05-2",
    season: 12,
    episode: 5,
    startupName: "Jada Spices",
    description: "Chicken salt seasoning",
    ask: "$250,000 for 20% equity",
    valuation: 1250000,
    outcome: "no deal",
    investors: [],
    source: "US Shark Tank"
  },
  {
    id: "st-us-s11e10-3",
    season: 11,
    episode: 10,
    startupName: "Beddley Duvet",
    description: "Three-sided zipper duvet cover",
    ask: "$150,000 for 20% equity",
    valuation: 750000,
    outcome: "no deal",
    investors: [],
    source: "US Shark Tank"
  },
  {
    id: "st-us-s10e08-2",
    season: 10,
    episode: 8,
    startupName: "BoomBoom Nasal Inhalers",
    description: "Essential oil nasal inhalers",
    ask: "$300,000 for 10% equity",
    valuation: 3000000,
    outcome: "deal",
    investors: ["Kevin O'Leary"],
    amount: 300000,
    equity: 15,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s9e12-1",
    season: 9,
    episode: 12,
    startupName: "Sunniva Super Coffee",
    description: "Protein coffee drink",
    ask: "$500,000 for 5% equity",
    valuation: 10000000,
    outcome: "no deal",
    investors: [],
    source: "US Shark Tank"
  },
  {
    id: "st-us-s15e01-1",
    season: 15,
    episode: 1,
    startupName: "Pop It Pal",
    description: "Pimple popping toy",
    ask: "$250,000 for 10% equity",
    valuation: 2500000,
    outcome: "deal",
    investors: ["Kevin O'Leary"],
    amount: 250000,
    equity: 10,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s15e03-2",
    season: 15,
    episode: 3,
    startupName: "Dino Don",
    description: "Museum-quality dinosaur replicas",
    ask: "$500,000 for 10% equity",
    valuation: 5000000,
    outcome: "deal",
    investors: ["Mark Cuban"],
    amount: 500000,
    equity: 10,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s16e01-1",
    season: 16,
    episode: 1,
    startupName: "Pretty Rugged",
    description: "Luxury fur blankets",
    ask: "$200,000 for 15% equity",
    valuation: 1333333,
    outcome: "deal",
    investors: ["Lori Greiner"],
    amount: 200000,
    equity: 15,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s16e02-2",
    season: 16,
    episode: 2,
    startupName: "Snactiv",
    description: "Finger chopsticks for snacks",
    ask: "$200,000 for 10% equity",
    valuation: 2000000,
    outcome: "deal",
    investors: ["Kevin O'Leary", "Peter Jones"],
    amount: 200000,
    equity: 10,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s17e01-1",
    season: 17,
    episode: 1,
    startupName: "Deem Bar",
    description: "Sustainable bath and body products",
    ask: "$300,000 for 15% equity",
    valuation: 2000000,
    outcome: "deal",
    investors: ["Barbara Corcoran"],
    amount: 300000, 
    equity: 27,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s17e03-2",
    season: 17,
    episode: 3,
    startupName: "DriftAll",
    description: "Hammock that can attach to any post",
    ask: "$150,000 for 10% equity",
    valuation: 1500000,
    outcome: "no deal",
    investors: [],
    source: "US Shark Tank"
  },
  {
    id: "st-us-s18e01-1",
    season: 18,
    episode: 1,
    startupName: "Bonus Meals",
    description: "Meal service using surplus restaurant food",
    ask: "$150,000 for 10% equity",
    valuation: 1500000,
    outcome: "deal",
    investors: ["Mark Cuban", "Lori Greiner"],
    amount: 150000,
    equity: 20,
    source: "US Shark Tank"
  },
  {
    id: "st-us-s18e02-2",
    season: 18,
    episode: 2,
    startupName: "MountainFlow",
    description: "Plant-based ski wax",
    ask: "$300,000 for 10% equity",
    valuation: 3000000,
    outcome: "deal",
    investors: ["Barbara Corcoran", "Kevin O'Leary"],
    amount: 300000,
    equity: 20,
    source: "US Shark Tank"
  }
];

const indiaEpisodes: SharkTankEpisode[] = [
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
    id: "st-in-s1e05-1",
    season: 1,
    episode: 5,
    startupName: "Peeschute",
    description: "Portable, disposable urination device",
    ask: "₹75 lakh for 15% equity",
    valuation: 50000000,
    outcome: "deal",
    investors: ["Aman Gupta", "Namita Thapar"],
    amount: 7500000,
    equity: 15,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s2e03-2",
    season: 2,
    episode: 3,
    startupName: "Caragreen",
    description: "Eco-friendly tableware made from agricultural waste",
    ask: "₹50 lakh for 5% equity",
    valuation: 100000000,
    outcome: "deal",
    investors: ["Namita Thapar"],
    amount: 5000000,
    equity: 5,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s1e14-3",
    season: 1,
    episode: 14,
    startupName: "Tagz Foods",
    description: "Healthy potato chips",
    ask: "₹70 lakh for 2% equity",
    valuation: 350000000,
    outcome: "deal",
    investors: ["Ashneer Grover"],
    amount: 7000000,
    equity: 2,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s2e01-1",
    season: 2,
    episode: 1,
    startupName: "Hoovu Fresh",
    description: "Fresh flowers with longer shelf life",
    ask: "₹50 lakh for 2% equity",
    valuation: 250000000,
    outcome: "deal",
    investors: ["Vineeta Singh", "Aman Gupta"],
    amount: 5000000,
    equity: 3,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s1e08-2",
    season: 1,
    episode: 8,
    startupName: "Bummer",
    description: "Premium underwear brand",
    ask: "₹75 lakh for 7.5% equity",
    valuation: 100000000,
    outcome: "deal",
    investors: ["Aman Gupta", "Vineeta Singh"],
    amount: 7500000,
    equity: 7.5,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s2e10-1",
    season: 2,
    episode: 10,
    startupName: "The Quirky Naari",
    description: "Customized saree brand",
    ask: "₹35 lakh for 10% equity",
    valuation: 35000000,
    outcome: "no deal",
    investors: [],
    source: "Shark Tank India"
  },
  {
    id: "st-in-s1e12-3",
    season: 1,
    episode: 12,
    startupName: "Rare Planet",
    description: "Handicraft brand supporting artisans",
    ask: "₹65 lakh for 5% equity",
    valuation: 130000000,
    outcome: "deal",
    investors: ["Anupam Mittal", "Namita Thapar"],
    amount: 6500000,
    equity: 5,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s3e01-1",
    season: 3,
    episode: 1,
    startupName: "Cocofit",
    description: "Coconut-based health products",
    ask: "₹75 lakh for 5% equity",
    valuation: 150000000,
    outcome: "deal",
    investors: ["Namita Thapar", "Aman Gupta"],
    amount: 7500000,
    equity: 5,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s3e02-2",
    season: 3,
    episode: 2,
    startupName: "Altor",
    description: "Smart helmet with safety features",
    ask: "₹50 lakh for 4% equity",
    valuation: 125000000,
    outcome: "deal",
    investors: ["Anupam Mittal", "Peyush Bansal"],
    amount: 5000000,
    equity: 5,
    source: "Shark Tank India"
  },
  {
    id: "st-in-s3e03-1",
    season: 3,
    episode: 3,
    startupName: "Custkart",
    description: "Custom merchandising platform",
    ask: "₹30 lakh for 3% equity",
    valuation: 100000000,
    outcome: "no deal",
    investors: [],
    source: "Shark Tank India"
  },
  {
    id: "st-in-s3e04-1",
    season: 3,
    episode: 4,
    startupName: "Zoff",
    description: "Stain removing spray",
    ask: "₹40 lakh for 4% equity",
    valuation: 100000000,
    outcome: "deal",
    investors: ["Namita Thapar"],
    amount: 4000000,
    equity: 6,
    source: "Shark Tank India"
  }
];

const australiaEpisodes: SharkTankEpisode[] = [
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
  },
  {
    id: "st-au-s4e02-1",
    season: 4,
    episode: 2,
    startupName: "GroundSwell",
    description: "Surfing wave prediction technology",
    ask: "$300,000 for 10% equity",
    valuation: 3000000,
    outcome: "no deal",
    investors: [],
    source: "Shark Tank Australia"
  },
  {
    id: "st-au-s2e06-3",
    season: 2,
    episode: 6,
    startupName: "Car Next Door",
    description: "Car sharing platform",
    ask: "$300,000 for 7% equity",
    valuation: 4285714,
    outcome: "deal",
    investors: ["Steve Baxter"],
    amount: 300000,
    equity: 10,
    source: "Shark Tank Australia"
  },
  {
    id: "st-au-s4e03-1",
    season: 4,
    episode: 3,
    startupName: "Be Fit Food",
    description: "Doctor-designed weight loss meals",
    ask: "$300,000 for 20% equity",
    valuation: 1500000,
    outcome: "deal",
    investors: ["Janine Allis"],
    amount: 300000,
    equity: 20,
    source: "Shark Tank Australia"
  },
  {
    id: "st-au-s4e04-2",
    season: 4,
    episode: 4,
    startupName: "Sonsee Woman",
    description: "Plus-size pantyhose",
    ask: "$80,000 for 20% equity",
    valuation: 400000,
    outcome: "deal",
    investors: ["Naomi Simson"],
    amount: 80000,
    equity: 20,
    source: "Shark Tank Australia"
  },
  {
    id: "st-au-s4e05-1",
    season: 4,
    episode: 5,
    startupName: "Tiddlers",
    description: "Swim training aid for kids",
    ask: "$150,000 for 20% equity",
    valuation: 750000,
    outcome: "no deal",
    investors: [],
    source: "Shark Tank Australia"
  }
];

const ukEpisodes: SharkTankEpisode[] = [
  {
    id: "st-uk-s18e12-1",
    season: 18,
    episode: 12,
    startupName: "Tangle Teezer",
    description: "Detangling hairbrush",
    ask: "£80,000 for 15% equity",
    valuation: 533333,
    outcome: "no deal",
    investors: [],
    source: "Dragons' Den UK"
  },
  {
    id: "st-uk-s16e05-2",
    season: 16,
    episode: 5,
    startupName: "Skinny Tan",
    description: "Self-tanning cosmetics",
    ask: "£60,000 for 10% equity",
    valuation: 600000,
    outcome: "deal",
    investors: ["Kelly Hoppen", "Piers Linney"],
    amount: 60000,
    equity: 10,
    source: "Dragons' Den UK"
  },
  {
    id: "st-uk-s14e08-1",
    season: 14,
    episode: 8,
    startupName: "Levi Roots Reggae Reggae Sauce",
    description: "Caribbean sauce and food brand",
    ask: "£50,000 for 20% equity",
    valuation: 250000,
    outcome: "deal",
    investors: ["Peter Jones", "Richard Farleigh"],
    amount: 50000,
    equity: 40,
    source: "Dragons' Den UK"
  },
  {
    id: "st-uk-s19e01-1",
    season: 19,
    episode: 1,
    startupName: "Revival Shots",
    description: "Effervescent vitamin sachets",
    ask: "£60,000 for 5% equity",
    valuation: 1200000,
    outcome: "deal",
    investors: ["Tej Lalvani", "Peter Jones"],
    amount: 60000,
    equity: 10,
    source: "Dragons' Den UK"
  },
  {
    id: "st-uk-s19e02-2",
    season: 19,
    episode: 2,
    startupName: "Mak Tok",
    description: "Authentic Malaysian chili paste",
    ask: "£50,000 for 20% equity",
    valuation: 250000,
    outcome: "deal",
    investors: ["Sara Davies"],
    amount: 50000,
    equity: 33.3,
    source: "Dragons' Den UK"
  },
  {
    id: "st-uk-s19e03-1",
    season: 19,
    episode: 3,
    startupName: "PipeSnug",
    description: "Pipe sealing solution",
    ask: "£100,000 for 10% equity",
    valuation: 1000000,
    outcome: "deal",
    investors: ["Deborah Meaden", "Touker Suleyman"],
    amount: 100000,
    equity: 30,
    source: "Dragons' Den UK"
  }
];

const sampleEpisodes: SharkTankEpisode[] = [
  ...usEpisodes,
  ...indiaEpisodes,
  ...australiaEpisodes,
  ...ukEpisodes
];

const regionData = {
  US: usEpisodes,
  India: indiaEpisodes,
  Australia: australiaEpisodes,
  UK: ukEpisodes,
  All: sampleEpisodes
};

interface SharkTankDataCollectorProps {
  onDataCollected: (episodes: SharkTankEpisode[]) => void;
  className?: string;
}

const SharkTankDataCollector = ({ onDataCollected, className }: SharkTankDataCollectorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [collectedData, setCollectedData] = useState<SharkTankEpisode[]>([]);
  const [source, setSource] = useState<string>("All");
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

    const dataStr = JSON.stringify(collectedData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shark-tank-data-${source.toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
    
    toast({
      title: "Data Exported Successfully",
      description: `Exported ${collectedData.length} Shark Tank episodes.`,
    });
  };

  const tableSummary = collectedData.length > 0 ? (
    <DataTable
      data={collectedData}
      columns={[
        { key: "startupName", header: "Startup" },
        { key: "source", header: "Source" },
        { key: "season", header: "Season" },
        { key: "episode", header: "Episode" },
        { 
          key: "outcome", 
          header: "Outcome",
          render: (row) => (
            <Badge variant={row.outcome === "deal" ? "default" : "secondary"}>
              {row.outcome === "deal" ? "Deal" : "No Deal"}
            </Badge>
          )
        },
        { key: "ask", header: "Ask" }
      ]}
      searchable={true}
      searchKeys={["startupName", "description"]}
      className="max-h-[400px] overflow-auto"
    />
  ) : null;

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
              <SelectItem value="All">All Episodes ({sampleEpisodes.length})</SelectItem>
              <SelectItem value="US">Shark Tank US ({usEpisodes.length})</SelectItem>
              <SelectItem value="India">Shark Tank India ({indiaEpisodes.length})</SelectItem>
              <SelectItem value="Australia">Shark Tank Australia ({australiaEpisodes.length})</SelectItem>
              <SelectItem value="UK">Dragons' Den UK ({ukEpisodes.length})</SelectItem>
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
                  Import {source === "All" ? "All" : source} Shark Tank Data
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
            <div className="bg-muted p-2 flex justify-between items-center">
              <div className="font-medium text-sm">
                Collected Episodes ({collectedData.length})
              </div>
              <Button size="sm" variant="ghost" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
            <div className="p-2">
              {tableSummary}
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
        <div className="flex gap-2">
          {collectedData.length > 0 && (
            <Button size="sm" variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          )}
          {source !== "custom" && (
            <Button size="sm" variant="outline" onClick={handleImportSample}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SharkTankDataCollector;
