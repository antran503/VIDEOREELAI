import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const mockTimelineData = [
    {
        scene: 1,
        shots: [
            { id: 1, image: "https://i.imgur.com/4YjD2M5.png" },
            { id: 2, image: "https://i.imgur.com/sCfp0kE.png" },
            { id: 3, image: "https://i.imgur.com/4YjD2M5.png" },
            { id: 4, image: "https://i.imgur.com/sCfp0kE.png" },
            { id: 5, image: "https://i.imgur.com/4YjD2M5.png" },
        ]
    },
    {
        scene: 2,
        shots: [
            { id: 6, image: "https://i.imgur.com/sCfp0kE.png" },
            { id: 7, image: "https://i.imgur.com/4YjD2M5.png" },
            { id: 8, image: "https://i.imgur.com/sCfp0kE.png" },
            { id: 9, image: "https://i.imgur.com/4YjD2M5.png" },
            { id: 10, image: "https://i.imgur.com/sCfp0kE.png" },
            { id: 11, image: "https://i.imgur.com/4YjD2M5.png" },
            { id: 12, image: "https://i.imgur.com/sCfp0kE.png" },
        ]
    },
    {
        scene: 3,
        shots: [
            { id: 13, image: "https://i.imgur.com/4YjD2M5.png" },
            { id: 14, image: "https://i.imgur.com/sCfp0kE.png" },
        ]
    }
];

const Timeline = () => {
    const [activeShot, setActiveShot] = React.useState(5);

    return (
        <footer className="h-48 bg-[#1C1C22] border-t border-gray-700 p-4 flex flex-col flex-shrink-0">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4">
                    {mockTimelineData.map((sceneData) => (
                        <div key={sceneData.scene} className="flex items-start space-x-2 p-2 border border-gray-700 rounded-lg bg-[#0F0F1A]/50">
                            <div className="text-xs font-semibold w-16 text-center pt-1 text-gray-400">Scene {sceneData.scene}</div>
                            <div className="flex space-x-1">
                                {sceneData.shots.map((shot, index) => (
                                    <div 
                                        key={shot.id} 
                                        className={`w-24 h-16 rounded-md overflow-hidden cursor-pointer border-2 bg-black ${activeShot === shot.id ? 'border-pink-500' : 'border-gray-700'}`}
                                        onClick={() => setActiveShot(shot.id)}
                                    >
                                        <img src={shot.image} alt={`Shot ${index + 1}`} className="w-full h-full object-cover" />
                                        <div className="text-xs text-white bg-black/50 text-center relative -top-6 py-0.5">Shot {index + 1}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex-grow mt-4 relative">
                <div className="h-1.5 w-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
            </div>
        </footer>
    );
};

export default Timeline;