import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormSection from "./FormSection";
import InvestorThesis from "./InvestorThesis";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart4, 
  Users, 
  LineChart, 
  UserCog, 
  Building2, 
  DollarSign, 
  Target, 
  HeartPulse,
  Send,
  ClipboardList
} from "lucide-react";

interface StartupFormData {
  // Basic Info
  name: string;
  industry: string;
  description: string;
  foundedYear: string;
  location: string;
  
  // Product-Market Fit
  pmfScore: number;
  customerFeedback: string;
  marketValidation: string;
  targetMarketSize: string;
  
  // Founder-Market Fit
  founderExperience: string;
  educationBackground: string;
  previousStartups: string;
  domainExpertise: number;
  
  // Founder Capabilities
  technicalSkills: number;
  businessSkills: number;
  resilience: number;
  adaptability: number;
  
  // Team Composition
  teamSize: string;
  teamExperience: string;
  teamDynamics: string;
  keyRolesFilled: boolean;
  
  // Financials
  revenue: string;
  growthRate: string;
  valuation: string;
  unitEconomics: string;
  margins: string;
  burnRate: string;
  
  // Exit Strategy
  expectedExitTime: string;
  exitType: string;
  expectedExitValue: string;
  
  // Fundraising
  previousRounds: string;
  investorQuality: string;
  
  // Intangibles
  passionLevel: number;
  leadershipScore: number;
  adaptabilityScore: number;
  pivotAbility: number;
  
  // Emotional Indicators
  investorSentiment: string;
  marketBuzz: string;

  // Investor Thesis
  investorThesis: {
    investmentThesis: string;
    preferredIndustries: string[];
    minRevenue: string;
    maxValuation: string;
    stagePreference: string;
    riskTolerance: number;
    teamImportance: number;
    marketSizePreference: number;
    requiresRevenue: boolean;
  };
}

interface StartupFormProps {
  onSubmit?: (formData: StartupFormData) => void;
}

const defaultFormData: StartupFormData = {
  name: "",
  industry: "",
  description: "",
  foundedYear: new Date().getFullYear().toString(),
  location: "",
  pmfScore: 50,
  customerFeedback: "",
  marketValidation: "",
  targetMarketSize: "",
  founderExperience: "",
  educationBackground: "",
  previousStartups: "",
  domainExpertise: 50,
  technicalSkills: 50,
  businessSkills: 50,
  resilience: 50,
  adaptability: 50,
  teamSize: "",
  teamExperience: "",
  teamDynamics: "",
  keyRolesFilled: false,
  revenue: "",
  growthRate: "",
  valuation: "",
  unitEconomics: "",
  margins: "",
  burnRate: "",
  expectedExitTime: "3-5 years",
  exitType: "acquisition",
  expectedExitValue: "",
  previousRounds: "",
  investorQuality: "",
  passionLevel: 50,
  leadershipScore: 50,
  adaptabilityScore: 50,
  pivotAbility: 50,
  investorSentiment: "neutral",
  marketBuzz: "moderate",
  investorThesis: {
    investmentThesis: "",
    preferredIndustries: [],
    minRevenue: "0",
    maxValuation: "no-limit",
    stagePreference: "any",
    riskTolerance: 50,
    teamImportance: 70,
    marketSizePreference: 50,
    requiresRevenue: false
  }
};

const exitTimeOptions = ["1-2 years", "3-5 years", "5-7 years", "7-10 years", "10+ years"];
const exitTypeOptions = ["acquisition", "ipo", "merger", "unknown"];
const sentimentOptions = ["very negative", "negative", "neutral", "positive", "very positive"];
const buzzOptions = ["none", "low", "moderate", "high", "viral"];

const StartupForm = ({ onSubmit }: StartupFormProps) => {
  const [formData, setFormData] = useState<StartupFormData>(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"startup" | "investor">("startup");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: keyof StartupFormData, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleSwitchChange = (name: keyof StartupFormData, value: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof StartupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThesisChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      investorThesis: {
        ...prev.investorThesis,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Form Data:", formData);
      
      if (onSubmit) {
        onSubmit(formData);
        return;
      }
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Analysis started",
        description: "Your startup data has been submitted for analysis.",
      });
      
      const analysisId = "demo-" + Date.now();
      navigate(`/analysis/${analysisId}`);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      <Tabs 
        value={activeTab} 
        onValueChange={(value: string) => setActiveTab(value as "startup" | "investor")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="startup" className="text-base">
            Startup Information
          </TabsTrigger>
          <TabsTrigger value="investor" className="text-base">
            Investor Thesis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="startup" className="space-y-8">
          {/* Basic Information */}
          <FormSection 
            title="Basic Information" 
            description="General information about your startup"
            icon={<Building2 className="h-5 w-5 text-primary" />}
            index={0}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Startup Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter startup name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="e.g. Fintech, Healthcare, SaaS"
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Startup Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of your startup"
                  required
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  name="foundedYear"
                  type="number"
                  value={formData.foundedYear}
                  onChange={handleInputChange}
                  placeholder="YYYY"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>
          </FormSection>

          {/* Product-Market Fit */}
          <FormSection 
            title="Product-Market Fit" 
            description="Metrics and feedback about your product's fit in the market"
            icon={<BarChart4 className="h-5 w-5 text-primary" />}
            index={1}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="pmfScore">Product-Market Fit Score</Label>
                  <span className="text-sm text-muted-foreground">{formData.pmfScore}/100</span>
                </div>
                <Slider
                  id="pmfScore"
                  value={[formData.pmfScore]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSliderChange("pmfScore", value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Poor Fit</span>
                  <span>Strong Fit</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customerFeedback">Customer Feedback Summary</Label>
                <Textarea
                  id="customerFeedback"
                  name="customerFeedback"
                  value={formData.customerFeedback}
                  onChange={handleInputChange}
                  placeholder="Summarize key feedback from customers"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="marketValidation">Market Validation</Label>
                <Textarea
                  id="marketValidation"
                  name="marketValidation"
                  value={formData.marketValidation}
                  onChange={handleInputChange}
                  placeholder="Describe how you've validated your market"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetMarketSize">Target Market Size</Label>
                <Input
                  id="targetMarketSize"
                  name="targetMarketSize"
                  value={formData.targetMarketSize}
                  onChange={handleInputChange}
                  placeholder="e.g. $1B in North America"
                />
              </div>
            </div>
          </FormSection>

          {/* Founder-Market Fit */}
          <FormSection 
            title="Founder-Market Fit" 
            description="Experience and background relevant to your market"
            icon={<UserCog className="h-5 w-5 text-primary" />}
            index={2}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="founderExperience">Relevant Experience</Label>
                <Textarea
                  id="founderExperience"
                  name="founderExperience"
                  value={formData.founderExperience}
                  onChange={handleInputChange}
                  placeholder="Describe relevant experience in this industry"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="educationBackground">Education Background</Label>
                <Textarea
                  id="educationBackground"
                  name="educationBackground"
                  value={formData.educationBackground}
                  onChange={handleInputChange}
                  placeholder="Relevant education and certifications"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousStartups">Previous Startups</Label>
                <Textarea
                  id="previousStartups"
                  name="previousStartups"
                  value={formData.previousStartups}
                  onChange={handleInputChange}
                  placeholder="List previous startups and outcomes"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="domainExpertise">Domain Expertise</Label>
                  <span className="text-sm text-muted-foreground">{formData.domainExpertise}/100</span>
                </div>
                <Slider
                  id="domainExpertise"
                  value={[formData.domainExpertise]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSliderChange("domainExpertise", value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Novice</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Founder Capabilities */}
          <FormSection 
            title="Founder Capabilities" 
            description="Assessment of founder skills and attributes"
            icon={<UserCog className="h-5 w-5 text-primary" />}
            index={3}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="technicalSkills">Technical Skills</Label>
                  <span className="text-sm text-muted-foreground">{formData.technicalSkills}/100</span>
                </div>
                <Slider
                  id="technicalSkills"
                  value={[formData.technicalSkills]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSliderChange("technicalSkills", value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="businessSkills">Business Skills</Label>
                  <span className="text-sm text-muted-foreground">{formData.businessSkills}/100</span>
                </div>
                <Slider
                  id="businessSkills"
                  value={[formData.businessSkills]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSliderChange("businessSkills", value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="resilience">Resilience</Label>
                  <span className="text-sm text-muted-foreground">{formData.resilience}/100</span>
                </div>
                <Slider
                  id="resilience"
                  value={[formData.resilience]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSliderChange("resilience", value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="adaptability">Adaptability</Label>
                  <span className="text-sm text-muted-foreground">{formData.adaptability}/100</span>
                </div>
                <Slider
                  id="adaptability"
                  value={[formData.adaptability]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleSliderChange("adaptability", value)}
                />
              </div>
            </div>
          </FormSection>

          {/* Team Composition */}
          <FormSection 
            title="Team Composition" 
            description="Information about your team"
            icon={<Users className="h-5 w-5 text-primary" />}
            index={4}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  placeholder="Number of team members"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teamExperience">Team Experience</Label>
                <Textarea
                  id="teamExperience"
                  name="teamExperience"
                  value={formData.teamExperience}
                  onChange={handleInputChange}
                  placeholder="Describe your team's relevant experience"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="teamDynamics">Team Dynamics</Label>
                <Textarea
                  id="teamDynamics"
                  name="teamDynamics"
                  value={formData.teamDynamics}
                  onChange={handleInputChange}
                  placeholder="Describe how your team works together"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="keyRolesFilled"
                  checked={formData.keyRolesFilled}
                  onCheckedChange={(checked) => 
                    handleSwitchChange("keyRolesFilled", checked)
                  }
                />
                <Label htmlFor="keyRolesFilled">All key roles are filled</Label>
              </div>
            </div>
          </FormSection>

          {/* Financials */}
          <FormSection 
            title="Financials" 
            description="Key financial metrics and projections"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
            index={5}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="revenue">Current Revenue</Label>
                <Input
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleInputChange}
                  placeholder="e.g. $100K ARR"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="growthRate">Growth Rate</Label>
                <Input
                  id="growthRate"
                  name="growthRate"
                  value={formData.growthRate}
                  onChange={handleInputChange}
                  placeholder="e.g. 15% MoM"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valuation">Current Valuation</Label>
                <Input
                  id="valuation"
                  name="valuation"
                  value={formData.valuation}
                  onChange={handleInputChange}
                  placeholder="e.g. $5M"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unitEconomics">Unit Economics</Label>
                <Input
                  id="unitEconomics"
                  name="unitEconomics"
                  value={formData.unitEconomics}
                  onChange={handleInputChange}
                  placeholder="e.g. $50 CAC, $200 LTV"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="margins">Margins</Label>
                <Input
                  id="margins"
                  name="margins"
                  value={formData.margins}
                  onChange={handleInputChange}
                  placeholder="e.g. 60% Gross, 15% Net"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="burnRate">Burn Rate</Label>
                <Input
                  id="burnRate"
                  name="burnRate"
                  value={formData.burnRate}
                  onChange={handleInputChange}
                  placeholder="e.g. $50K/month"
                />
              </div>
            </div>
          </FormSection>

          {/* Exit Strategy */}
          <FormSection 
            title="Exit Strategy" 
            description="Your vision for eventually exiting the company"
            icon={<Target className="h-5 w-5 text-primary" />}
            index={6}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="expectedExitTime">Expected Exit Timeline</Label>
                <Select
                  value={formData.expectedExitTime}
                  onValueChange={(value) => handleSelectChange("expectedExitTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {exit

