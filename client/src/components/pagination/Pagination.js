import { useEffect } from 'react'
import './Pagination.sass'

const Pagination = props => {

    const {currentPage, itemsPerPage, numberOfItems, onClick } = props
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage)

    const handleClick = index => {
        onClick(index)
    }

    const getPaginationDOM = () => {
        let paginationMap = []
        for (let i = 0; i < numberOfPages; i++) {
            if (i !== 0 && i !== numberOfPages - 1 && (i < currentPage - 1 || i > currentPage + 1)) {
                if (paginationMap[paginationMap.length - 1] !== '...') {
                    paginationMap.push('...')
                }
            } else {
                paginationMap.push(i)
            }
        }
        return paginationMap.map((el, index) => {
            if (el !== '...') {
                return (
                    <button 
                        key={index}
                        className={`Pagination__button ${el === currentPage ? 'Pagination__button_active' : ''}`}
                        onClick={el === currentPage ? null : () => {handleClick(el)}}
                    >
                        {el + 1}
                    </button>
                )
            } else {
                return (
                    <button 
                        key={index}
                        className={`Pagination__button`}
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
        <div className='Pagination'>
            <button 
                className={`Pagination__button ${currentPage === 0 ? 'Pagination__button_disabled' : ''}`}
                onClick={currentPage === 0 ? null : () => {handleClick(currentPage - 1)}}
            >
                {'<'}
            </button>
            {getPaginationDOM()}
            <button 
                className={`Pagination__button ${currentPage === numberOfPages - 1 ? 'Pagination__button_disabled' : ''}`}
                onClick={currentPage === numberOfPages - 1 ? null : () => {handleClick(currentPage + 1)}}
            >
                {'>'}
            </button>
        </div>
    )
}

export default Pagination