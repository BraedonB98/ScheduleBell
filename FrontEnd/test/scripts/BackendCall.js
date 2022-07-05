import Organization from "../json/organization/organization.json";
import MainLocation from "../json/location/locationMain.json";
import AltLocation from "../json/location/locationAlt.json";
import UserNoAuth from "../json/user/userAuth0.json";
import UserAuthLoc from "../json/user/userAuthLocation.json";
import UserAuthOrg from "../json/user/userAuthOrg.json";
import MainSchedule from "../json/schedule/mainSchedule.json";
import MainArchivedSchedule from "../json/schedule/mainArchivedSchedule.json";

const getOrganization = () => {
  return Organization;
};
const getMainLocation = () => {
  return MainLocation;
};
const getAltLocation = () => {
  return AltLocation;
};
const getUserNoAuth = () => {
  return UserNoAuth;
};
const getUserAuthLoc = () => {
  return UserAuthLoc;
};
const getUserAuthOrg = () => {
  return UserAuthOrg;
};
const getMainSchedule = () => {
  return MainSchedule;
};
const getMainArchivedSchedule = () => {
  return MainArchivedSchedule;
};

export { getOrganization };
export { getMainLocation };
export { getAltLocation };
export { getUserNoAuth };
export { getUserAuthLoc };
export { getUserAuthOrg };
export { getMainSchedule };
export { getMainArchivedSchedule };
