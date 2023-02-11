import React from "react";

const userContext = React.createContext({
    user: {},
    pickedJenres: [],
    addUserHandler: (inputObject) => { },
    addJenresHandler: (jenre) => { }
    //   setPickedJenres: () => {}
    //   totalAmount: 0,
    //   addItem: (item) => {},
    //   removeItem: (id) => {},
    //   clearCartHandler: () => {}
});

export default userContext;
