import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GripVertical } from "lucide-react";

// Dữ liệu giả định, thêm thuộc tính 'duration' (thời lượng) cho mỗi cảnh quay
const mockTimelineData = [
    {
        scene: 1,
        shots: [
            { id: 1, image: "https://i.imgur.com/4YjD2M5.png", duration: 5 },
            { id: 2, image: "https://i.imgur.com/sCfp0kE.png", duration: 4 },
            { id: 3, image: "https://i.imgur.com/4YjD2M5.png", duration: 6 },
            { id: 4, image: "https://i.imgur.com/sCfp0kE.png", duration: 3 },
            { id: 5, image: "https://i.imgur.com/4YjD2M5.png", duration: 5 },
        ]
    },
    {
        scene: 2,
        shots: [
            { id: 6, image: "https://i.imgur.com/sCfp0kE.png", duration: 7 },
            { id: 7, image: "https://i.imgur.com/4YjD2M5.png", duration: 4 },
            { id: 8, image: "https://i.imgur.com/sCfp0kE.png", duration: 5 },
            { id: 9, image: "https://i.imgur.com/4YjD2M5.png", duration: 6 },
            { id: 10, image: "https://i.imgur.com/sCfp0kE.png", duration: 3 },
            { id: 11, image: "https://i.imgur.com/4YjD2M5.png", duration: 4 },
            { id: 12, image: "https://i.imgur.com/sCfp0kE.png", duration: 5 },
        ]
    },
    {
        scene: 3,
        shots: [
            { id: 13, image: "https://i.imgur.com/4YjD2M5.png", duration: 8 },
            { id: 14, image: "https://i.imgur.com/sCfp0kE.png", duration: 6 },
        ]
    }
];

// Dữ liệu giả cho các clip âm thanh
const mockAudioClips = {
    dialogue: [
        { id: 'd1', shotId: 1, start: 0.5, duration: 4, text: "Ravi's dialogue..." },
        { id: 'd2', shotId: 5, start: 1, duration: 3, text: "Commuter chatter..." },
        { id: 'd3', shotId: 7, start: 0, duration: 3.5, text: "Ravi's internal monologue..." },
    ],
    sfx: [
        { id: 's1', shotId: 1, start: 0, duration: 1, text: "Alarm Clock" },
        { id: 's2', shotId: 2, start: 0, duration: 4, text: "City Bustle" },
        { id: 's3', shotId: 8, start: 1, duration: 2, text: "Train Doors" },
    ],
    music: [
        { id: 'm1', sceneId: 1, start: 0, duration: 23, text: "Tense morning music" },
        { id: 'm2', sceneId: 2, start: 0, duration: 34, text: "Hopeful folk song" },
    ]
}

const PIXELS_PER_SECOND = 24; // 24px cho mỗi giây

const TimelineRuler = ({ totalDuration }: { totalDuration: number }) => {
    const markers = [];
    for (let i = 0; i <= totalDuration; i++) {
        markers.push(
            <div key={i} className="relative h-full flex items-end" style={{ width: PIXELS_PER_SECOND }}>
                <div className="w-px h-2 bg-gray-500"></div>
                {i % 5 === 0 && <span className="absolute -bottom-4 left-0 text-xs text-gray-500">{i}s</span>}
            </div>
        );
    }
    return <div className="flex h-4">{markers}</div>;
};

const Timeline = () => {
    const [activeShot, setActiveShot] = React.useState(5);

    const shotStartTimes = new Map<number, number>();
    let currentTime = 0;
    mockTimelineData.forEach(scene => {
        scene.shots.forEach(shot => {
            shotStartTimes.set(shot.id, currentTime);
            currentTime += shot.duration;
        });
    });
    const totalDuration = currentTime;

    const sceneStartTimes = new Map<number, number>();
    let currentSceneTime = 0;
    mockTimelineData.forEach(scene => {
        sceneStartTimes.set(scene.scene, currentSceneTime);
        const sceneDuration = scene.shots.reduce((acc, shot) => acc + shot.duration, 0);
        currentSceneTime += sceneDuration;
    });

    return (
        <footer className="h-80 bg-[#1C1C22] border-t border-gray-700 flex flex-shrink-0">
            {/* Nhãn các lớp */}
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

            {/* Nội dung Timeline */}
            <ScrollArea className="flex-1 w-full whitespace-nowrap">
                <div className="relative p-2" style={{ width: totalDuration * PIXELS_PER_SECOND + 200 }}>
                    {/* Thước đo thời gian */}
                    <div className="h-8 sticky top-0 bg-[#1C1C22] z-10">
                        <TimelineRuler totalDuration={totalDuration} />
                    </div>

                    {/* Các rãnh (tracks) */}
                    <div className="space-y-1 mt-4">
                        {/* Rãnh Video */}
                        <div className="h-20 relative">
                            {mockTimelineData.flatMap(sceneData => 
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
                                        <img src={shot.image} alt={`Shot ${index + 1}`} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                                        <div className="absolute text-xs text-white p-1 bg-black/50 rounded">
                                            Shot {index + 1}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Rãnh Dialogue */}
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

                        {/* Rãnh SFX */}
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

                        {/* Rãnh Music */}
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