export const getServerSideProps = async () => {
  const data = await fetch(`https://actool.contract-license.sti2.at/contract/contractors/`);
  const res = await data.json();
  return { props: { res } };
};

import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import DataTable from "react-data-table-component";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import { CgDetailsMore } from "react-icons/cg";
import Detail from "./detail";
import Link from "next/link";

const Contractor = (props) => {
  const [filterContractors, setFilterContractors] = useState([]);
  const [contractorData, setContractorData] = useState(props.res);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const callBack = async (childData) => {
    setContractorData(childData);
  };
  const columns = [
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },

    {
      name: "ADDRESS",
      selector: (row) => row.address,
      sortable: true,
      width: "200px",
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
      width: "170px",
    },

    // {
    //   name: "COMPANY",
    //   selector: (row) => row.companyId,
    //   sortable: true,
    //   grow: 1,
    // },
    {
      name: "TERRITORY",
      selector: (row) => row.territory,
      sortable: true,
    },
    // {
    //   name: "COUNTRY",
    //   selector: (row) => row.country,
    //   sortable: true,
    // },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      width: "200px",
    },
    {
      name: "ACTIONS",
      width: "400px",
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
                      id: row.contractorId,
                      company: row.companyId,
                      date: row.createDate,
                      name: row.name,
                      address: row.address,
                      email: row.email,
                      phone: row.phone,
                      vat: row.vat,
                      territory: row.territory,
                      country: row.country,
                      role: row.role,
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
                    id: row.contractorId,
                    company: row.companyId,
                    date: row.createDate,
                    name: row.name,
                    address: row.address,
                    email: row.email,
                    phone: row.phone,
                    vat: row.vat,
                    territory: row.territory,
                    country: row.country,
                    role: row.role,
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
                      id: row.contractorId,
                      date: row.createDate,
                      name: row.name,
                      address: row.address,
                      email: row.email,
                      phone: row.phone,
                      vat: row.vat,
                      territory: row.territory,
                      country: row.country,
                      role: row.role,
                      company: row.companyId,
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
                    id: row.contractorId,
                    date: row.createDate,
                    name: row.name,
                    address: row.address,
                    email: row.email,
                    phone: row.phone,
                    vat: row.vat,
                    territory: row.territory,
                    country: row.country,
                    role: row.role,
                    company: row.companyId,
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
                      id: row.contractorId,
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
                    id: row.contractorId,
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
    const filtered = contractorData.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterContractors(filtered);
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
          <div className="h3 mt-5 mb-5">Contractor Information</div>
          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Contractor &nbsp;
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
          {contractorData !== "No record is found" ? (
            <DataTable
              columns={columns}
              data={
                filterContractors.length >= 1
                  ? filterContractors
                  : contractorData
              }
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

export default Contractor;
