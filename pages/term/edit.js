"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";
import Multiselect from "multiselect-react-dropdown";

const Edit = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const receviedData = props.data;
  const [typeData, setTypeData] = useState([]);
  const [obligationData, setObligationData] = useState([]);
  const [selectedValue, setSelectedValue] = useState();
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
      termTypeId: receviedData.typeId,
      description: receviedData.description,
      obligations: [],
    },
  });

  useEffect(() => {
    if (receviedData) {
      setValue("termTypeId", receviedData.typeId);
      setValue("description", receviedData.description);
      setValueDate(receviedData.date);

      if (receviedData.obligations !== undefined) {
        let selectedArray = [];
        let obligationArray = [];
        for (let index = 0; index < receviedData.obligations.length; index++) {
          const element = receviedData.obligations[index];

          const filter = obligationData.filter((x) => x.value === element);

          if (filter.length > 0) {
            for (let index = 0; index < filter.length; index++) {
              const element = filter[index];
              selectedArray.push(element);
              obligationArray.push(element.value);
            }
          }
        }
        setSelectedValue(selectedArray);
        setValue("obligations", obligationArray);
      }
    }
  }, [props]);

  useEffect(() => {
    const fetchType = async () => {
      const res = await fetch(
        `http://127.0.0.1:5005/contract/term/types`
      );
      const data = await res.json();
      let temp = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        temp.push(element);
      }
      setTypeData(temp);
    };

    const fetchObligation = async () => {
      const res = await fetch(
        `http://127.0.0.1:5005/contract/obligations/`
      );
      const data = await res.json();
      // console.log(data);
      let temp = [];
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          const tempData = {
            name: element.obligationDescription,
            value: element.obligationId,
          };
          temp.push(tempData);
        }
        // console.log(temp);
        setObligationData(temp);
      }
    };

    fetchType();
    fetchObligation();
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
      TermId: receviedData.id,
      CreateDate: dateISO,
      TermTypeId: data.termTypeId,
      Description: data.description,
      Obligations: data.obligations,
    };
    // console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    const response = await fetch(
      "http://127.0.0.1:5005/contract/term/update/",
      requestOptions
    );
    const result = await response.json();
    if (result) {
      const response = await fetch(
        `http://127.0.0.1:5005/contract/terms/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await response.json();
      props.handleCallBack(res);
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
              Update Term
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
                    {typeData.map((x) => {
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
                    class="form-control"
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
                      // console.log(e);
                      let options = [];
                      for (let i = 0; i < e.length; i++) {
                        options.push(e[i].value);
                      }
                      setValue("obligations", options);
                    }}
                    options={obligationData}
                    selectedValues={selectedValue}
                    style={{ borderRadius: "10px" }}
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
