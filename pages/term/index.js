export const getServerSideProps = async () => {
  const data = await fetch(`https://actool.contract-license.sti2.at/contract/terms/`);
  const res = await data.json();

  const oblData = await fetch(`https://actool.contract-license.sti2.at/contract/obligations/`);
  const resObligation = await oblData.json();

  const typeData = await fetch(`https://actool.contract-license.sti2.at/contract/term/types`);
  const resType = await typeData.json();

  return { props: { res, resObligation, resType } };
};

import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import DataTable from "react-data-table-component";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import Link from "next/link";

const Term = (props) => {
  const [filterTerms, setFilterTerms] = useState([]);
  const [termData, setTermData] = useState(props.res);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const callBack = async (childData) => {
    setTermData(childData);
  };

  const columns = [
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
      sortable: true,
      width: "300px",
    },
    {
      name: "TERM TYPE",
      selector: (row) => {
        if (termData !== undefined) {
          // console.log(typeData);
          if (props.resType !== undefined && props.resType.length > 0) {
            const filter = props.resType.filter(
              (x) => x.termTypeId === row.termTypeId
            );
            return filter[0].name;
          }
        }
      },
      sortable: true,
    },

    {
      name: "DATE",
      selector: (row) => row.createDate,
      sortable: true,
      width: "300px",
    },
    {
      name: "OBLIGATION",
      selector: (row) => {
        if (row.obligations !== undefined) {
          let obl_des_arr = [];
          const arr = row.obligations.map((x) => {
            if (props.resObligation !== undefined) {
              const filterClause = props.resObligation.filter(
                (c) => c.obligationId === x
              );
              // console.log(filterClause);
              if (filterClause.length > 0) {
                for (let index = 0; index < filterClause.length; index++) {
                  const element = filterClause[index];
                  if (element) {
                    // console.log(element)
                    obl_des_arr.push(element.obligationDescription);
                    let lastElement =
                      props.resObligation[props.resObligation.length - 1];
                    if (x !== lastElement) {
                      obl_des_arr.push(",");
                    }
                  }
                }
              }
            }
          });

          return obl_des_arr;
        }
      },
      sortable: true,
      width: "450px",
    },
    {
      name: "ACTIONS",
      selector: (row) => (
        <div className="row">
          <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <FiEdit
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropUpdate"
                  onClick={() => {
                    setData({
                      id: row.termId,
                      date: row.createDate,
                      description: row.description,
                      typeId: row.termTypeId,
                      obligations: row.obligations,
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
                    id: row.termId,
                    date: row.createDate,
                    description: row.description,
                    typeId: row.termTypeId,
                    obligations: row.obligations,
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
                      id: row.termId,
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
                    id: row.termId,
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
      width: "300px",
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
    const filtered = termData.filter((x) => {
      return x.description.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterTerms(filtered);
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(getData);
  }, []);

  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="h3 mt-5 mb-5">Contract Term</div>
          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Term &nbsp;
                <GrAddCircle size={20} />
              </span>
            </div>

            <div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                  // value={search}
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <FiSearch size={22} />
                </span>
              </div>
            </div>
          </div>
          {termData && termData !== "No data found for this ID" ? (
            <DataTable
              columns={columns}
              data={filterTerms.length >= 1 ? filterTerms : termData}
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

export default Term;
