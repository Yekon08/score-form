"use client";

import { useState } from "react";
import questionData from "../questions.json";
import Consent from "./Consent";
import Form from "./Form";

const HomePage = () => {
  const [step, setStep] = useState(0);

  const handleRender = () => {
    switch (step) {
      case 0:
        return <Consent />;
      default:
        return <Form step={step} />;
    }
  };

  const handleNext = () => {
    setStep((prevState) => prevState + 1);
  };

  const handleBack = () => {
    setStep((prevState) => prevState - 1);
  };

  const questionDataLength = Object.keys(questionData).length;

  return (
    <div className="w-10/12 mx-auto sm:w-full h-auto bg-mainContent rounded-md color-white">
      {handleRender()}
      <div
        className={`w-full bg-mainActionBtn px-6 py-3 rounded-b-md flex ${
          step !== 0 ? "justify-between" : "justify-end"
        }`}
      >
        {step !== 0 && (
          <button
            className="bg-white py-2 px-4 rounded-md text-xs font-medium"
            onClick={() => handleBack()}
          >
            Retour
          </button>
        )}
        {step !== questionDataLength && (
          <button
            className="bg-blueLogo py-2 px-4 rounded-md text-xs font-medium text-white"
            onClick={() => handleNext()}
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
