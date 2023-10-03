import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const isloggedin = () => {
    const accessToken = cookies().get('accessToken')
    if (accessToken) {
        redirect("/dashboard")
    }
}
export default isloggedin

export const authUser = () => {
    const user = cookies().get('auth')
    if (user && user.value) {
        return JSON.parse(user.value)
    } else {
        return null
    }
}