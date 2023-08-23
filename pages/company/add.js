
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import { Country, State, City } from "country-state-city";

function city(countryCode) {
  let countryData = Country.getAllCountries();
  let cities;
  const filteredCountry = countryData.filter((c) => c.name === countryCode);
  if (filteredCountry.length > 0) {
    const countCode = filteredCountry[0].isoCode;
    cities = City.getCitiesOfCountry(countCode);
  }
  return {
    cityData: cities,
  };
}

const Add = (props) => {
  let countryData = Country.getAllCountries();
  const [valueDate, setValueDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [country, setCountry] = useState(countryData);
  const [countryCode, setCountryCode] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      country: "",
      // state: "",
      city: "",
      vat: "",
      territory: "",
    },
  });

  const { cityData } = city(countryCode);

  const onSubmit = async (data) => {
    // console.log(valueDate)
    let dateISO = valueDate.toISOString();

    const postData = {
      CreateDate: dateISO,
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Address: data.address,
      Vat: data.vat,
      Country: data.country,
      Territory: data.territory,
    };

    // console.log(postData);

    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };
    // console.log("hi");
    console.log(props.res)

    const response = await fetch(
      "https://actool.contract-license.sti2.at/contract/company/create/",
      requestOptions
    );
    const result = await response.json();
    if (result) {
      const response = await fetch(
        "https://actool.contract-license.sti2.at/contract/companies/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const res = await response.json();
      props.handleCallBack(res);
      setShowAlert(true);
      setValue("name", "");
      setValue("address", "");
      setValue("phone", "");
      setValue("email", "");
      // setValue("country", "");
      // setValue("territory", "");
      setValue("vat", "");
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
              Add Organization
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
                  <span>Name</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter type description"
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
                  <span>Address</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter type description"
                    {...register("address", {
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
                  {errors.address?.type === "required" && "Address is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Email</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter type description"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please Enter A Valid Email!",
                      },
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
                  {errors.email?.type === "required" && "Email is required"}
                  {errors.email?.message}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Phone</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter type description"
                    {...register("phone", {
                      required: true,
                      minLength: 12,
                      maxLength: 14,
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
                  {errors.phone?.type === "required" && "Phone is required"}
                  {errors.phone?.type === "minLength" && "Minimum length is 12"}
                  {errors.phone?.type === "maxLength" && "Maximum length is 14"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Country</span>
                </div>
                <div className="col-lg-6">
                  {/* {console.log(errors)} */}
                  <Controller
                    control={control}
                    name="country"
                    render={({ onChange, name, ref, onBlur, value }) => (
                      <select
                        onChange={(e) => {
                          // console.log(e.target.value);
                          setValue("country", e.target.value);
                          setCountryCode(e.target.value);
                        }}
                        name={name}
                        // rules={rules}
                        value={value}
                        onBlur={onBlur}
                        className="form-control"
                        inputRef={ref}
                        style={{ borderRadius: "10px" }}
                      >
                        <option value="">Select...</option>
                        {/* {country && console.log(country)} */}
                        {country.map((x) => {
                          return (
                            <>
                              <option value={x.name}>{x.name}</option>
                            </>
                          );
                        })}
                      </select>
                    )}
                    // rules={{ required: true }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3">
                  <span></span>
                </div>
                <error className="col-lg-6 mb-2" style={{ color: "red" }}>
                  {errors.country?.type === "required" &&
                    "Country name is required"}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>Territory</span>
                </div>
                <div className="col-lg-6">
                  <select
                    className="form-control"
                    style={{ borderRadius: "10px" }}
                    {...register("territory", {
                      required: "Territory name is required.",
                    })}
                  >
                    <option value="">Select...</option>
                    {/* {city && console.log(city)} */}
                    {cityData !== undefined &&
                      cityData.map((x) => {
                        return (
                          <>
                            <option value={x.name}>{x.name}</option>
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
                  {errors.territory?.message}
                </error>
              </div>
              <div className="d-flex row align-items-center mb-1">
                <div className="col-lg-3">
                  <span>VAT</span>
                </div>
                <div className="col-lg-6">
                  <input
                    className="form-control"
                    placeholder="enter vat"
                    {...register("vat", {
                      required: false,
                    })}
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
