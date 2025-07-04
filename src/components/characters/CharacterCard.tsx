import React from 'react';

interface Character {
  id: string;
  name: string;
  image: string;
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <img src={character.image} alt={character.name} className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="font-bold text-white text-lg">{character.name}</h3>
      </div>
    </div>
  );
};

export default CharacterCard;