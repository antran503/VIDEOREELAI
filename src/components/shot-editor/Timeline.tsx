import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GripVertical } from "lucide-react";
import { mockScenesData, mockShotsData } from "@/data/storyboardData";

// Chuyển đổi dữ liệu để sử dụng trong timeline
const timelineData = mockScenesData.map(scene => ({
    scene: scene.id,
    shots: mockShotsData
        .filter(shot => shot.sceneId === scene.id)
        .map(shot => ({
            ...shot,
            duration: 5 // Thêm thời lượng mặc định là 5 giây cho mỗi cảnh quay
        }))
}));

// Dữ liệu giả cho các clip âm thanh, được mở rộng để phù hợp với toàn bộ timeline
const mockAudioClips = {
    dialogue: [
        { id: 'd1', shotId: 1, start: 0.5, duration: 4, text: "Ravi's dialogue..." },
        { id: 'd2', shotId: 5, start: 1, duration: 3, text: "Commuter chatter..." },
        { id: 'd3', shotId: 7, start: 0, duration: 3.5, text: "Ravi's internal monologue..." },
        { id: 'd4', shotId: 9, start: 0, duration: 5, text: "Street performer's song..." },
        { id: 'd5', shotId: 13, start: 1, duration: 4, text: "Priya: 'You look tired.'" },
        { id: 'd6', shotId: 16, start: 2, duration: 3, text: "Ravi: 'It's nothing.'" },
        { id: 'd7', shotId: 24, start: 0, duration: 2, text: "Priya: 'You can do it!'" },
    ],
    sfx: [
        { id: 's1', shotId: 1, start: 0, duration: 1, text: "Alarm Clock" },
        { id: 's2', shotId: 2, start: 0, duration: 4, text: "City Bustle" },
        { id: 's3', shotId: 3, start: 0.2, duration: 1, text: "Phone Buzz" },
        { id: 's4', shotId: 8, start: 1, duration: 2, text: "Train Doors" },
        { id: 's5', shotId: 13, start: 0, duration: 8, text: "Office Ambience" },
        { id: 's6', shotId: 18, start: 1, duration: 1.5, text: "Dusty Guitar Case" },
        { id: 's7', shotId: 21, start: 0, duration: 1, text: "Guitar String Snap" },
    ],
    music: [
        { id: 'm1', sceneId: 1, start: 0, duration: 25, text: "Tense morning music" },
        { id: 'm2', sceneId: 2, start: 0, duration: 35, text: "Hopeful folk song" },
        { id: 'm3', sceneId: 3, start: 0, duration: 10, text: "Droning office score" },
        { id: 'm4', sceneId: 4, start: 0, duration: 15, text: "Contemplative cue" },
        { id: 'm5', sceneId: 5, start: 0, duration: 10, text: "Nostalgic theme" },
        { id: 'm6', sceneId: 6, start: 0, duration: 15, text: "Determined practice montage" },
        { id: 'm7', sceneId: 7, start: 0, duration: 15, text: "Nervous/Triumphant finale" },
    ]
}

const PIXELS_PER_SECOND = 24;

const TimelineRuler = ({ totalDuration }: { totalDuration: number }) => {
    const markers = [];
    const totalWidth = totalDuration * PIXELS_PER_SECOND;
    for (let i = 0; i <= totalDuration; i += 5) {
        markers.push(
            <div key={i} className="relative h-full flex items-end" style={{ width: PIXELS_PER_SECOND * 5 }}>
                <div className="w-px h-2 bg-gray-500"></div>
                <span className="absolute -bottom-4 left-0 text-xs text-gray-500">{i}s</span>
            </div>
        );
    }
    return <div className="flex h-4" style={{ width: totalWidth }}>{markers}</div>;
};

const Timeline = () => {
    const [activeShot, setActiveShot] = React.useState(5);

    const shotStartTimes = new Map<number, number>();
    let currentTime = 0;
    timelineData.forEach(scene => {
        scene.shots.forEach(shot => {
            shotStartTimes.set(shot.id, currentTime);
            currentTime += shot.duration;
        });
    });
    const totalDuration = currentTime;

    const sceneStartTimes = new Map<number, number>();
    let currentSceneTime = 0;
    timelineData.forEach(scene => {
        sceneStartTimes.set(scene.scene, currentSceneTime);
        const sceneDuration = scene.shots.reduce((acc, shot) => acc + shot.duration, 0);
        currentSceneTime += sceneDuration;
    });

    return (
        <footer className="h-80 bg-[#1C1C22] border-t border-gray-700 flex flex-shrink-0">
            <div className="w-40 flex-shrink-0 bg-[#2A2A33]/50 flex flex-col">
                <div className="h-8 border-b border-gray-700 flex items-center justify-center">
                    <GripVertical className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="text-sm font-semibold text-gray-300 h-20 flex items-center p-2 border-b border-gray-700/50">Video</div>
                    <div className="text-sm font-semibold text-gray-300 h-16 flex items-center p-2 border-b border-gray-700/50">Dialogue</div>
                    <div className="text-sm font-semibold text-gray-300 h-16 flex items-center p-2 border-b border-gray-700/50">Sound Effects</div>
                    <div className="text-sm font-semibold text-gray-300 h-16 flex items-center p-2">Background Score</div>
                </div>
            </div>

            <ScrollArea className="flex-1 w-full whitespace-nowrap">
                <div className="relative p-2" style={{ width: totalDuration * PIXELS_PER_SECOND + 200 }}>
                    <div className="h-8 sticky top-0 bg-[#1C1C22] z-10">
                        <TimelineRuler totalDuration={totalDuration} />
                    </div>

                    <div className="space-y-1 mt-4">
                        <div className="h-20 relative">
                            {timelineData.flatMap(sceneData => 
                                sceneData.shots.map((shot, index) => (
                                    <div
                                        key={shot.id}
                                        className={`absolute top-0 h-full rounded-md overflow-hidden cursor-pointer border-2 bg-black flex items-center justify-center group ${activeShot === shot.id ? 'border-pink-500' : 'border-gray-600'}`}
                                        style={{ 
                                            left: (shotStartTimes.get(shot.id) || 0) * PIXELS_PER_SECOND,
                                            width: shot.duration * PIXELS_PER_SECOND 
                                        }}
                                        onClick={() => setActiveShot(shot.id)}
                                    >
                                        <img src={shot.image} alt={`Shot ${shot.id}`} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                                        <div className="absolute text-xs text-white p-1 bg-black/50 rounded">
                                            Shot {shot.id}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="h-16 relative py-2">
                            {mockAudioClips.dialogue.map(clip => {
                                const shotStartTime = shotStartTimes.get(clip.shotId) || 0;
                                const left = (shotStartTime + clip.start) * PIXELS_PER_SECOND;
                                const width = clip.duration * PIXELS_PER_SECOND;
                                return (
                                    <div key={clip.id} className="absolute top-2 h-12 bg-blue-500/50 border border-blue-400 rounded-md p-1 flex items-center" style={{ left, width }}>
                                        <p className="text-xs text-white truncate">{clip.text}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="h-16 relative py-2">
                            {mockAudioClips.sfx.map(clip => {
                                const shotStartTime = shotStartTimes.get(clip.shotId) || 0;
                                const left = (shotStartTime + clip.start) * PIXELS_PER_SECOND;
                                const width = clip.duration * PIXELS_PER_SECOND;
                                return (
                                    <div key={clip.id} className="absolute top-2 h-12 bg-green-500/50 border border-green-400 rounded-md p-1 flex items-center" style={{ left, width }}>
                                        <p className="text-xs text-white truncate">{clip.text}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="h-16 relative py-2">
                            {mockAudioClips.music.map(clip => {
                                const sceneStartTime = sceneStartTimes.get(clip.sceneId) || 0;
                                const left = (sceneStartTime + clip.start) * PIXELS_PER_SECOND;
                                const width = clip.duration * PIXELS_PER_SECOND;
                                return (
                                    <div key={clip.id} className="absolute top-2 h-12 bg-purple-500/50 border border-purple-400 rounded-md p-1 flex items-center" style={{ left, width }}>
                                        <p className="text-xs text-white truncate">{clip.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </footer>
    );
};

export default Timeline;