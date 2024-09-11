import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import ErrorPage from "./routes/error/ErrorPage";
import LogIn from "./routes/login/LogIn";
import ToDoList from "./routes/todo/TodoList";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        errorElement: <ErrorPage />,
        children: [{ index: true, element: <ToDoList /> }],
      },
      {
        path: "login",
        element: <LogIn />,
      },
    ],
    { basename: "/todo/" }
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
