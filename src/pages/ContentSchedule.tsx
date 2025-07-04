import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import CreatePostSchedule from "@/components/schedule/CreatePostSchedule";
import { DayContent, DayContentProps } from "react-day-picker";
import { showSuccess } from "@/utils/toast";

// Helper to format date to YYYY-MM-DD string
const formatDate = (dateToFormat: Date): string => {
  return dateToFormat.toISOString().split('T')[0];
};

const ContentSchedule = () => {
  const [isCreating, setIsCreating] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date("2025-07-03"));
  const [notes, setNotes] = React.useState<Record<string, string>>({
    '2025-07-10': 'Bắt đầu quay cho Dự án X.',
    '2025-07-15': 'Họp nhóm và xem lại kịch bản.',
    '2025-07-22': 'Hạn chót nộp bản dựng cuối cùng cho khách hàng.',
  });
  const [currentNote, setCurrentNote] = React.useState('');

  React.useEffect(() => {
    if (date) {
      const dateKey = formatDate(date);
      setCurrentNote(notes[dateKey] || '');
    } else {
      setCurrentNote('');
    }
  }, [date, notes]);

  const handleSaveNote = () => {
    if (!date) return;
    const dateKey = formatDate(date);
    const newNotes = { ...notes };
    if (currentNote.trim()) {
      newNotes[dateKey] = currentNote.trim();
    } else {
      delete newNotes[dateKey];
    }
    setNotes(newNotes);
    showSuccess("Ghi chú đã được lưu!");
  };

  const DayWithNote = (props: DayContentProps) => {
    const dateKey = formatDate(props.date);
    const hasNote = !!notes[dateKey];
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <DayContent {...props} />
        {hasNote && <div className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-pink-500"></div>}
      </div>
    );
  };

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
            className="w-full"
            components={{
              DayContent: DayWithNote,
            }}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4 w-full",
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
        <div className="w-full lg:w-80 bg-[#1C1C22] p-6 rounded-lg border border-gray-700 flex-shrink-0 flex flex-col">
          <h3 className="font-semibold text-white mb-4">
            {date ? `Ghi chú cho ${date.toLocaleDateString('vi-VN')}` : "Chọn một ngày"}
          </h3>
          {date ? (
            <div className="flex flex-col flex-grow space-y-4">
              <Textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Thêm ghi chú cho ngày này..."
                className="bg-[#2A2A33] border-gray-600 min-h-[150px] resize-none flex-grow focus-visible:ring-purple-500"
              />
              <Button onClick={handleSaveNote} className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                Lưu ghi chú
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8 flex-grow flex items-center justify-center">
              <p className="text-sm">Chọn một ngày để xem hoặc thêm ghi chú.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentSchedule;