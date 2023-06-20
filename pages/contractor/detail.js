"use client";
import React, { useState, useEffect } from "react";

const Detail = (props) => {
  const receviedData = props.data;
  // console.log(receviedData)
  const [company, setCompany] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`http://127.0.0.1:5005/contract/companies/`);
    const data = await res.json();
    // console.log(data);
    if (data !== "No record is found") {
      const filterData = data.filter(
        (x) => x.companyId === receviedData.company
      );
      // console.log(filterData.length)
      if (filterData.length > 0) {
        // console.log(filterData[0].name);
        setCompany(filterData[0].name);
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
              Contractor Detail
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
                <span>Name</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.name}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Company</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={company}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Email</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.email}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Phone</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.phone}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Address</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.address}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Territory</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.territory}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Country</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.country}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Role</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.role}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>VAT</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  style={{ borderRadius: "10px" }}
                  className="form-control"
                  disabled
                  value={receviedData.vat}
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
