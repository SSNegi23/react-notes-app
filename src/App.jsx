import { createContext, useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/sidebar";
import NotesContainer from "./Components/notes-container";

export const NotesContext = createContext(null);

function App() {
  const [notes, setNotes] = useState(() => {
    const notes = localStorage.getItem("notes-data");
    if(notes) {
      return JSON.parse(notes);
    }
    return [];
  });

  const addNote = (theme) => {
    setNotes([
      {
        id: Math.random().toString(36),
        text: "",
        theme,
        timestamp: +new Date(),
        editmode: false,
      },
      ...notes,
    ]);
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const saveNote = (noteId, text) => {
    const note = notes.find((note) => note.id === noteId);
    note.text = text;
    note.editmode = false;
    setNotes([...notes]);
  };

  useEffect(() => {
    localStorage.setItem("notes-data", JSON.stringify(notes));
  }, [notes]);

  const value = {
    notes,
    addNote,
    deleteNote,
    saveNote,
  };
  return (
    <NotesContext.Provider value={value}>
      <div className="notes-app">
        <Sidebar />
        <NotesContainer />
      </div>
    </NotesContext.Provider>
  );
}

export default App;
