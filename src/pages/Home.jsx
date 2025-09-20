import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notesApi from "../api/notesApi";
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await notesApi.listNotes();
      setNotes(data);
    } catch (err) {
      console.error("Failed to load notes", err);
      alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDeleted = (id) =>
    setNotes((s) => s.filter((n) => n.note_id !== id));

  return (
  <div className="p-6">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
    <h1 className="text-3xl font-bold text-gray-800">Your Notes</h1>
    <button
      onClick={() => navigate("/notes/add")}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
    >
      + Add Note
    </button>
  </div>

  {loading ? (
    <div className="text-gray-600">Loading notes...</div>
  ) : notes.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-xl shadow-inner gap-4 p-4">
      <p className="text-lg text-gray-700 text-center">
        You don’t have any notes yet.
      </p>
      <button
        onClick={() => navigate("/notes/add")}
        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
      >
        Create your first note
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {notes.map((note) => (
        <div
          key={note.note_id}
          className="flex flex-col bg-white rounded-xl shadow p-4 hover:shadow-lg transition break-words"
        >
          <NoteCard note={note} onDeleted={handleDeleted} />
        </div>
      ))}
    </div>
  )}
</div>

  );
}
