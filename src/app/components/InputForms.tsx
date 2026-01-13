"use client";

import { useState } from "react";
import { Card } from "./Card";
import { PlusCircle, Save } from "lucide-react";

export default function InputForms() {
  // STATES
  const [workout, setWorkout] = useState({
    exercise: "",
    weight: "",
    reps: "",
    sets: "",
  });

  const [macros, setMacros] = useState({
    protein: "",
    carbs: "",
    fat: "",
  });

  // HANDLERS
  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Workout Logger">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs uppercase text-slate-500 mb-1">
              Exercise Name
            </label>
            <input
              name="exercise"
              value={workout.exercise}
              onChange={handleExerciseChange}
              placeholder="eg. Bench Press"
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs uppercase text-slate-500 mb-1">
                Lbs
              </label>
              <input
                name="weight"
                type="number"
                value={workout.weight}
                onChange={handleExerciseChange}
                placeholder="eg. 135"
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-500 mb-1"></label>
              <input />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-500 mb-1"></label>
              <input />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
