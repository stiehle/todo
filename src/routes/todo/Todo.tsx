import { ChangeEvent } from "react";
import { CgMore } from "react-icons/cg";
import { IconContext } from "react-icons";
import "./Todo.css";

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
  setPriority: (id: number, priority: string) => void;
}

function Todo({ todo, buttonAction, updateCheckbox, setPriority }: ITodo) {
  // const [check, setCheck] = useState(todo.done);

  function handleChangeCheckboxEvent(changeEvent: ChangeEvent<HTMLInputElement>) {
    console.log("checkbox", changeEvent);

    updateCheckbox(todo.id, changeEvent.target.checked);
    setPriority(Number(changeEvent.target.id), "Y");

    // console.log("---!", todo, check);
  }

  // function setbColor() {
  //   if (todo.priority === "0") {
  //     return { backgroundColor: "#FF0000", color: "#FFFFFF" };
  //   } else if (todo.priority === "1") {
  //     return { backgroundColor: "#FFAA00", color: "#004488" };
  //   } else if (todo.priority === "2") {
  //     return { backgroundColor: "#00FF00", color: "#000000" };
  //   }
  // }

  // enum PriorityColorTheme {
  //   priority_0 = '{ backgroundColor: "#FF0000", color: "#FFFFFF" }',
  // }

  const priorityColorTheme = {
    "0": { backgroundColor: "#FF0000", color: "#FFFFFF" },
    "1": { backgroundColor: "#FFAA00", color: "#004488" },
    "2": { backgroundColor: "#00FF00", color: "#000000" },
    X: { backgroundColor: "#CCCCCC", color: "#000000" },
    Y: { backgroundColor: "#808080", color: "#000000" },
  };

  function setPriorityColor() {
    const priority = todo.priority;
    // console.log(priority);
    return priorityColorTheme[priority as keyof typeof priorityColorTheme];
  }

  // console.log("---!", todo);
  // <div className="todo" style={setbColor()}></div>
  return (
    <div className="todo" style={setPriorityColor()}>
      <p className="id-number"> {todo.id}</p>
      <select
        className="priority"
        name="priority"
        // defaultValue={"X"}
        value={todo.priority}
        onChange={(e) => {
          setPriority(todo.id, e.target.value);
        }}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="X">...</option>
        <option value="Y">---</option>
      </select>
      <input id={String(todo.id)} className="checkbox" type="checkbox" checked={todo.done} onChange={handleChangeCheckboxEvent}></input>
      <label
        htmlFor={String(todo.id)}
        className="todo-note"
        style={todo.done ? { fontStyle: "italic", textDecoration: "line-through" } : { fontStyle: "normal" }}>
        <div>
          <div className="content" style={todo.done ? { fontStyle: "italic", textDecoration: "line-through" } : { fontStyle: "normal" }}>
            {todo.content}
          </div>
          {todo.note && (
            <>
              {", "}
              {todo.note}
            </>
          )}
        </div>
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
    </div>
  );
}

export default Todo;
