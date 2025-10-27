import { db } from "../db/db.js";

export default async function deleteNoteHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  try {
    const { id } = await req.body;

    // Check if it's the last note
    const { count } = db.prepare("SELECT COUNT(*) as count FROM notes").get();
    if (count === 1) {
      res.status(500).json({
        success: false,
        error: "Cannot delete the only Note",
      });
      return;
    }

    const result = db.prepare("DELETE FROM notes WHERE id = ?").run(id);

    if (result.changes === 1) {
      res.status(200).json({
        success: true,
        message: "Note Deleted",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({
      success: false,
      error: e.message,
    });
  }
}