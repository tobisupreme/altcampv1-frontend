import React from 'react'
import { NavLink } from 'react-router-dom'
import mainNavbarStyles from './MainNavbar.module.css'
import { HambergerMenu } from 'iconsax-react';
import { useState } from 'react';

const MainNavbar = () => {
    const [openRegisterOptions, setOpenRegisterOptions] = useState(false)


    return (
        <>
            <nav className={mainNavbarStyles['main-nav']}>
                <NavLink href="">
                    <img src="../src/assets/general/Authlogo.png" alt="logo" />
                </NavLink>
                <ul className={mainNavbarStyles['nav-paths']}>
                    <li><NavLink href="#">Home</NavLink></li>
                    <li><NavLink href="#">About</NavLink></li>
                    <li><NavLink href="#">Features</NavLink></li>
                    <button className={mainNavbarStyles['get-started-btn']}><NavLink href="#">Get Started</NavLink></button>
                    <section className={`${mainNavbarStyles['register-options']} ${openRegisterOptions ? mainNavbarStyles['open'] : ''} `}>
                        <ul>
                            <li>
                                <NavLink>As an Altschooler</NavLink>
                            </li>
                            <li>
                                <NavLink>
                                    As an Instructor/Mentor
                                </NavLink>
                            </li>
                            <li>
                                <NavLink>As a Regular Student</NavLink>
                            </li>
                        </ul>
                    </section>
                    <section className={`${mainNavbarStyles['nav-options']} ${openRegisterOptions ? mainNavbarStyles['open'] : ''} `}>
                        <ul>
                            <li>
                                <NavLink>Home</NavLink>
                            </li>
                            <li>
                                <NavLink>About</NavLink>
                            </li>
                            <li>
                                <NavLink>Features</NavLink>
                            </li>
                        </ul>
                    </section>
                </ul>
                <div className={mainNavbarStyles['options-icon']} onClick={() => {
                    console.log('clicked')
                    setOpenRegisterOptions(prev => !prev)
                }}>
                    <HambergerMenu size="32" color="#fff" />
                </div>

            </nav>
        </>
    );
}

export default MainNavbar
