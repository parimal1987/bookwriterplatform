'use server'
import { cookies } from 'next/headers'

type LoginCookie = {
    accessToken: string
}

export const setLoginCookies = (data: LoginCookie) => {
    const { accessToken } = data
    cookies().set('accessToken', accessToken)
    cookies().set('auth', JSON.stringify(data))
}

