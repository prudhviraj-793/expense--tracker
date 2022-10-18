import { useContext } from "react";
import { Form } from "react-router-dom";
import { getUsers, updateProfile } from "../API/api";
import Context from "../Context/Context";

function Profile() {
  const ctx = useContext(Context)
  getUsers().then(data => ctx.addUser(data))
  return (
    <Form method="post" action="/welcome/profile">
      <div>
        <h3>Contact Details</h3>
        <button>cancel</button>
      </div>
      <div>
        <label>First Name :</label>
        <input type="text" defaultValue={ctx.user.displayName}  name="name" />
        <label>Profile Photo URL :</label>
        <input type="text" defaultValue={ctx.user.photoUrl}  name="pic-url" />
      </div>
      <div>
        <button>update</button>
      </div>
    </Form>
  );
}

export default Profile;

export async function profileAction({ request }) {
  const formData = await request.formData();
  const token = localStorage.getItem("user@mail.com");
  const details = {
    idToken: token,
    displayName: formData.get("name"),
    photoUrl: formData.get("pic-url"),
  };
  await updateProfile(details);
}
