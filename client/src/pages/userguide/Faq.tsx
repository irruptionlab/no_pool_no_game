function Faq() {
    return (
        <div className="wf-section">
            <div className="div-block-33">
                <h1>Frequently Asked Questions</h1>
                <h2>General</h2>
                <h3>Where does the prize money come from?</h3>
                <p className="paragraph-user-guide">Prizes are generated on the interest earned on deposited funds. </p>
                <p className="paragraph-user-guide">When a deposit is made into No Pool No Game that deposit is automatically routed to other <a href="https://aave.com/" className="link-5">decentralized finance protocols like Aave</a> to begin earning interest. Protocols like Aave are &quot;fully liquid&quot; meaning deposits can be withdrawn at any time. Additionally, interest accrues every ~15 seconds. Anyone who borrows from Aave must deposit collateral that is greater in value than what they are borrowing. This ensures that loans are never defaulted on. <br /></p>
                <p className="paragraph-user-guide">No Pool No Game is a non-custodial protocol. That means no one has the ability to control the funds deposited. All deposits and withdraws are conducted automatically by the smart contracts making up the No Pool No Game protocol. </p>
                <h3>Do I have to enter for each prize?</h3>
                <p className="paragraph-user-guide">In order to be eligible for the prizes, you need to participate to the contest. Supposing that the contest frequency is once a week, you will have to participate whenever you want during the specific period of time. The countdown visible on the website you let you know when the contest is closing.</p>
                <h3>Is there any penalty to withdraw?</h3>
                <p className="paragraph-user-guide">No! You can add to or withdraw your deposit whenever you desire! Your chances to win a prize might be always the same, however, the amount of the reward is directly correlated on your <strong>average</strong> deposit size over the prize period. </p>
                <p className="paragraph-user-guide">For example, say you have $100 deposited for a full 24 hour prize period. That would mean your average balance for the prize period is $100. Someone else might deposit $200 halfway through the prize period. Their average balance for the prize period day prize period would be $100, even though they deposited more than you, their chance to win would be the same. </p>
                <h3>How are winners chosen? How is it fair?</h3>
                <p className="paragraph-user-guide">The No Pool No Game protocol is decentralized and open source. That means anyone can view and audit the code to verify it is fair and secure. Several professional third parties will audit the No Pool No Game code prior full deployment. </p>
                <p className="paragraph-user-guide">Winners are chosen based on their scores, so everyone has the same chance to win. The game is chosen so everyone can understand the rules instantly. The game will integrate a part of randomness (such as card games), to avoid having always the same winners, however, the specific skills of each participant will also have a non negligible impact on their scores, and therefore ability to win a prize.</p>
                <h3>Is there an advantage to depositing early? </h3>
                <p className="paragraph-user-guide">Yes! Your chances to win a prize might be always the same, however, the amount of the reward is directly correlated on your <strong>average</strong> deposit size over the prize period. <br /></p>
                <p className="paragraph-user-guide">For example, say you have $100 deposited for a full 24 hour prize period. That would mean your average balance for the prize period is $100. Someone else might deposit $200 halfway through the prize period. Their average balance for the prize period day prize period would be $100, even though they deposited more than you, their chance to win would be the same. </p>
                <h3>Can I lose my money? What are the risks?</h3>
                <p className="paragraph-user-guide">Assuming the protocol operates as intended, there is no risk of losing your money.</p>
                <p className="paragraph-user-guide">However, <strong>there are still many risks inherent in using a blockchain-based protocol like this. These risks could result in losing some or all of your money. </strong></p>
                <h3>Are my deposits insured?</h3>
                <p className="paragraph-user-guide">Your deposits are not insured, however, <a href="https://app.nexusmutual.io/cover/buy/get-quote?address=0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be" className="link-8">you can purchase protocol cover here. </a>
                </p>
                <h2>Prizes &amp; Winning 🏆</h2>
                <h3>What are my odds to win?</h3>
                <p className="paragraph-user-guide">Your chances to win a prize are independent on how much you have deposited, however the amount of the reward is directly correlated to the amount you have deposited. The more money you deposit, the higher your reward.<br /></p>
                <h3>How the rewards are calculated?</h3>
                <p className="paragraph-user-guide">Everyone has the same chance to win the contest, but the reward you will get is also correlated to the amount you have deposited into the pool. That&#x27;s why the first one doesn&#x27;t necessarily win the highest reward.<br /></p>
                <p className="paragraph-user-guide">Here is the formula:<br /></p>
                <p className="paragraph-user-guide">(Global interests generated by all the deposits) * [(Winner deposit)/(Total winners deposits)] * [1 - (Ranking / 100)] ^ 5<br /></p>
                <h3>What is No Pool No Game doing with the remaining generated interests not distributed to winners?</h3>
                <p className="paragraph-user-guide">With the above formula, there is always a remaining amount of generated interests that are not distributed to the winners of the specific contest.<br />No Pool No Game is using them as follow:<br />- Pay the required fees to log the participants results onto the blockchains<br />- Remaining interests will be incorporated to next contest prize pool.<br /></p>
                <p className="paragraph-user-guide"><strong>No Pool No Game does not take any fee, profit or remuneration of any kind.</strong><br /></p>
                <h3>How many prizes are awarded?</h3>
                <p className="paragraph-user-guide">The amount of prizes (and therefore the total amount of money awarded) changes dynamically. The numbers displayed are projections based on current data. It is likely that actual prizes awarded will be either higher or lower in any given prize period than what is visualized.</p>
                <h3>How do I get my prizes?</h3>
                <ul className="list">
                    <li>Once a prize has been awarded there is a 24 hour cool down period before you can check your prizes and claim your winnings. This period ensures cross-chain communication has happened correctly.</li>
                    <li>Once the 24 hour cool-down period is completed you can check and claim your winnings</li>
                    <li>Your winnings are claimed in No Pool No Game tickets! This means when you claim them they are automatically added to your deposited balance. When you withdraw you&#x27;ll receive the underlying USDC.</li>
                </ul>
                <h3>How long do I have to claim my prizes?</h3>
                <p className="paragraph-user-guide">Prizes must be claimed within 60 days of them being awarded. Unclaimed prizes will no longer be claimable after 60 days.</p>
            </div>
        </div>
    )
}

export default Faq;