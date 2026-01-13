# FitCommit

## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS, Lucide React, TypeScript, Eslint
- **Backend:** Next.js API Routes, Node.js File System, Node.js Child Process, JSON
- **Database:**

## Architecture

User clicks "Log Set" --> frontend packs data into JSON parcel --> frontend sends POST request to /api/save-log --> backend opens store.json --> backend adds parcel to list --> backend saves file --> backend runs git add, git commit, git push --> backend replies "success" to frontend
