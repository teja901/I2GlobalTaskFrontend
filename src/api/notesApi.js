import api from "./axios";

const createNote = async (payload) => {
  const res = await api.post("/notes", payload);
  return res.data;
};

const listNotes = async () => {
  const res = await api.get("/notes");
  return res.data;
};

const getNote = async (noteId) => {
  const res = await api.get(`/notes/${noteId}`);
  return res.data;
};

const updateNote = async (noteId, payload) => {
  const res = await api.put(`/notes/${noteId}`, payload);
  return res.data;
};

const deleteNote = async (noteId) => {
  const res = await api.delete(`/notes/${noteId}`);
  return res.status === 204;
};

export default { createNote, listNotes, getNote, updateNote, deleteNote };
