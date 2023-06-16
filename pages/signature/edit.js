"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";

const Edit = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const receviedData = props.data;
// console.log(receviedData)
  const [contractorData, setContractorData] = useState([]);
  // console.log(receviedData);
  const [valueDate, setValueDate] = useState(receviedData.date);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      id: receviedData.id,
      contractorId: receviedData.contractorId,
      signature: receviedData.signature,
      digitalSignature:receviedData.digitalSignature,
    },
  });

  useEffect(() => {
    if (receviedData) {
      setValue("contractorId", receviedData.contractorId);
      setValue("signature", receviedData.signature);
      setValue("digitalSignature", receviedData.digitalSignature);
      setValueDate(receviedData.date);
    }
  }, [props]);

  useEffect(() => {
    const fetchContractor = async () => {
      const res = await fetch(
        `http://127.0.0.1:5000/contract/contractors/`
      );
      const data = await res.json();
      // console.log(data);
      setContractorData(data);
    };

    fetchContractor();
  }, []);

  const onSubmit = async (data) => {
    let dateISO;

    if (valueDate.length === 32) {
      const dateFormat = new Date(valueDate);
      dateISO = dateFormat.toISOString();
    } else {
      dateISO = valueDate.toISOString();
    }
    const postData = {
      SignatureId: receviedData.id,
      CreateDate: dateISO,
      ContractorId: data.contractorId,
      Signature: data.signature,
      DigitalSignature:data.digitalSignature,
    };
    // console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    const response = await fetch(
      "http://127.0.0.1:5000/contract/signature/update/",
      requestOptions
    );
    const result = await response.json();
    if (result) {
      const response = await fetch(
        "http://127.0.0.1:5000/contract/signatures/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }, 
        }
      );
      const res = await response.json();
      props.handleCallBack(res);
      setShowAlert(true);
        
    }
  };
  return (
    <div
      className="modal fade"
      id="staticBackdropUpdate"
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
              Update Contractor Signature
            </h4>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="d-flex row align-items-center mb-3">
                <div className="col-lg-3">
                  <span>Date</span>
                </div>
                <div className="col-lg-6">
                  <DateTimePicker
                    onChange={setValueDate}
                    value={valueDate}
                    name="createDate"
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Contractor</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    {...register("contractorId", {
                      required: "Contractor name is required.",
                    })}
                  >
                    <option>Select...</option>
                    {contractorData!==undefined && contractorData!=='No record is found' &&
                    contractorData.map((x) => {
                      return (
                        <>
                          <option value={x.contractorId}>{x.name}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.contractorId?.message}
                </error>
              </div>

              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Signature</span>
                </div>
                <div className="col-lg-6">
                  <input
                    class="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter type description"
                    {...register("signature", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.signature?.type === "required" &&
                    "Contractor signature is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Digital Signature</span>
                </div>
                <div className="col-lg-6">
                  <input
                    class="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter type description"
                    disabled
                    {...register("digitalSignature", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.digitalSignature?.type === "required" &&
                    "Digital signature is required"}
                </error>
              </div>
            </form>
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
            <button
              className="btn btn-sm btn-info fw-bold"
              type="button"
              style={{ color: "#fff" }}
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </button>
          </div>
          <Alert variant="success" show={showAlert}>
            Recored updated successfully.
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Edit;
