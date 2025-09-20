import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import notesApi from "../api/notesApi";
import Breadcrumb from "../components/Breadcrumb";

export default function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const n = await notesApi.getNote(id);
        setNote(n);
      } catch (err) {
        alert("Failed to load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-red-500">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
     
      <Breadcrumb />

     
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{note.note_title}</h2>
          <div className="flex gap-3">
            <Link
              to={`/notes/${id}/edit`}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Edit
            </Link>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Back
            </Link>
          </div>
        </div>

        
        <div className="prose max-w-full text-gray-700 leading-relaxed break-words overflow-x-auto p-2 bg-gray-50 rounded-lg">
          {note.note_content ? (
            <p>{note.note_content}</p>
          ) : (
            <p className="italic text-gray-400">No content provided.</p>
          )}
        </div>
      </div>
    </div>
  );
}
