import axios from "axios";
const apiUrl = process.env.API_URL;

export const fetchTodos = async () => {
  const { data } = await axios.get(
    apiUrl || "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  return data;
};
