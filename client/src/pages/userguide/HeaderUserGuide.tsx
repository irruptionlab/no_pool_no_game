import { Link, useLocation } from "react-router-dom";

function HeaderUserGuide() {
    const { pathname } = useLocation();
    return (
        <div>
            <div className="navbar-no-shadow wf-section">
                <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar-no-shadow-container-2 w-nav">
                    <div className="container-regular">
                        <div className="navbar-wrapper">
                            <a href="/userguide" className="navbar-brand-2 w-nav-brand"><img src="images/logo-npng.ico" loading="lazy" width="61" alt="" />
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
                                        <div data-hover="false" data-delay="0" className="nav-dropdown w-dropdown">
                                            <div className="nav-dropdown-toggle w-dropdown-toggle">
                                                <div className="nav-dropdown-icon w-icon-dropdown-toggle"></div>
                                                <div className="text-block-38">Networks</div>
                                            </div>
                                            <nav className="nav-dropdown-list shadow-three mobile-shadow-hide w-dropdown-list">
                                                <a href="polygon.html" className="nav-dropdown-link w-dropdown-link">Polygon</a>
                                                <a href="optimism.html" className="nav-dropdown-link w-dropdown-link">Optimism</a>
                                                <a href="ethereum.html" className="nav-dropdown-link w-dropdown-link">Ethereum</a>
                                            </nav>
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
                                <div className="w-icon-nav-menu"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="s-parateur"></div>
        </div>
    )
}

export default HeaderUserGuide;