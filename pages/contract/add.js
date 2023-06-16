import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";

const Add = (props) => {
  const [endDate, setEndDate] = useState(new Date());
  const [executionDate, setExecutionDate] = useState(new Date());
  const [effectiveDate, setEffectiveDate] = useState(new Date());

  const [showAlert, setShowAlert] = useState(false);
  const [contractorData, setContractorData] = useState([]);
  const [termData, setTermData] = useState([]);
  const [signatureData, setSignatureData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      consentId: "",
      contractors: [],
      terms: [],
      signatures: [],
      considerationDescription: "",
      considerationValue: "",
      contractCategory: "categoryBusinessToConsumer",
      contractStatus: "statusCreated",
      contractType: "Written",
      licenseId: "",
      medium: "",
      purpose: "",
    },
  });

  useEffect(() => {
    const fetchContractor = async () => {
      const res = await fetch(`http://127.0.0.1:5000/contract/contractors/`);
      const data = await res.json();
      // console.log(data);
      let temp = [];
      if (data !== "No record is found") {
        // console.log("h");
        await data.map((x) => {
          // console.log(x.obligationId);
          const tempData = {
            name: x.name,
            value: x.contractorId,
          };
          // console.log(tempData);
          temp.push(tempData);
        });
        // oblData();
        // console.log(temp);
        setContractorData(temp);
      }
    };

    const fetchTerm = async () => {
      const res = await fetch(`http://127.0.0.1:5000/contract/terms/`);
      const data = await res.json();
      // console.log(data);
      if (data.length > 0 && data !== "No data found for this ID") {
        let temp = [];
        if (data.length > 0) {
          // console.log("h");
          await data.map((x) => {
            // console.log(x.obligationId);
            const tempData = {
              name: x.description,
              value: x.termId,
            };
            // console.log(tempData);
            temp.push(tempData);
          });
          // oblData();
          // console.log(temp);
          setTermData(temp);
        }
      }
    };

    const fetchSignature = async () => {
      const res = await fetch(`http://127.0.0.1:5000/contract/signatures/`);
      const data = await res.json();
      // console.log(data);
      let temp = [];
      if (data !== "No record found for this ID") {
        // console.log("h");
        await data.map((x) => {
          // console.log(x.obligationId);
          const tempData = {
            name: x.signatureText,
            value: x.signatureId,
          };
          // console.log(tempData);
          temp.push(tempData);
        });
        // oblData();
        // console.log(temp);
        setSignatureData(temp);
      }
    };

    fetchContractor();
    fetchTerm();
    fetchSignature();
  }, [props]);

  const onSubmit = async (data) => {
    // console.log(valueDate)
    if (endDate < effectiveDate) {
      alert("end date must be greator or equal to effective date");
      return false;
    }
    let endDateISO = endDate.toISOString();
    let effectiveDateISO = effectiveDate.toISOString();
    let executionDateISO = executionDate.toISOString();

    const postData = {
      EndDate: endDateISO,
      ExecutionDate: executionDateISO,
      EffectiveDate: effectiveDateISO,
      ConsentId: data.consentId,
      ConsiderationDescription: data.considerationDescription,
      ConsiderationValue: Number(data.considerationValue),
      ContractCategory: data.contractCategory,
      ContractStatus: data.contractStatus,
      ContractType: data.contractType,
      Contractors: data.contractors,
      Terms: data.terms,
      Signatures: data.signatures,
      LicenseId: data.licenseId,
      Medium: data.medium,
      Purpose: data.purpose,
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
      "http://127.0.0.1:5000/contract/create/",
      requestOptions
    );
    const result = await response.json();

    if (result) {
      const response = await fetch(
        "http://127.0.0.1:5000/contract/list_of_contracts/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await response.json();
      // console.log(await res)
      props.handleCallBack(await res);
      setShowAlert(true);
      setValue("consentId", "");
      setValue("considerationDescription", "");
      setValue("considerationValue", "");
      setValue("contractType", "");
      setValue("licenseId", "");
      setValue("medium", "");
      setValue("purpose", "");
      setValue("terms", []);
      setValue("contractors", []);
      setValue("signatures", []);
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
              Add Contract
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
                  <span>Effective Date</span>
                </div>
                <div className="col-lg-6">
                  <DateTimePicker
                    onChange={setEffectiveDate}
                    value={effectiveDate}
                    name="effectiveDate"
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-3">
                <div className="col-lg-3">
                  <span>End Date</span>
                </div>
                <div className="col-lg-6">
                  <DateTimePicker
                    onChange={setEndDate}
                    value={endDate}
                    name="endDate"
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-2">
                <div className="col-lg-3">
                  <span>Execution Date</span>
                </div>
                <div className="col-lg-6">
                  <DateTimePicker
                    onChange={setExecutionDate}
                    value={executionDate}
                    name="executionDate"
                  />
                </div>
              </div>

              <div className="d-flex row align-items-center">
                <div className="col-lg-3">
                  <span>Consideration Description</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter type description"
                    {...register("considerationDescription", {
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
                  {errors.considerationDescription?.type === "required" &&
                    "Consideration is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-2">
                <div className="col-lg-3">
                  <span>Consideration Value</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter type consideration value"
                    {...register("considerationValue", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center">
                <div className="col-lg-3">
                  <span>Contract Category</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    {...register("contractCategory", {
                      required: "Category is required.",
                    })}
                  >
                    <option value="">Select...</option>
                    <option value="categoryBusinessToConsumer" selected>
                      B2C
                    </option>
                    <option value="categoryBusinessToBusiness">B2B</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.contractCategory?.type === "required" &&
                    "Category is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center">
                <div className="col-lg-3">
                  <span>Contract Status</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    {...register("contractStatus", {
                      required: "Status is required.",
                    })}
                  >
                    <option value="">Select...</option>
                    <option value="statusCreated" selected>
                      Created
                    </option>
                    <option value="statusUpdated">Updated</option>
                    <option value="statusViolated">Violated</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.contractStatus?.type === "required" &&
                    "Status is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center">
                <div className="col-lg-3">
                  <span>Contract Type</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter contract type"
                    {...register("contractType", {
                      required: true,
                    })}
                  >
                    <option value="">Select...</option>
                    <option value="Written" selected>
                      Written
                    </option>
                    <option value="Oral">Oral</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.contractType?.type === "required" &&
                    "Type is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center">
                <div className="col-lg-3">
                  <span>Medium</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter contract medium"
                    {...register("medium", {
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
                  {errors.medium?.type === "required" && "Medium is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center">
                <div className="col-lg-3">
                  <span>Purpose</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter purpose of contract"
                    {...register("purpose", {
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
                  {errors.purpose?.type === "required" && "Purpose is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-2">
                <div className="col-lg-3">
                  <span>Contractors</span>
                </div>
                <div className="col-lg-6">
                  <Multiselect
                    {...register("contractors")}
                    displayValue="name"
                    style={{ borderRadius: "10px" }}
                    onSelect={(e) => {
                      let options = [];
                      for (let i = 0; i < e.length; i++) {
                        options.push(e[i].value);
                      }
                      setValue("contractors", options);
                    }}
                    options={contractorData}
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-2">
                <div className="col-lg-3">
                  <span>Terms</span>
                </div>
                <div className="col-lg-6">
                  <Multiselect
                    {...register("terms")}
                    displayValue="name"
                    style={{ borderRadius: "10px" }}
                    onSelect={(e) => {
                      let options = [];
                      for (let i = 0; i < e.length; i++) {
                        options.push(e[i].value);
                      }
                      setValue("terms", options);
                    }}
                    options={termData}
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-2">
                <div className="col-lg-3">
                  <span>Signatures</span>
                </div>
                <div className="col-lg-6">
                  <Multiselect
                    {...register("signatures")}
                    displayValue="name"
                    style={{ borderRadius: "10px" }}
                    onSelect={(e) => {
                      let options = [];
                      for (let i = 0; i < e.length; i++) {
                        options.push(e[i].value);
                      }
                      setValue("signatures", options);
                    }}
                    options={signatureData}
                  />
                </div>
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
