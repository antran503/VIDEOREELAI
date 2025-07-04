import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreatePostSchedule from "@/components/schedule/CreatePostSchedule";

const ContentSchedule = () => {
  const [isCreating, setIsCreating] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date("2025-07-03"));

  if (isCreating) {
    return <CreatePostSchedule onBack={() => setIsCreating(false)} />;
  }

  return (
    <div className="animate-in fade-in-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Content Schedule</h1>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Post Schedule
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-[#1C1C22] p-4 rounded-lg border border-gray-700">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-14 w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-14 w-full p-0 font-normal aria-selected:opacity-100",
              day_selected: "bg-purple-500 text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </div>
        <div className="w-full lg:w-80 bg-[#1C1C22] p-4 rounded-lg border border-gray-700 flex-shrink-0">
          <h3 className="font-semibold text-white mb-4">Schedules</h3>
          <div className="text-center text-gray-400 py-8">
            <p className="text-sm">No data has been scheduled on this date.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSchedule;