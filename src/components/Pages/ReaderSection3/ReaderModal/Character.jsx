import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const Character = ({ story, onClose, openBook }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f8f9fa" }}
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
          style={{ width: "35%", minHeight: "400px" }}
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

          
          <p className="mb-1 text-muted">{story?.book || "Book Name"}</p>

         
          <h5 className="fw-bold mb-2">{story?.character || "Character Name"}</h5>

       
          <div className="mb-3">
            <span className="text-primary me-3" style={{ cursor: "pointer" }}>
              Played & Written by {story?.author || "Jon Doe"}
            </span>
          </div>

        
          <h6 className="fw-bold mb-2">Personality Traits</h6>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>

       
          <h6 className="fw-bold mb-2">About Character</h6>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
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
              onClick={openBook} 
            >
              Read from Character Perspective
              <i className="bi bi-chevron-right fs-6 ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
