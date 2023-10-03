'use server'
import { authUser } from "@/utils/Auth"
import Axios from "@/utils/Axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getAllBooks = async () => {
    const data = authUser()
    const userid = data.user.id
    const res = await Axios.get(`books/?userid=${userid}`)
    return res.data
}

export const onLogout = () => {
    cookies().delete('auth')
    cookies().delete('accessToken')
}