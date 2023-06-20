export const getServerSideProps = async () => {
  const data = await fetch(`http://127.0.0.1:5005/contract/signatures/`);
  const res = await data.json();

  const contData = await fetch(`http://127.0.0.1:5005/contract/contractors/`);
  const resContractor = await contData.json();
  return { props: { res, resContractor } };
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

const Signature = (props) => {
  const [filterSignatures, setFilterSignatures] = useState([]);
  const [signatureData, setSignatureData] = useState(props.res);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const callBack = async (childData) => {
    setSignatureData(childData);
  };
  const columns = [
    {
      name: "Contractor",
      selector: (row) => {
        if (props.resContractor.length > 0) {
          const filter = props.resContractor.filter(
            (x) => x.contractorId === row.contractor_id
          );
          if (filter.length > 0) {
            return filter[0].name;
          }
        }
      },
      sortable: true,
      width: "300px",
    },
    {
      name: "DATE",
      selector: (row) => row.createDate,
      sortable: true,
    },
    {
      name: "SIGNATURE",
      selector: (row) => row.signatureText,
      sortable: true,
      width: "300px",
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
                      id: row.signatureId,
                      date: row.createDate,
                      signature: row.signatureText,
                      contractorId: row.contractor_id,
                      digitalSignature: row.digitalSignature,
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
                    id: row.signatureId,
                    date: row.createDate,
                    signature: row.signatureText,
                    contractorId: row.contractor_id,
                    digitalSignature: row.digitalSignature,
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
                      id: row.signatureId,
                      date: row.createDate,
                      signature: row.signatureText,
                      contractorId: row.contractor_id,
                      digitalSignature: row.digitalSignature,
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
                    id: row.signatureId,
                    date: row.createDate,
                    signature: row.signatureText,
                    contractorId: row.contractor_id,
                    digitalSignature: row.digitalSignature,
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
                      id: row.signatureId,
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
                    id: row.signatureId,
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
      width: "500px",
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
    let temp = [];
    for (let index = 0; index < signatureData.length; index++) {
      const element = signatureData[index];
      if (element.contractor_id !== undefined) {
        for (let index = 0; index < props.resContractor.length; index++) {
          const elementContract = props.resContractor[index];
          if (elementContract.contractorId === element.contractor_id) {
            const filterContractorName = elementContract.name;
            const data = {
              contractor_id: element.contractor_id,
              createDate: element.createDate,
              digitalSignature: element.digitalSignature,
              signatureId: element.signatureId,
              signatureText: element.signatureText,
              name: elementContract.name,
            };
            temp.push(data);
          }
        }
      }
    }
    // console.log(temp)
    const filtered = temp.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    // console.log(filtered)
    setFilterSignatures(filtered);
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
          <div className="h3 mt-5 mb-5">Contractor Signature</div>
          <div className="d-flex justify-content-between bd-highlight mb-3">
            <div>
              <span
                className="input-group-text btn btn-sm btn-info"
                style={{ color: "#fff" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Signature &nbsp;
                <GrAddCircle size={20} />
              </span>
            </div>

            <div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contractor"
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <FiSearch size={22} />
                </span>
              </div>
            </div>
          </div>
          {signatureData !== undefined &&
          signatureData !== "No record found for this ID" ? (
            <DataTable
              columns={columns}
              data={
                filterSignatures.length >= 1 ? filterSignatures : signatureData
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

export default Signature;
