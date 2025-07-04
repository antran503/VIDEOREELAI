import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Index";
import Projects from "./pages/Projects";
import Characters from "./pages/Characters";
import ContentSchedule from "./pages/ContentSchedule";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";
import ScriptEditor from "./pages/ScriptEditor";
import ShotEditor from "./pages/ShotEditorPage";
import Storyboard from "./pages/Storyboard";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/schedule" element={<ContentSchedule />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Các trang không có layout chính */}
          <Route path="/script-editor" element={<ScriptEditor />} />
          <Route path="/shot-editor" element={<ShotEditor />} />
          <Route path="/storyboard" element={<Storyboard />} />
        </Routes>
      </Router>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;