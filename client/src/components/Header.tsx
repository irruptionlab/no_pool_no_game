import ConnectButton from "./ConnectButton"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { Collapse } from "@mui/material"

function Header() {
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div className="navbar-no-shadow wf-section">
            <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-no-shadow-container w-nav">
                <div className="container-regular">
                    <div className="navbar-wrapper">
                        <a href="/" className="navbar-brand w-nav-brand"><img src="images/logo.png" loading="lazy" width="51" srcSet="images/logo-p-500.png 500w, images/logo.png 664w" sizes="50.99433135986328px" alt="" />
                            <div className="text-block">No Pool No Game</div>
                        </a>
                        <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
                            <ul className="nav-menu-2 w-list-unstyled">
                                <li>
                                    <Link to="/" className={pathname === '/' ? 'nav-link-selected' : 'nav-link'}>Deposit</Link>
                                </li>
                                <li>
                                    <Link to="/play" className={pathname === '/play' ? 'nav-link-selected' : 'nav-link'}>Play</Link>
                                </li>
                                <li>
                                    <Link to="/account" className={pathname === '/account' ? 'nav-link-selected' : 'nav-link'}>Account</Link>
                                </li>
                                <li className="mobile-margin-top-10">
                                    <div className="nav-button-wrapper">
                                        <ConnectButton />
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="menu-button-3 w-nav-button">
                            <div className="icon-2 w-icon-nav-menu" onClick={handleClick}>
                                <Collapse in={open}>
                                    <ul>
                                        <li>
                                            <Link to="/" className={pathname === '/' ? 'nav-link-selected' : 'nav-link'}>Deposit</Link>
                                        </li>
                                        <li>
                                            <Link to="/play" className={pathname === '/play' ? 'nav-link-selected' : 'nav-link'}>Play</Link>
                                        </li>
                                        <li>
                                            <Link to="/account" className={pathname === '/account' ? 'nav-link-selected' : 'nav-link'}>Account</Link>
                                        </li>
                                    </ul>
                                </Collapse>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header;