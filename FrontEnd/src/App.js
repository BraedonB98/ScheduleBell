//*Schedule Bell
//Developers: Braedon Bellamy
//Allows for easy scheduling of employees at companies without resources for more professional products.

//*---Imports---*//
//Frameworks-Libraries
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //also import Navigate for default routing

//Elements
import { AuthContext } from "./shared/context/auth-context";
import { UserAuth } from "./shared/hooks/auth-hook";

//Components
import MainNavigation from "./shared/components/Navigation/elements/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/other/elements/LoadingSpinner";
//Styling
import "./App.css";

//Pages
import HomePage from "./landing/pages/Homepage";
import Dashboard from "./landing/pages/Dashboard";
//// Styling for importing pages after "landing page" finishes loading
const AuthPage = React.lazy(() => import("./users/pages/AuthPage"));
const PageNotFound = React.lazy(() => import("./shared/pages/PageNotFound"));

const Staff = React.lazy(() => import("./staff/pages/Staff"));
const Schedule = React.lazy(() => import("./schedule/pages/Schedule"));
const Sales = React.lazy(() => import("./sales/pages/Sales"));
const Location = React.lazy(() => import("./location/pages/Location"));
const Organization = React.lazy(() =>
  import("./organization/pages/Organization")
);

//*---Content---*//

function App() {
  const {
    token,
    login,
    logout,
    UID,
    email,
    firstName,
    lastName,
    imageUrl,
    jobCode,
    permissions,
    phoneNumber,
    preferredName,
  } = UserAuth();
  let routes;
  if (token) {
    //Logged In Routes
    routes = (
      <Routes>
        <Route path="/organization/*" element={<Organization />} />
        <Route path="/location/*" element={<Location />} />
        <Route path="/sales/*" element={<Sales />} />
        <Route path="/schedule/*" element={<Schedule />} />
        <Route path="/staff/*" element={<Staff />} />
        <Route path="/" exact element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    );
  } else {
    //Default Routes
    routes = (
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          UID,
          login,
          logout,
          email,
          firstName,
          lastName,
          imageUrl,
          jobCode,
          permissions,
          phoneNumber,
          preferredName,
        }}
      >
        {" "}
        <Router>
          <MainNavigation />
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
