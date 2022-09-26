import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import { ethereum, optimism, polygon } from './contractAddress'


const useAddressNetwork = () => {
    const { chain } = useNetwork()
    const [addressNetwork, setAddressNetwork] = useState({
        usdcContract: '',
        aavePoolContract: '',
        npngContract: '',
        aUsdcContract: '',
        npngToken: ''
    })

    useEffect(() => {
        if (chain) {
            switch (chain.name) {
                case ('Goerli'):
                    setAddressNetwork(ethereum);
                    break;
                case ('Optimism'):
                    setAddressNetwork(optimism);
                    break;
                case ('Polygon Mumbai'):
                    setAddressNetwork(polygon);
                    break;
                default:
                    console.log(`Network ${chain.name} not found`)
            }
        }
    }, [chain])

    return (addressNetwork)
};



export { useAddressNetwork };




