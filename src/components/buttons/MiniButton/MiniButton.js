import './MiniButton.sass'

const MiniButton = props => {

    const {icon, onClick, style} = props
    
    return(
        <button className='MiniButton' onClick={onClick} style={style} >
            <img src={icon}></img>
        </button>
    )

}

export default MiniButton