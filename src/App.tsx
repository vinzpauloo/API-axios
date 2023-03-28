// ** React Imports
import { useState, useEffect } from "react";

// ** Style Imports
import "./App.css";

// ** Axios
import axios from "axios";

// ** Hooks and Services
import { useTodos } from "./services/api/useTodos";

// ** Axios defaults
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  // State
  const [returnData, setReturnData] = useState([]);

  // Hook
  const { getTodos } = useTodos();

  const handleGetTodos = async () => {
    const response = await getTodos();
    console.log(response);
    setReturnData(response);
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  return (
    <div className="App">
      <div style={{ color: "red" }}>Titles</div>
      {returnData &&
        returnData.map((item: any, index) => (
          <div key={index} style={{ display: "flex" }}>
            {item.id}. {item.title}
          </div>
        ))}
    </div>
  );
}

export default App;
