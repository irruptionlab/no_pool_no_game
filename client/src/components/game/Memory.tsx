import { useState } from 'react'
import Card from './Card'

function Memory({ timerRef, setScore }: { timerRef: React.MutableRefObject<any>, setScore: React.Dispatch<React.SetStateAction<number>> }) {
    const [items, setItems] = useState([
        { id: 1, dup: 1, img: '/images/memory/aave.png', stat: "" },
        { id: 1, dup: 2, img: '/images/memory/aave.png', stat: "" },
        { id: 2, dup: 3, img: '/images/memory/bitcoin.png', stat: "" },
        { id: 2, dup: 4, img: '/images/memory/bitcoin.png', stat: "" },
        { id: 3, dup: 5, img: '/images/memory/doge.png', stat: "" },
        { id: 3, dup: 6, img: '/images/memory/doge.png', stat: "" },
        { id: 4, dup: 7, img: '/images/memory/ethereum.png', stat: "" },
        { id: 4, dup: 8, img: '/images/memory/ethereum.png', stat: "" },
        { id: 5, dup: 9, img: '/images/memory/ethglobal.png', stat: "" },
        { id: 5, dup: 10, img: '/images/memory/ethglobal.png', stat: "" },
        { id: 6, dup: 11, img: '/images/memory/NPaUSDC.png', stat: "" },
        { id: 6, dup: 12, img: '/images/memory/NPaUSDC.png', stat: "" },
        { id: 7, dup: 13, img: '/images/memory/polygon_matic.png', stat: "" },
        { id: 7, dup: 14, img: '/images/memory/polygon_matic.png', stat: "" },
        { id: 8, dup: 15, img: '/images/memory/usdc.png', stat: "" },
        { id: 8, dup: 16, img: '/images/memory/usdc.png', stat: "" }
    ].sort(() => Math.random() - 0.5))

    const [prev, setPrev] = useState(-1)
    const [onGoing, setOnGoing] = useState(false)

    let numberCorrect = 0
    for (let i = 0; i < 16; i++) {
        if (items[i].stat === "correct") {
            numberCorrect++
        }
        if (numberCorrect === 16) {
            timerRef.current.stop()
            setScore(timerRef.current.timer.time)


        }
    }

    const check = (current: number) => {
        if (items[current].id === items[prev].id
            && items[current].dup !== items[prev].dup
            && items[current].stat !== "correct") {
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
            }, 480)
        }
    }

    const handleClick = (id: number) => {
        if (onGoing === false) {
            setOnGoing(true)
            if (prev === -1) {
                items[id].stat = "active"
                setItems([...items])
                setPrev(id)
            } else {
                check(id)
            }
            setTimeout(() =>
                setOnGoing(false), 500
            )
        }
        if (timerRef.current.timer.time === 0) {
            timerRef.current.start()
        }
    }

    return (
        <div className="w-layout-grid grid">
            {items.map((item, index) => (

                <Card key={index} item={item} id={index} handleClick={handleClick} />
            ))}
        </div>

    )
}

export default Memory;