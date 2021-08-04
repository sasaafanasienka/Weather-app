import './Divider.sass'

const Divider = props => {
    return (
        <div className='Divider__container'>
            <div className='Divider__line'></div>
            <span className='Divider__text'>{props.children}</span>
            <div className='Divider__line'></div>
        </div>
    )
}

export default Divider