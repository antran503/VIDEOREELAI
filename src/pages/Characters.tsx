import * as React from 'react';
import CharacterCard from "@/components/characters/CharacterCard";
import { characters as initialCharacters } from "@/data/characters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FaceSwapModal from '@/components/script-editor/FaceSwapModal';
import AddVoiceModal from '@/components/script-editor/AddVoiceModal';
import CreateCharacterModal from '@/components/characters/CreateCharacterModal';

type Character = { id: string; name: string; image: string };

const Characters = () => {
  const [characters, setCharacters] = React.useState<Character[]>(initialCharacters);
  const [selectedCharacter, setSelectedCharacter] = React.useState<Character | null>(null);
  const [isFaceSwapModalOpen, setFaceSwapModalOpen] = React.useState(false);
  const [isAddVoiceModalOpen, setAddVoiceModalOpen] = React.useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = React.useState(false);

  const handleFaceSwapClick = (character: Character) => {
    setSelectedCharacter(character);
    setFaceSwapModalOpen(true);
  };

  const handleAddVoiceClick = (character: Character) => {
    setSelectedCharacter(character);
    setAddVoiceModalOpen(true);
  };

  const handleCharacterCreated = (name: string, image: string) => {
    const newCharacter = {
      id: Date.now().toString(),
      name,
      image,
    };
    setCharacters(prev => [...prev, newCharacter]);
  };

  return (
    <>
      <FaceSwapModal 
        open={isFaceSwapModalOpen} 
        onOpenChange={setFaceSwapModalOpen} 
        character={selectedCharacter} 
      />
      <AddVoiceModal 
        open={isAddVoiceModalOpen} 
        onOpenChange={setAddVoiceModalOpen} 
        character={selectedCharacter} 
      />
      <CreateCharacterModal
        open={isCreateModalOpen}
        onOpenChange={setCreateModalOpen}
        onCharacterCreated={handleCharacterCreated}
      />

      <div className="animate-in fade-in-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Your Characters</h1>
          <Button 
            onClick={() => setCreateModalOpen(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Character
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {characters.map(char => (
            <CharacterCard 
              key={char.id} 
              character={char} 
              onFaceSwap={handleFaceSwapClick}
              onAddVoice={handleAddVoiceClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Characters;