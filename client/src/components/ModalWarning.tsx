function ModalWarning({ setModalWarning }: { setModalWarning: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <div className="modal-wrapper modal-wrapper-claim-winnings" onClick={(e) => { setModalWarning(false) }}>
            <div className="modal-outside-trigger"></div>
            <div className="modal-inner-wrapper ethereum-details-modal">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20"
                    alt="" className="image-18" onClick={(e) => { setModalWarning(false) }} /></div>
                <h2>Notice</h2>
                <h4>No Pool No Game is still in Beta version, major updates and audits are still on going. <br />Please use only Goerli testnet at this stage if you want to participate. <br />Thanks for your support and interest in the project !</h4>
            </div>
        </div>
    )
}

export default ModalWarning;