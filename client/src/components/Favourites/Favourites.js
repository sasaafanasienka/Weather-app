import favs from '../../store/FavsStore'
import { observer } from 'mobx-react'
import FavItem from '../FavItem/FavItem.js'
import './Favourites.sass'
import { useState } from 'react'
import Pagination from '../pagination/Pagination'
import Divider from '../dividers/Divider'
import windowSizeStore from '../../store/WindowSizeStore'

const Favourites = observer((props) => {

    const { isAuth } = props
    const ITEMS_PER_PAGE = windowSizeStore.width > 1050 ? 4 : windowSizeStore.width > 600 ? 3 : 2
    const [page, setPage] = useState(0)

    const togglePage = (pageNum) => {
        setPage(pageNum)
    }

    const renderFavs = () => {
        return [...favs.favsList].slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE).map((el) => {
            return(
                <FavItem id={el}/>
            )
        })
    }
    
    return(
        <>
            <Divider>{isAuth ? 'Favourites' : 'Please, sign in if you need to use favorites'}</Divider>
            {
                isAuth &&
                <>
                    <div className='Favourites'
                        onResize={() => {console.log('resize')}}    
                    >
                        {renderFavs()}
                    </div>
                    <Pagination 
                        currentPage={page}
                        itemsPerPage={ITEMS_PER_PAGE}
                        numberOfItems={favs.numberOfFavs}
                        onClick={togglePage}
                    />
                </>
            }
        </>
    )
})

export default Favourites