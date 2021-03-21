import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import { Header } from './Components/UIComponents/header';
import { ChangePassword } from "./Components/ForgotPassword/ChangePassword";
import { ForgotPassword } from "./Components/ForgotPassword/ForgotPassword";
import Sidebar from './Components/UIComponents/Sidebar';
import React from 'react';
import SearchResult from './Components/MainComponents/SearchResult';
import Library from './Components/MainComponents/Library';
import History from './Components/MainComponents/History';
import Trending from './Components/MainComponents/Trending';
import Playlist from './Components/MainComponents/Playlist';
import { MyContext } from './Components/Context/MyContext';
import VideoPlay from './Components/MainComponents/VideoPlay';
import Loader from "react-loader-spinner";



function App() {
  const [close, setClose] = React.useState(true);
  const [context, setContext] = React.useState({
    user: JSON.parse(localStorage.getItem('user')),
    loading: false
  });
  return (
    <MyContext.Provider value={[context, setContext]}>
      <div className="App">
        <BrowserRouter>
          <Header close={close} setClose={setClose} />
          <div className="home">
            {close ?
              <div className="">
                <Sidebar />
              </div> : null}
            <div className="">
              {context.loading ? <> <div className="container p-5 abs">
                <div className="row justify-content-center mt-5 p-5">
                  <div className="col-sm-12 text-center">
                    <Loader
                      type="TailSpin"
                      color="Black"
                      height={100}
                      width={100}
                      color={"#ccc"}
                      secondaryColor={"Blue"} />
                  </div>
                </div>
              </div> </> : null}
              <Switch>
                <Route path='/playVideo/:videoId' exact={true} component={VideoPlay} />
                <Route path='/library' exact={true} component={Library} />
                <Route path='/history' exact={true} component={History} />
                <Route path='/trending' exact={true} component={Trending} />
                <Route path='/home' exact={true} component={Home} />
                <Route path='/search/:text' exact={true} component={SearchResult} />
                <Route path='/forgotpassword' exact={true} component={ForgotPassword} />
                <Route path='/changepassword' exact={true} component={ChangePassword} />
                <Route path='/playlist/:name' exact={true} component={Playlist} />
                <Route path='/' component={Home} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </MyContext.Provider>
  );
}

export default App;
