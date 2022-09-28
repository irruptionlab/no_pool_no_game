import { Link } from "react-router-dom"

function GettingStarted() {
    return (
        <div className="wf-section">
            <div className="div-block-33">
                <h1>Getting started</h1>
                <h2>Preparations for first-timers</h2>
                <p className="paragraph-user-guide">No Pool No Game is multi-chain, meaning it lives across multiple blockchains. Before making a deposit in the No Pool No Game protocol you need to decide which network you want to deposit on. Currently, the No Pool No Game protocol is live on:</p>
                <ul className="list">
                    <li>Ethereum</li>
                    <li>Polygon  <em>(Beginner-friendly due to low transaction fees)</em></li>
                    <li>Optimism</li>
                </ul>
                <h2>You need the following to use No Pool No Game:</h2>
                <h6><strong>1) A cryptocurrency wallet</strong></h6>
                <p className="paragraph-user-guide">No Pool No Game is compatible with a wide variety of crypto wallets. Some of the most common are <a href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-Started-With-MetaMask" target="_blank" rel="noreferrer" className="link-9">Metamask</a> and <a href="https://learn.rainbow.me/" target="_blank" rel="noreferrer" className="link-11">Rainbow</a> <br />Follow one of the links for more information on setting up and securing your wallet. If you want to deposit on Optimism, Ethereum or Polygon, you first have to add the network to your wallet. You can do this in the No Pool No Game dApp, by choosing the Network in the top right corner. </p>
                <h6><strong>1) USDC</strong></h6>
                <p className="paragraph-user-guide">No Pool No Game allows you to deposit USDC on the aforementioned networks. </p>
                <p className="paragraph-user-guide">You can get USDC on Centralized Exchanges, Decentralized Exchanges, or a FIAT Onramp to buy it directly from your bank account or credit card. You can follow the guides for <Link to="/userguide/network/optimism/" className="link-13">Optimism</Link> or <Link to="/userguide/network/polygon/" className="link-14">Polygon</Link>.</p>
                <h6><strong>3) The network&#x27;s native Gas Token</strong></h6>
                <p className="paragraph-user-guide">Depositing, claiming prizes, and withdrawing requires a transaction and will cost a network fee.</p>
                <p className="paragraph-user-guide">To deposit, you need a small amount of the network&#x27;s native gas token in your wallet to cover the transaction fees.</p>
                <h2>You are all set for your first deposit now!</h2>
                <p className="paragraph-user-guide">Follow the links below to the <Link to="/userguide/network" className="link-15">How to Deposit</Link> Guides.</p>
                <h2>Need help?</h2>
                <p className="paragraph-user-guide">Couldn&#x27;t find the correct answer in our <Link to="/userguide/faq" className="link-16">Frequently Asked Questions</Link>?</p>
            </div>
        </div>
    )
}

export default GettingStarted;