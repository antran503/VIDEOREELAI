import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-gray-800 bg-transparent px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden bg-transparent border-gray-600 hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col p-0 bg-[#1C1C22] border-r-0"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* Header content can go here */}
      </div>
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
          className="bg-[#1C1C22] border-gray-700 text-white"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="focus:bg-gray-700">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-gray-700">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="focus:bg-red-500/20 focus:text-red-400">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;