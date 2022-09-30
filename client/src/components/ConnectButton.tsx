import { ConnectKitButton } from "connectkit";

function ConnectButton() {
    return (
        <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress }) => {
                return (
                    <div onClick={show} className="button-primary w-button">
                        {isConnected ? truncatedAddress : "Connect Wallet"}
                    </div>
                );
            }}
        </ConnectKitButton.Custom>
    );
};

export default ConnectButton;