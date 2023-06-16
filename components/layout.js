import Sidebar from "./navigation/sidebar.js/page";
import Header from "./navigation/topbar/page";

import { useRouter } from "next/router";
// export const metadata = {
//   title: "Data sharing contracts UI",
//   description: "Developed by Amar Tauqeer",
// };

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <>
      {/* <html>
        <body> */}
      <div className="d-flex row">
        <div className="col-auto">
          {/* <Sidebar /> */}
          {router.pathname !== "/login" && <Sidebar />}
        </div>
        <div className="col-sm-8 col-md-10 colo-lg-10">
          {/* <Header /> */}
          {router.pathname !== "/login" && <Header />}
          {children}
        </div>
      </div>
      {/* </body>
      </html> */}
    </>
  );
}
