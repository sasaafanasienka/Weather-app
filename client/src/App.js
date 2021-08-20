//styles
import './App.css';
//libs
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SearchForm from './components/SearchForm/SearchForm';
import { useEffect } from 'react';
import { resizeWindow } from './redux/actions/window/resizeWindow';

const App = () => {

  const coords = useSelector(state => { return state.coords })
  const dispatch = useDispatch()

  const handleResize = event => {
    dispatch(resizeWindow(event.target.innerWidth))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {window.removeEventListener('resize', handleResize)}
  })

  return (
    <div className="App">
      <HashRouter>
        <Header/>
        <SearchForm/>
        <Switch>
          <Route exact path='/'>
            {!coords.isLoaded ? <MainPage /> : <Redirect to={`/coords&lat=${coords.lat}&lon=${coords.lon}`} />}
          </Route>
          <Route path={`/coords&:coords`}>
            <MainPage />
          </Route>
          <Route path={`/id&:id`}>
            <MainPage />
          </Route>
          <Route path='*'>
            <ErrorPage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;