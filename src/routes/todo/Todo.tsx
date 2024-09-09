import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CgMore } from "react-icons/cg";
import { IconContext } from "react-icons";
import "./Todo.scss";

interface ITodo {
  todo: {
    category: string;
    content: string;
    created_at: string;
    done: boolean;
    id: number;
    note: string;
    priority: string;
  };
  buttonAction: (id: number) => void;
  updateCheckbox: (id: number, check: boolean) => void;
  setPriority: (id: number, priority: string, check: boolean) => void;
}

function Todo({ todo, buttonAction, updateCheckbox, setPriority }: ITodo) {
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  function handleChangeCheckboxEvent(changeEvent: ChangeEvent<HTMLInputElement>) {
    updateCheckbox(todo.id, changeEvent.target.checked);
    if (changeEvent.target.checked) {
      setPriority(Number(changeEvent.target.id), "4", true);
    } else {
      setPriority(Number(changeEvent.target.id), "3", false);
    }
  }

  const priorityColorTheme = {
    "0": { backgroundColor: "#FF0000", color: "#FFFFFF" },
    "1": { backgroundColor: "#FFAA00", color: "#004488" },
    "2": { backgroundColor: "#00FF00", color: "#000000" },
    "3": { backgroundColor: "#CCCCCC", color: "#000000" },
    "4": { backgroundColor: "#808080", color: "#000000" },
  };

  function setPriorityColor() {
    const priority = todo.priority;
    return priorityColorTheme[priority as keyof typeof priorityColorTheme];
  }

  function createMenuButtons() {
    const html: number[] = [0, 1, 2, 3, 4];

    return html.map((val) => {
      return (
        <button
          id={String(val)}
          key={val}
          onClick={() => {
            setPriority(todo.id, String(val), false);
            setShowPriorityMenu(false);
            // addEventListener("click", myListener);
          }}
          className="priority">
          {val}
        </button>
      );
    });
  }

  function handleOnBlur(e: React.FocusEvent) {
    console.log("blur", e);

    setShowPriorityMenu(false);

    if (e.relatedTarget !== null && e.relatedTarget.className !== "button-priority") {
      console.log("relatetTarget");
      // console.log(e.relatedTarget.innerText);
      console.log(e.relatedTarget.id);
      setPriority(todo.id, e.relatedTarget.id, false);
    }
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
      console.log("---", showPriorityMenu);
    }
  }, [showPriorityMenu]);

  return (
    <div className="todo" style={setPriorityColor()}>
      <button
        // id={String(todo.id)}
        className="button-priority"
        onClick={() => {
          console.log("test");
          setShowPriorityMenu(true);
        }}>
        {todo.priority}
      </button>

      {showPriorityMenu && (
        <div className="button-priority__menu" ref={divRef} tabIndex={-1} onBlur={handleOnBlur}>
          <div className="button-priority__header">Wichtigkeit wählen</div>
          <div className="button-priority__buttons">{createMenuButtons()}</div>
        </div>
      )}

      <input id={String(todo.id)} className="checkbox" type="checkbox" checked={todo.done} onChange={handleChangeCheckboxEvent}></input>

      <label
        htmlFor={String(todo.id)}
        className="todo-note"
        style={todo.done ? { fontStyle: "italic", textDecoration: "line-through" } : { fontStyle: "normal" }}>
        <div className="content" style={todo.done ? { fontStyle: "italic", textDecoration: "line-through" } : { fontStyle: "normal" }}>
          <p>
            {todo.content}
            {/* {", "} */}
          </p>
        </div>
        {todo.note && <p>{todo.note}</p>}
      </label>

      <button
        className="button-action"
        onClick={() => {
          buttonAction(todo.id);
        }}>
        <IconContext.Provider value={{ color: "white", size: "1.4rem" }}>
          <CgMore />
        </IconContext.Provider>
      </button>
      {/* <div>{goTest()}</div> */}
    </div>
  );
}

export default Todo;
