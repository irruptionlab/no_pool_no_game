import { Link } from 'react-router-dom'
import { optimism } from '../../components/utils/contractAddress'

function Optimism() {
    return (
        <div className="wf-section">
            <div className="div-block-33">
                <div className="div-block-34">
                    <h1>No Pool No Game on Optimism </h1><img src="../../images/Optimism.webp" loading="lazy" width="62" alt="" className="image-13" />
                </div>
                <p className="paragraph-user-guide">Optimism offers fast transactions, low fees, and leverages the security the Ethereum network provides.</p>
                <p className="paragraph-user-guide">All you need to use No Pool No Game on Optimism is a crypto wallet, ETH for gas fees, and USDC to deposit into the protocol.<br />If you want all the details on <Link to="/userguide/network/optimism/getting" className="link-42">how to get USDC &amp; ETH on Optimism follow our guidelines</Link>
                </p>
                <h2>Adding Optimism to your wallet</h2>
                <p className="paragraph-user-guide">Optimism is <a href="https://ethereum.org/en/developers/docs/evm/" target="_blank" rel="noreferrer" className="link-23">EVM</a>-equivalent. That makes it easy to use with many existing Ethereum wallets.</p>
                <p className="paragraph-user-guide">In case you are using Metamask: The easiest way to add Optimism to your wallet is by using <a href="https://chainlist.org/chain/10" className="link-25">Chainlist</a>. Simply connect your wallet and tap on “Add to Metamask”.</p>
                <h2>How to Deposit</h2>
                <p className="paragraph-user-guide">Head to the Deposit tab in the No Pool No Game App or <a href="/" className="link-18">follow this link</a>.</p>
                <h6><strong>Step 1: Check the network &amp; enter your deposit amount</strong></h6>
                <p className="paragraph-user-guide">Using No Pool No Game is simple! First, make sure you are on the Optimism network. Enter the amount of USDC you want to deposit and click on <strong>Review deposit</strong>.</p>
                <h6><strong>Step 2 - Approve Tokens for deposit</strong></h6>
                <p className="paragraph-user-guide">To deposit into the Prize Pool, you need to allow the No Pool No Game protocol to access the USDC tokens in your wallet. This happens through an approval transaction to the No Pool No Game Prize Pool contracts. Click on <strong>Confirm approval</strong> in the No Pool No Game App and <strong>confirm</strong> the transaction in your wallet.<br /></p>
                <h6><strong>Step 3 - Deposit Your Tokens</strong></h6>
                <p className="paragraph-user-guide">The &quot;Deposit Confirmation&quot; screen will automatically load after the approval transaction is completed. Click on <strong>Confirm deposit</strong> and <strong>confirm</strong> the deposit transaction in your wallet.</p>
                <p className="paragraph-user-guide">After the transaction has been submitted, you will be forwarded to the &quot;Deposit submitted&quot; screen. You are now eligible to participate all future contests.</p>
                <p className="paragraph-user-guide">To reflect your No Pool No Game deposit, you will receive the <a href="/" className="link-19">npngUSDC</a> ticket token. You can add it to your wallet with the information below:</p>
                <div className="w-row">
                    <div className="column w-col w-col-3">
                        <div className="text-block-39">Ticker</div>
                        <div className="text-block-40">npngUSDC</div>
                        <div className="text-block-40">npngPool</div>
                    </div>
                    <div className="column-2 w-col w-col-9">
                        <div className="text-block-39">Contract Adress</div>
                        <div className="text-block-40">A redeployment is on progress</div>
                        <div className="text-block-40">A redeployment is on progress</div>
                    </div>
                </div>
                <h2>Checking for Prizes</h2>
                <p className="paragraph-user-guide"><em>Prizes must be claimed within 60 days of them being awarded. Unclaimed prizes will no longer be claimable after 60 days.</em></p>
                <p className="paragraph-user-guide">Now that you have a No Pool No Game deposit, you can check what prizes you won on the <a href="/account" className="link-20">Account</a> tab of the No Pool No Game App. </p>
                <p className="paragraph-user-guide">You have up to 60 days to claim a prize whenever you win. Claiming a prize will cost a transaction fee. Multiple prizes can be claimed at once. </p>
                <p className="paragraph-user-guide">Follow <Link to="/userguide/faq" className="link-21">this link</Link> for information about prizes and winning.</p>
                <h2>How to Withdraw</h2>
                <p className="paragraph-user-guide">You can withdraw your deposit from No Pool No Game in the <a href="/account" className="link-22">Account</a> tab of the No Pool No Game App at any time. </p>
                <p className="paragraph-user-guide">To withdraw, choose a deposit and click on <strong>Withdraw</strong>. Next, enter the amount you want to withdraw and click <strong>Review withdrawal</strong>. On the next screen, hit <strong>Confirm withdrawal</strong> and <strong>confirm</strong> the transaction in your wallet.</p>
            </div>
        </div>
    )
}

export default Optimism;