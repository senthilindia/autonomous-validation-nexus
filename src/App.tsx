
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { PageLayout } from "./components/layout/PageLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Simulations from "./pages/Simulations";
import TestCases from "./pages/TestCases";
import Analytics from "./pages/Analytics";
import DataManagement from "./pages/DataManagement";
import Infrastructure from "./pages/Infrastructure";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/simulations" element={<Simulations />} />
            <Route path="/test-cases" element={<TestCases />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/data" element={<DataManagement />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
