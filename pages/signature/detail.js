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
              Contract Signature Detail
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
              <div className="col-sm-3 col-md-3 col-lg-3">
                <span>ID</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <span>{receviedData.id}</span>
              </div>
            </div>

            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-3 col-md-3 col-lg-3">
                <span>Contractor</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <span>{contractor}</span>
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-3 col-md-3 col-lg-3">
                <span>Signature</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <span>{receviedData.signature}</span>
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-3 col-md-3 col-lg-3">
                <span>Digital Signature</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <textarea
                  className="form-control"
                  rows="5"
                  disabled
                  value={receviedData.digitalSignature}
                >
                  
                </textarea>
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
