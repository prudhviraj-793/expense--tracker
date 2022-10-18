import { Fragment } from "react"
import { Form } from "react-router-dom"
import { resetPassword } from "../API/api"

function ForgetPassword() {
    return (
        <Fragment>
            <p>Enter Registered Email</p>
            <Form method="post" action="/forgetPassword" >
                <input type='email' name="email" placeholder="Email" />
                <button>Send Email</button>
            </Form>
        </Fragment>
    )
}

export default ForgetPassword

export async function forgetPasswordAction({request}) {
    const formData = await request.formData()
    const details = {
        requestType: 'PASSWORD_RESET',
        email: formData.get('email')
    }
    await resetPassword(details)
}