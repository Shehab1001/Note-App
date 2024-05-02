import { Fragment } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import NotesWrapper from "./components/NotesWrapper/NotesWrapper";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotesContextProvider from "./context/NotesContext";

function App() {
  return (
    <Fragment>
      <AuthContextProvider>
        <NotesContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NotesWrapper />
                </ProtectedRoute>
              }
            />
          </Routes>
        </NotesContextProvider>
      </AuthContextProvider>
    </Fragment>
  );
}

export default App;
