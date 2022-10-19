import { createContext } from "react";

const Context = createContext({
    users: [],
    expenses: [],
    addExpense: () => {},
    addUser: () => {}
})

export default Context