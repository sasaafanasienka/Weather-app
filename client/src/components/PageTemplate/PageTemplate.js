import './PageTemplate.sass'
import Header from '../Header/Header.js'

const PageTemplate = (props) => {
    
    return(
        <div className='PageTemplate'>
            <Header/>
            {props.children}
        </div>
        )
}

export default PageTemplate