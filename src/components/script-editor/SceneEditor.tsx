import * as React from "react";
import { Loader2 } from "lucide-react";

const SceneEditor = () => {
  const [isGenerating, setIsGenerating] = React.useState(true);

  React.useEffect(() => {
    // Mô phỏng quá trình tạo cảnh
    const timer = setTimeout(() => {
      setIsGenerating(false);
      // Ở đây bạn thường sẽ hiển thị các cảnh đã được tạo
    }, 3000); // Điều chỉnh thời gian nếu cần

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-[#1C1C22]/60 border border-gray-700 rounded-lg p-4 min-h-[50vh]">
      {isGenerating ? (
        <div className="text-center text-gray-400">
          <Loader2 className="mx-auto h-8 w-8 animate-spin mb-2" />
          <p>Generating Scenes</p>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <p>Scenes generated successfully!</p>
          {/* Placeholder for actual scene content */}
        </div>
      )}
    </div>
  );
};

export default SceneEditor;