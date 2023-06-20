"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";

const Edit = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const receviedData = props.data;
  const [valueDate, setValueDate] = useState(receviedData.date);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      id: receviedData.id,
      name: receviedData.name,
      description: receviedData.description,
    },
  });

  useEffect(() => {
    if (receviedData) {
      setValue("name", receviedData.name);
      setValue("description", receviedData.description);
      setValueDate(receviedData.date);
    }
  }, [props]);

  const onSubmit = async (data) => {
    let dateISO;
    if (valueDate.length === 32) {
      dateISO = new Date(valueDate);
    } else {
      dateISO = valueDate.toISOString();
    }
    const postData = {
      TermTypeId: receviedData.id,
      CreateDate: dateISO,
      Name: data.name,
      Description: data.description,
    };
    // console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };
    // console.log("hi");

    const response = await fetch(
      "http://127.0.0.1:5005/contract/term/type/update/",
      requestOptions
    );
    const result = await response.json();

    if (result) {
      const res = await fetch("http://127.0.0.1:5005/contract/term/types", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      props.handleCallBack(result);
      setShowAlert(true);
      setValue("name", "");
      setValue("description", "");
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
              Update Term Type
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
                    placeholder="Enter create date."
                    onChange={setValueDate}
                    value={valueDate}
                    name="createDate"
                  />
                </div>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Name</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter term type"
                    {...register("name", {
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
                  {errors.name?.type === "required" && "Name is required"}
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
