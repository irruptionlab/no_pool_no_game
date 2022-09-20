import Ranking from "../components/Ranking";
import UserDeposit from "../components/UserDeposit";
import ReadingDeposit from "../components/utils/ReadingDeposit"
import { ethereum, optimism, polygon } from "../components/utils/contractAddress"

function Account() {
    return (
        <div className="section cc-store-home-wrap">
            <div className="container-1 cont1pageaccount w-container">
                <div className="div-block-9">
                    <div className="div-block-15">
                        <div className="div-block-18">
                            <div className="text-block-35">Your contest</div>
                            <div className="text-block-27">ranking history</div><img src="images/traits.png" loading="lazy" width="79" alt="" className="image-6 position-3" />
                        </div>
                    </div>
                    <Ranking />
                    <div className="div-block-29"><img src="images/next.png" loading="lazy" width="33" alt="" className="image-12" /></div>
                </div>
            </div>
            <div className="container-2 cont2pageaccount w-container">
                <div className="div-block-13">
                    <div className="card cardpageaccount"><img src="images/coin.png" loading="lazy" width="74" height="70" alt="" className="image-3" /><img src="images/Arrow.png" loading="lazy" alt="" className="image account-positionning" />
                        <div className="text-block-32">TOTAL BALANCE</div>
                        <UserDeposit />
                        <div className="text-block-32">Deposits</div>
                        <div className="div-block-30">
                            <div className="div-block-31"><img src="images/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png" loading="lazy" height="23" width="23" alt="" />
                                <div className="text-block-30">Polygon</div>
                            </div>
                            <ReadingDeposit network={polygon} />
                        </div>
                        <div className="div-block-30">
                            <div className="div-block-31"><img src="images/Optimism.webp" loading="lazy" height="23" width="23" alt="" />
                                <div className="text-block-30">Optimism</div>
                            </div>
                            <ReadingDeposit network={optimism} />
                        </div>
                        <div className="div-block-30">
                            <div className="div-block-31"><img src="images/ethereum-eth-logo.png" loading="lazy" height="23" width="23" sizes="22.990549087524414px" srcSet="images/ethereum-eth-logo-p-500.png 500w, images/ethereum-eth-logo-p-800.png 800w, images/ethereum-eth-logo-p-1080.png 1080w, images/ethereum-eth-logo-p-1600.png 1600w, images/ethereum-eth-logo-p-2000.png 2000w, images/ethereum-eth-logo-p-2600.png 2600w, images/ethereum-eth-logo-p-3200.png 3200w" alt="" />
                                <div className="text-block-30">Ethereum</div>
                            </div>
                            <ReadingDeposit network={ethereum} />
                        </div>
                        <div className="div-block-3"></div>
                        <div className="div-block-30">
                            <div className="div-block-31"><img src="images/trophy.png" loading="lazy" height="23" width="23" sizes="22.990549087524414px" srcSet="images/trophy-p-500.png 500w, images/trophy.png 512w" alt="" />
                                <div className="text-block-34">Total claimed winnings</div>
                            </div>
                            <div className="div-block-32">
                                <div className="text-block-31">$ 0.00</div><img src="images/next.png" loading="lazy" width="25" height="25" alt="" />
                            </div>
                        </div>
                        <div className="div-block-30">
                            <div className="div-block-31"><img src="images/trophy.png" loading="lazy" height="23" width="23" sizes="22.990549087524414px" srcSet="images/trophy-p-500.png 500w, images/trophy.png 512w" alt="" />
                                <div className="text-block-30">Pending winnings</div>
                            </div>
                            <div className="div-block-32">
                                <div className="text-block-31">$ 0.00</div><img src="images/next.png" loading="lazy" width="25" height="25" alt="" />
                            </div>
                        </div><img src="images/pointillés.png" loading="lazy" height="200" alt="" className="image-5 position-2" /><img src="images/coin-2.png" loading="lazy" width="60" alt="" className="image-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;