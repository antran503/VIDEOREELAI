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
import { RefreshCw, Sparkles } from "lucide-react";

const RightPanel = () => {
  return (
    <div className="w-80 bg-[#1C1C22] p-4 space-y-4 overflow-y-auto">
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
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="media">
          <AccordionTrigger>Media</AccordionTrigger>
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="character-dialogue">
          <AccordionTrigger>Character Dialogue</AccordionTrigger>
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="sound-effects">
          <AccordionTrigger>Sound Effects</AccordionTrigger>
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="volume">
          <AccordionTrigger>Volume</AccordionTrigger>
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
        <AccordionItem value="settings">
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default RightPanel;