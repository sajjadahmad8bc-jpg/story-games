import React, { useState } from "react";
import TokenStore from "../../ReaderSection3/ReaderModal/TokenModal";
import ReadersInfo from "../../ReaderSection2/ReadersClub/ReadersInfo";
import PaymentForm from "../../ReaderSection3/Paymentform/PaymentForm";
import { IoClose } from "react-icons/io5";

const ReadersModalFlow = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  const goToNextStep = () =>
    setStep((prev) => Math.min(prev + 1, totalSteps - 1));


  const getModalSize = () => {
    switch (step) {
      case 0:
        return { width: "80%", height: "650px" };
      case 1:
        return { width: "40%", height: "660px" };
      case 2:
        return { width: "40%", height: "690px" };
      default:
        return { width: "900px", height: "650px" };
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <TokenStore onSelectPlan={goToNextStep} onClose={onClose} />;
      case 1:
        return <ReadersInfo onProceed={goToNextStep} onClose={onClose} />;
      case 2:
        return <PaymentForm onClose={onClose} />;
      default:
        return null;
    }
  };

  const modalSize = getModalSize();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
    
      <div
        style={{
          width: modalSize.width,
          height: modalSize.height,
          background: "#fff",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
        }}
      >
    
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#f3f3f3",
            borderRadius: "50%",
            border: "none",
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "22px",
            boxShadow: "0 0 6px rgba(0,0,0,0.1)",
          }}
        >
          <IoClose />
        </button>

      
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          {renderStepContent()}
        </div>

       
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            padding: "10px 0",
            borderTop: "1px solid #eee",
          }}
        >
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              onClick={() => setStep(index)}
              style={{
                width: "60px",
                height: "5px",
                borderRadius: "3px",
                background: step === index ? "#6f8bdf" : "#d3d3d3",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadersModalFlow;
