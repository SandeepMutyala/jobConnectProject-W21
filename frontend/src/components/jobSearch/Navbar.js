/* author Arpreet*/
import 'bootstrap/dist/css/bootstrap.min.css';
import React , { Component, useState, useEffect } from 'react';

const Navbar = () => {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary variant-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Job Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Courses</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Post Feed</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;