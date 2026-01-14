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

  const saveWorkout = async () => {
    if (!workout.exercise || !workout.weight) {
      alert("you gotta fill in the exercise and weight sections");
      return;
    }
    try {
      const response = await fetch("/api/save-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workout),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Workout was successfully logged and commited to github");
        setWorkout({ exercise: "", weight: "", reps: "", sets: "" });
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to server");
    }
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
              className="w-full bg-slate-800 border border-slate-700 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full bg-slate-800 border border-slate-700 p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-500 mb-1">
                Sets
              </label>
              <input
                name="sets"
                type="number"
                value={workout.sets}
                onChange={handleExerciseChange}
                className="w-full bg-slate-800 border border-slate-700 p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-500 mb-1">
                Reps
              </label>
              <input
                name="reps"
                type="number"
                value={workout.reps}
                onChange={handleExerciseChange}
                className="w-full bg-slate-800 border border-slate-700 p-2 text-white"
              />
            </div>
          </div>

          <button
            onClick={saveWorkout}
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 transition-all"
          >
            <PlusCircle size={18} />
            Log Set
          </button>
        </form>
      </Card>
    </div>
  );
}
