import { Link, useLocation } from "react-router-dom";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from "react";



function HeaderUserGuide() {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(!open);
    }



    const { pathname } = useLocation();
    return (
        <div className="navbar-no-shadow wf-section">
            <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-no-shadow-container-2 w-nav">
                <div className="container-regular">
                    <div className="navbar-wrapper">
                        <a href="/userguide" className="navbar-brand-2 w-nav-brand"><img src="../images/logo-npng.ico" loading="lazy" width="61" alt="" />
                            <div className="text-block-37">No Pool No Game <span className="text-span-3">User Guide</span></div>
                        </a>
                        <nav role="navigation" className="nav-menu-wrapper-2 w-nav-menu">
                            <ul className="nav-menu-3 w-list-unstyled">
                                <li>
                                    <Link to="/userguide" aria-current="page" className={pathname === '/userguide' ? 'nav-link-2-selected' : 'nav-link-2'} onClick={(e) => {
                                    }}>About</Link>
                                </li>
                                <li>
                                    <Link to="/userguide/faq" className={pathname === '/userguide/faq' ? 'nav-link-2-selected' : 'nav-link-2'} onClick={(e) => {
                                    }}>FAQ</Link>
                                </li>
                                <li>
                                    <Link to="/userguide/gettingstarted" className={pathname === '/userguide/gettingstarted' ? 'nav-link-2-selected' : 'nav-link-2'} onClick={(e) => {
                                    }}>Getting started</Link>
                                </li>
                                <li>
                                    <Link to="/userguide/governance" className={pathname === '/userguide/governance' ? 'nav-link-2-selected' : 'nav-link-2'} onClick={(e) => {
                                    }}>Governance</Link>
                                </li>
                                <li>
                                    <div className="nav-dropdown">
                                        <List
                                            sx={{ width: '100%', maxWidth: 360 }}
                                            component="nav"
                                            aria-labelledby="nested-list-subheader"
                                        >
                                            <ListItemButton onClick={handleClick}>
                                                <ListItemText primary="Network"
                                                    disableTypography={true} />
                                                {open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <List disablePadding>
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <Link to="/userguide/network" className="nav-link-2" onClick={handleClick}>Goerli</Link>
                                                    </ListItemButton>
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <Link to="/userguide/network/optimism" className="nav-link-2" onClick={handleClick}>Optimism</Link>
                                                    </ListItemButton>
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <Link to="/userguide/network/polygon" className="nav-link-2" onClick={handleClick}>Polygon</Link>
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        </List>
                                    </div>
                                </li>
                                <li className="mobile-margin-top-10">
                                    <div className="nav-button-wrapper">
                                        <a href="/" className="button-primary-2 w-button">Go to App</a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="menu-button-4 w-nav-button">
                            <div className="w-icon-nav-menu" onClick={handleClick}>
                                <Collapse in={open}>
                                    <ul>
                                        <li>
                                            <Link to="/userguide" className={pathname === '/userguide' ? 'nav-link-selected' : 'nav-link'}>About</Link>
                                        </li>
                                        <li>
                                            <Link to="/userguide/faq" className={pathname === '/userguide/faq' ? 'nav-link-selected' : 'nav-link'}>FAQ</Link>
                                        </li>
                                        <li>
                                            <Link to="/userguide/gettingstarted" className={pathname === '/userguide/gettingstarted' ? 'nav-link-selected' : 'nav-link'}>Getting Started</Link>
                                        </li>
                                        <li>
                                            <Link to="/userguide/governance" className={pathname === '/userguide/governance' ? 'nav-link-selected' : 'nav-link'}>Governance</Link>
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

export default HeaderUserGuide;