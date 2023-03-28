// ** React Imports
import React from "react";

// ** Axios Import
import axios, { AxiosError } from "axios";

export const useTodos = () => {
  const getTodos = async () => {
    try {
      // Access API
      const endpoint = `/todos`;

      const response = await axios.get(endpoint);

      if (response.status === 200) {
        const { data } = response;
        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      return { error: error };
    }
  };
  return { getTodos };
};
