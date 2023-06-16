export const getServerSideProps = async () => {
  const data = await fetch("http://127.0.0.1:5000/contract/compliance/");
  const res = await data.json();
  return { props: { res } };
};

const Compliance = ({ res }) => {
  return (
    <>
      <div className="h3 mt-5 mb-5">Compliance Verification</div>
      {console.log(res)}
      {res !== undefined &&
        res.map((element) =>
          element["ccv_fourth_scenario"] ? (
            <>
              <div className="row">
                <div className="col-auto text-uppercase">ccv fourth scenario</div>
                <div className="col-auto">
                  <textarea
                    value={element["ccv_fourth_scenario"]}
                    rows={element.ccv_fourth_scenario.includes("True") ? 2 : 15}
                    style={{
                      width: element.ccv_fourth_scenario.includes("True")
                        ? "300px"
                        : "1000px",
                      color: element.ccv_fourth_scenario.includes("True")
                        ? "green"
                        : "red",
                    }}
                  ></textarea>
                </div>
              </div>
            </>
          ) : element["ccv_fifth_scenario"] ? (
            <>
              <div className="row">
                <div className="col-auto text-uppercase">ccv fifth scenario</div>
                <div className="col-auto">
                  <textarea
                    value={element["ccv_fifth_scenario"]}
                    rows={element.ccv_fourth_scenario.includes("True") ? 2 : 15}
                    style={{
                      width: element.ccv_fourth_scenario.includes("True")
                        ? "300px"
                        : "1000px",
                      color: element.ccv_fourth_scenario.includes("True")
                        ? "green"
                        : "red",
                    }}
                  ></textarea>
                </div>
              </div>
            </>
          ) : element["ccv_third_else_part_scenario"] ? (
            <>
              <div className="row">
                <div className="col-auto text-uppercase">ccv third else part scenario</div>
                <div className="col-auto">
                  <textarea
                    value={element["ccv_third_else_part_scenario"]}
                    rows={element.ccv_fourth_scenario.includes("True") ? 2 : 15}
                    style={{
                      width: element.ccv_fourth_scenario.includes("True")
                        ? "300px"
                        : "1000px",
                      color: element.ccv_fourth_scenario.includes("True")
                        ? "green"
                        : "red",
                    }}
                  ></textarea>
                </div>
              </div>
            </>
          ) : element["ccv_third_if_part_scenario"] ? (
            <>
              <div className="row">
                <div className="col-auto text-uppercase">ccv third if part scenario</div>
                <div className="col-auto">
                  <textarea
                    value={element["ccv_third_if_part_scenario"]}
                    rows={element.ccv_fourth_scenario.includes("True") ? 2 : 15}
                    style={{
                      width: element.ccv_fourth_scenario.includes("True")
                        ? "300px"
                        : "1000px",
                      color: element.ccv_fourth_scenario.includes("True")
                        ? "green"
                        : "red",
                    }}
                  ></textarea>
                </div>
              </div>
            </>
          ) : element["ccv_second_scenario"] ? (
            <>
              <div className="row">
                <div className="col-auto text-uppercase">ccv second scenario</div>
                <div className="col-auto">
                  <textarea
                    value={element["ccv_second_scenario"]}
                    rows={element.ccv_fourth_scenario.includes("True") ? 2 : 15}
                    style={{
                      width: element.ccv_fourth_scenario.includes("True")
                        ? "300px"
                        : "1000px",
                      color: element.ccv_fourth_scenario.includes("True")
                        ? "green"
                        : "red",
                    }}
                  ></textarea>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-auto text-uppercase">ccv first scenario</div>
                <div className="col-auto">
                  <textarea
                    value={element["ccv_first_scenario"]}
                    rows={element.ccv_fourth_scenario.includes("True") ? 2 : 15}
                    style={{
                      width: element.ccv_fourth_scenario.includes("True")
                        ? "300px"
                        : "1000px",
                      color: element.ccv_fourth_scenario.includes("True")
                        ? "green"
                        : "red",
                    }}
                  ></textarea>
                </div>
              </div>
            </>
          )
        )}
    </>
  );
};

export default Compliance;
