import { useContext, useState } from "react";
import { NotesContext } from "../../App";
import './styles.css';

const colors = ["#ebcfad", "#f5b0a4", "#84dada", "#eff5b1", "#9adbf6"];

const Sidebar = () => {
  const { addNote } = useContext(NotesContext);
  const [selectedTheme, setSelectedTheme] = useState(colors[0]);
  return (
    <div className="sidebar">
      <button className="add-note-btn" onClick={() => addNote(selectedTheme)}>
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="colors-input-list">
        {colors.map((color) => (
          <div className="color-input" key={color}>
            <input
              type="radio"
              name="color-input"
              value={color}
              id={"color-" + color}
              checked={selectedTheme === color}
              onChange={() => setSelectedTheme(color)}
            />
            <label
              htmlFor={"color-" + color}
              style={{
                background: color,
              }}
            ></label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;