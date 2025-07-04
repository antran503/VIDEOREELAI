import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Header = () => (
  <header className="flex items-center justify-end p-2 h-16 flex-shrink-0">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button
          variant="secondary"
          className="rounded-full flex items-center gap-2 bg-transparent hover:bg-gray-800 p-1 pr-3"
      >
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-300" />
          </div>
          <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium">ktsuthanhan</span>
          <span className="text-xs text-gray-400">
              ktsuthanhan@gmail.com
          </span>
          </div>
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
      align="end"
      className="bg-[#1C1C22] border-gray-700 text-white w-56"
      >
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gray-700" />
      <DropdownMenuItem className="focus:bg-gray-700">Profile</DropdownMenuItem>
      <DropdownMenuItem className="focus:bg-red-500/20 focus:text-red-400">Logout</DropdownMenuItem>
      </DropdownMenuContent>
  </DropdownMenu>
  </header>
);

export default Header;