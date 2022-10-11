import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import { goerli, optimism, polygon } from './contractAddress'


const useAddressNetwork = () => {
    const { chain } = useNetwork()
    const [addressNetwork, setAddressNetwork] = useState(goerli)

    useEffect(() => {
        if (chain) {
            switch (chain.name) {
                case ('Goerli'):
                    setAddressNetwork(goerli);
                    break;
                case ('Optimism'):
                    setAddressNetwork(optimism);
                    break;
                case ('Polygon Mumbai'):
                    setAddressNetwork(polygon);
                    break;
                default:
                    setAddressNetwork(goerli);
                    console.log(`Network ${chain.name} not found`)
            }
        }
    }, [chain])

    return (addressNetwork)
};



export { useAddressNetwork };




