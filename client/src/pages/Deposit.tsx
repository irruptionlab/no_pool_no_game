import { useState } from 'react';
import Countdown from '../components/Countdown';
import Prize from '../components/Prize';
import UserBalance from '../components/UserBalance';
import SelectNetwork from '../components/utils/SelectNetwork';
import ModalDeposit from '../components/deposit/ModalDeposit';
import Faucet from '../components/utils/Faucet';
import { useAccount, useNetwork } from 'wagmi';

function Deposit() {
    const { isConnected } = useAccount()
    const { chain } = useNetwork()
    const [amount, setAmount] = useState(0.00)
    const [modalDeposit, setModalDeposit] = useState(false);

    const handleDeposit = () => {
        if (amount > 0) {
            setModalDeposit(true)
            const fieldAmount = document.getElementById("field_amount") as HTMLInputElement | null
            if (fieldAmount != null) {
                fieldAmount.value = ''
            }
        }
    }
    return (
        <div className="section cc-store-home-wrap">
            <div className="container-1 cont1pagedeposit w-container">
                <div className="div-block-9">
                    <div className="div-block-15">
                        <div className="div-block-18"><img src="images/traits.png" loading="lazy" width="79" alt="" className="image-6" />
                            <div className="text-block-18">The only GameFi where you can earn money</div>
                            <div className="text-block-18 droite">without taking the risk of loosing any !</div>
                        </div>
                    </div>
                    <div className="text-block-17"><span className="text-span">10</span> prizes. Every single day !</div>
                    <Prize />
                    <div className="text-block-14">Join contest #327</div>
                    <Countdown />
                    <div className="div-block-11">
                        <div className="hr-min-sec">HR</div>
                        <div className="hr-min-sec">MIN</div>
                        <div className="hr-min-sec">SEC</div>
                    </div>
                </div>
            </div>
            <div className="container-2 cont2pagedeposit w-container">
                <div className="div-block-13">
                    <div className="card cardpagedeposit"><img src="images/coin.png" loading="lazy" width="74" height="70" alt="" className="image-3" />
                        <div className="div-block-4">
                            <div className="text-block-3">Deposit on</div>
                            <SelectNetwork />
                        </div><img src="images/Arrow.png" loading="lazy" alt="" className="image" />
                        <div className="div-block-5">
                            <div>Amount</div>
                            <div className="div-block-6"><img src="images/wallet.png" loading="lazy" width="15" height="15" sizes="(max-width: 767px) 14.994329452514648px, (max-width: 991px) 2vw, 14.994329452514648px" srcSet="images/wallet-p-500.png 500w, images/wallet.png 512w" alt="" className="image-7" />
                                <UserBalance setAmount={setAmount} />
                            </div>
                        </div>
                        <div className="div-block-7">
                            <div className="div-block-8"><img src="images/usd-coin-usdc-logo.png" loading="lazy" width="40" height="40" sizes="39.99243927001953px" srcSet="images/usd-coin-usdc-logo-p-500.png 500w, images/usd-coin-usdc-logo-p-800.png 800w, images/usd-coin-usdc-logo-p-2000.png 2000w, images/usd-coin-usdc-logo.png 2000w" alt="" />
                                <div className="text-block-6">USDC</div>
                            </div>
                            <input id="field_amount" type="text" placeholder="0.00" className="text-block-9"
                                onChange={(e) => { e.target.value !== '' ? setAmount(parseFloat(e.target.value)) : setAmount(0.00) }}></input>
                        </div>
                        <div className="text-block-10"><span className="highlight-text">Higher</span> is your deposit, <span className="highlight-text">higher</span> is your <span className="text-span-2">reward</span> ! *</div>
                        <div className="div-block-3"></div>

                        {chain?.name === "Goerli" && <Faucet />}
                        {chain?.name !== "Goerli" && <a href="/" className="button-2 w-button inactiveLink">FAUCET 1000 USDC</a>}
                        <a href="/" className={amount > 0 ? "button-2 w-button" : "button-2 w-button inactiveLink"} onClick={(e) => {
                            e.preventDefault()
                            handleDeposit()
                        }}
                        >{isConnected && amount > 0 ? "Deposit" : (isConnected ? "An amount is required" : "Please connect")}</a><img src="images/pointillés.png" loading="lazy" height="200" alt="" className="image-5" /><img src="../images/coin-2.png" loading="lazy" width="60" alt="" className="image-4" />
                    </div>
                </div>
                <div className="div-block-26">
                    <div className="text-block-19">* Everyone has the same chance to win the contest, but the reward you will get is also correlated to the amount you have deposited into the pool. <a href="about.html" className="link-12">Read more</a>
                    </div>
                </div>
            </div>
            {modalDeposit && <ModalDeposit setModalDeposit={setModalDeposit} amount={amount} />}
        </div >
    )
}

export default Deposit;