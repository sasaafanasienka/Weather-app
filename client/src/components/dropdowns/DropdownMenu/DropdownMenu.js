import { useEffect, useState } from 'react'
import './DropdownMenu.sass'

const DropdownMenu = props => {

    const { closeFunc } = props

    const [timerId, setTimerId ] = useState(null)

    const removeTimeout = () => {
        clearTimeout(timerId)
    }

    const addTimeout = () => {
        const id = setTimeout(closeFunc, 1000)
        setTimerId(id)
    }

    useEffect(() => {
        if (!timerId) { addTimeout() }
        return removeTimeout
    })

    return (
        <div className='DropdownMenu'
            onMouseOver={removeTimeout}
            onMouseOut={addTimeout}
        >
            {props.children}
        </div>
    )
}

export default DropdownMenu