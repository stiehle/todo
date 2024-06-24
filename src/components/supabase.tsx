import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const supabase = createClient<Database>("https://eotnjocbwmxxfclxgmjx.supabase.co", import.meta.env.VITE_SUPABASE_ACCESS_TOKEN);

export async function fetchData() {
  const { data, error } = await supabase.from("tasklist").select("*");
  // const { data, error } = await supabase.from("tasklist").select("*").filter("name", "eq", "Linux installieren");
  // const { data, error } = await supabase.from("tasklist").select("name, category");
  if (error) {
    console.log(error);
  }
  console.log(data);

  return data;
}

interface IData {
  id: number | undefined;
  category: string;
  content: string;
  done: boolean;
  note: string;
  priority: string;
}

export async function insertData(insertData: IData) {
  const { data, error } = await supabase.from("tasklist").insert(insertData);
  if (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}

export async function signInWithPassword() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "guenter@stiehle.de",
    password: "javascript01",
  });

  if (error) {
    console.log(error);
  }
  console.log(data);
}

// const data = { id: id, column: { [col]: updatedData } };
export async function updateData(updatedData: { id: number; column: {} }) {
  console.log(updatedData);
  // const x = { priority: dataX.priority };
  // console.log(x);
  const { data, error } = await supabase.from("tasklist").update(updatedData.column).eq("id", updatedData.id).select();
  if (error) {
    console.log(error);
  }
  // console.log(data);
  return data;
}

export async function deleteData(id: number) {
  console.log(id);
  // const x = { priority: dataX.priority };
  // console.log(x);
  const { data, error } = await supabase.from("tasklist").delete().eq("id", id).select();
  if (error) {
    console.log(error);
  }
  // console.log(data);
  return data;
}
