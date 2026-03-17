import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SubscriptionCard from "../../ReaderSection1/TokenStore/SubscriptionCard";

const TokenModal = ({ goToNextStep, onClose }) => { 
  const [currentPlan, setCurrentPlan] = useState(null);
  
  const plans = [
    {
      name: "Casual Reader",
      price: 2.5,
      features: ["Follow Story from 1 Character Perspective", "Receive 5 Good Read Tokens"],
    },
    {
      name: "Active Reader",
      price: 12.5,
      features: ["Follow Story from 6 Characters Perspective", "Receive 25 Good Read Tokens"],
    },
    {
      name: "Excited Reader",
      price: 25,
      features: ["Follow Story from 12 Characters Perspective", "Receive 50 Good Read Tokens"],
    },
    {
      name: "Binge Reader",
      price: 50,
      features: ["Follow Story from 25 Characters Perspective", "Receive 100 Good Read Tokens"],
    },
  ];

  const handleSelect = (planName) => {
    setCurrentPlan(planName);
    if (goToNextStep) goToNextStep();
  };

  return (
    <div className="position-relative" style={{ width: "100%", padding: "0",height:"0" }}>
   
 

   
      <div className="d-flex justify-content-center py-3 border-bottom">
        <h4 className="fw-bold mb-0">Join the Readers Club</h4>
      </div>

     
      <Container className="mt-5">
        <Row className="g-4 justify-content-center">
          {plans.map((plan) => (
            <Col key={plan.name} xs={12} sm={6} md={4} lg={3}>
              <SubscriptionCard
                planName={plan.name}
                price={plan.price}
                features={plan.features}
                isCurrent={currentPlan === plan.name}
                onSelect={() => handleSelect(plan.name)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TokenModal;
