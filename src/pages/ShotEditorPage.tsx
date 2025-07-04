import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ShotEditorPage = () => {
    const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full text-white">
        <header className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <Button variant="ghost" className="font-semibold text-gray-400 hover:text-white" onClick={() => navigate('/storyboard')}>Storyboard</Button>
                <Button variant="ghost" className="font-semibold text-white bg-gray-700">Shot Editor</Button>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-700 text-white">Render</Button>
                <Button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">Preview</Button>
            </div>
        </header>
        <div className="flex-grow flex items-center justify-center bg-[#1C1C22]/60 border border-gray-700 rounded-lg">
          <h1 className="text-2xl text-gray-500">Shot Editor Page - Coming Soon</h1>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ShotEditorPage;