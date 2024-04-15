"use client";
import { handleSendMail } from "@/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import questionData from "../questions.json";

const Form = ({ step, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const handleFormSubmit = (data) => {
    console.log("data: ", data);
    handleSendMail(data);
  };

  // TODO: do it better
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      alert("Tous les champs sont requis");
    }
  }, [errors, clearErrors]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="text-white px-6">
      {
        <div className="mb-8">
          <h3 className="text-blueLogo text-xs font-medium mb-6 mt-5">
            {Object.keys(questionData)[step - 1]}
          </h3>
          <QuestionList
            data={questionData[Object.keys(questionData)[step - 1]]}
            register={register}
          />
        </div>
      }
    </form>
  );
};

const QuestionList = ({ data, register }) => {
  return (
    <div className="flex flex-col gap-6">
      {data.map((questionData) => (
        <div key={questionData.id}>
          {questionData.isAnOpenQuestion ? (
            <div className="flex flex-col">
              <label
                htmlFor={questionData.id}
                className="text-sm font-medium mb-2"
              >
                {questionData.question}
              </label>
              <input
                type="text"
                id={questionData.id}
                className="rounded-md bg-mainContent px-3 py-2 outline-none focus:border-blueLogo border border-lightGray max-w-[60%]"
                {...register(questionData.id.toString(), { required: true })}
              />
            </div>
          ) : (
            <div className="flex justify-between">
              <p
                htmlFor={questionData.question}
                className="text-sm font-medium"
              >
                {questionData.question}
              </p>
              <div className="flex">
                <div>
                  <input
                    type="radio"
                    id={`${questionData.id}-yes`}
                    name={`${questionData.id}-answer`}
                    value="yes"
                    {...register(questionData.id.toString(), {
                      required: true,
                    })}
                  />
                  <label
                    htmlFor={`${questionData.id}-yes`}
                    className="ml-7 mr-12 uppercase text-sm font-medium"
                  >
                    Oui
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`${questionData.id}-no`}
                    name={`${questionData.id}-answer`}
                    value="no"
                    {...register(questionData.id.toString(), {
                      required: true,
                    })}
                  />
                  <label
                    htmlFor={`${questionData.id}-no`}
                    className="ml-7 uppercase text-sm font-medium"
                  >
                    Non
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Form;
