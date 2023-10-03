import LogoutBtn from '@/components/Dashboard/LogoutBtn'
import React from 'react'

function Header() {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex d-lg-none align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <h3>Book Writer Platform</h3>
                    </a>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
                        <li><a href="/users" className="nav-link px-2 text-white">Users</a></li>
                        <li><a href="/about" className="nav-link px-2 text-white">About</a></li>
                    </ul>
                    <LogoutBtn />
                </div>
            </div>
        </header>

    )
}

export default Header