export const getServerSideProps = async () => {
  const data = await fetch(`https://actool.contract-license.sti2.at/contract/list_of_contracts/`);
  const res = await data.json();

  const contData = await fetch(`https://actool.contract-license.sti2.at/contract/contractors/`);
  const resContractor = await contData.json();
  // console.log(resContractor)

  const termData = await fetch(`https://actool.contract-license.sti2.at/contract/terms/`);
  const resTerm = await termData.json();

  const sigData = await fetch(`https://actool.contract-license.sti2.at/contract/signatures/`);
  const resSignature = await sigData.json();

  return { props: { res, resContractor, resTerm, resSignature } };
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
import { CgDetailsMore } from "react-icons/cg";
import Detail from "./detail";
import Link from "next/link";

const Contract = (props) => {
  const [filterContracts, setFilterContracts] = useState([]);
  const [contractData, setContractData] = useState(props.res);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const callBack = async (childData) => {
    setContractData(childData);
  };
  const columns = [
    {
      name: "CATEGORY",
      selector: (row) => {
        if (row.contractCategory != undefined) {
          if (row.contractCategory === "categoryBusinessToConsumer") {
            return "Business to consumer";
          } else {
            return "Business to business";
          }
        }
      },
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row) => row.purpose,
      sortable: true,
    },
    {
      name: "CONTRACTOR",
      selector: (row) => {
        const contractors = row.identifiers.contractors;
        // console.log(contractors)
        let nameArr = [];
        if (contractors !== undefined) {
          const arr = contractors.map((x) => {
            // console.log(x)
            const filterContractor = props.resContractor.filter(
              (c) => c.contractorId === x
            );
            // console.log(filterContractor);
            if (filterContractor.length > 0) {
              for (let index = 0; index < props.resContractor.length; index++) {
                const element = filterContractor[index];
                if (element) {
                  nameArr.push(element.name);
                  let lastElement = contractors[contractors.length - 1];
                  if (x !== lastElement) {
                    nameArr.push(",");
                  }
                }
              }
            }
          });
          return nameArr;
        }
      },
    },

    {
      name: "TERM",
      selector: (row) => {
        const terms = row.identifiers.terms;
        let desc = "";
        if (terms !== undefined) {
          // console.log(filterTerms)
          const arr = terms.map((x) => {
            // console.log(termData);
            if (
              props.resTerm.length > 0 &&
              props.resTerm !== "No data found for this ID"
            ) {
              const filterData = props.resTerm.filter((t) => t.termId === x);
              // console.log(termData);
              if (filterData.length > 0) {
                desc = filterData[0].description;
                // console.log(filterData[0].description);
                return filterData[0].description;
              }
            }
          });
          return desc;
        }
      },
    },
    {
      name: "STATUS",
      selector: (row) => {
        return row.contractStatus && row.contractStatus === "statusCreated" ? (
          <div style={{ color: "#00DFA2" }}>{row.contractStatus}</div>
        ) : row.contractStatus === "statusUpdated" ? (
          <div style={{ color: "#FF55BB" }}>{row.contractStatus}</div>
        ) : (
          <div style={{ color: "#f94144" }}>{row.contractStatus}</div>
        );
      },
      sortable: true,
      grow: 1,
    },
    {
      name: "ACTIONS",
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
                      id: row.contractId,
                      effectiveDate: row.effectiveDate,
                      executionDate: row.executionDate,
                      endDate: row.endDate,
                      consentId: row.consentId,
                      contractors: row.contractors,
                      terms: row.terms,
                      signatures: row.signatures,
                      considerationDescription: row.considerationDescription,
                      considerationValue: row.value,
                      contractCategory: row.contractCategory,
                      contractStatus: row.contractStatus,
                      contractType: row.contractType,
                      licenseId: row.licenseId,
                      medium: row.medium,
                      purpose: row.forPurpose,
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
                    id: row.contractId,
                    effectiveDate: row.effectiveDate,
                    executionDate: row.executionDate,
                    endDate: row.endDate,
                    consentId: row.consentId,
                    contractors: row.identifiers.contractors,
                    terms: row.identifiers.terms,
                    signatures: row.identifiers.signatures,
                    considerationDescription: row.consideration,
                    considerationValue: row.value,
                    contractCategory: row.contractCategory,
                    contractStatus: row.contractStatus,
                    contractType: row.contractType,
                    licenseId: row.licenseId,
                    medium: row.medium,
                    purpose: row.purpose,
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
                      id: row.contractId,
                      effectiveDate: row.effectiveDate,
                      executionDate: row.executionDate,
                      endDate: row.endDate,
                      consentId: row.consentId,
                      contractors: row.identifiers.contractors,
                      terms: row.identifiers.terms,
                      signatures: row.identifiers.signatures,
                      considerationDescription: row.consideration,
                      considerationValue: row.value,
                      contractCategory: row.contractCategory,
                      contractStatus: row.contractStatus,
                      contractType: row.contractType,
                      licenseId: row.licenseId,
                      medium: row.medium,
                      purpose: row.purpose,
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
                    id: row.contractId,
                    effectiveDate: row.effectiveDate,
                    executionDate: row.executionDate,
                    endDate: row.endDate,
                    consentId: row.consentId,
                    contractors: row.identifiers.contractors,
                    terms: row.identifiers.terms,
                    signatures: row.identifiers.signatures,
                    considerationDescription: row.consideration,
                    considerationValue: row.value,
                    contractCategory: row.contractCategory,
                    contractStatus: row.contractStatus,
                    contractType: row.contractType,
                    licenseId: row.licenseId,
                    medium: row.medium,
                    purpose: row.purpose,
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
                      id: row.contractId,
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
                    id: row.contractId,
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
      grow: 2,
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
    const filtered = contractData.filter((x) => {
      return x.contractId.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterContracts(filtered);
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
          <div className="h3 mt-5 mb-5">Contract</div>
          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Contract &nbsp;
                <GrAddCircle size={20} />
              </span>
            </div>

            <div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contract id"
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <FiSearch size={22} />
                </span>
              </div>
            </div>
          </div>
          {contractData !== undefined &&
          contractData !== "No record is found" ? (
            <DataTable
              columns={columns}
              data={
                filterContracts.length >= 1 ? filterContracts : contractData
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

export default Contract;
