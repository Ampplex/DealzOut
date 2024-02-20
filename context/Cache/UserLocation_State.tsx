// UserLocation_State.js
import React, { useState, useEffect } from "react";
import UserLocation_context from "./UserLocation_context";
import * as Location from "expo-location";
import { getLocation } from "../../service/getLocation";

const UserLocation_State = (props) => {
  const [userLocation, setLocation] = useState<string | null>("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location: any = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const response = await getLocation(latitude, longitude);

        setAddress(response[0]?.display_name || "Address not found");
      } catch (error) {
        console.error("Error fetching location:", error.message);
        setErrorMsg("Error fetching location");
      }
    };

    fetchLocation();
  }, []);

  return (
    <UserLocation_context.Provider value={{ userLocation, address }}>
      {props.children}
    </UserLocation_context.Provider>
  );
};

export default UserLocation_State;
