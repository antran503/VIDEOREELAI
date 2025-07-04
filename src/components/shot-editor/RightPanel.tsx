import * as React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cameraAngles } from "@/data/cameraAngles";
import { lightingOptions } from "@/data/lightingOptions";
import { shotTypes } from "@/data/shotTypes";
import { RefreshCw, Sparkles, UploadCloud, Play, Mic, Square } from "lucide-react";
import { textAnimations } from "@/data/animations";
import { soundEffects } from "@/data/soundEffects";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";

const mockCharacters = [
    { id: 'ravi', name: 'Ravi', image: 'https://i.imgur.com/4YjD2M5.png' }
];

const RightPanel = () => {
  const [dialogueVolume, setDialogueVolume] = React.useState(100);
  const [effectsVolume, setEffectsVolume] = React.useState(35);

  return (
    <div className="w-80 bg-[#1C1C22] p-4 space-y-4 overflow-y-auto h-full">
      <Accordion type="multiple" defaultValue={['frame']} className="w-full">
        <AccordionItem value="frame">
          <AccordionTrigger>Frame</AccordionTrigger>
          <AccordionContent>
            <Tabs defaultValue="prompt">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="prompt">Prompt</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="stock">Stock</TabsTrigger>
                <TabsTrigger value="color">Color</TabsTrigger>
              </TabsList>
              <TabsContent value="prompt" className="mt-4 space-y-3">
                <div className="relative">
                  <Textarea 
                    defaultValue="Ravi steps out of his apartment building into the bustling streets of Mumbai. The camera follows him as he merges into the crowd of commuters."
                    className="bg-[#2A2A33] border-gray-600 h-24"
                  />
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <Label>SHOT TYPE</Label>
                  <Select defaultValue="wide-shot">
                    <SelectTrigger className="bg-[#2A2A33] border-gray-600"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                      {shotTypes.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>CAMERA ANGLE</Label>
                  <Select defaultValue="low-angle">
                    <SelectTrigger className="bg-[#2A2A33] border-gray-600"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                      {cameraAngles.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>LIGHTING</Label>
                  <Select>
                    <SelectTrigger className="bg-[#2A2A33] border-gray-600"><SelectValue placeholder="Select Lighting" /></SelectTrigger>
                    <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                      {lightingOptions.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>MOOD</Label>
                  <Input defaultValue="Overwhelming, impersonal" className="bg-[#2A2A33] border-gray-600" />
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Video
                </Button>
              </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="text-layer">
          <AccordionTrigger>Text Layer</AccordionTrigger>
          <AccordionContent>
            <Tabs defaultValue="text">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="animation">Animation</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-4">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Add New Text Layer</Button>
                </TabsContent>
                <TabsContent value="animation" className="mt-4 space-y-3">
                    <div className="space-y-1">
                        <Label>Type</Label>
                        <Select>
                            <SelectTrigger className="bg-[#2A2A33] border-gray-600"><SelectValue placeholder="Select Animation" /></SelectTrigger>
                            <SelectContent className="bg-[#1C1C22] border-gray-700 text-white max-h-60">
                                {textAnimations.map(a => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label>Duration(Sec)</Label>
                        <Input defaultValue="0.5" className="bg-[#2A2A33] border-gray-600" />
                    </div>
                    <div className="space-y-1">
                        <Label>Start Delay</Label>
                        <Input defaultValue="0" className="bg-[#2A2A33] border-gray-600" />
                    </div>
                </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="media">
          <AccordionTrigger>Media</AccordionTrigger>
          <AccordionContent>
            <Tabs defaultValue="ai-image">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ai-image">AI Image</TabsTrigger>
                    <TabsTrigger value="stock">Stock</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="ai-image" className="mt-4 space-y-3">
                    <Textarea placeholder="Add Prompt" className="bg-[#2A2A33] border-gray-600" />
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Generate</Button>
                </TabsContent>
                <TabsContent value="stock" className="mt-4 space-y-3">
                    <RadioGroup defaultValue="image" className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="image" id="image" />
                            <Label htmlFor="image">Image</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="video" />
                            <Label htmlFor="video">Video</Label>
                        </div>
                    </RadioGroup>
                    <Input placeholder="Search Image" className="bg-[#2A2A33] border-gray-600" />
                </TabsContent>
                <TabsContent value="upload" className="mt-4">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload Media
                    </Button>
                </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="character-dialogue">
          <AccordionTrigger>Character Dialogue</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
                <div>
                    <Label>CHARACTER</Label>
                    <Select defaultValue="ravi">
                        <SelectTrigger className="bg-[#2A2A33] border-gray-600">
                            <SelectValue>
                                <div className="flex items-center gap-2">
                                    <img src={mockCharacters[0].image} alt={mockCharacters[0].name} className="w-6 h-6 rounded-full" />
                                    <span>{mockCharacters[0].name}</span>
                                </div>
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                            {mockCharacters.map(c => (
                                <SelectItem key={c.id} value={c.id}>
                                    <div className="flex items-center gap-2">
                                        <img src={c.image} alt={c.name} className="w-6 h-6 rounded-full" />
                                        <span>{c.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Tabs defaultValue="tts">
                    <TabsList className="grid w-full grid-cols-5 text-xs h-auto p-0">
                        <TabsTrigger value="voice-clone" className="py-1.5">Voice Clone</TabsTrigger>
                        <TabsTrigger value="tts" className="py-1.5">TTS</TabsTrigger>
                        <TabsTrigger value="upload" className="py-1.5">Upload</TabsTrigger>
                        <TabsTrigger value="record" className="py-1.5">Record</TabsTrigger>
                        <TabsTrigger value="sonority" className="py-1.5">Sonority</TabsTrigger>
                    </TabsList>
                    <TabsContent value="voice-clone" className="mt-4">
                        <Alert className="bg-yellow-900/30 border-yellow-700/50 text-yellow-300">
                            <AlertDescription className="text-xs">
                            Please go to the integrations tab to connect your ElevenLabs account. <a href="#" className="underline font-semibold">Click here.</a>
                            </AlertDescription>
                        </Alert>
                    </TabsContent>
                    <TabsContent value="tts" className="mt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Label>LANGUAGE</Label>
                                <Select defaultValue="en-us">
                                    <SelectTrigger className="bg-[#2A2A33] border-gray-600"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-[#1C1C22] border-gray-700 text-white">
                                        <SelectItem value="en-us">English (US)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>ACCENT</Label>
                                <Select>
                                    <SelectTrigger className="bg-[#2A2A33] border-gray-600"><SelectValue placeholder="Select Voice" /></SelectTrigger>
                                    <SelectContent className="bg-[#1C1C22] border-gray-700 text-white"></SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Textarea className="bg-[#2A2A33] border-gray-600" />
                        <div className="flex gap-2">
                            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500">Generate</Button>
                            <Button variant="secondary" className="flex-1">Use</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4 text-center space-y-2">
                        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                            <UploadCloud className="mr-2 h-4 w-4" /> Upload Dialogue
                        </Button>
                        <p className="text-xs text-gray-500">No audio uploaded yet</p>
                    </TabsContent>
                    <TabsContent value="record" className="mt-4 space-y-3 text-center">
                        <div className="bg-black rounded-md p-2 text-lg font-mono">00:00:00</div>
                        <div className="flex justify-center gap-4">
                            <Button variant="secondary" size="icon" className="rounded-full h-12 w-12"><Mic className="h-6 w-6" /></Button>
                            <Button variant="secondary" size="icon" className="rounded-full h-12 w-12"><Square className="h-6 w-6" /></Button>
                        </div>
                        <div className="flex gap-2">
                            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500">Play</Button>
                            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500">Upload</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sound-effects">
          <AccordionTrigger>Sound Effects</AccordionTrigger>
          <AccordionContent>
            <Tabs defaultValue="stock">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="stock">Stock</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="stock" className="mt-4 space-y-2">
                    {soundEffects.map(effect => (
                        <div key={effect.id} className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-pink-500/20 to-purple-500/20">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-white/20 hover:bg-white/30"><Play className="h-3 w-3 fill-white text-white" /></Button>
                                <span className="text-xs">{effect.name}</span>
                            </div>
                            <span className="text-xs">{effect.duration}</span>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="upload" className="mt-4 text-center space-y-2">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload Effects
                    </Button>
                    <p className="text-xs text-gray-500">No audio uploaded yet</p>
                </TabsContent>
            </Tabs>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="volume">
          <AccordionTrigger>Volume</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Character Dialogue</Label>
                        <span className="text-pink-400">{dialogueVolume}%</span>
                    </div>
                    <Slider value={[dialogueVolume]} onValueChange={(v) => setDialogueVolume(v[0])} max={100} step={1} className="[&>span:first-child]:h-full [&>span:first-child]:bg-pink-500 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-300" />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label>Sound Effects</Label>
                        <span className="text-pink-400">{effectsVolume}%</span>
                    </div>
                    <Slider value={[effectsVolume]} onValueChange={(v) => setEffectsVolume(v[0])} max={100} step={1} className="[&>span:first-child]:h-full [&>span:first-child]:bg-pink-500 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-300" />
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="settings">
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1">
                <Label>DURATION (SEC)</Label>
                <Input defaultValue="5" className="bg-[#2A2A33] border-gray-600" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RightPanel;