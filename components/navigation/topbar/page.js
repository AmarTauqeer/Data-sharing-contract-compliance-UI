import React, { useContext } from "react";
import photo from "../../../public/images/photo.jpg";
import { MdNotificationsActive } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const Header = () => {
  const route = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("userInfo")
    route.push("/");
  };
  return (
    <>
      <div style={{ minWidth: "1300px", marginBottom: "5px" }}>
        <nav className="navbar navbar-expand-lg">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto">
              <div className="row">
                <div className="d-flex flex-row align-items-center">
                  <li class="nav-item p-2">
                    <MdNotificationsActive size={25} />
                  </li>
                  <li className="nav-item p-2">
                    <div className="btn-group">
                      <Image
                        src={photo}
                        width={35}
                        height={35}
                        alt="Picture of the author"
                        style={{ borderRadius: "15px" }}
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu dropdown-menu-lg-end">
                        <li>
                          <Link className="dropdown-item" href="/account">
                            Account
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogOut}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
