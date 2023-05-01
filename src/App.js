import * as React from "react";
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import useFetch from "./customHooks/useFetch";
import { Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";
import Breadcrumbs from "./components/Breadcrumbs";
const UsersList = React.lazy(() => import("./components/UsersList"));
const AlbumsGrid = React.lazy(() => import("./components/AlbumsGrid"));
const PicturesGrid = React.lazy(() => import("./components/PicturesGrid"));
const Photo = React.lazy(() => import("./components/Photo"));

const App = () => {
  const [users] = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <>
      <Breadcrumbs />
      <Routes>
        <Route
          index
          path="/"
          element={
            <React.Suspense
              fallback={
                <div className="loaderWrapper">
                  <CircularProgress
                    size="5rem"
                    style={{ color: "grey", margin: "0 auto" }}
                  />
                </div>
              }
            >
              {users === null ? (
                <div className="loaderWrapper">
                  <CircularProgress
                    size="5rem"
                    style={{ color: "grey", margin: "0 auto" }}
                  />
                </div>
              ) : Object.keys(users).length === 0 ? (
                <p>No Users Available</p>
              ) : (
                <UsersList list={users} />
              )}
            </React.Suspense>
          }
        />
        <Route
          path="/albums/:userId"
          element={
            <React.Suspense
              fallback={
                <div className="loaderWrapper">
                  <CircularProgress
                    size="5rem"
                    style={{ color: "grey", margin: "0 auto" }}
                  />
                </div>
              }
            >
              <AlbumsGrid />
            </React.Suspense>
          }
        />
        <Route
          path="/albums/:userId/pictures/:albumId"
          element={
            <React.Suspense
              fallback={
                <div className="loaderWrapper">
                  <CircularProgress
                    size="5rem"
                    style={{ color: "grey", margin: "0 auto" }}
                  />
                </div>
              }
            >
              <PicturesGrid />
            </React.Suspense>
          }
        />
        <Route
          path="/albums/:userId/pictures/:albumId/photo/:photoId"
          element={
            <React.Suspense
              fallback={
                <div className="loaderWrapper">
                  <CircularProgress
                    size="5rem"
                    style={{ color: "grey", margin: "0 auto" }}
                  />
                </div>
              }
            >
              <Photo />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};
export default App;
