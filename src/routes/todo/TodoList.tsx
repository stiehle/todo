import { useState, useEffect } from "react";

import InputField from "../../components/Input";
import Todo from "./Todo";
import "./TodoList.scss";
import { fetchData, insertData, updateData, deleteData, checkUser, signOutUser } from "../../utils/supabase";
import { Tables } from "../../types/database.types";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavigationMenu from "../../components/NavigationMenu";
import { formatDateTime } from "../../utils/formatdatetime";

function ToDoList() {
  const [todos, setTodos] = useState<Tables<"tasklist">[]>([]);
  const [action, setAction] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userLogIn, setUserLogIn] = useState<{ user: string; logIn: boolean; user_id: string }>({ user: "", logIn: false, user_id: "" });

  const navigate = useNavigate();

  useEffect(() => {
    checkUserLogIn();
    getData();
  }, []);

  async function checkUserLogIn() {
    const logIn = await checkUser();

    if (logIn.session !== null) {
      setUserLogIn({ user: String(logIn.session.user.email), logIn: true, user_id: logIn.session.user.id });
    } else {
      navigate("/login");
    }
  }

  function checkInputText() {
    let check: string[] = [];
    const inputArray = inputValue.split(",");
    console.log(inputArray);

    for (let item = 1; item < inputArray.length; item++) {
      check.push(inputArray[item]);
    }
    console.log(check);

    const content = inputArray[0];
    const note = check.join(",");

    return { content, note };
  }

  async function insertNewRow() {
    const { content, note } = checkInputText();
    // const inputArray = inputValue.split(",");
    // console.log(inputArray);

    // if (inputArray.length === 1) {
    //   inputArray[0] = inputValue;
    //   inputArray[1] = "";
    // }

    const insert = {
      id: undefined,
      category: "X",
      content: content,
      done: false,
      note: note,
      priority: "3",
      user: userLogIn.user_id,
    };

    await insertData(insert);
    getData();
  }

  async function updateXRow(id: number) {
    // if (!todos) return;
    // const newTodo = todos.filter((element) => {
    //   return element.id === id;
    // });

    const { content, note } = checkInputText();

    // const inputArray = inputValue.split(",");
    // console.log(inputArray);

    // newTodo[0].content = inputArray[0] || "";
    // newTodo[0].note = inputArray[1] || "";

    const data = { id: id, row: { content: content, note: note } };

    await updateData(data);

    getData();
  }

  async function getData() {
    const data = await fetchData();
    if (!data) return;
    setTodos(data);
  }

  async function deleteTodo(id: number) {
    if (!editMode) {
      await deleteData(id);
      getData();
    } else alert("Bitte zuerst speichern!");
  }

  function buttonAction(id: number) {
    if (!editMode) {
      if (action === id) {
        setAction(-1);
      } else {
        setAction(id);
      }
    } else alert("Bitte zuerst speichern!");
  }

  function changeTodo(id: number) {
    setEditMode(true);
    if (!todos) return;
    const newTodo = todos.filter((element) => {
      return element.id === id;
    });
    const content = newTodo[0].content;
    const note = newTodo[0].note;
    setInputValue(content + "," + note);
  }

  function checkTodos() {
    if (todos.length === 0) {
      return <h3>Noch keine Todos</h3>;
    }
    return;
  }

  function setCheckbox(id: number, check: boolean) {
    updateDataRow(id, { done: check });
  }
  // function updatePriority(id: number, priority: string, check: boolean) {
  function updatePriority(id: number, priority: string) {
    updateDataRow(id, { priority: priority });

    // updateDataRow(id, { priority: priority, done: check });

    // if (priority > "3") {
    //   updateDataRow(id, { priority: priority, done: true });
    // } else {
    //   updateDataRow(id, { priority: priority, done: check });
    // }
  }

  async function updateDataRow(id: number, row: {}) {
    await updateData({ id, row });
    getData();
  }

  function sortedTodos() {
    // const newTodos = todos;
    // console.log(newTodos, todos);

    // const newTodos2 = structuredClone(todos);
    // const newTodos2 = { ...todos };
    // console.log(newTodos2);

    // const sorted = newTodos.sort((A, B) => A.priority.localeCompare(B.priority));
    const sorted = todos.sort((A, B) => A.priority.localeCompare(B.priority));
    // const sorted = todos.sort((A, B) => A.priority.localeCompare(B.priority));
    // const sorted = todos.sort((A, B) => Number(A.priority) - Number(B.priority) && A.id + B.id);
    // const sorted = todos.sort((A, B) => Number(A.priority) - Number(B.priority));

    console.log(sorted);

    // const newSorted = newTodos2
    // console.log(newSorted);
    // console.log("sorted", sorted, "new", newSorted);

    return sorted;
  }

  function changeText(text: string) {
    setInputValue(text);
  }

  function addButton() {
    insertNewRow();
    setInputValue("");
  }

  function saveButton() {
    updateXRow(action);

    setInputValue("");
    setEditMode(false);
    setAction(-1);
  }

  async function signOut() {
    await signOutUser();
    navigate("login");
  }

  return (
    <>
      <NavigationMenu />
      <div className="header">
        <InputField addButton={addButton} saveButton={saveButton} changeText={changeText} valueX={inputValue} editMode={editMode} />
        {userLogIn.logIn ? <h1 style={{ color: "#00FF00" }}>Aufgaben </h1> : <h1 style={{ color: "#FF0000" }}>Aufgaben</h1>}
      </div>
      <div className="todo-list">
        {checkTodos()}
        {sortedTodos().map((list) => {
          return (
            <div key={list.id} className="todoItem">
              {action === list.id ? (
                <div className="action-window">
                  <Todo todo={list} buttonAction={buttonAction} updateCheckbox={setCheckbox} setPriority={updatePriority} />
                  <div className="action">
                    <button
                      className="action-buttons"
                      onClick={() => {
                        deleteTodo(list.id);
                      }}>
                      Löschen
                    </button>
                    <button
                      className="action-buttons"
                      onClick={() => {
                        changeTodo(list.id);
                      }}>
                      Ändern
                    </button>
                  </div>
                  <p>
                    id: {list.id} - {formatDateTime(list.created_at)}
                  </p>
                </div>
              ) : (
                <Todo todo={list} buttonAction={buttonAction} updateCheckbox={setCheckbox} setPriority={updatePriority} />
              )}
            </div>
          );
        })}
      </div>
      <div className="log-data">
        <Link to="/login">
          {userLogIn.logIn ? (
            <p style={{ backgroundColor: "#00FF00", color: "#000000" }}>Anmeldung als: {userLogIn.user}</p>
          ) : (
            <p style={{ backgroundColor: "#FF0000", color: "#FFFFFF" }}>keine Anmeldung</p>
          )}
        </Link>
        <button
          onClick={() => {
            signOut();
          }}>
          Abmelden
        </button>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default ToDoList;
