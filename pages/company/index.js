export const getServerSideProps = async () => {
  const data = await fetch("https://actool.contract-license.sti2.at/contract/companies/");
  const res = await data.json();
  return { props: { res } };
};

import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { CgDetailsMore } from "react-icons/cg";

import DataTable from "react-data-table-component";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import Detail from "./detail";
import Link from "next/link";

const Company = (props) => {
  const [filterCompanies, setFilterCompanies] = useState([]);
  const [companyData, setCompanyData] = useState(props.res);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const callBack = async (childData) => {
    // console.log(childData);
    setCompanyData(childData);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
    },
    {
      name: "ADDRESS",
      selector: (row) => row.address,
      sortable: true,
      width: "300px",
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
      sortable: true,
      width: "200px",
    },
    {
      name: "TERRITORY",
      selector: (row) => row.territory,
      sortable: true,
      width: "200px",
    },
    // {
    //   name: "COUNTRY",
    //   selector: (row) => row.country,
    //   sortable: true,

    // },
    // {
    //   name: "VAT",
    //   selector: (row) => row.vat,
    //   sortable: true,
    //   maxWidth:"5px",
    // },
    {
      name: "ACTIONS",
      grow: 3,
      selector: (row) => (
        <div className="row">
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <CgDetailsMore
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropDetail"
                  onClick={() => {
                    setData({
                      id: row.companyId,
                      date: row.createDate,
                      name: row.name,
                      address: row.address,
                      email: row.email,
                      phone: row.phone,
                      vat: row.vat,
                      territory: row.territory,
                      country: row.country,
                    });
                  }}
                  size={20}
                />
              </div>

              <div
                className="m-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropDetail"
                onClick={() => {
                  setData({
                    id: row.companyId,
                    date: row.createDate,
                    name: row.name,
                    address: row.address,
                    email: row.email,
                    phone: row.phone,
                    vat: row.vat,
                    territory: row.territory,
                    country: row.country,
                  });
                }}
              >
                Detail
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <FiEdit
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropUpdate"
                  onClick={() => {
                    setData({
                      id: row.companyId,
                      date: row.createDate,
                      name: row.name,
                      address: row.address,
                      email: row.email,
                      phone: row.phone,
                      vat: row.vat,
                      territory: row.territory,
                      country: row.country,
                    });
                  }}
                  size={20}
                />
              </div>

              <div
                className="m-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropUpdate"
                onClick={() => {
                  setData({
                    id: row.companyId,
                    date: row.createDate,
                    name: row.name,
                    address: row.address,
                    email: row.email,
                    phone: row.phone,
                    vat: row.vat,
                    territory: row.territory,
                    country: row.country,
                  });
                }}
              >
                Edit
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <RiDeleteBinLine
                  size={22}
                  color="#f94144"
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropDelete"
                  onClick={() => {
                    setData({
                      id: row.companyId,
                    });
                  }}
                />
              </div>
              <div
                className="m-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropDelete"
                onClick={() => {
                  setData({
                    id: row.companyId,
                  });
                }}
                style={{ color: "#f94144" }}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
  ];

  const customStyle = {
    hieght: "100%",
    rows: {
      style: {
        fontSize: "15px",
        paddingBottom: "20px",
        paddingTop: "20px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingBottom: "20px",
        backgroundColor: "#f8f9fa",
      },
    },
  };

  const handleChange = (e) => {
    const filtered = companyData.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterCompanies(filtered);
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(getData);
  }, []);

  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          {" "}
          <div className="h3 mt-5 mb-5">Organization</div>
          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Organization &nbsp;
                <GrAddCircle size={20} />
              </span>
            </div>

            <div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <FiSearch size={22} />
                </span>
              </div>
            </div>
          </div>
          {/* {console.log(filterCompanies)} */}
          {companyData !== undefined && companyData !== "No record is found" ? (
            <DataTable
              columns={columns}
              data={filterCompanies.length > 0 ? filterCompanies : companyData}
              pagination
              customStyles={customStyle}
              highlightOnHover
              dense
            />
          ) : (
            "There are no records to display"
          )}
          {/* add modal */}
          <Add handleCallBack={callBack} />
          <Edit data={data} handleCallBack={callBack} />
          <Detail data={data} />
          <Delete id={data.id} handleCallBack={callBack} />
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

export default Company;
