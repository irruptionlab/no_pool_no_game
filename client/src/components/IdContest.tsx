
import { Fragment, useState } from 'react'
import { useContractRead } from 'wagmi';
import ABI_Npng from '../components/utils/ABI_Npng.json'
import { useAddressNetwork } from "../components/utils/useAddressNetwork";
import { ethers } from 'ethers';

function IdContest() {
    const [idContest, setIdContest] = useState('0')

    const addressNetwork = useAddressNetwork()

    useContractRead({
        address: addressNetwork.npngContract,
        abi: ABI_Npng,
        functionName: 'getIdContest',
        onSuccess(data) {
            setIdContest(ethers.utils.formatUnits(data?._hex, 0))
        }
    })


    return (
        <Fragment>
            {idContest}
        </Fragment>

    )
}

export default IdContest;