import { useEffect } from 'react'
import './PageSwitcher.sass'

const PageSwitcher = props => {

    const {currentPage, itemsPerPage, numberOfItems, onClick } = props
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage)

    const handleClick = index => {
        onClick(index)
    }

    const getPageSwitcherDOM = () => {
        let pageSwitcherMap = []
        for (let i = 0; i < numberOfPages; i++) {
            if (i !== 0 && i !== numberOfPages - 1 && (i < currentPage - 1 || i > currentPage + 1)) {
                if (pageSwitcherMap[pageSwitcherMap.length - 1] !== '...') {
                    pageSwitcherMap.push('...')
                }
            } else {
                pageSwitcherMap.push(i)
            }
        }
        return pageSwitcherMap.map((el, index) => {
            if (el !== '...') {
                return (
                    <button 
                        key={index}
                        className={`PageSwitcher__button ${el === currentPage ? 'PageSwitcher__button_active' : ''}`}
                        onClick={el === currentPage ? null : () => {handleClick(el)}}
                    >
                        {el + 1}
                    </button>
                )
            } else {
                return (
                    <button 
                        key={index}
                        className={`PageSwitcher__button`}
                    >
                        ...
                    </button>
                )
            }
        })
    }

    useEffect(() => {
        if (currentPage + 1 > numberOfPages) {
            onClick(numberOfPages - 1)
        }
    })

    return (
        <div className='PageSwitcher'>
            <button 
                className={`PageSwitcher__button ${currentPage === 0 ? 'PageSwitcher__button_disabled' : ''}`}
                onClick={currentPage === 0 ? null : () => {handleClick(currentPage - 1)}}
            >
                {'<'}
            </button>
            {getPageSwitcherDOM()}
            <button 
                className={`PageSwitcher__button ${currentPage === numberOfPages - 1 ? 'PageSwitcher__button_disabled' : ''}`}
                onClick={currentPage === numberOfPages - 1 ? null : () => {handleClick(currentPage + 1)}}
            >
                {'>'}
            </button>
        </div>
    )
}

export default PageSwitcher