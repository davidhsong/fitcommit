"use client";

import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, X, Dumbbell } from "lucide-react";

type Log = {
  id: number;
  date: string;
  exercise: string;
  weight: string;
  sets: string;
  reps: string;
};

export default function WorkoutCalendar({ logs }: { logs: Log[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // 1. CALENDAR MATH
  // Generate all the days to display in the grid (including padding from prev/next months)
  const daysInGrid = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart); // Usually Sunday
    const endDate = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [currentDate]);

  // 2. CHECK IF A DAY HAS LOGS
  const getLogsForDay = (day: Date) => {
    return logs.filter((log) => isSameDay(new Date(log.date), day));
  };

  // 3. GROUP LOGS BY EXERCISE (For the Detail View)
  // Turns flat list -> { "Bench": [Set 1, Set 2], "Squat": [Set 1] }
  const selectedDayLogs = selectedDay ? getLogsForDay(selectedDay) : [];
  const groupedLogs = selectedDayLogs.reduce((acc, log) => {
    if (!acc[log.exercise]) acc[log.exercise] = [];
    acc[log.exercise].push(log);
    return acc;
  }, {} as Record<string, Log[]>);

  // --- RENDER HELPERS ---

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="mt-8 select-none">
      {/* HEADER: Month Name & Flip Buttons */}
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-xl font-bold text-white">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* GRID: Days of Week */}
      <div className="grid grid-cols-7 mb-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-xs font-bold text-slate-500 uppercase tracking-wider py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* GRID: The Dates */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {daysInGrid.map((day) => {
          const dayLogs = getLogsForDay(day);
          const hasWorkout = dayLogs.length > 0;
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toString()}
              onClick={() => setSelectedDay(day)}
              className={`
                relative h-14 md:h-24 border rounded-xl flex flex-col items-start p-2 cursor-pointer transition-all
                ${
                  !isCurrentMonth
                    ? "bg-slate-950/30 border-slate-900 text-slate-600"
                    : "bg-slate-900 border-slate-800 text-slate-300"
                }
                ${
                  hasWorkout
                    ? "hover:border-blue-500/50 hover:bg-slate-800"
                    : "hover:border-slate-700"
                }
                ${
                  isToday
                    ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950"
                    : ""
                }
              `}
            >
              <span
                className={`text-sm font-medium ${
                  !isCurrentMonth ? "opacity-30" : ""
                }`}
              >
                {format(day, "d")}
              </span>

              {/* The "Workout Dot" Indicator */}
              {hasWorkout && (
                <div className="mt-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span className="text-[10px] text-blue-300 font-medium hidden md:block">
                    {dayLogs.length} sets
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- MODAL: DAY DETAIL VIEW --- */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CalendarIcon date={selectedDay} />
                  {format(selectedDay, "EEEE, MMM do")}
                </h3>
                <p className="text-xs text-slate-400">Workout Summary</p>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {Object.keys(groupedLogs).length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Dumbbell className="mx-auto mb-3 opacity-20" size={48} />
                  <p>Rest Day (No logs found)</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedLogs).map(([exercise, sets]) => (
                    <div key={exercise}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-px flex-1 bg-slate-800"></div>
                        <h4 className="text-blue-400 font-bold uppercase tracking-wider text-sm">
                          {exercise}
                        </h4>
                        <div className="h-px flex-1 bg-slate-800"></div>
                      </div>

                      <div className="space-y-2">
                        {sets.map((set, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center bg-slate-950/50 p-3 rounded border border-slate-800/50"
                          >
                            <span className="text-slate-500 text-xs font-mono">
                              SET {i + 1}
                            </span>
                            <div className="flex gap-4">
                              <span className="font-bold text-white text-lg">
                                {set.weight}
                                <span className="text-sm font-normal text-slate-500">
                                  lbs
                                </span>
                              </span>
                              <span className="font-bold text-slate-400 text-lg">
                                {set.sets || set.reps}
                                <span className="text-sm font-normal text-slate-500">
                                  reps
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Mini-Calendar Icon Component
function CalendarIcon({ date }: { date: Date }) {
  return (
    <div className="w-8 h-8 bg-slate-700 rounded flex flex-col items-center justify-center overflow-hidden border border-slate-600">
      <div className="w-full h-2.5 bg-red-500"></div>
      <span className="text-xs font-bold text-white leading-none mt-0.5">
        {format(date, "d")}
      </span>
    </div>
  );
}
