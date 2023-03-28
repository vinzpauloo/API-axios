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

interface Pagination {
  data?: any;
  page?: number;
  itemsPerPage?: number;
}

function App() {
  // State
  const [returnData, setReturnData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

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

  // Pagination
  const paginate = (props: Pagination) => {
    const { data = [], page = 1, itemsPerPage = 10 } = props;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  };

  const paginatedData = paginate({
    data: returnData,
    page: currentPage,
    itemsPerPage: itemsPerPage,
  });

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(returnData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <div style={{ color: "red" }}>Titles</div>
      {paginatedData &&
        paginatedData.map((item: any, index: any) => (
          <div key={index} style={{ display: "flex" }}>
            {item.id}. {item.title}
          </div>
        ))}
      <div>
        <div>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(returnData.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
