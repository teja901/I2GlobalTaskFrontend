import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const Home = lazy(() => import("../pages/Home"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const AddNote = lazy(() => import("../pages/AddNote"));
const EditNote = lazy(() => import("../pages/EditNote"));
const ViewNote = lazy(() => import("../pages/ViewNote"));
const Profile = lazy(() => import("../pages/Profile"));

export default function AppRoutes() {
  const location = useLocation();

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            element={
              <MainLayout />
            }
          >
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Home />
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/add"
              element={
                <ProtectedRoute>
                  <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
                    <AddNote />
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <ProtectedRoute>
                  <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
                    <ViewNote />
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:id/edit"
              element={
                <ProtectedRoute>
                  <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
                    <EditNote />
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
                    <Profile />
                  </motion.div>
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
