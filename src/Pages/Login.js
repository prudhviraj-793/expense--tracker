import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Form, NavLink, redirect } from "react-router-dom";
import { login } from "../API/api";
import { authActions } from "../store/authSlice";

let dispatch
function Login() {
  dispatch = useDispatch()
  return (
    <Fragment>
      <Form method="post" action="/login">
        <div>
          <h3>Login</h3>
        </div>
        <div>
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <div>
          <button>Login</button>
        </div>
        <NavLink to="/forgetPassword">Forgot Password</NavLink>
      </Form>
      <div>
        <p>Don't have an account? Sign Up</p>
      </div>
    </Fragment>
  );
}

export default Login;

export async function loginAction({ request }) {
  const formData = await request.formData();
  const enteredEmail = formData.get("email");
  const enteredPassword = formData.get("password");
  const user = {
    email: enteredEmail,
    password: enteredPassword,
    returnSecureToken: true,
  };
  dispatch(authActions.login())
  let res = await login(user);
  localStorage.setItem(enteredEmail, res.idToken)
  dispatch(authActions.token(res.idToken))
  dispatch(authActions.userId(enteredEmail))
  return redirect("/welcome");
}
