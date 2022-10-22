import { Fragment } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getUsers, updateProfile } from "../API/api";

const userId = localStorage.key(0);
const token = localStorage.getItem(userId);

function Profile() {

  const loaderData = useLoaderData();
  const navigate = useNavigate();
  
  function cancelHandler(e) {
    e.preventDefault();
    navigate("/welcome");
  }
  return (
    <Fragment>
      <div>
        <h3>Contact Details</h3>
        <button onClick={cancelHandler}>cancel</button>
      </div>
      <Form method="post" action="/welcome/profile">
        <div>
          <label>First Name :</label>
          <input
            type="text"
            defaultValue={loaderData.displayName}
            name="name"
          />
          <label>Profile Photo URL :</label>
          <input
            type="text"
            defaultValue={loaderData.photoUrl}
            name="pic-url"
          />
        </div>
        <div>
          <button>update</button>
        </div>
      </Form>
    </Fragment>
  );
}

export default Profile;

export async function profileAction({ request }) {
  const formData = await request.formData();
  const details = {
    idToken: token,
    displayName: formData.get("name"),
    photoUrl: formData.get("pic-url"),
  };
  await updateProfile(details);
}

export function profileLoader() {
  return getUsers(token);
}
