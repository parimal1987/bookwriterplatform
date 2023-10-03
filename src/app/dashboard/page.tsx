import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Dashboard } from '@/components'

function page() {
    const accessToken = cookies().get('accessToken')
    if (!accessToken) {
        redirect("/")
    }
    return (
        <Dashboard />
    )
}

export default page