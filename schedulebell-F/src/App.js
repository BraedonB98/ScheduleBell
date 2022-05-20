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
import logo from "./logo.svg";
import "./App.css";

//Pages
//import HomePage from "./users/pages/HomePage";

//// Styling for importing pages after "landing page" finishes loading
//const Dashboard = React.lazy(() => import("./users/pages/Dashboard"));

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
        {/* <Route path="/pageURL" exact element={<Page />} />
        <Route path="/" exact element={<Default />} /> */}
      </Routes>
    );
  } else {
    //Default Routes
    routes = (
      <Routes>
        {/* <Route path="/pageURL" exact element={<Page />} />
        <Route path="*" element={<Default />} /> */}
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
