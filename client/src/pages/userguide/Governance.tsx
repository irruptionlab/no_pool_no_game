function Governance() {
    return (
        <div className="wf-section">
            <div className="div-block-33">
                <h1>Governance <em>(Under development - added to the roadmap)</em></h1>
                <h2>The NPNG Token</h2>
                <p className="paragraph-user-guide">NPNG is the governance token of the No Pool No Game protocol. Control over the protocol rests solely in the hands of the community holding the NPNG tokens. The primary duty of NPNG holder governance is to ensure the growth of the protocol by managing the protocol parameters properly. Those parameters are: <br />- Manage the distribution of the NPNG token<br />- Manage the protocol treasury<br />- Determine parameters of prize pools (i.e., how many winners per week, prize size, etc.) </p>
                <p className="paragraph-user-guide">Anyone holding or delegated 10,000 NPNG tokens can submit changes to the protocol. Once a change has been submitted, it is voted on by NPNG token holders.</p>
                <h2>How Governance Works</h2>
                <p className="paragraph-user-guide">Changes to the No Pool No Game protocol are submitted as governance proposals. Anyone who either holds 10,000 NPNG tokens (0.1% of total supply) OR has 10,000 NPNG tokens delegated to them can submit a governance proposal. Once submitted, governance proposals are voted on for five days. After this period, if the majority of votes are in favor AND at least 100,000 votes have been cast in favor, the proposal will pass. There is a two-day “timelock” before the proposal is actually implemented.</p>
                <h2>Voting</h2>
                <p className="paragraph-user-guide">No Pool No Game governance exists on the Ethereum blockchain and is not limited to the Nopoolnogame.xyz website. There will be many different interfaces you can use to view governance proposals and vote. </p>
                <h2>Delegation</h2>
                <p className="paragraph-user-guide">If you hold NPNG tokens but don’t want to actively participate in governance you can delegate your voting power to others. This action keeps the NPNG tokens in your wallet but allows someone else to vote for you.</p>
                <p className="paragraph-user-guide">If you’d like to have more voting power, you can announce yourself as a Delegate on <a href="https://sybil.org/#/delegates/pooltogether" className="link-57">Sybil.org</a> to allow others to delegate to you. This is a great way to have a bigger voice in governance. </p>
            </div>
        </div>
    )
}

export default Governance;