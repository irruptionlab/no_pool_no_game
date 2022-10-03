interface itemObject {
    id: number;
    img: string;
    stat: string;
}

interface MemoryforCards {
    key: number;
    item: itemObject;
    id: number;
    handleClick: Function
}

function Card(params: MemoryforCards) {
    const itemClass = params.item.stat ? " active " + params.item.stat : ""

    return (
        <div className={"cardMemory" + itemClass} onClick={() => params.handleClick(params.id)}>
            <img src={params.item.img} alt="" />
        </div>
    )
}

export default Card;