import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  addExpeses,
  deleteExpeses,
  getExpeses,
  verifyEmail,
} from "../API/api";
import { authActions } from "../store/authSlice";

function Welcome() {
  const isAut = useSelector(state => state.auth.isAuthenticated)
  const token = useSelector(state => state.auth.token)
  const loaderData = useLoaderData()
  let amount = 0
  for(let exp of loaderData) {
    amount += Number(exp.amount)
  }
  const isPremium = amount > 10000
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const allExpenses = loaderData.map((exp) => {
    return (
      <li key={exp.id}>
        {exp.description} - {exp.amount} - {exp.category}{" "}
        <button
          onClick={() => {
            deleteExpeses(exp.id);
          }}
        >
          Delete
        </button>{" "}
        <button onClick={() => {
          navigate(`/editForm/${exp.id}`)
        }}>Edit</button>
      </li>
    );
  });
  async function verifyEmailHandler(e) {
    e.preventDefault();
    await verifyEmail(token);
  }

  function logoutHandler(e) {
    e.preventDefault();
    dispatch(authActions.logout())
    dispatch(authActions.token(''))
    localStorage.clear()
    navigate("/login");
  }

  return (
    <div>
      {isAut && (
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
          {isPremium && <button>Premium</button>}
          <Form method="post" action="/welcome">
            <input type="number" placeholder="Enter Amount" name="amount" required />
            <input type="text" placeholder="Description" name="description" required />
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
      {!isAut && <h3>please login</h3>}
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

export function expensesLoader() {
  return getExpeses()
}

