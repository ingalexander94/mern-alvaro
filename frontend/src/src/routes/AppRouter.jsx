import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { AuthRouter } from "./AuthRouter";
import { DashboardRouter } from "./DashboardRouter";
import { isAuthenticated } from "store/auth";
import { Loading } from "components/loading/Loading";

export const AppRouter = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticated());
    return () => {}
  }, [dispatch])
  
  const {user, checking} = useSelector(state => state.auth);

  return checking ? <Loading/> : (
    <BrowserRouter>
      <Routes>
        <Route
          path="auth/*"
          element={
            <PublicRouter isAuth={user}>
              <Routes>
                <Route path="/*" element={<AuthRouter />} />
              </Routes>
            </PublicRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter isAuth={user}>
              <Routes>
                <Route path="/*" element={<DashboardRouter />} />
              </Routes>
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
