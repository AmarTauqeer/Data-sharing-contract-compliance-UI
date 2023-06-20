import { useContext, useEffect, useState } from "react";
import Sidebar from "./navigation/sidebar.js/page";
import Header from "./navigation/topbar/page";

import { useRouter } from "next/router";
// export const metadata = {
//   title: "Data sharing contracts UI",
//   description: "Developed by Amar Tauqeer",
// };

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(getData);
  }, [children]);
  return (
    <>
      {/* <html>
        <body> */}
      {router.pathname === "/" ? (
        <>
          <div>
            <div className="col-auto">
              {router.pathname !== "/" && <Sidebar />}
            </div>
            <div className="col-sm-8 col-md-10 colo-lg-10">
              {router.pathname !== "/" &&
                user !== null &&
                user !== undefined && <Header />}
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex row">
            <div className="col-auto">
              {router.pathname !== "/" && <Sidebar />}
            </div>
            <div className="col-sm-8 col-md-10 colo-lg-10">
              {router.pathname !== "/" &&
                user !== null &&
                user !== undefined && <Header />}
              {children}
            </div>
          </div>
        </>
      )}
      {/* </body>
      </html> */}
    </>
  );
}
