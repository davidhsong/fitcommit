import fs from "fs";
import path from "path";
import InputForms from "./components/InputForms";
import WorkoutCalendar from "./components/WorkoutCalendar";

// Helper to get data securely on the server
async function getLogs() {
  const filePath = path.join(process.cwd(), "data/store.json");
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.logs || [];
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const logs = await getLogs();

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-12">
      {/* SECTION 1: LOGGING */}
      <section>
        <header className="mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-white">Log Session</h1>
          <p className="text-slate-400">
            Record your sets. They will sync to GitHub.
          </p>
        </header>
        <InputForms />
      </section>

      {/* SECTION 2: HISTORY CALENDAR */}
      <section>
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold text-white">History</h2>
          <div className="h-px flex-1 bg-slate-800"></div>
        </div>
        {/* Pass the data to the calendar */}
        <WorkoutCalendar logs={logs} />
      </section>
    </div>
  );
}
