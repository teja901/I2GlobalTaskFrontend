import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import notesApi from "../api/notesApi";
import Breadcrumb from "../components/Breadcrumb";

export default function AddNote() {
  const [form, setForm] = useState({ note_title: "", note_content: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const created = await notesApi.createNote(form);
    
     navigate(`/`)
    } catch (err) {
      alert("Failed to create note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
   
      <Breadcrumb />

      
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a New Note</h2>

      
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="note_title"
              value={form.note_title}
              onChange={onChange}
              required
              placeholder="Enter note title..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Content
            </label>
            <textarea
              name="note_content"
              value={form.note_content}
              onChange={onChange}
              rows={8}
              placeholder="Write your note content here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
