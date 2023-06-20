import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";

const Add = (props) => {
  const [endDate, setEndDate] = useState(new Date());
  const [executionDate, setExecutionDate] = useState(new Date());
  const [fulfillmentDate, setFulfillmentDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [contractorData, setContractorData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      description: "",
      contractorId: "",
      state: "statePending",
      contractIdB2C: "",
    },
  });

  const fetchContracor = async () => {
    const data = await fetch(`http://127.0.0.1:5005/contract/contractors/`);
    const res = await data.json();

    if (res.length > 0) {
      setContractorData(res);
    }
  };

  useEffect(() => {
    fetchContracor();
  }, [props]);

  const onSubmit = async (data) => {
    let endDateISO = endDate.toISOString();
    let executionDateISO = executionDate.toISOString();
    let fulfillmentDateISO = fulfillmentDate.toISOString();

    const postData = {
      ExecutionDate: executionDateISO,
      EndDate: endDateISO,
      FulfillmentDate: fulfillmentDateISO,
      Description: data.description,
      ContractorId: data.contractorId,
      State: data.state,
      ContractIdB2C: data.contractIdB2C,
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
      "http://127.0.0.1:5005/contract/obligation/create/",
      requestOptions
    );
    const result = await response.json();

    if (result) {
      const response = await fetch(
        "http://127.0.0.1:5005/contract/obligations/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await response.json();

      props.handleCallBack(res);
      setShowAlert(true);
      setValue("contractorId", "");
      setValue("description", "");
      setValue("state", "statePending");
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
              Add Contract Clause
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
              <div className="d-flex row align-items-center mb-3">
                <div className="col-lg-3">
                  <span>End Date</span>
                </div>
                <div className="col-lg-6">
                  <div className="card-body" style={{color:'black'}}>
                    <DateTimePicker
                      onChange={setEndDate}
                      value={endDate}
                      name="endDate"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex row align-items-center mb-3">
                <div className="col-lg-3">
                  <span>Fullfillment Date</span>
                </div>
                <div className="col-lg-6">
                  <DateTimePicker
                    onChange={setFulfillmentDate}
                    value={fulfillmentDate}
                    name="fulfillmentDate"
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
                      required: "Contract is required.",
                    })}
                  >
                    <option>Select...</option>
                    {contractorData.map((x) => {
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
                  <span>Description</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter clause description"
                    {...register("description", {
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
                  {errors.description?.type === "required" &&
                    "Desription is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-3">
                <div className="col-lg-3">
                  <span>State</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    {...register("state", {
                      required: "Clause state is required.",
                    })}
                  >
                    <option value="">Select...</option>
                    <option value="statePending" selected>
                      Pending
                    </option>
                    <option value="stateViolated">Violated</option>
                    <option value="stateInvalid">Invalid</option>
                  </select>
                </div>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>ContractIdB2C</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    placeholder="enter clause description"
                    {...register("contractIdB2C", {
                      required: false,
                    })}
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
