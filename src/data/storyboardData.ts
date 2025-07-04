export const mockScenesData = [
  { id: 1, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' as const },
  { id: 2, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' as const },
  { id: 3, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' as const },
  { id: 4, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' as const },
  { id: 5, image: "https://i.imgur.com/4YjD2M5.png", status: 'loaded' as const },
  { id: 6, image: "https://i.imgur.com/sCfp0kE.png", status: 'loaded' as const },
  { id: 7, image: "https://i.imgur.com/4YjD2M5.png", status: 'loading' as const },
];

export const mockShotsData = [
    // Scene 1
    { id: 1, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "A small, cramped Mumbai apartment at 5:00 AM. The alarm clock blares loudly on a cluttered bedside table. Ravi, a young man in his late 20s, groans and slams his hand on the snooze button.", mood: "Exhaustion, reluctance" },
    { id: 2, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Outside the apartment window, the city of Mumbai is already bustling. Honking cars, distant chai vendors, and the general hum of the metropolis can be heard.", mood: "Overwhelming, chaotic" },
    { id: 3, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi's phone buzzes on the bedside table. He picks it up and reads a message from his boss: *Late again yesterday. One more strike and you're out.* His expression darkens as he reads.", mood: "Frustration, resignation" },
    { id: 4, sceneId: 1, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi stands in front of a small mirror, adjusting the collar of his wrinkled shirt. His reflection shows a hollow-eyed, defeated young man. The peeling paint on the wall behind him adds to the sense of decay.", mood: "Defeat, monotony" },
    { id: 5, sceneId: 1, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Ravi steps out of his apartment building into the morning crowds of Mumbai. The camera follows him as he merges into the crowd of commuters, his expression blank and lost.", mood: "Overwhelming, impersonal" },
    
    // Scene 2
    { id: 6, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi hangs onto the overhead bar of a crowded train, staring blankly out the window as the cityscape blurs past.", mood: "Monotonous, weary" },
    { id: 7, sceneId: 2, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Close-up of Ravi's face. Dark circles under his eyes. His expression is blank but with a hint of deep exhaustion. The sounds of the train and crowd are muffled.", mood: "Fatigued, disconnected" },
    { id: 8, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "The train doors open at Dadar station. Through the crowd, a street performer with a worn-out guitar steps in. He begins tuning his instrument.", mood: "Hopeful, anticipatory" },
    { id: 9, sceneId: 2, image: "https://i.imgur.com/4YjD2M5.png", prompt: "The street performer begins singing a soulful, folk song. His voice is rich and powerful. The song's lyrics speak about life's journey. Some passengers ignore him, but a few listen intently.", mood: "Inspiring, soulful" },
    { id: 10, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi's reaction. His blank expression finally changes as he listens to the music. His fingers begin unconsciously tapping against his thigh in rhythm with the song.", mood: "Awakening, nostalgic" },
    { id: 11, sceneId: 2, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Flashback to a past - a brief glimpse of Ravi in a happier time, playing guitar in a college dorm room, laughing with friends. The image is warm and vibrant.", mood: "Happy, reminiscent" },
    { id: 12, sceneId: 2, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Back to present. Ravi's eyes now have a spark in them. He makes brief eye contact with the performer who nods at him knowingly.", mood: "Connection, realization" },

    // Scene 3
    { id: 13, sceneId: 3, image: "https://i.imgur.com/4YjD2M5.png", prompt: "At the office, fluorescent lights buzz overhead. Ravi's coworker, Priya, notices his exhaustion.", mood: "Monotony" },
    { id: 14, sceneId: 3, image: "https://i.imgur.com/sCfp0kE.png", prompt: "The calls from angry customers and scripted apologies blur together.", mood: "Frustration" },

    // Scene 4
    { id: 15, sceneId: 4, image: "https://i.imgur.com/4YjD2M5.png", prompt: "During lunch, Priya mentions a music competition in Bandra.", mood: "Intrigue" },
    { id: 16, sceneId: 4, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Ravi dismisses the idea, but Priya's words linger.", mood: "Contemplation" },
    { id: 17, sceneId: 4, image: "https://i.imgur.com/4YjD2M5.png", prompt: "A shot of the competition flyer.", mood: "Opportunity" },

    // Scene 5
    { id: 18, sceneId: 5, image: "https://i.imgur.com/sCfp0kE.png", prompt: "That night, Ravi digs out his old, dusty guitar from under the bed.", mood: "Nostalgia" },
    { id: 19, sceneId: 5, image: "https://i.imgur.com/4YjD2M5.png", prompt: "His initial attempts are rusty and frustrating.", mood: "Struggle" },

    // Scene 6
    { id: 20, sceneId: 6, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Over the next week, Ravi practices relentlessly.", mood: "Determination" },
    { id: 21, sceneId: 6, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Close up on his bleeding fingertips.", mood: "Pain, sacrifice" },
    { id: 22, sceneId: 6, image: "https://i.imgur.com/sCfp0kE.png", prompt: "He feels more alive than he has in years.", mood: "Revitalization" },

    // Scene 7
    { id: 23, sceneId: 7, image: "https://i.imgur.com/4YjD2M5.png", prompt: "On the night of the competition, Ravi's hands shake with nerves.", mood: "Anxiety" },
    { id: 24, sceneId: 7, image: "https://i.imgur.com/sCfp0kE.png", prompt: "Priya encourages him from the crowd.", mood: "Support" },
    { id: 25, sceneId: 7, image: "https://i.imgur.com/4YjD2M5.png", prompt: "Under the spotlight, he closes his eyes and plays with raw emotion.", mood: "Passion, release" },
];