import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import NotFound from "./components/NotFound";
import Loader from "@/components/Loader";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const AppRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {publicRoutes.map((route) => {
          const Element = route.element;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PublicRoute>
                  <Element />
                </PublicRoute>
              }
            />
          );
        })}

        {privateRoutes.map((route) => {
          const Element = route.element;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute
                  allowedRoles={route.allowedRoles}
                  requiredRole={route.requiredRole}
                  redirectTo={route.redirectTo}
                >
                  <Element />
                </PrivateRoute>
              }
            />
          );
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
