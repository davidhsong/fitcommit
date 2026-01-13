import InputForms from "./components/InputForms";

export default function Home() {
  return (
    <main>
      <div>
        <header className="mb-10 text-center md:text-left md:ml-5 border-b border-slate-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 mt-4">
            <span className="text-transparent bg-clip-text bg-slate-50">
              FitCommit
            </span>
          </h1>
          <p className="text-slate-400">
            Keeping me accountable in gyming and coding
          </p>
        </header>

        <InputForms />

        <div className="mt-8 text-center text-slate-600 text-sm">
          input charts loading...
        </div>
      </div>
    </main>
  );
}
