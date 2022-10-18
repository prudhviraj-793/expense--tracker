import { NavLink, Outlet } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <p>Welcome to Expense Tracker</p>
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
