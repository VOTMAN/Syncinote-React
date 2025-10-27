import { db } from "../db/db.js";

export default async function saveNoteHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  try {
    const note = req.body;

    db.prepare(`
      UPDATE notes
      SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(note.title, note.content, note.id);

    res.status(200).json({
      success: true,
      message: "Note Saved",
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
}
