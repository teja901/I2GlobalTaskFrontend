import { create } from "zustand";


export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  initialized: false,

 
  initAuth: () => {
    try {
      const token = localStorage.getItem("token");
      const userJson = localStorage.getItem("user");
      let user = null;
      if (userJson) {
        try {
          user = JSON.parse(userJson);
        } catch {
          user = null;
        }
      }
    
      set(() => ({
        token: token || null,
        user: user || null,
        initialized: true,
      }));
    } catch (err) {
     
      set(() => ({ token: null, user: null, initialized: true }));
    }
  },

  setToken: (token) => {
    if (token == null) {
      localStorage.removeItem("token");
      set({ token: null });
      return;
    }
    localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => {
    if (user == null) {
      localStorage.removeItem("user");
      set({ user: null });
      return;
    }
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch {
      
    }
    set({ user });
  },

  logout: () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {}
    set({ token: null, user: null });
  },
}));
