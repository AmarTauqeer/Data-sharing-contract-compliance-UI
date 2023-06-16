import Sidebar from "./navigation/sidebar.js/page";
import Header from "./navigation/topbar/page";


// export const metadata = {
//   title: "Data sharing contracts UI",
//   description: "Developed by Amar Tauqeer",
// };

export default function RootLayout({ children }) {
  return (
    <>
      {/* <html>
        <body> */}
          <div className="d-flex row">
            <div className="col-auto">
              <Sidebar />
            </div>
            <div className="col-auto">
              <Header />
              {children}
            </div>
          </div>
        {/* </body>
      </html> */}
    </>
  );
}
