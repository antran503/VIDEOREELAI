import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScriptEditor from "./pages/ScriptEditor";
import Projects from "./pages/Projects";
import Storyboard from "./pages/Storyboard";
import ShotEditorPage from "./pages/ShotEditorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Placeholder routes for sidebar navigation */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/characters" element={<Index />} />
          <Route path="/schedule" element={<Index />} />
          <Route path="/integration" element={<Index />} />
          <Route path="/script-editor" element={<ScriptEditor />} />
          <Route path="/storyboard" element={<Storyboard />} />
          <Route path="/shot-editor" element={<ShotEditorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;