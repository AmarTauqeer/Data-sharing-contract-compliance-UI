"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Delete = (props) => {
  const router=useRouter()
//   console.log(props.id);
  const handleDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(postData),
    };
    const res = await fetch(
      `http://127.0.0.1:5000/contract/signature/delete/${props.id}/`,
      requestOptions
    );
    const result = await res.json();
    if (result) {
      const response = await fetch(
        "http://127.0.0.1:5000/contract/signatures/",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }, 
        }
      );
      const res = await response.json();
      props.handleCallBack(res);  
    }
    
  };

  return (
    <div
      class="modal fade"
      id="staticBackdropDelete"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Delete Contractor Signature
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Do you really want to delete this record?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" onClick={handleDelete} class="btn btn-sm btn-danger" data-bs-dismiss="modal">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
