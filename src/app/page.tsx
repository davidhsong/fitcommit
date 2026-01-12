import InputForms from "./components/InputForms";

export default function Home() {
  return (
    <main>
      <div>
        <header className="mb-10 text-center md:text-left border-b border-slate-800 pb-6">
          <h1 className="">
            <span>FitCommit</span>
          </h1>
          <p className="text-slate-400">
            Keeping me accountable in gyming and coding
          </p>
        </header>

        <InputForms />

        <div>input charts loading...</div>
      </div>
    </main>
  );
}
