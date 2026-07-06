import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { MobileDisclaimer } from "./components/MobileDisclaimer";
import { BetaDisclaimer } from "./components/BetaDisclaimer";

// Import pages directly to avoid lazy loading issues
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import About from "./pages/About";
import Analyze from "./pages/Analyze";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthCallback from "./pages/AuthCallback";
import SignalDeck from "./pages/SignalDeck";

// Create a new QueryClient instance with retry configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
});

// Only show the beta/mobile disclaimers on pages where they're actually relevant —
// keeping them off the landing page so the hero isn't buried under alert banners.
const DISCLAIMER_ROUTES = ["/dashboard", "/analyze", "/analysis"];

const PageDisclaimers = () => {
  const { pathname } = useLocation();
  const shouldShow = DISCLAIMER_ROUTES.some((route) => pathname.startsWith(route));
  if (!shouldShow) return null;
  return (
    <>
      <MobileDisclaimer />
      <BetaDisclaimer />
    </>
  );
};

const App = () => {
  // Log when app is initialized
  useEffect(() => {
    console.log("App initialized");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16 px-4"> {/* Added px-4 for better mobile padding */}
              <PageDisclaimers />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analysis/:id" element={<Analysis />} />
                <Route path="/analyze" element={<Analyze />} />
                <Route path="/signals" element={<SignalDeck />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
