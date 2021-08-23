import React, {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import FavItem from '../FavItem/FavItem';
// import Pagination from '../Pagination/Pagination';
import './Favourites.sass'

const Favourites = props => {

    const favs = useSelector(state => {return state.auth.favs})
    const [activePage, setActivePage] = useState(0)
    const windowWidth = useSelector(state => {return state.window.width})
    const ITEMS_PER_PAGE = windowWidth > 925 ? 4 : windowWidth > 700 ? 3 : windowWidth > 475 ? 2 : 1

    const togglePage = (pageNum) => {
        setActivePage(pageNum)
    }

    const getFavsDOM = () => {
        if (favs.length > 0) {
            return favs.slice(activePage * ITEMS_PER_PAGE, (activePage + 1) * ITEMS_PER_PAGE).map((el) => {
                return (
                    <FavItem key={el} id={el} />
                )
            })
        }
        return <FavItem type='nofavs'/>
    }

    return (
        <>
            <div className='Favourites' style={{gridTemplateColumns: `repeat(${ITEMS_PER_PAGE}, 1fr)`}}>
                {getFavsDOM()}
            </div>
            {/* {
                favs.length > 0 && 
                <Pagination
                    currentPage={activePage}
                    itemsPerPage={ITEMS_PER_PAGE}
                    numberOfItems={favs.length}
                    onClick={togglePage}
                />
            } */}
        </>
    );
}

export default Favourites;