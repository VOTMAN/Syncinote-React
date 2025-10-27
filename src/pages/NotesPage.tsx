import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MilkdownEditor, SaveButton } from "../components/MilkdownEditor";
import { MilkdownProvider } from "@milkdown/react";
import getNotes from "../utils/getNotes";
import createNote from "../utils/createNote";
import DeleteButton from "../components/DeleteButton";
import { AskAi } from "../components/AskAi";
import { useToast } from "../Context/ToastProvider";

const NotesPage = () => {
  const { showToast } = useToast();
  const [notes, setNotes] = useState([]);
  const [curNote, setCurNote] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      const n = await getNotes();

      setNotes(n);
      if (n.length === 0) {
        const newNote = await createNote();
        setNotes([newNote]);
        setCurNote(newNote);
      } else {
        setCurNote(n[0]);
      }
    })();
  }, []);

  const handleRename = async () => {
    const newTitle = prompt("Enter a new title:", curNote.title);
    if (!newTitle || newTitle.trim() === "" || newTitle === curNote.title) return;

    const updatedNote = { ...curNote, title: newTitle };
    setCurNote(updatedNote);
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));

    try {
      const { saveNote } = await import("@/utils/saveNote");
      await saveNote({ data: updatedNote });
      showToast("Note renamed!", "success");
    } catch (err) {
      console.error("Failed to save updated title", err);
      showToast("Rename failed!", "error");
    }
  };

  return (
    <div className={`md:grid h-screen ${showSidebar ? "grid-cols-[20%_1fr]" : "grid-cols-1"}`}>
      {/* Sidebar */}
      <aside className={`overflow-y-auto border-r p-4 transition-all duration-300 bg-white shadow-md ${showSidebar ? 'block' : 'hidden'}`}>
        <div className="mb-4">
          <div className="flex justify-between px-0.5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Notes</h2>
            <Link to="/syncPage">💰</Link>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={async () => {
                const newNote = await createNote();
                setNotes([...notes, newNote]);
                setCurNote(newNote);
              }}
              className="absolute right-2 top-1.5 font-bold text-black hover:text-yellow-500"
            >
              +
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-180px)] pr-1 pb-2">
          {notes
            .filter((note) =>
              note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              note.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((note) => (
              <li
                key={note.id}
                onClick={() => setCurNote(note)}
                className={`px-3 py-2 rounded-md cursor-pointer relative transition-colors duration-200 overflow-hidden ${
                  note.id === curNote?.id ? 'bg-yellow-100 text-black font-medium shadow-sm' : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                {note.title}
              </li>
            ))}
        </ul>
      </aside>

      {/* Editor */}
      {curNote && (
        <MilkdownProvider>
          <main className="p-4 border min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="flex gap-3">
                <button onClick={() => setShowSidebar(!showSidebar)}>😄</button>
                <span onClick={handleRename}>📋</span>
              </span>
              <p className="text-2xl font-bold overflow-x-hidden">{curNote.title}</p>
              <span>
                <AskAi />
                <SaveButton note={curNote} />
                <DeleteButton curNote={curNote} setNotes={setNotes} />
              </span>
            </div>

            <div className="border w-full h-full flex-1 resize-none overflow-y-auto">
              <MilkdownEditor content={curNote.content} />
            </div>
          </main>
        </MilkdownProvider>
      )}
    </div>
  );
};

export default NotesPage;
