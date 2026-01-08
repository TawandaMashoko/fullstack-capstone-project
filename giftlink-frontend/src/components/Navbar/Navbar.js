import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link className="navbar-brand fw-bold" to="/">GiftLink</Link>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">

                    <li className="nav-item">
                        <a className="nav-link" href="/home.html">Home</a> {/* Static homepage */}
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Gifts</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/app/search">Search</Link>
                    </li>

                    <li className="nav-item">
                        {/* ✅ Use React Router paths */}
                        <Link className="nav-link" to="/app/login">Log In</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/app/register">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
