import "./App.css";

// import { createClient } from "@supabase/supabase-js";

import ToDoList from "./components/TodoList";
// import { Database } from "./types/database.types";

// const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ACCESS_TOKEN);

function App() {
  // fetchData();

  // async function fetchData() {
  //   const { data, error } = await supabase.from("tasklist").select("*");
  //   // const { data, error } = await supabase.from("tasklist").select("*").filter("name", "eq", "Linux installieren");
  //   // const { data, error } = await supabase.from("tasklist").select("name, category");
  //   if (error) {
  //     console.log(error);
  //   }
  //   console.log(data);
  //   return data;
  // }

  return (
    <>
      <ToDoList />
    </>
  );
}

export default App;
