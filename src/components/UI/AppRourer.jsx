import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Switch, redirect} from "react-router-dom";
import Loader from "./Loader/Loader";
import { Fragment } from "react";
import { publickRouters, privateRouters } from "../../components/Router/roter";
import { AuthContext } from "../../context/Context";

const AppRouter = () => {
  let {isAuth, isLoading} = useContext(AuthContext);
  if (isLoading) {
    return <Loader/>
  }
  return (
    isAuth ?
      <Fragment>
        <Routes>
          {privateRouters.map(route =>
            <Route exact path={route.path} element={route.element} key={route.path} />
          )}
        </Routes> 
        <redirect to="/posts"/>
      </Fragment>
            :
      <Fragment>
        <Routes>
        {publickRouters.map(route =>
            <Route exact path={route.path} element={route.element} key={route.path} />
          )}
        </Routes>
        <redirect to="/login"/>
      </Fragment>

    )
}

export default AppRouter;