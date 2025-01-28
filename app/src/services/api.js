import axios from "axios";

export const getTodos = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
  return data;
};
