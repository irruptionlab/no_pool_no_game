import cors from 'cors';
import express from 'express';
import { generateNonce, SiweMessage } from 'siwe';
import fs from 'fs';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv'

const ABI = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "player",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
        }
    ],
    "name": "saveScore",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}];

dotenv.config();

const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_ID)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const npng = new ethers.Contract(process.env.NPNG_CONTRACT, ABI, wallet);


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://nopoolnogame.xyz/play',
    credentials: true,
}));



app.get('/nonce', function (_, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(generateNonce());
});

app.post('/verify', async function (req, res) {
    const { message, signature } = req.body;
    const siweMessage = new SiweMessage(message);
    try {
        console.log('1');
        await siweMessage.verify({ signature: signature });
        console.log('2');
        const score = parseInt(message.statement.substring(57));
        console.log('3');
        await npng.saveScore(message.address, score);
        res.send(true);
    } catch {
        res.send(false);
    }
});

app.listen(3000);


// const { address } = useAccount()

// const addressNetwork = useAddressNetwork()
// const [pk, setPk] = useState('0x000000000000000000000000000000000000dEaD')
// console.log(process.env.REACT_APP_PG)
// if (process.env.REACT_APP_PG) {
//     setPk(process.env.REACT_APP_PG)
// }

// const sendScore = async () => {
//     const provider = ethers.getDefaultProvider('goerli', {
//         alchemy: process.env.REACT_APP_ALCHEMY
//     })
//     const signer = new ethers.Wallet(pk, provider);
//     const npng = new ethers.Contract(addressNetwork.npngContract, ABI_Npng, signer)
//     const result = await npng.saveScore(address, timerRef.current.timer.time)
// }
