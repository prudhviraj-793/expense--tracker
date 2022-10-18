import { NavLink, Outlet } from "react-router-dom";
import { verifyEmail } from "../API/api";

function Welcome() {

  async function verifyEmailHandler() {
    await verifyEmail()
  }

  return (
    <div>
      <p>Welcome to Expense Tracker</p>
      <button onClick={verifyEmailHandler} >Verify Email</button>
      <div>
        <p>Your profile is incomplete.<NavLink to='profile'>Complete now</NavLink></p>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Welcome;
