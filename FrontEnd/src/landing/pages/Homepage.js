//*---Imports---*//
//Frameworks-Libraries
import React from "react";
//Elements

//Components
import FeatureDisplay from "../components/homepage/FeatureDisplay";
import Headline from "../components/homepage/Headline";
//Styling
import "./styling/Homepage.css";

//*---Content---*//

const Homepage = () => {
  return (
    <React.Fragment>
      <Headline
        demo="./images/Headline.jpg"
        demoAlt="Store Shop Front"
        title="Schedule Bell"
        subtitle="Reinventing Small Business Scheduling"
      />

      <FeatureDisplay
        demo={`./images/Team.jpg`}
        demoAlt="Group of people working as a team"
        title="Better, Faster, and Easier Team Management"
        alignContent="right"
      >
        We helps remove the uncertainty for employees in scheduling with easy
        and fast ways for them to check the most up to date schedule released by
        management, your team will be able to stop worrying about if they work
        and focus on the work.
      </FeatureDisplay>

      <FeatureDisplay
        demo={`./images/Organized.jpg`}
        demoAlt="Shape Art"
        title="Organization Made Easy"
      >
        We helps remove the uncertainty for employees in scheduling with easy
        and fast ways for them to check the most up to date schedule released by
        management, your team will be able to stop worrying about if they work
        and focus on the work.
      </FeatureDisplay>

      <FeatureDisplay
        demo={`./images/Network.jpg`}
        demoAlt="Network"
        title="Robust Network and Servers"
        alignContent="right"
      >
        Our software utilized servers of some of the largest tech giants on the
        market like amazon and google to ensure that servers are well
        maintained, reducing the amount of downtime allowing you to not worry
        about if the system is working.
      </FeatureDisplay>

      <FeatureDisplay
        demo={`./images/Data.jpg`}
        demoAlt="Data Network"
        title="Data Driven Decisions"
        alignContent="left"
      >
        With the use of sophisticated algorithms, we help you plan your schedule
        around your needs. Reducing the amount of time employees are sitting
        around with nothing to do and therefor saving you money.
      </FeatureDisplay>
    </React.Fragment>
  );
};

export default Homepage;
