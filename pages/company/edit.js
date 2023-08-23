import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Alert from "react-bootstrap/Alert";
import DateTimePicker from "react-datetime-picker";
import { Country, City } from "country-state-city";

const Edit = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const receviedData = props.data;

  const [valueDate, setValueDate] = useState(receviedData.date);
  let countryData = Country.getAllCountries();
  const [country, setCountry] = useState(countryData);
  const [countryCode, setCountryCode] = useState("");
  const data = country.filter((x) => x.name === receviedData.country);
  let cityData = [];
  if (data.length > 0) {
    cityData = City.getCitiesOfCountry(data[0].isoCode);
  }
  const [city, setCity] = useState(cityData);

  const {
    register,
    control,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      id: receviedData.id,
      name: receviedData.name,
      phone: receviedData.phone,
      email: receviedData.email,
      address: receviedData.address,
      country: receviedData.country,
      city: receviedData.city,
      vat: receviedData.vat,
      territory: receviedData.territory,
    },
  });

  const getData = async () => {
    const data = await props.data;
    // console.log(data)
    setValue("name", data.name);
    setValue("phone", data.phone);
    setValue("email", data.email);
    setValue("address", data.address);
    setValue("country", data.country);
    setValue("city", data.city);
    setValue("vat", data.vat);
    setValue("territory", data.territory);
    setValueDate(data.date);
    // console.log(getValues("territory"));

    const countCode = country.filter((c) => c.name === data.country);
    // console.log(countCode);
    if (countCode.length > 0) {
      setCountryCode(countCode[0].isoCode);
      // console.log(countCode[0].isoCode)
    }
  };
  useEffect(() => {
    getData();
  }, [props]);

  const fetchCity = () => {
    // console.log(countryCode);
    let filteredCountry = [];
    if (countryCode.length === 2) {
      filteredCountry = country.filter((c) => c.isoCode === countryCode);
      const cities = City.getCitiesOfCountry(countryCode);
      // console.log(cities)
      setCity(cities);
    } else {
      filteredCountry = country.filter((c) => c.name === countryCode);
      if (filteredCountry.length > 0) {
        const countCode = filteredCountry[0].isoCode;
        // console.log(countCode)
        const cities = City.getCitiesOfCountry(countCode);
        // console.log(cities)
        setCity(cities);
      }
    }
  };

  useEffect(() => {
    fetchCity();
  }, [country, countryCode]);

  const onSubmit = async (data) => {
    let dateISO;

    if (valueDate.length === 32) {
      const dateFormat = new Date(valueDate);
      dateISO = dateFormat.toISOString();
    } else {
      dateISO = valueDate.toISOString();
    }
    const postData = {
      CompanyId: receviedData.id,
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    const response = await fetch(
      "https://actool.contract-license.sti2.at/contract/company/update/",
      requestOptions
    );
    const result = await response.json();
    if (result) {
      const response = await fetch(
        `https://actool.contract-license.sti2.at/contract/companies/`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await response.json();
      setShowAlert(true);
      setValue("name", "");
      setValue("address", "");
      setValue("phone", "");
      setValue("email", "");
      // setValue("country", "");
      // setValue("territory", "");
      setValue("vat", "");
      props.handleCallBack(res);
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
              Update Organization
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
                    style={{ borderRadius: "10px" }}
                    {...register("name", {
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
                    style={{ borderRadius: "10px" }}
                    placeholder="enter type description"
                    {...register("address", {
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
                    style={{ borderRadius: "10px" }}
                    placeholder="enter type description"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please Enter A Valid Email!",
                      },
                    })}
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
                    style={{ borderRadius: "10px" }}
                    placeholder="enter type description"
                    {...register("phone", {
                      required: true,
                      minLength: 12,
                      maxLength: 14,
                    })}
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
                  {/* {console.log(`"${receviedData.country}"`)} */}
                  <Controller
                    control={control}
                    name="country"
                    render={({ name, ref, onBlur }) => (
                      <select
                        style={{ borderRadius: "10px" }}
                        onChange={(e) => {
                          // console.log(e.target.value);
                          setValue("country", e.target.value);
                          setCountryCode(e.target.value);
                        }}
                        name={name}
                        value={getValues("country")}
                        onBlur={onBlur}
                        className="form-control"
                        inputRef={ref}
                        // defaultValue={getValues('country')}
                      >
                        <option value="">Select...</option>

                        {country.map((x) => {
                          return (
                            <>
                              <option value={x.name} key={x.name}>
                                {x.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    )}
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
                  {/* {console.log(getValues("territory"))} */}
                  <Controller
                    control={control}
                    name="territory"
                    render={({ name, ref, onBlur, value }) => (
                      <select
                        style={{ borderRadius: "10px" }}
                        onChange={(e) => {
                          // console.log(e.target.value);
                          setValue("territory", e.target.value);
                          // setCountryCode(e.target.value);
                        }}
                        name={name}
                        value={getValues("territory")}
                        onBlur={onBlur}
                        className="form-control"
                        inputRef={ref}
                        // defaultValue={getValues('country')}
                      >
                        <option value="">Select...</option>

                        {city.map((x) => {
                          return (
                            <>
                              <option value={x.name} key={x.name}>
                                {x.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    )}
                  />
                  {/* <select
                    className="form-control"
                    {...register("territory", {
                      required: "Territory name is required.",
                    })}
                  >
                    <option value="">Select...</option>
                    {city &&
                      city.map((x) => {
                        return (
                          <>
                            <option value={x.name} key={x.name}>{x.name}</option>
                          </>
                        );
                      })}
                  </select> */}
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
                    style={{ borderRadius: "10px" }}
                    placeholder="enter vat"
                    {...register("vat", {
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
