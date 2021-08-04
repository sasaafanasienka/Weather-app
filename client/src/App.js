import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import auth from './store/AuthStore'
import weatherStore from './store/WeatherStore'
import AuthPage from './pages/AuthPage/AuthPage';
import RegPage from './pages/AuthPage/RegPage';
import LocationPage from './pages/LocationPage/LocationPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import authStore from './store/AuthStore';
import windowSizeStore from './store/WindowSizeStore';

const App = observer(() => {

  const weatherData = {...weatherStore.data}

  const handleResize = event => {
    windowSizeStore.changeWidth(event.target.innerWidth)
  }

  useEffect(() => {
    authStore.localLogin()
    windowSizeStore.changeWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {window.removeEventListener('resize', handleResize)}
  })

  return (
    <div className="App" onResize={() => {console.log(1)}}>
      <BrowserRouter
        forceRefresh={true}
      >
        <Switch>
          <Route exact path='/'>
            {weatherData.id === undefined ? <LoadingPage/> : <Redirect to={`/${weatherData.id}`} />}
          </Route>
          <Route path='/login' >
            {!auth.isAuth ? <AuthPage/> : <Redirect to='/' />}
          </Route>
          <Route path='/register' >
            {!auth.isAuth ? <RegPage/> : <Redirect to='/' />}
          </Route>
          <Route path='/:id' >
            <LocationPage/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
})

export default App;