import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const UploadedNovel = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh", 
        backgroundColor: "#f8f9fa", 
      }}
    >
      <div
        className="d-flex flex-column flex-md-row border rounded shadow-sm overflow-hidden"
        style={{
          width: "900px",
          minHeight: "400px",
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
          
          <i className="bi bi-image fs-1 text-secondary"></i>
        </div>

      
        <div className="p-4" style={{ width: "65%", position: "relative" }}>
         
          <button
            type="button"
            className="btn-close position-absolute"
            style={{ top: "15px", right: "15px" }}
          ></button>

      
          <p
            className="mb-1 text-muted"
            style={{ fontSize: "0.9rem", marginBottom: "0" }}
          >
            Genre
          </p>

         
          <h5 className="fw-bold mb-2" style={{ fontSize: "1.25rem" }}>
            Novel Name
          </h5>

        
          <div className="mb-3">
            <span
              className="text-primary me-3"
              style={{ fontSize: "0.95rem", cursor: "pointer" }}
            >
              Author Name
            </span>
            <span
              className="text-primary"
              style={{ fontSize: "0.95rem", cursor: "pointer" }}
            >
              Writer Name
            </span>
          </div>

      
          <p
            className="text-muted"
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.5",
              marginBottom: "1.5rem",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi.
          </p>

       
          <div className="d-flex">
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
              Read Chapter 1 of 13 for Free and Meet the Characters
              <i className="bi bi-chevron-right fs-6 ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedNovel;
