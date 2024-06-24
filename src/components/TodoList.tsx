import { useState, useEffect } from "react";

import InputField from "./Input";
import Todo from "./Todo";
import "./TodoList.css";
import { fetchData, insertData, signInWithPassword, updateData, deleteData } from "./supabase";
import { Tables } from "../types/database.types";

function ToDoList() {
  const [todos, setTodos] = useState<Tables<"tasklist">[]>();
  const [action, setAction] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    signIn();
    getData();
  }, []);

  async function signIn() {
    await signInWithPassword();
  }

  async function insertNewRow() {
    const inputArray = inputValue.split(",");

    if (inputArray.length === 1) {
      inputArray[0] = inputValue;
      inputArray[1] = "";
    }
    console.log(inputArray[0], inputArray[1]);

    const insert = {
      id: undefined,
      category: "X",
      content: inputArray[0],
      done: false,
      note: inputArray[1],
      priority: "X",
    };

    const data = await insertData(insert);
    console.log(data);
    // setMyButton(date);
    getData();
  }

  async function updateXRow(id: number) {
    console.log(id);

    if (!todos) return;
    const newTodo = todos.filter((element) => {
      return element.id === id;
    });

    console.log(newTodo);

    const inputArray = inputValue.split(",");
    console.log(inputArray[0], inputArray[1]);

    newTodo[0].content = inputArray[0] || "";
    newTodo[0].note = inputArray[1] || "";

    console.log(newTodo[0]);

    const data = { id: id, column: { content: newTodo[0].content, note: newTodo[0].note } };

    const response = await updateData(data);
    console.log(response);

    getData();
  }

  async function getData() {
    const data = await fetchData();
    if (!data) return;
    setTodos(data);

    // console.log(data);
  }

  async function deleteTodo(id: number) {
    if (!editMode) {
      console.log("Delete ", id);
      const response = await deleteData(id);
      console.log(response);

      getData();
    } else alert("Bitte zuerst speichern!");
  }

  function buttonAction(id: number) {
    console.log("Action", id);
    if (!editMode) {
      if (action === id) {
        setAction(-1);
      } else {
        setAction(id);
      }
    } else alert("Bitte zuerst speichern!");

    console.log("action ", action);
  }

  function changeTodo(id: number) {
    setEditMode(true);
    console.log("Change todo ", id);
    if (!todos) return;
    const newTodo = todos.filter((element) => {
      return element.id === id;
    });
    console.log("New Todo: ", newTodo);
    const content = newTodo[0].content;
    const note = newTodo[0].note;
    console.log(content);
    setInputValue(content + "," + note);
  }

  function checkTodos() {
    if (!todos) {
      return <h3>Noch keine Todos</h3>;
    }
    return;
  }

  function setCheckbox(id: number, check: boolean) {
    updateDataX(id, "done", check);
  }

  function updatePriority(id: number, priority: string) {
    updateDataX(id, "priority", priority);
  }

  async function updateDataX(id: number, col: string, updatedData: string | boolean) {
    console.log(id, updatedData);
    const data = { id: id, column: { [col]: updatedData } };

    const response = await updateData(data);
    console.log(response);

    getData();
  }

  function sortedTodos() {
    const newTodos = todos;
    // const sorted = newTodos.sort((A: any, B: any) => B.priority - A.priority);
    if (!newTodos) return;
    const sorted = newTodos.sort((A, B) => A.priority.localeCompare(B.priority));
    // console.log("sorted: ", sorted);
    return sorted;
  }

  function changeText(text: string) {
    // console.log(text);
    setInputValue(text);
  }

  function addButton() {
    insertNewRow();

    setInputValue("");
  }

  function saveButton() {
    console.log("id =", action, inputValue);

    updateXRow(action);

    setInputValue("");
    setEditMode(false);
    setAction(-1);
  }

  return (
    <>
      <div className="header">
        <h1>Aufgaben</h1>
        <InputField addButton={addButton} saveButton={saveButton} changeText={changeText} valueX={inputValue} editMode={editMode} />
      </div>
      <div className="todo-list">
        {checkTodos()}
        {sortedTodos()?.map((list) => {
          // console.log("###", list);
          return (
            <div key={list.id}>
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
                  <p>{list.created_at}</p>
                </div>
              ) : (
                <Todo todo={list} buttonAction={buttonAction} updateCheckbox={setCheckbox} setPriority={updatePriority} />
              )}
            </div>
          );
        })}
      </div>
      <div className="footer">
        <div className="footer-links">
          <a href="#">Impressum</a>
          <a href="#">Datenschutzerklärung</a>
          <a href="#">www.stiehle.de</a>
        </div>
        <div className="footer-copy">
          <h4>&copy;2024 www.stiehle.de</h4>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
