import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const DATA_PATH = path.join(process.cwd(), 'data/store.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.exercise || !body.weight) {
      return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    let fileData;
    try {
      fileData = fs.readFileSync(DATA_PATH, 'utf8');
    } catch (e) {
      fileData = '{"logs": []}';
    }

    const db = JSON.parse(fileData);

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: 'workout',
      ...body
    };

    db.logs.push(newEntry);

    fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2));

    await commitToGit(newEntry);

    return NextResponse.json({sucess: true, entry: newEntry});

  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({ error: "Server failed to save data" }, { status: 500 });
  }
}

async function commitToGit(entry: any) {
  return new Promise((resolve, reject) => {
    const commitMessage = `feat(workout): ${entry.exercise} ${entry.weight}lbs`;
    const command = `git add . && git commit -m "${commitMessage}" && git push -u origin main`;
    console.log(`Executing Git Command: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Git Error: ${error.message}`);
        resolve(false);
        return;
      }
      console.log(`Git Output: ${stdout}`);
      resolve(true);
    })
  })
}