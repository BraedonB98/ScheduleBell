const restrictUser = (user, restrictionLevel) => {
  let userRestricted;
  if (restrictionLevel === "generalEmployees") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      primaryLocation: user.primaryLocation,
    };
  } else if (restrictionLevel === "locationEmployee") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      position: user.position,
      imageUrl: user.imageUrl,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
    };
  } else if (restrictionLevel === "alternateLocationManager") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      payRate: user.payRate,
      availability: user.availability,
    };
  } else if (restrictionLevel === "primaryLocationManager") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      employeeNumber: user.employeeNumber,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      alternateLocations: user.alternateLocations,
      payRate: user.payRate,
      availability: user.availability,
    };
  } else if (restrictionLevel === "organizationManager") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      employeeNumber: user.employeeNumber,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      alternateLocations: user.alternateLocations,
      payRate: user.payRate,
      availability: user.availability,
      id: user._id,
    };
  } else if (restrictionLevel === "actualUser") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      employeeNumber: user.employeeNumber,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      alternateLocations: user.alternateLocations,
      payRate: user.payRate,
      availability: user.availability,
      id: user._id,
      token: token,
    };
  } else {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      primaryLocation: user.primaryLocation,
    };
  }
  return userRestricted;
};

exports.restrictUser = restrictUser;
