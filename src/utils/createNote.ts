import { db } from "../db/db.js";

export default async function createNoteHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  try {
    db.prepare(`
      INSERT INTO notes (title, content)
      VALUES (?, ?)
    `).run(
      "New Note",
      `# Welcome to Syncinote

> Type your **hearts** out here.
> **Make sure to save changes before switching to another note!!**

Enjoy 😄
`
    );

    res.status(200).json({
      success: true,
      message: "Note Created!",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
}
