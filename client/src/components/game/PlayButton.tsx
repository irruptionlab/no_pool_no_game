import { Fragment } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import ABI_Npng from '../utils/ABI_Npng.json'
import { useAddressNetwork } from '../utils/useAddressNetwork'


function PlayButton({ setModalPlay, setRealPlay }: { setModalPlay: React.Dispatch<React.SetStateAction<boolean>>, setRealPlay: React.Dispatch<React.SetStateAction<boolean>> }) {
    const addressNetwork = useAddressNetwork()

    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: addressNetwork.npngContract,
        contractInterface: ABI_Npng,
        functionName: 'getPlay',
    })
    const { write } = useContractWrite({
        ...config,
        onSuccess(data) {
            setModalPlay(true)
        }
    })

    return (
        <Fragment>
            {!isSuccess && <a href="/" className="button-2 w-button inactiveLink">No deposit</a>}
            {isSuccess && <a href="/" className="button-2 w-button" onClick={(e) => {
                e.preventDefault()
                setRealPlay(true)
                write?.()
            }}>Play</a>}
        </Fragment>

    )

}

export default PlayButton;