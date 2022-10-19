import { useState } from "react";
import Context from "./Context";

function ContextProvider(props) {
  const [users, setUser] = useState([]);
  const [expenses, setExpenses] = useState([])
  function addUserHandler(userData) {
    setUser([...users,userData ]);
  }
  function addexpenseHandler(exp) {
    setExpenses([...expenses, exp])
  }
  const data = {
    user: users,
    expenses: expenses,
    addUser: addUserHandler,
    addExpense: addexpenseHandler
  };
  return <Context.Provider value={data}>{props.children}</Context.Provider>;
}

export default ContextProvider;
