import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { verifyEmail } from "../API/api";

function Welcome() {

  const navigate = useNavigate()

  async function verifyEmailHandler(e) {
    e.preventDefault()
    await verifyEmail()
  }

  function logoutHandler(e) {
    e.preventDefault()
    localStorage.removeItem('user@mail.com')
    navigate('/login')
  }

  return (
    <div>
      <p>Welcome to Expense Tracker</p>
      <button onClick={verifyEmailHandler} >Verify Email</button>
      <button onClick={logoutHandler} >Logout</button>
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
