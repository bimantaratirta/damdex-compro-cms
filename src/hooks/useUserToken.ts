import React from "react";

export const useUserToken = () => {
  const [userToken, setUserToken] = React.useState<string>("");

  return {
    userToken,
    setUserToken,
  };
};
