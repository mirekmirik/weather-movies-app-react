import React from "react";

const userContext = React.createContext({
    user: {},
    // pickedJenres: [],
    // weather: '',
    // jenresByWeather: [],
    addUserHandler: (inputObject) => { },
    addJenresHandler: (jenre) => { },
    addWeatherHandler: (weather) => { },
    addJenresByWeatherHandler: (jenres) => { },
    resetValues: () => { }
    //   setPickedJenres: () => {}
    //   totalAmount: 0,
    //   addItem: (item) => {},
    //   removeItem: (id) => {},
    //   clearCartHandler: () => {}
});

export default userContext;
