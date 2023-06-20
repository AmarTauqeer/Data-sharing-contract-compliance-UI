export const getServerSideProps = async () => {
    const data = await fetch('http://127.0.0.1:5005/contract/term/types')
    const res = await data.json()
    return { props: {res} }
  }




  import React, { useState } from "react";
  import { FiEdit } from "react-icons/fi";
  import { RiDeleteBinLine } from "react-icons/ri";
  import { GrAddCircle } from "react-icons/gr";
  import { FiSearch } from "react-icons/fi";
  
  
  import DataTable from "react-data-table-component";
//   import Add from "../termtype/add";
//   import Edit from "../termtype/edit";
//   import Delete from "../termtype/delete";

  
  
  const Contact = ({res}) => {
    const [loading, setLoading] = useState(false);
    const [filterTypes, setFilterTypes] = useState([]);
    const [data, setData] = useState([]);
  
    const callBack = async (childData) => {
      // const {typeData} = types();
      // console.log(childData);
      setFilterTypes(childData);
    };
  
    const columns = [
      {
        name: "ID#",
        selector: (row) => row.termTypeId,
        sortable: true,
        width: "440px",
        // grow:2,
      },
      {
        name: "Date",
        selector: (row) => row.createDate,
        sortable: true,
        width: "140px",
      },
      {
        name: "NAME",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "DESCRIPTION",
        selector: (row) => row.description,
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
                  <FiEdit
                    className="m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdropUpdate"
                    onClick={() => {
                      setData({
                        id: row.termTypeId,
                        date: row.createDate,
                        name: row.name,
                        description: row.description,
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
                      id: row.termTypeId,
                      date: row.createDate,
                      name: row.name,
                      description: row.description,
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
                        id: row.termTypeId,
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
                      id: row.termTypeId,
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
        width: "500px",
      },
    ];
  
    const customStyle = {
      hieght: "100%",
      // minWidth:"1200px",
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
      const filtered = res.filter((x) => {
        return x.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      // console.log(filtered)
      setFilterTypes(filtered);
    };
  
    return (
      <>
        <div className="h3 mt-5 mb-5">Term Types</div>
  
        <div className="d-flex justify-content-between bd-highlight mb-3">
          <div>
            <span
              className="input-group-text btn btn-sm btn-info"
              style={{ color: "#fff" }}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Term Type &nbsp;
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
  
        {res !== "No record found for this ID" ? (
          <DataTable
            columns={columns}
            data={filterTypes.length >= 1 ? filterTypes : res}
            pagination
            customStyles={customStyle}
            // progressPending={pending}
            highlightOnHover
            dense
          />
        ) : (
          "There are no records to display"
        )}
  
        {/* add modal */}
        {/* <Add handleCallBack={callBack} />
  
        <Edit data={data} handleCallBack={callBack} />
        <Delete id={data.id} handleCallBack={callBack} /> */}
      </>
    );
  };
  
  export default Contact;