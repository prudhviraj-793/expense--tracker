import { Form, redirect } from "react-router-dom";
import { editExpeses } from "../API/api";

function EditForm() {
  return (
    <Form method="put">
      <input type="number" placeholder="Enter Amount" name="amount" />
      <input type="text" placeholder="Description" name="description" />
      <select name="category">
        <option value="food">Food</option>
        <option value="travel">travel</option>
        <option value="shopping">shopping</option>
      </select>
      <button type="submit">Add Expense</button>
    </Form>
  );
}

export default EditForm;

export async function editFormAction({ request, params }) {
  const formData = await request.formData();
  const id = params.id
  const updatedExpense = {
    amount: formData.get("amount"),
    description: formData.get("description"),
    category: formData.get("category"),
  };
  await editExpeses(id, updatedExpense)
  return redirect('/welcome')
}
