import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";
import AddPromptModal from "./AddPromptModal";
import { showSuccess } from "@/utils/toast";

interface Prompt {
  id: string;
  title: string;
  text: string;
}

const initialPrompts: Prompt[] = [
  { id: '1', title: 'Cinematic Shot Prompt', text: 'A cinematic wide shot of a lone figure standing on a cliff overlooking a stormy sea, dramatic lighting, high contrast, style of Roger Deakins.' },
  { id: '2', title: 'Gritty Neo-Noir Dialogue', text: 'Write a short, tense dialogue between a cynical detective and a mysterious informant in a rain-soaked alley. The dialogue should be cryptic and hint at a larger conspiracy.' },
];

const PromptsSettings = () => {
  const [prompts, setPrompts] = React.useState(initialPrompts);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddPrompt = (title: string, text: string) => {
    const newPrompt = { id: Date.now().toString(), title, text };
    setPrompts(prev => [...prev, newPrompt]);
    showSuccess("New prompt has been saved.");
  };

  const handleDeletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
    showSuccess("Prompt has been deleted.");
  };

  return (
    <>
      <AddPromptModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleAddPrompt}
      />
      <Card className="bg-[#1C1C22] border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage My Prompts</CardTitle>
          <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-pink-500 to-purple-500">
            <Plus className="mr-2 h-4 w-4" /> Add New Prompt
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {prompts.map(prompt => (
              <AccordionItem key={prompt.id} value={prompt.id} className="bg-[#2A2A33] rounded-lg border-none px-4">
                <AccordionTrigger className="font-semibold hover:no-underline">{prompt.title}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-300 mb-4 whitespace-pre-wrap">{prompt.text}</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => handleDeletePrompt(prompt.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-500/10">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {prompts.length === 0 && (
            <p className="text-center text-gray-500 py-8">No prompts saved yet.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PromptsSettings;