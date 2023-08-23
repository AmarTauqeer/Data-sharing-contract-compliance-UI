
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";
import Multiselect from "multiselect-react-dropdown";

const Edit = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const receviedData = props.data;
  // console.log(receviedData);
  const [endDate, setEndDate] = useState(receviedData.endDate);
  const [executionDate, setExecutionDate] = useState(
    receviedData.ExecutionDate
  );
  const [effectiveDate, setEffectiveDate] = useState(
    receviedData.effectiveDate
  );
  const [termData, setTermData] = useState([]);
  const [contractorData, setContractorData] = useState([]);
  const [signatureData, setSignatureData] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValueContractor, setSelectedValueContractor] = useState();
  const [selectedValueSignature, setSelectedValueSignature] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      id: receviedData.id,
      consentId: receviedData.consentId,
      considerationDescription: receviedData.considerationDescription,
      considerationValue: receviedData.considerationValue,
      contractCategory: receviedData.contractCategory,
      contractStatus: "statusUpdated",
      contractType: receviedData.contractType,
      licenseId: receviedData.licenseId,
      medium: receviedData.medium,
      purpose: receviedData.purpose,
      terms: [],
      contractors: [],
      signatures: [],
    },
  });

  useEffect(() => {
    if (receviedData) {
      setValue("consentId", receviedData.consentId);
      setValue(
        "considerationDescription",
        receviedData.considerationDescription
      );
      setValue("considerationValue", receviedData.considerationValue);

      setValue("contractCategory", receviedData.contractCategory);
      setValue("contractStatus", "statusUpdated");
      setValue("contractType", receviedData.contractType);
      setValue("licenseId", receviedData.licenseId);

      setValue("medium", receviedData.medium);
      setValue("purpose", receviedData.purpose);

      setEndDate(receviedData.endDate);
      setExecutionDate(receviedData.executionDate);
      setEffectiveDate(receviedData.effectiveDate);

      if (receviedData.terms !== undefined) {
        let selectedArray = [];
        let termArray = [];
        for (let index = 0; index < receviedData.terms.length; index++) {
          const element = receviedData.terms[index];
          // console.log(element)

          const filter = termData.filter((x) => x.value === element);

          if (filter.length > 0) {
            for (let index = 0; index < filter.length; index++) {
              const element = filter[index];
              // console.log(element);
              selectedArray.push(element);
              termArray.push(element.value);
            }
          }
        }
        setSelectedValue(selectedArray);
        setValue("terms", termArray);
      }
      // contractors data
      if (receviedData.contractors !== undefined) {
        let selectedArray = [];
        let contractorArray = [];
        for (let index = 0; index < receviedData.contractors.length; index++) {
          const element = receviedData.contractors[index];

          const filter = contractorData.filter((x) => x.value === element);

          if (filter.length > 0) {
            for (let index = 0; index < filter.length; index++) {
              const element = filter[index];
              selectedArray.push(element);
              contractorArray.push(element.value);
            }
          }
        }
        setSelectedValueContractor(selectedArray);
        setValue("contractors", contractorArray);
      }
      // signatures data
      if (receviedData.signatures !== undefined) {
        let selectedArray = [];
        let signatureArray = [];
        for (let index = 0; index < receviedData.signatures.length; index++) {
          const element = receviedData.signatures[index];

          const filter = signatureData.filter((x) => x.value === element);

          if (filter.length > 0) {
            for (let index = 0; index < filter.length; index++) {
              const element = filter[index];
              selectedArray.push(element);
              signatureArray.push(element.value);
            }
          }
        }
        setSelectedValueSignature(selectedArray);
        setValue("signatures", signatureArray);
      }
    }
  }, [props]);

  useEffect(() => {
    const fetchTerm = async () => {
      const res = await fetch(`https://actool.contract-license.sti2.at/contract/terms/`);
      const data = await res.json();
      // console.log(data);
      let temp = [];
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const tempData = {
            name: element.description,
            value: element.termId,
          };
          temp.push(tempData);
        }
        // console.log(temp);
        setTermData(temp);
      }
    };
    // fetch contractors
    const fetchContractor = async () => {
      const res = await fetch(`https://actool.contract-license.sti2.at/contract/contractors/`);
      const data = await res.json();
      // console.log(data);
      let temp = [];
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const tempData = {
            name: element.name,
            value: element.contractorId,
          };
          temp.push(tempData);
        }
        // console.log(temp);
        setContractorData(temp);
      }
    };
    // fetch signatures
    const fetchSignature = async () => {
      const res = await fetch(`https://actool.contract-license.sti2.at/contract/signatures/`);
      const data = await res.json();
      // console.log(data);
      let temp = [];
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const tempData = {
            name: element.signatureText,
            value: element.signatureId,
          };
          temp.push(tempData);
        }
        // console.log(temp);
        setSignatureData(temp);
      }
    };

    fetchTerm();
    fetchContractor();
    fetchSignature();
  }, []);

  const onSubmit = async (data) => {
    let endDateISO, executionDateISO, effectiveDateISO;

    if (endDate.length === 32) {
      const dateFormat = new Date(endDate);
      endDateISO = dateFormat.toISOString();
    } else {
      endDateISO = endDate.toISOString();
    }

    if (executionDate.length === 32) {
      const dateFormat = new Date(executionDate);
      executionDateISO = dateFormat.toISOString();
    } else {
      executionDateISO = executionDate.toISOString();
    }
    if (effectiveDate.length === 32) {
      const dateFormat = new Date(effectiveDate);
      effectiveDateISO = dateFormat.toISOString();
    } else {
      effectiveDateISO = effectiveDate.toISOString();
    }

    if (endDateISO < effectiveDateISO) {
      alert("end date must be greator or equal to effective date");
      return false;
    }
    const postData = {
      ContractId: receviedData.id,
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    const response = await fetch(
      "https://actool.contract-license.sti2.at/contract/update/",
      requestOptions
    );
    const result = await response.json();
    if (result) {
      const response = await fetch(
        "https://actool.contract-license.sti2.at/contract/list_of_contracts/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await response.json();
      props.handleCallBack(await res);
      setShowAlert(true);
    }

    // setValue("name", "");
    // setValue("description", "");
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
              Update Contract
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
              <div className="d-flex row align-items-center mb-3">
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

              <div className="d-flex row align-items-center mb-2">
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
              <div className="d-flex row align-items-center mb-3">
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
              <div className="d-flex row align-items-center mb-2">
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
              <div className="d-flex row align-items-center mb-2">
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
              <div className="d-flex row align-items-center mb-2">
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
              <div className="d-flex row align-items-center mb-2">
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
              <div className="d-flex row align-items-center mb-2">
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
                    selectedValues={selectedValueContractor}
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-2">
                <div className="col-lg-3">
                  <span>Terms</span>
                </div>
                <div className="col-lg-6">
                  {/* {console.log(termData)} */}
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
                    selectedValues={selectedValue}
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
                    selectedValues={selectedValueSignature}
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
