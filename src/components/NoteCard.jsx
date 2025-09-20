import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import notesApi from "../api/notesApi";

export default function NoteCard({ note, onDeleted }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await notesApi.deleteNote(note.note_id);
      if (onDeleted) onDeleted(note.note_id);
    } catch (err) {
      alert("Failed to delete note");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl p-4 border border-gray-200 hover:shadow-lg transition flex flex-col justify-between">
    
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate">
        {note.note_title}
      </h3>

      
      <p className="text-gray-600 text-sm line-clamp-3 mb-4 break-words">
        {note.note_content || "No content available."}
      </p>

      
      <div className="flex flex-wrap justify-end gap-2 text-sm">
        <Link
          to={`/notes/${note.note_id}`}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-xs sm:text-sm"
        >
          <FiEye /> View
        </Link>
        <Link
          to={`/notes/${note.note_id}/edit`}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition text-xs sm:text-sm"
        >
          <FiEdit2 /> Edit
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition text-xs sm:text-sm"
        >
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
}
