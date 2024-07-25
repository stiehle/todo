import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import ErrorPage from "./routes/error/ErrorPage";
import ToDoList from "./routes/todo/TodoList";
import LogIn from "./routes/login/LogIn";

function App() {
  const router = createBrowserRouter([
    {
      path: "/todo/",
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ToDoList /> },
        { path: "login", element: <LogIn /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <ToDoList /> */}
    </>
  );
}

export default App;
