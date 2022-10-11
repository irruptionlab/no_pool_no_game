import cors from 'cors';
import express from 'express';
import { generateNonce, SiweMessage } from 'siwe';
import fs from 'fs';
import cron from 'node-cron';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv'

const ABI = [
    {
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
    },
    {
        "inputs": [],
        "name": "updateContest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

dotenv.config();

const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_ID)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const npng = new ethers.Contract(process.env.NPNG_CONTRACT, ABI, wallet);

const app = express();
app.use(express.json());
app.use(cors({
    // origin: 'https://nopoolnogame.xyz',
    // credentials: true,
}));


app.get('/nonce', function (_, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(generateNonce());
});

app.post('/verify', async function (req, res) {
    console.log('Save Score');
    const { message, signature } = req.body;
    const siweMessage = new SiweMessage(message);
    try {
        await siweMessage.verify({ signature: signature });
        const score = parseInt(message.statement.substring(57));
        await npng.saveScore(message.address, score);
        res.send(true);
        console.log('Score saved');
    } catch (error) {
        res.send(false);
        console.log(error);

    }
});

app.listen(process.env.PORT || 5000)

cron.schedule('0 0 0 * * *', async () => {
    console.log('Update Contest');
    try {
        await npng.closeContest();
        console.log('Contest Updated');
    }
    catch {
        console.log('Contest Not Updated');
    }
});
