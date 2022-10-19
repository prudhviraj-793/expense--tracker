import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { addExpeses, getExpeses, verifyEmail } from "../API/api";

function Welcome() {
  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const allExpenses = loaderData.map(exp => {
    return <li key={exp.id} >{exp.description} - {exp.amount} - {exp.category} </li>
  })
  async function verifyEmailHandler(e) {
    e.preventDefault();
    await verifyEmail();
  }

  function logoutHandler(e) {
    e.preventDefault();
    localStorage.removeItem("user@mail.com");
    navigate("/login");
  }

  return (
    <div>
      {Object.keys(localStorage).length > 0 && (
        <div>
          <p>Welcome to Expense Tracker</p>
          <button onClick={verifyEmailHandler}>Verify Email</button>
          <button onClick={logoutHandler}>Logout</button>
          <div>
            <p>
              Your profile is incomplete.
              <NavLink to="profile">Complete now</NavLink>
            </p>
          </div>
          <Form method="post" action="/welcome">
            <input type="number" placeholder="Enter Amount" name="amount" />
            <input type="text" placeholder="Description" name="description" />
            <select name="category">
              <option value="food">Food</option>
              <option value="travel">travel</option>
              <option value="shopping">shopping</option>
            </select>
            <button type="submit">Add Expense</button>
          </Form>
          {loaderData.length > 0 && (
            <div>
              <ul>{allExpenses}</ul>
            </div>
          )}
        </div>
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Welcome;

export async function AddxpensesAction({ request }) {
  const formData = await request.formData();
  const expense = {
    amount: formData.get("amount"),
    description: formData.get("description"),
    category: formData.get("category"),
  };
  await addExpeses(expense);
}

export function addExpensesLoader() {
  return getExpeses();
}
