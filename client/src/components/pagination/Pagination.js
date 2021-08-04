import './Pagination.sass'

const Pagination = props => {

    const {currentPage, itemsPerPage, numberOfItems, onClick } = props
    const numberOfPages = Math.ceil(numberOfItems / itemsPerPage)

    const handleClick = index => {
        onClick(index)
    }

    const getPaginationDOM = () => {
        let paginationDOM = []
        for (let i = 0; i < numberOfPages; i++) {
            paginationDOM.push(
                <button 
                    className={`Pagination__button ${i === currentPage ? 'Pagination__button_active' : ''}`}
                    onClick={i === currentPage ? null : () => {handleClick(i)}}
                >
                    {i + 1}
                </button>
            )
        }
        return paginationDOM
    }

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