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
    <div>
      <Card title="Workout Logger">
        <form>
          <div>
            <label></label>
            <input></input>
          </div>
        </form>
      </Card>
    </div>
  );
}
