import './SearchForm.sass'
import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import getRequestUrl from '../../utilits/getRequestUrl'

const SearchForm = observer(() => {

    const history = useHistory()

    const [textToSearch, setTextToSearch] = useState('')
    const [hints, setHints] = useState([])
    const [hintsVisibility, setHintsVisibility] = useState(false)
    const [focus, setFocus] = useState(0)

    const setText = async (event) => {
        setTextToSearch(event.target.value)
        if (event.target.value.length >= 3) {
            const URL = await getRequestUrl([event.target.value], 'find')
            const response = await fetch(URL)
            const data = await response.json()
            setFocus(0)
            if (response.ok) {
                setHints(data.list)
            }
        } else {
            setHints([])
        }
    }

    const search = async (event) => {
        event.preventDefault()
        if (hints.length > 0) {
            history.push(`/${hints[focus].id}`)
        }
    }

    const getHintsDOM = () => {
        if ( hints.length === 0 ) { return null }
        return hints.map((el, index) => {
            return (
                <button 
                    type='button'
                    key={el.id}
                    id={index}
                    onClick={historyPush}
                    onMouseOver={changeFocusByMouse}
                    className={`${index === focus ? 'SearchForm__hints-button_selected' : 'SearchForm__hints-button'}`}
                >
                    <img src={`https://www.countryflags.io/${el.sys.country}/flat/16.png`} alt='country flag'></img>
                    {`${el.name}, ${el.sys.country} ${Math.round(el.main.temp)}\u00B0C`}
                </button>
            )
        })
    }

    const changeFocus = (event) => {
        if (event.code === 'ArrowDown') { event.preventDefault(); setFocus(focus === hints.length - 1 ? 0 : focus + 1) }
        if (event.code === 'ArrowUp') { event.preventDefault(); setFocus(focus === 0 ? hints.length - 1 : focus - 1) }
    }

    const changeFocusByMouse = (event) => {
        setFocus(Number(event.target.id))
    }

    const historyPush = (event) => {
        history.push(`/${hints[event.target.id].id}`)
    }

    const blur = (event) => {
        if (!event.relatedTarget || !event.relatedTarget.classList.contains('SearchForm__hints-button_selected')) {
            setHintsVisibility(false)
        } else {
            event.target.focus()
        }
    }

    return(
        <form onSubmit={search} action='search' className='SearchForm'>
            <div className='SearchForm__input' >
                <input
                    fluid
                    action='Search'
                    placeholder='Search...'
                    icon='search'
                    iconPosition='left'
                    onChange={setText}
                    onKeyUp={changeFocus}
                    onFocus={() => {setHintsVisibility(true)}}
                    onBlur={blur}
                />
                { hintsVisibility && hints.length > 0 ? 
                    <div className='SearchForm__hints'>
                        {getHintsDOM()}
                    </div>
                    : null
                }
            </div>
            <button type='submit' className={`SearchForm__button ${textToSearch.length < 2 ? 'SearchForm__button_disabled' : ''}`}>Search</button>
        </form>
    )
})

export default SearchForm