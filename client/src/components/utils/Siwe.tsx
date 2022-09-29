
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useEffect, useState } from 'react'
import { BACKEND_ADDR } from './contractAddress'

function Siwe({ score, setModalPlay }: { score: number, setModalPlay: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [nonce, setNonce] = useState('')
    const fetchNonce = async () => {
        try {
            const nonceRes = await fetch(`${BACKEND_ADDR}/nonce`)
            const currentNonce = await nonceRes.text()
            setNonce(currentNonce)
        } catch (error) {
            console.log(error)
        }
    }

    // Pre-fetch random nonce when button is rendered
    // to ensure deep linking works for WalletConnect
    // users on iOS when signing the SIWE message
    useEffect(() => {
        fetchNonce()
    }, [])

    const { address } = useAccount()
    const { chain: activeChain } = useNetwork()
    const { signMessageAsync } = useSignMessage()

    const signIn = async () => {
        try {
            const chainId = activeChain?.id
            if (!address || !chainId) return
            // Create SIWE message with pre-fetched nonce and sign with wallet
            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: `Sign in with Ethereum to the app for saving your score : ${score}`,
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce: nonce,
            })
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })
            // Verify signature
            const verifyRes = await fetch(`${BACKEND_ADDR}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, signature }),
            })
            setModalPlay(false)
            console.log(await verifyRes.text)
            if (!verifyRes.ok) throw new Error('Error verifying message')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <a href="/" className="button-2 w-button" onClick={(e) => {
            e.preventDefault()
            signIn()
        }}>Send the score</a>
    )
}

export default Siwe;