"use client";
import React, { useState, useEffect } from "react";

const Detail = (props) => {
  const receviedData = props.data;
  // console.log(receviedData);
  const [company, setCompany] = useState("");
  const [filterContractor, setFilterContractor] = useState([]);
  const [contractorName, setContractorName] = useState([]);

  const [filterTerm, setFilterTerm] = useState([]);
  const [termName, setTermName] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const fetchData = async () => {
    const res = await fetch(
      `http://127.0.0.1:5005/contract/list_of_contracts/`
    );
    const data = await res.json();
    // console.log(data);
    if (data !== "No record is found") {
      const name = data.filter((x) => x.companyId === receviedData.company);
      // console.log(name);
      setCompany(name);
    }
  };

  const fetchContractorData = async () => {
    const res = await fetch(`http://127.0.0.1:5005/contract/contractors/`);
    const data = await res.json();
    if (data !== "No record is found") {
      setFilterContractor(data);
    }
  };

  const fetchTermData = async () => {
    const res = await fetch(`http://127.0.0.1:5005/contract/terms/`);
    const data = await res.json();
    if (data !== "No data found for this ID") {
      // console.log(data)
      setFilterTerm(data);
    }
  };

  useEffect(() => {
    fetchData();
    fetchContractorData();
    fetchTermData();
    let contractors = receviedData.contractors;
    // console.log(contractors)

    if (contractors !== undefined) {
      let nameArr = [];
      let lastElement = contractors[contractors.length - 1];
      const arr = contractors.map((x) => {
        const filteredContractor = filterContractor.filter(
          (c) => c.contractorId === x
        );

        if (filteredContractor.length > 0) {
          for (let index = 0; index < filteredContractor.length; index++) {
            const element = filteredContractor[index];
            console.log(element.name + " " + x);
            nameArr.push(element.name);
            if (x !== lastElement && element.contractorId !== x) {
              nameArr.push(",");
            }
          }
        }
        setContractorName(nameArr);
      });
    }

    // term
    let terms = receviedData.terms;
    // console.log(contractors)

    if (terms !== undefined) {
      let nameArr = [];
      let lastElement = terms[terms.length - 1];
      const arr = terms.map((x) => {
        const filteredTerm = filterTerm.filter((c) => c.termId === x);

        if (filteredTerm.length > 0) {
          for (let index = 0; index < filteredTerm.length; index++) {
            const element = filteredTerm[index];
            // console.log(element.description + " " + x);
            nameArr.push(element.description);
            if (x !== lastElement && element.termId !== x) {
              nameArr.push(",");
            }
          }
        }
        setTermName(nameArr);
      });
    }
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
              Contract Detail
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
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.id}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Category</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={
                    receviedData.contractCategory ===
                    "categoryBusinessToConsumer"
                      ? "Business to cosumer"
                      : "Business to business"
                  }
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Type</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.contractType}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Status</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.contractStatus}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Consideration Description</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.considerationDescription}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Consideration Value</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.considerationValue}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Effective Date</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.effectiveDate}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Execution Date</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.executionDate}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>End Date</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.endDate}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Contractors</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <textarea
                  className="form-control"
                  rows="2"
                  disabled
                  value={[contractorName]}
                  style={{ backgroundColor: "lightgray", borderRadius:'10px' }}
                ></textarea>
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Terms</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <textarea
                  className="form-control"
                  rows="2"
                  disabled
                  value={[termName]}
                  style={{ backgroundColor: "lightgray", borderRadius:'10px' }}
                ></textarea>
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Signatures</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <textarea
                  className="form-control"
                  rows="2"
                  disabled
                  value={[receviedData.signatures]}
                  style={{ backgroundColor: "lightgray",borderRadius:'10px' }}
                ></textarea>
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>License ID</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.licenseId}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Medium</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.medium}
                />
              </div>
            </div>
            <div className="d-flex row align-items-center mb-1">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <span>Purpose</span>
              </div>
              <div className="col-sm-8 col-md-8 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "10px" }}
                  disabled
                  value={receviedData.purpose}
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
