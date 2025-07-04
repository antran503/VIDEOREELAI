import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Download, Play, UploadCloud } from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="w-80 bg-[#1C1C22] p-4 space-y-4 overflow-y-auto h-full">
      <Accordion type="multiple" defaultValue={['background-score']} className="w-full">
        <AccordionItem value="background-score">
          <AccordionTrigger>Background Score</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="apply-to-all-score" />
                <Label htmlFor="apply-to-all-score">Apply to all scene</Label>
              </div>
              <Tabs defaultValue="ai-tone">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ai-tone">AI Tone</TabsTrigger>
                  <TabsTrigger value="stock">Stock</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="ai-tone" className="mt-4 space-y-2">
                  <Label>Prompt</Label>
                  <Textarea placeholder="Enter Text Here" className="bg-[#2A2A33] border-gray-600" />
                  <Button variant="secondary" className="w-full">Generate</Button>
                  <div className="flex items-center justify-between p-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-500">
                    <Play className="h-5 w-5" />
                    <span>Ai generated voice...</span>
                    <span>0 sec</span>
                  </div>
                </TabsContent>
                <TabsContent value="upload" className="mt-4 text-center">
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-600 rounded-lg">
                        <UploadCloud className="h-8 w-8 text-gray-500 mb-2" />
                        <Button className="bg-gradient-to-r from-pink-500 to-blue-500">Upload Music</Button>
                        <p className="text-xs text-gray-500 mt-2">No audio uploaded yet</p>
                    </div>
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="background-volume">
          <AccordionTrigger>Background Volume</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="apply-to-all-volume" />
                    <Label htmlFor="apply-to-all-volume">Apply to all scene</Label>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span>0</span>
                    <span className="text-pink-400">50%</span>
                    <span>100</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} className="[&>span:first-child]:h-full [&>span:first-child]:bg-pink-500 [&_[role=slider]]:bg-pink-400 [&_[role=slider]]:border-pink-300" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="settings">
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="apply-to-all-settings" />
                    <Label htmlFor="apply-to-all-settings">Apply to all scene</Label>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#2A2A33] rounded-md">
                    <Label htmlFor="add-logo">Add Logo</Label>
                    <Switch id="add-logo" />
                </div>
                <Button variant="ghost" className="w-full justify-between">
                    Download Story Script <Download className="h-4 w-4" />
                </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="credits">
          <AccordionTrigger>Credits</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-2 bg-[#2A2A33] rounded-md">
                    <Label htmlFor="intro">Intro</Label>
                    <Switch id="intro" />
                </div>
                <div className="flex items-center justify-between p-2 bg-[#2A2A33] rounded-md">
                    <Label htmlFor="outro">Outro</Label>
                    <Switch id="outro" />
                </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="movie-type">
          <AccordionTrigger>Movie Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label>Edit Narrator Script</Label>
                    <Button variant="secondary" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#2A2A33] rounded-md">
                    <Label htmlFor="translate-text">Translate Text</Label>
                    <Switch id="translate-text" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="apply-to-all-type" />
                    <Label htmlFor="apply-to-all-type">Apply to all scene</Label>
                </div>
                <Tabs defaultValue="dialogue" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="dialogue">Dialogue</TabsTrigger>
                        <TabsTrigger value="narrator">Narrator</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LeftPanel;