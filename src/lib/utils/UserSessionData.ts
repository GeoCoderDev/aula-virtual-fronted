import { useEffect, useState } from "react";

export const useUserSessionData = () => {
  const [UserSessionData, setUserSessionData] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("./clientSideUserSessionData")
        .then(({ initializeUserSessionData }) => {
          const { UserSessionData: classUserSessionData } =
            initializeUserSessionData();
          setUserSessionData(() => classUserSessionData);
        })
        .catch((error) => {
          console.error("Error loading clientSideUserSessionData:", error);
        });
    }
  }, []);

  return { UserSessionData };
};
