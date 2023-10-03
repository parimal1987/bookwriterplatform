'use client'
import React from 'react'
import { onLogout } from './utils'

interface Props {
    callback?: () => void
}

function LogoutBtn({ callback }: Props) {
    const handleLogout = () => {
        onLogout()
    }
    return (
        <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutBtn