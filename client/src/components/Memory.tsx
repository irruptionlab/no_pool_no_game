import { useState } from 'react'
import Card from './Card'

function Memory() {
    const [items, setItems] = useState([
        { id: 1, img: '/images/memory/aave.png', stat: "" },
        { id: 1, img: '/images/memory/aave.png', stat: "" },
        { id: 2, img: '/images/memory/bitcoin.png', stat: "" },
        { id: 2, img: '/images/memory/bitcoin.png', stat: "" },
        { id: 3, img: '/images/memory/doge.png', stat: "" },
        { id: 3, img: '/images/memory/doge.png', stat: "" },
        { id: 4, img: '/images/memory/ethereum.png', stat: "" },
        { id: 4, img: '/images/memory/ethereum.png', stat: "" },
        { id: 5, img: '/images/memory/ethglobal.png', stat: "" },
        { id: 5, img: '/images/memory/ethglobal.png', stat: "" },
        { id: 6, img: '/images/memory/NPaUSDC.png', stat: "" },
        { id: 6, img: '/images/memory/NPaUSDC.png', stat: "" },
        { id: 7, img: '/images/memory/polygon_matic.png', stat: "" },
        { id: 7, img: '/images/memory/polygon_matic.png', stat: "" },
        { id: 8, img: '/images/memory/usdc.png', stat: "" },
        { id: 8, img: '/images/memory/usdc.png', stat: "" }
    ].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1)

    const check = (current: number) => {
        if (items[current].id === items[prev].id) {
            items[current].stat = "correct"
            items[prev].stat = "correct"
            setItems([...items])
            setPrev(-1)
        } else {
            items[current].stat = "wrong"
            items[prev].stat = "wrong"
            setItems([...items])
            setTimeout(() => {
                items[current].stat = ""
                items[prev].stat = ""
                setItems([...items])
                setPrev(-1)
            }, 1000)
        }
    }

    const handleClick = (id: number) => {
        if (prev === -1) {
            items[id].stat = "active"
            setItems([...items])
            setPrev(id)
            console.log('a')
        } else {
            check(id)
            console.log('b')
        }
    }
    return (
        <div className="w-layout-grid grid">
            {items.map((item, index) => (

                <Card key={index} item={item} id={index} handleClick={handleClick} />
            ))}
            {/* <div className="div-block-42"></div> */}
        </div>

    )
}

export default Memory;