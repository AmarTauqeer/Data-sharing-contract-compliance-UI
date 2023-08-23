
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";

const Add = (props) => {
  const [valueDate, setValueDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [signatureData, setSignatureData] = useState([]);
  const [contractorData, setContractorData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      signature: "",
      contractorId: "",
    },
  });

  useEffect(() => {
    const fetchSignature = async () => {
      const res = await fetch(
        `https://actool.contract-license.sti2.at/contract/signatures/`
      );
      const data = await res.json();
      setSignatureData(data);
    };

    const fetchContractor = async () => {
      const res = await fetch(
        `https://actool.contract-license.sti2.at/contract/contractors/`
      );
      const data = await res.json();
      // console.log(data);
      setContractorData(data);
    };

    fetchSignature();
    fetchContractor();
  }, []);

  const onSubmit = async (data) => {
    // console.log(valueDate)
    let dateISO = valueDate.toISOString();

    const postData = {
      CreateDate: dateISO,
      Signature: data.signature,
      ContractorId: data.contractorId,
    };

    // console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };
    // console.log("hi");

    const response = await fetch(
      "https://actool.contract-license.sti2.at/contract/signature/create/",
      requestOptions
    );
    const result = await response.json();
    if (result) {
      const response = await fetch(
        "https://actool.contract-license.sti2.at/contract/signatures/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }, 
        }
      );
      const res = await response.json();
      props.handleCallBack(res);
      setShowAlert(true);
      setValue("signature", "");      
    }

  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
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
              Add Contractor Signature
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
                    className="form-control"
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
              Save
            </button>
          </div>
          <Alert variant="success" show={showAlert}>
            Recored saved successfully.
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default Add;
