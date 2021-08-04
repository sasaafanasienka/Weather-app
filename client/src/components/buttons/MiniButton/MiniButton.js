import './MiniButton.sass'

const MiniButton = props => {

    const {icon, onClick} = props
    
    return(
        <button className='MiniButton' onClick={onClick}>
            <img src={icon}></img>
        </button>
    )

}

export default MiniButton