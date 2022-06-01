import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Detail from "./pages/detail/Detail";
import ScrollToTop from "./components/scrolltotop/Scrolltotop";
import MovieNation from "./pages/movietheater/MovieNation";
import MovieYear from "./pages/movietheater/MovieYear";
import MovieTheater from "./pages/movietheater/MovieGenre";
import "./sass/main.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./authContext/AuthContext";
import UserPage from "./pages/userPage/UserPage";
import ActorPage from "./pages/actorPage/ActorPage";
import MovieSeries from "./pages/movietheater/MovieSeries";

const App = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          {user ? (
            <Home setLoading={setLoading} />
          ) : (
            <Redirect to="/register" />
          )}
        </Route>
        <Route path="/register">
          {!user ? <Register setLoading={setLoading} /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {!user ? <Login setLoading={setLoading} /> : <Redirect to="/" />}
        </Route>
        {user && (
          <>
            <Route path="/watch">
              <Watch />
            </Route>

            <Route path="/phimchieurap">
              <MovieTheater />
            </Route>
            <Route path="/nation">
              <MovieNation />
            </Route>
            <Route path="/year">
              <MovieYear />
            </Route>
            <Route path="/type">
              <MovieSeries />
            </Route>
            <Route path="/detail">
              <Detail />
            </Route>
            <Route path="/userpage">
              <UserPage />
            </Route>
            <Route path="/actorpage">
              <ActorPage />
            </Route>
          </>
        )}
      </Switch>
      <ScrollToTop />
    </Router>
  );
};

export default App;
