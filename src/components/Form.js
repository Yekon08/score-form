"use client";
import { handleSendMail } from "@/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import questionData from "../questions.json";

const Form = ({ step }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  const handleFormSubmit = (data) => {
    handleSendMail(data);
  };

  // TODO: do it better
  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      toast("Tous les champs sont requis");
    }
  }, [errors, clearErrors]);

  const questionDataLength = Object.keys(questionData).length;

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
            part={Object.keys(questionData)[step - 1]}
          />
          {step === questionDataLength && (
            <button
              className="bg-blueLogo py-2 px-4 rounded-md font-medium text-white text-center block mx-auto mt-8 uppercase"
              type="submit"
            >
              Envoyer ses résultats
            </button>
          )}
        </div>
      }
    </form>
  );
};

const QuestionList = ({ data, register, part }) => {
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
                className="rounded-md bg-mainContent px-3 py-2 outline-none focus:border-blueLogo border border-lightGray w-full sm:max-w-[60%]"
                {...register(`${part}.${questionData.question}`, {
                  required: true,
                })}
              />
            </div>
          ) : (
            <div className="flex justify-between flex-col mb-5 sm:flex-row items-center">
              <p
                htmlFor={questionData.question}
                className="text-sm font-medium mb-5 sm:mb-0"
              >
                {questionData.question}
              </p>
              <div className="flex sm:ml-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`${questionData.id}-yes`}
                    name={`${questionData.id}-answer`}
                    value="oui"
                    {...register(`${part}.${questionData.question}`, {
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
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`${questionData.id}-no`}
                    name={`${questionData.id}-answer`}
                    value="non"
                    {...register(`${part}.${questionData.question}`, {
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
