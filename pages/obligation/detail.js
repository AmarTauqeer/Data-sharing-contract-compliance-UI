"use client";
import React, { useState, useEffect } from "react";

const Detail = (props) => {
  const receviedData = props.data;
  // console.log(receviedData)
  const [contractor, setContractor] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`http://127.0.0.1:5000/contract/contractors/`);
    const data = await res.json();
    // console.log(data);
    if (data !== "No record is found") {
      const filterData = data.filter(
        (x) => x.contractorId === receviedData.contractorId
      );
      if (filterData.length > 0) {
        // console.log(filterData[0].name);
        setContractor(filterData[0].name);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [props]);

  return (
    <div
      className="modal fade"
      id="staticBackdropDetail"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="staticBackdropLabel">
              Contract Clause Detail
            </h4>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>ID</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.id}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Description</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.description}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              {/* {console.log(receviedData)} */}
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Contractor</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={contractor}
                />
              </div>
            </div>

            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Execution Date</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.executionDate}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>End Date</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.endDate}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Fulfillment Date</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.fulfillmentDate}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-3">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>State</span>
              </div>
              <div className="ol-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.state}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
