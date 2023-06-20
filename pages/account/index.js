import Link from "next/link";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Controller, useForm } from "react-hook-form";
import photo from "../../public/images/photo.jpg";
import Image from "next/image";

const index = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(getData);
    if (getData) {
      setName(getData.name);
      setEmail(getData.email);
    }
  }, []);
  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="h3 mt-5 mb-5">User information</div>
          <div className="d-flex row justify-content-between">
            <div className="col-sm-8 col-md-8 col-lg-8">
              <form>
                <div className="d-flex row align-items-center mb-1">
                  <div className="col-lg-2">
                    <span>Name</span>
                  </div>
                  <div className="col-lg-10">
                    <input
                      className="form-control form-control-lg"
                      name="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      style={{ borderRadius: "10px" }}
                      disabled
                    />
                  </div>
                </div>
                <div className="d-flex row align-items-center mb-1">
                  <div className="col-lg-2">
                    <span>Email</span>
                  </div>
                  <div className="col-lg-10">
                    <input
                      className="form-control form-control-lg"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      style={{ borderRadius: "10px" }}
                      disabled
                    />
                  </div>
                </div>
                
              </form>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <Image
                src={photo}
                width={300}
                height={300}
                alt="Picture of the author"
                style={{ borderRadius: "15px" }}
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              />
            </div>
          </div>
        </>
      ) : (
        <h4 className="mt-5">
          You are allowed to view this page. <br />
          <br />
          <Link href="/" style={{ fontSize: "24px", fontWeight: "bolder" }}>
            Login
          </Link>
        </h4>
      )}
    </>
  );
};

export default index;
