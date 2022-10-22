import { Fragment } from "react";
import { Form, redirect } from "react-router-dom";
import { signup } from "../API/api";

function SignUp() {
  return (
    <Fragment>
      <Form method="post">
        <div>
          <h3>SignUp</h3>
        </div>
        <div>
          <input type="email" placeholder="Email" name="email" required />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="Confirm-password"
            required
          />
        </div>
        <div>
          <button>Sign Up</button>
        </div>
      </Form>
      <div>
        <p>Have an account? Login</p>
      </div>
    </Fragment>
  );
}

export default SignUp;

export async function signupAction({ request }) {
  const formData = await request.formData();
  const enteredEmail = formData.get("email");
  const enteredPassword = formData.get("password");
  const enteredConfirmPassword = formData.get("Confirm-password");
  if (enteredPassword === enteredConfirmPassword) {
    const user = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    await signup(user);
    return redirect("/login");
  } else {
    alert("Please re-enter password");
  }
}
