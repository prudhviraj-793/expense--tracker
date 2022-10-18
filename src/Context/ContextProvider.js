import { useState } from "react";
import Context from "./Context";

function ContextProvider(props) {
  const [user, setUser] = useState({});
  function addUserHandler(user) {
    setUser({ ...user });
  }
  const data = {
    user: user,
    addUser: addUserHandler,
  };
  return <Context.Provider value={data}>{props.children}</Context.Provider>;
}

export default ContextProvider;
