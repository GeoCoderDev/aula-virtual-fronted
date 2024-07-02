"use client";

import { ReactNode, useEffect } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const WrapperMainContent = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const headerHeight = useSelector(
    (state: RootState) => state.elementsDimensions.headerHeight
  );
  const windowHeight = useSelector(
    (state: RootState) => state.elementsDimensions.windowHeight
  );

  const path = usePathname();

  const isLoginPage = path.includes("/login");

  useEffect(() => {
    
    
    
    
  }, [])
  

  return (
    <>
      <div
        id="main-content"
        className={`w-full max-w-[100vw] flex items-start justify-start  ${
          !isLoginPage && "p-8"
        }`}
      >
        {children}
      </div>
      <style>{`
      
        #main-content{            

            ${
              isLoginPage
                ? `
                    height: 100svh;
                    max-height: 100svh;
                  `
                : `min-height: ${windowHeight - headerHeight}px;`
            }

            
        }
      
      `}</style>
    </>
  );
};

export default WrapperMainContent;
