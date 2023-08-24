export const getServerSideProps = async () => {
  const data = await fetch(`https://actool.contract-license.sti2.at/contract/list_of_contracts/`);
  const res = await data.json();

  let countContract = 0;

  if (res !== undefined && res!=="No record found") {
    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      countContract += 1;
    }
  }

  const oblData = await fetch(`https://actool.contract-license.sti2.at/contract/obligations/`);
  const resObligation = await oblData.json();

  let countObligation = 0;

  if (resObligation !== undefined && resObligation!=="No record found") {
    for (let index = 0; index < resObligation.length; index++) {
      const element = resObligation[index];
      countObligation += 1;
    }
  }

  const termData = await fetch(`https://actool.contract-license.sti2.at/contract/terms/`);
  const resTerm = await termData.json();

  let countTerm = 0;

  if (resTerm !== undefined && resTerm!=="No record found") {
    for (let index = 0; index < resTerm.length; index++) {
      const element = resTerm[index];
      countTerm += 1;
    }
  }

  const contData = await fetch(`https://actool.contract-license.sti2.at/contract/contractors/`);
  const resContractor = await contData.json();

  let countContractor = 0;

  if (resContractor !== undefined && resContractor!=="No record found") {
    for (let index = 0; index < resContractor.length; index++) {
      const element = resContractor[index];
      countContractor += 1;
    }
  }

  return {
    props: {
      res,
      resObligation,
      resTerm,
      resContractor,
      countContract,
      countObligation,
      countContractor,
      countTerm,
    },
  };
};

import { React, useState, useEffect, useContext } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaFileContract } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import DataTable from "react-data-table-component";
import Link from "next/link";

const Dashborard = ({
  res,
  resContractor,
  resObligation,
  resTerm,
  countContract,
  countContractor,
  countObligation,
  countTerm,
}) => {
  const [user, setUser] = useState(null);
  const columns = [
    {
      name: "CATEGORY",
      selector: (row) => {
        if (row.contractCategory != undefined) {
          if (row.contractCategory === "categoryBusinessToConsumer") {
            return "Business to consumer";
          } else {
            return "Business to business";
          }
        }
      },
      sortable: true,
      width: "300px",
    },
    {
      name: "Purpose",
      selector: (row) => row.purpose,
      sortable: true,
      width: "400px",
    },
    {
      name: "CONTRACTOR",
      selector: (row) => {
        const contractors = row.identifiers.contractors;
        let nameArr = [];
        if (contractors !== undefined) {
          const arr = contractors.map((x) => {
            const filterContractor = resContractor.filter(
              (c) => c.contractorId === x
            );
            if (filterContractor.length > 0) {
              for (let index = 0; index < filterContractor.length; index++) {
                const element = filterContractor[index];
                if (element) {
                  nameArr.push(element.name);
                  let lastElement = contractors[contractors.length - 1];
                  if (x !== lastElement) {
                    nameArr.push(",");
                  }
                }
              }
            }
          });
          return nameArr;
        }
      },
      width: "400px",
    },

    {
      name: "TERM",
      selector: (row) => {
        const terms = row.identifiers.terms;
        let desc = "";
        if (terms !== undefined && terms.length > 0) {
          // console.log(terms)
          const arr = terms.map((x) => {
            // console.log(x)
            if (resTerm.length > 0 && resTerm !== "No data found for this ID") {
              const filterData = resTerm.filter((t) => t.termId === x);
              // console.log(filterData);
              if (filterData.length > 0) {
                desc = filterData[0].description;
                // console.log(filterData[0].description);
                return filterData[0].description;
              }
            }
          });
          return desc;
        }
      },
      width: "300px",
    },
    {
      name: "STATUS",
      selector: (row) => {
        return row.contractStatus && row.contractStatus === "statusCreated" ? (
          <div style={{ color: "#00DFA2" }}>{row.contractStatus}</div>
        ) : row.contractStatus === "statusUpdated" ? (
          <div style={{ color: "#FF55BB" }}>{row.contractStatus}</div>
        ) : (
          <div style={{ color: "#f94144" }}>{row.contractStatus}</div>
        );
      },
      sortable: true,
    },
  ];

  const customStyle = {
    hieght: "100%",
    rows: {
      style: {
        fontSize: "15px",
        paddingBottom: "20px",
        paddingTop: "20px",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        paddingBottom: "20px",
        backgroundColor: "#f8f9fa",
      },
    },
  };

  const router = useRouter();
  const handleContract = (e) => {
    router.push("/contract");
  };

  const handleContractor = (e) => {
    router.push("/contractor");
  };

  const handleTerm = (e) => {
    router.push("/term");
  };
  const handleClause = (e) => {
    router.push("/obligation");
  };

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("userInfo"));
    setUser(getData);
  }, []);

  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="row mb-5">
            <div className="col-sm-6 col-md-3 col-lg-3 col-12">
              <div
                className="card"
                style={{
                  border: "solid 1px",
                  // borderRadius: "30px",
                  minHeight: "150px",
                  backgroundColor: "#088395",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-auto">
                      <div className="col-auto h5 fw-bolder">
                        {countContract}
                      </div>
                      <div className="col-auto mt-3">Contract</div>
                    </div>
                    <div className="col-auto">
                      <FaFileContract size={30} />
                      {/* <Image src={contract} width={70} height={70} alt="..." /> */}
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-3">
                  <button
                    className="btn btn-info fw-bolder"
                    type="button"
                    style={{ color: "#fff" }}
                    onClick={handleContract}
                  >
                    More info <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-12">
              <div
                className="card"
                style={{
                  border: "solid 1px",
                  // borderRadius: "30px",
                  minHeight: "150px",
                  backgroundColor: "#3B9AE1",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-auto">
                      <div className="col-auto h5 fw-bolder">
                        {countContractor}
                      </div>
                      <div className="col-auto mt-3">Contractor</div>
                    </div>

                    <div className="col-auto">
                      <BsFillPersonPlusFill size={30} />
                      {/* <Image src={contract} width={70} height={70} alt="..." /> */}
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-3">
                  <button
                    className="btn btn-info fw-bolder"
                    type="button"
                    style={{ color: "#fff" }}
                    onClick={handleContractor}
                  >
                    More info <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-12">
              <div
                className="card"
                style={{
                  border: "solid 1px",
                  // borderRadius: "30px",
                  minHeight: "150px",
                  backgroundColor: "#FF8D29",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-auto">
                      <div className="col-auto h5 fw-bolder">{countTerm}</div>
                      <div className="col-auto mt-3">Term</div>
                    </div>

                    <div className="col-auto">
                      <FaClipboardList size={30} />
                      {/* <Image src={contract} width={70} height={70} alt="..." /> */}
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-3">
                  <button
                    className="btn btn-info fw-bolder"
                    type="button"
                    style={{ color: "#fff" }}
                    onClick={handleTerm}
                  >
                    More info <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-12">
              <div
                className="card"
                style={{
                  border: "solid 1px",
                  // borderRadius: "30px",
                  minHeight: "150px",
                  backgroundColor: "#F55353",
                  color: "#fff",
                  fontWeight: "bolder",
                }}
              >
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="col-auto">
                      <div className="col-auto h5 fw-bolder">
                        {countObligation}
                      </div>
                      <div className="col-auto mt-3">Clause</div>
                    </div>

                    <div className="col-auto">
                      <HiClipboardList size={30} />
                      {/* <Image src={contract} width={70} height={70} alt="..." /> */}
                    </div>
                  </div>
                </div>
                <div className="d-grid mt-3">
                  <button
                    className="btn btn-info fw-bolder"
                    type="button"
                    style={{ color: "#fff" }}
                    onClick={handleClause}
                  >
                    More info <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h3 mb-5">Recent Orders</div>
          {res !== undefined && res !== "No record is found" ? (
            <DataTable
              columns={columns}
              data={res}
              pagination
              customStyles={customStyle}
              highlightOnHover
              dense
            />
          ) : (
            "There are no records to display"
          )}
        </>
      ) : (
        <h4 className="mt-5">
          You are allowed to view this page. <br />
          <br />
          <Link href="/" style={{ fontSize: "24px", fontWeight: "bolder" }}>
            Login
          </Link>
        </h4>
      )}
    </>
  );
};

export default Dashborard;
