import { Link } from "react-router-dom";

function Footer() {
    return (
        <section className="footer-subscribe wf-section">
            <div className="container-4">
                <div className="footer-form-two w-form">
                    <form id="wf-form-Footer-Form-Two" name="wf-form-Footer-Form-Two" data-name="Footer Form Two" method="get" className="footer-form-container-two">
                        <div className="footer-form-title">Subscribe to our Newsletter</div>
                        <div className="footer-form-block-two"><input type="email" className="footer-form-input w-input" name="Footer-Email-Two-2" data-name="Footer Email Two 2" aria-label="Enter your email" placeholder="Enter your email" id="Footer-Email-Two-2" /><input type="submit" value="Subscribe Now" data-wait="Please wait..." className="button-primary-3 footer-form-button w-button" /></div>
                    </form>
                    {/* <div className="success-message w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div> */}
                </div>
                <div className="footer-wrapper-three">
                    <div className="footer-block-three">
                        <Link to="/userguide/#top" className="footer-link-three">About</Link>
                        <Link to="/userguide/faq" className="footer-link-three">FAQ</Link>
                        <Link to="/userguide/gettingstarted" className="footer-link-three">Getting started</Link>
                        <Link to="/userguide/governance" className="footer-link-three">Governance</Link>
                        <Link to="/userguide/network" className="footer-link-three">Networks</Link>
                    </div>
                    <div className="footer-social-block-three">
                        <a href="/" className="footer-social-link-three w-inline-block"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124a705912aaeb_facebook%20big%20filled.svg" loading="lazy" alt="" /></a>
                        <a href="/" className="footer-social-link-three w-inline-block"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124ab37a12aaf0_twitter%20big.svg" loading="lazy" alt="" /></a>
                        <a href="/" className="footer-social-link-three w-inline-block"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124a61f512aaed_instagram%20big.svg" loading="lazy" alt="" /></a>
                        <a href="/" className="footer-social-link-three w-inline-block"><img src="https://uploads-ssl.webflow.com/62434fa732124a0fb112aab4/62434fa732124a717f12aaea_youtube%20small.svg" loading="lazy" alt="" /></a>
                    </div>
                </div>
                <div className="footer-divider-two"></div>
                <div className="footer-bottom">
                    <div className="footer-copyright">© 2022 Powered by Irruption Lab</div>
                </div>
            </div>
        </section>

    )
}

export default Footer;