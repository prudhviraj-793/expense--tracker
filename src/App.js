import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorFound from "./Pages/ErrorFound";
import ForgetPassword, { forgetPasswordAction } from "./Pages/ForgetPassword";
import Login, { loginAction } from "./Pages/Login";
import Profile, { profileAction, profileLoader } from "./Pages/Profile";
import Root from "./Pages/Root";
import SignUp, { signupAction } from "./Pages/SignUp";
import Welcome, { AddxpensesAction } from "./Pages/Welcome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorFound />}>
      <Route path="/signup" element={<SignUp />} action={signupAction} />
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route path="/welcome" element={<Welcome />} action={AddxpensesAction} >
        <Route path="profile" element={<Profile />} action={profileAction} loader={profileLoader} />
      </Route>
      <Route
        path="/forgetPassword"
        element={<ForgetPassword />}
        action={forgetPasswordAction}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
