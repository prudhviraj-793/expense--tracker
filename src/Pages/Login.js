import { Fragment } from "react";
import { Form, redirect } from "react-router-dom";
import { login } from "../API/api";

function Login() {
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
        <p>Forgot Password</p>
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
  try {
    let res = await login(user);
    localStorage.setItem(enteredEmail, res.idToken)
  } catch (error) {
    alert(error)
    return
  }
  return redirect("/welcome");
}
