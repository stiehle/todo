import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

interface IData {
  id: number | undefined;
  category: string;
  content: string;
  done: boolean;
  note: string;
  priority: string;
}

type LogInData = {
  email: string;
  password: string;
};

const supabase = createClient<Database>("https://eotnjocbwmxxfclxgmjx.supabase.co", import.meta.env.VITE_SUPABASE_ACCESS_TOKEN);

export async function checkUser() {
  const { data } = await supabase.auth.getSession();
  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function fetchData() {
  const { data, error } = await supabase.from("tasklist").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}

export async function insertData(insertData: IData) {
  const { data, error } = await supabase.from("tasklist").insert(insertData);
  if (error) {
    console.log(error);
  }

  return data;
}

export async function signInWithPassword(LogInData: LogInData) {
  console.log(LogInData);
  const { error } = await supabase.auth.signInWithPassword({
    email: LogInData.email,
    password: LogInData.password,
  });

  if (error) {
    console.log(error);
    return false;
  } else {
    return true;
  }
}

export async function updateData(updatedData: { id: number; row: {} }) {
  const { data, error } = await supabase.from("tasklist").update(updatedData.row).eq("id", updatedData.id).select();
  if (error) {
    console.log(error);
  }
  return data;
}

export async function deleteData(id: number) {
  const { data, error } = await supabase.from("tasklist").delete().eq("id", id).select();
  if (error) {
    console.log(error);
  }
  return data;
}

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      // redirectTo: "https://stiehle.github.io/todo",
      redirectTo: "http://localhost:5173/todo/",
    },
  });
  console.log(data, error);
}
