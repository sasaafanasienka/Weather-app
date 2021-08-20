// import './MainPage.sass'

const ErrorPage = props => {

    return (
        <div className='MainPage'>
            <>
                <div className='MainPage__location'>
                    <p>Not found</p>
                </div>
                <div className='MainPage__temp'>
                    <p className='MainPage__temp'>404</p>
                </div>
                <p className='MainPage__description'>{`Feels like 404`}</p>
            </>
        </div>
    );
}

export default ErrorPage;