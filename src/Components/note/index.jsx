import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "../../App";
import './styles.css';

function Note({ note }) {
  const { saveNote, deleteNote } = useContext(NotesContext);
  const [isEditMode, setIsEditMode] = useState(note.editmode);
  const [text, setText] = useState(note.text);
  const textareaRef = useRef(null);

  const handleSaveNote = () => {
    saveNote(note.id, text);
    setIsEditMode(false);
  };

  const getDateString = (timestamp) => {
    const temp = new Date(timestamp).toDateString().split(" ");
    return `${temp[2]} ${temp[1]} ${temp[3]}`;
  };

  const adjustTextareaHeight = () => {
    textareaRef.current.style.maxHeight = "1px";
    textareaRef.current.style.minHeight = "1px";
    textareaRef.current.style.height = "1px";

    textareaRef.current.style.minHeight =
      Math.max(textareaRef.current.scrollHeight, 100) + "px";
    textareaRef.current.style.maxHeight = null;
    textareaRef.current.style.height = null;
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  useEffect(() => {
    window.addEventListener("resize", adjustTextareaHeight);
    return () => {
      window.removeEventListener("resize", adjustTextareaHeight);
    };
  }, []);

  return (
    <div
      className="note"
      style={{
        background: note.theme,
      }}
    >
      <textarea
        ref={textareaRef}
        readOnly={!isEditMode}
        onChange={(e) => setText(e.target.value)}
      >
        {text}
      </textarea>

      <div className="footer">
        <p className="date">{getDateString(note.timestamp)}</p>
        {!isEditMode && (
          <button onClick={() => setIsEditMode(true)}>
            <i className="fa fa-pen"></i>
          </button>
        )}
        {isEditMode && (
          <button onClick={handleSaveNote}>
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
        )}
        <button onClick={() => deleteNote(note.id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default Note;
