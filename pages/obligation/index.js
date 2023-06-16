export const getServerSideProps = async () => {
  const data = await fetch(`http://127.0.0.1:5000/contract/obligations/`);
  const res = await data.json();

  const contData = await fetch(`http://127.0.0.1:5000/contract/contractors/`);
  const resContractor = await contData.json();



  return { props: { res, resContractor } };
};

import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

import DataTable from "react-data-table-component";
import Add from "./add";
import Delete from "./delete";
import Detail from "./detail";
import { CgDetailsMore } from "react-icons/cg";



const Obligation = (props) => {
  const [filterObligations, setFilterObligations] = useState([]);
  const [obligationData, setObligationData] = useState(props.res);
  const [data, setData] = useState([]);



  const callBack = async (childData) => {
    setObligationData(childData);
  };
  const columns = [
    {
      name: "CLAUSE",
      selector: (row) => row.obligationDescription,
      sortable: true,
      width: "300px",
    },
    {
      name: "CONTRACTOR",
      width: "200px",
      selector: (row) => {
        if (
          props.resContractor.length > 0 ||
          props.resContractor !== "No record is found"
        ) {
          const filter = props.resContractor.filter(
            (x) => x.contractorId === row.contractorId
          );
          if (filter.length > 0) {
            return filter[0].name;
          }
        }
      },
      sortable: true,
    },
    // {
    //   name: "ID#",
    //   selector: (row) => row.obligationId,
    //   sortable: true,
    // },
    {
      name: "EXE.DATE",
      selector: (row) => row.exectionDate,
      sortable: true,
      width: "250px",
    },
    {
      name: "END.DATE",
      selector: (row) => row.endDate,
      sortable: true,
      width: "250px",
    },
    // {
    //   name: "FULFILL.DATE",
    //   selector: (row) => row.fulfillmentDate,
    //   sortable: true,
    // },

    {
      name: "State",
      selector: (row) => {
        return row.state && row.state === "statePending" ? (
          <div style={{ color: "#00DFA2" }}>{row.state}</div>
        ) : row.state === "statusUpdated" ? (
          <div style={{ color: "#FF55BB" }}>{row.state}</div>
        ) : (
          <div style={{ color: "#f94144" }}>{row.state}</div>
        );
      },
      sortable: true,
      width: "200px",
    },
    // {
    //   name: "REF.B2C",
    //   selector: (row) => row.contractIdB2C,
    //   sortable: true,
    // },
    {
      name: "ACTIONS",
      width: "300px",
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
                      id: row.obligationId,
                      executionDate: row.exectionDate,
                      endDate: row.endDate,
                      fulfillmentDate: row.fulfillmentDate,
                      contractorId: row.contractorId,
                      description: row.obligationDescription,
                      state: row.state,
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
                    id: row.obligationId,
                    executionDate: row.exectionDate,
                    endDate: row.endDate,
                    fulfillmentDate: row.fulfillmentDate,
                    contractorId: row.contractorId,
                    description: row.obligationDescription,
                    state: row.state,
                  });
                }}
              >
                Detail
              </div>
            </div>
          </div>
          {/* <div className="col-auto">
            <div className="d-flex flex-row align-items-center">
              <div>
                <FiEdit
                  className="m-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropUpdate"
                  onClick={() => {
                    setData({
                      id: row.obligationId,
                      date: row.createDate,
                      executionDate: row.executionDate,
                      endDate: row.endDate,
                      fulfillmentDate: row.fulfillmentDate,
                      contractorId: row.contractorId,
                      description: row.description,
                      state: row.state,
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
                    id: row.obligationId,
                    date: row.createDate,
                    executionDate: row.executionDate,
                    endDate: row.endDate,
                    fulfillmentDate: row.fulfillmentDate,
                    contractorId: row.contractorId,
                    description: row.description,
                    state: row.state,
                  });
                }}
              >
                Edit
              </div>
            </div>
          </div> */}
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
                      id: row.obligationId,
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
                    id: row.obligationId,
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
    let temp = [];
    for (let index = 0; index < obligationData.length; index++) {
      const element = obligationData[index];
      if (element.contractorId !== undefined) {
        for (let index = 0; index < props.resContractor.length; index++) {
          const elementContract = props.resContractor[index];
          if (elementContract.contractorId === element.contractorId) {
            const data = {
              contractorId: element.contractorId,
              endDate: element.endDate,
              exectionDate: element.exectionDate,
              fulfillmentDate: element.fulfillmentDate,
              obligationDescription: element.obligationDescription,
              obligationId: element.obligationId,
              state: element.state,
              name: elementContract.name,
            };
            temp.push(data);
          }
        }
      }
    }
    const filtered = temp.filter((x) => {
      return x.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterObligations(filtered);
  };

  return (
    <>
      <div className="h3 mt-5 mb-5">Contract Clauses</div>

      <div className="d-flex justify-content-between bd-highlight mb-3">
        <div>
          <span
            className="input-group-text btn btn-sm btn-info"
            style={{ color: "#fff" }}
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add Clause &nbsp;
            <GrAddCircle size={20} />
          </span>
        </div>

        <div>
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search contractor name"
              onChange={handleChange}
            />
            <span className="input-group-text">
              <FiSearch size={22} />
            </span>
          </div>
        </div>
      </div>
      {obligationData !== "No record found" ? (
        <DataTable
          columns={columns}
          data={
            filterObligations.length >= 1 ? filterObligations : obligationData
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
      <Detail data={data} />

      <Delete id={data.id} handleCallBack={callBack} />
    </>
  );
};

export default Obligation;
