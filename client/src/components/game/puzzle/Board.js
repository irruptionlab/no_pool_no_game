import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants"
import { canSwap, shuffle, swap, isSolved } from "./helpers"

function Board({ isStarted, setIsStarted }) {
    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    console.log('is started:', isStarted)

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles)
        setTiles(shuffledTiles);
    }

    const swapTiles = (tileIndex) => {
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
            const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
            setTiles(swappedTiles)
        }
    }

    const handleTileClick = (index) => {
        swapTiles(index)
    }


    const handleStartClick = () => {
        shuffleTiles()
        setIsStarted(true)
    }

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
    };
    const hasWon = isSolved(tiles)

    if (hasWon) setIsStarted(false)

    return (
        <>
            <ul style={style} className="board">
                {tiles.map((tile, index) => (
                    <Tile
                        key={tile}
                        index={index}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceHeight}
                        handleTileClick={handleTileClick}
                    />
                ))}
            </ul>
            {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
            {!isStarted ?
                (<button className="button button-primary" onClick={() => handleStartClick()}>Start game</button>) :
                <div>en cours</div>
            }
        </>
    );
}

export default Board;
