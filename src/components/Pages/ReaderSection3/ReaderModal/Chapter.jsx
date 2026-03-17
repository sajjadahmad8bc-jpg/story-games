import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const RejectedNovelCard = ({ story, onClose }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="d-flex flex-column flex-md-row border rounded shadow-sm overflow-hidden"
        style={{
          width: "815px",
          minHeight: "445px",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
      
        <div
          className="d-flex align-items-center justify-content-center bg-light"
          style={{
            width: "35%",
            minHeight: "400px",
          }}
        >
          <img
            src={story?.image || ""}
            alt="chapter"
            style={{ maxWidth: "50%", maxHeight: "50%" }}
          />
        </div>

      
        <div className="p-4" style={{ width: "65%", position: "relative" }}>
   
          <button
            type="button"
            className="btn-close position-absolute"
            style={{ top: "15px", right: "15px" }}
            onClick={onClose}  
          ></button>

       
          <p className="mb-1 text-muted" style={{ fontSize: "0.9rem", marginBottom: "0" }}>
            {story?.book || "Book Name"}
          </p>

       
          <h5 className="fw-bold mb-2" style={{ fontSize: "1.25rem" }}>
            {story?.chapterTitle || "Chapter 1 Name"}
          </h5>

        
          <div className="mb-3">
            <span className="text-primary me-3" style={{ fontSize: "0.95rem", cursor: "pointer" }}>
              {story?.author || "Author Name"}
            </span>
            <span className="text-primary" style={{ fontSize: "0.95rem", cursor: "pointer" }}>
              Written by {story?.writer || "Jon Doe"}
            </span>
          </div>

       
          <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "1.5rem" }}>
            {story?.description?.repeat(2) ||
              "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."}
          </p>

       
          <div className="mt-auto">
            <button
              className="btn text-white px-4"
              style={{
                backgroundColor: "#6f8bda",
                borderRadius: "25px",
                fontWeight: "500",
                width: "100%",
                height: "50px",
              }}
            >
              Read Chapter 1
              <i className="bi bi-chevron-right fs-6 ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedNovelCard;
