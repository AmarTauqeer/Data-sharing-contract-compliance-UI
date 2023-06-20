import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";


const Add = (props) => {
  const [valueDate, setValueDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [typeData, setTypeData] = useState([]);
  const [obligationData, setObligationData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    defaultValues: {
      description: "",
      termTypeId: "",
      obligations: [],
    },
  });

  const fetchType = async () => {
    const typeData = await fetch(`http://127.0.0.1:5005/contract/term/types`);
    const resType = await typeData.json();
    if (resType.length > 0) {
      setTypeData(resType);
    }
  };

  const fetchObligation = async () => {
    const oblData = await fetch(`http://127.0.0.1:5005/contract/obligations/`);
    const resObligation = await oblData.json();
    if (resObligation.length > 0) {
      let temp = [];
      if (resObligation !== undefined) {
        for (let index = 0; index < resObligation.length; index++) {
          const element = resObligation[index];

          const tempData = {
            name: element.obligationDescription,
            value: element.obligationId,
          };
          // console.log(tempData);
          temp.push(tempData);
        }
      }
      setObligationData(temp);
    }
  };

  useEffect(() => {
    fetchType(), fetchObligation();
  }, [props]);

  const onSubmit = async (data) => {
    // console.log(valueDate)
    let dateISO = valueDate.toISOString();

    const postData = {
      CreateDate: dateISO,
      Description: data.description,
      TermTypeId: data.termTypeId,
      Obligations: data.obligations,
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
      "http://127.0.0.1:5005/contract/term/create/",
      requestOptions
    );
    const result = await response.json();

    if (result) {
      const response = await fetch("http://127.0.0.1:5005/contract/terms/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();
      props.handleCallBack(res);
      setShowAlert(true);
      setValue("termTypeId", "");
      setValue("description", "");
      setValue("obligations", []);
    }
    // console.log(result);
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
              Add Term
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
                  <span>Term Type</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    {...register("termTypeId", {
                      required: "Term type is required.",
                    })}
                    style={{ borderRadius: "10px" }}
                  >
                    <option>Select...</option>
                    {/* {console.log(typeData)} */}
                    {typeData !== undefined &&
                      typeData !== "No record found for this ID" &&
                      typeData.map((x) => {
                        return (
                          <>
                            <option value={x.termTypeId}>{x.name}</option>
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
                  {errors.termTypeId?.message}
                </error>
              </div>

              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Description</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter type description"
                    {...register("description", {
                      required: true,
                    })}
                    style={{ borderRadius: "10px" }}
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

              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Obligation</span>
                </div>
                <div className="col-lg-6">
                  <Multiselect
                    {...register("obligations")}
                    displayValue="name"
                    onSelect={(e) => {
                      let options = [];
                      for (let i = 0; i < e.length; i++) {
                        options.push(e[i].value);
                      }
                      setValue("obligations", options);
                    }}
                    options={obligationData !== undefined && obligationData}
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
