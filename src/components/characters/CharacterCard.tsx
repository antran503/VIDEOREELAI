import React from 'react';
import { Button } from '@/components/ui/button';
import { Replace, Voicemail } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  image: string;
}

interface CharacterCardProps {
  character: Character;
  onFaceSwap: (character: Character) => void;
  onAddVoice: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onFaceSwap, onAddVoice }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <img src={character.image} alt={character.name} className="w-full aspect-[3/4] object-cover transition-transform duration-300" />
      
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button size="sm" className="bg-black/70 text-white hover:bg-black w-36" onClick={() => onFaceSwap(character)}>
          <Replace className="mr-2 h-4 w-4" /> Face Switch
        </Button>
        <Button size="sm" className="bg-black/70 text-white hover:bg-black w-36" onClick={() => onAddVoice(character)}>
          <Voicemail className="mr-2 h-4 w-4" /> Add Voice
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="font-bold text-white text-lg">{character.name}</h3>
      </div>
    </div>
  );
};

export default CharacterCard;