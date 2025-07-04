import CharacterCard from "@/components/characters/CharacterCard";
import { characters } from "@/data/characters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Characters = () => (
  <div className="animate-in fade-in-50">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">Your Characters</h1>
      <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
        <Plus className="mr-2 h-4 w-4" /> Create New Character
      </Button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {characters.map(char => <CharacterCard key={char.id} character={char} />)}
    </div>
  </div>
);

export default Characters;