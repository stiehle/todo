import { ChangeEvent } from "react";
import { CgAddR, CgSoftwareDownload } from "react-icons/cg";
import { IconContext } from "react-icons";
import "./Input.css";

interface IField {
  addButton: () => void;
  saveButton: () => void;
  changeText: (text: string) => void;
  valueX: string;
  editMode: boolean;
}

function InputField({ addButton, saveButton, changeText, valueX, editMode }: IField) {
  function handleInputChange(changeEvent: ChangeEvent<HTMLInputElement>) {
    changeText(changeEvent.target.value);
  }

  return (
    <div className="input-field">
      <input className="input-text" onChange={handleInputChange} value={valueX} />
      {editMode === false ? (
        <button
          className="add-button"
          onClick={() => {
            addButton();
          }}>
          <IconContext.Provider value={{ color: "#ffffff", size: "1.8rem" }}>
            <CgAddR />
          </IconContext.Provider>
        </button>
      ) : (
        <button
          className="save-button"
          onClick={() => {
            saveButton();
          }}>
          <IconContext.Provider value={{ color: "#ff0000", size: "1.8rem" }}>
            <CgSoftwareDownload />
          </IconContext.Provider>
        </button>
      )}
    </div>
  );
}

export default InputField;
