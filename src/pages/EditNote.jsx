import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import notesApi from "../api/notesApi";
import Breadcrumb from "../components/Breadcrumb";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ note_title: "", note_content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const note = await notesApi.getNote(id);
        setForm({
          note_title: note.note_title || "",
          note_content: note.note_content || "",
        });
      } catch (err) {
        alert("Failed to load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await notesApi.updateNote(id, form);
      navigate(`/notes/${id}`);
    } catch (err) {
      alert("Failed to update note");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading note...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
     
      <Breadcrumb />

      
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Note</h2>

      
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
              placeholder="Update your note content..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          
          <div className="flex justify-between items-center">
            <button
              type="button"
            //   onClick={() => navigate(`/notes/${id}`)}
             onClick={() => navigate(-1)}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
