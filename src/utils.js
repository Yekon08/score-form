import { toast } from "react-toastify";
import questionData from "../src/questions.json";

export const handleSendMail = (data) => {
  const processData = () => {
    const processedData = {};

    for (const part in questionData) {
      const filteredQuestions = questionData[part].filter((question) => {
        const answer = data[question.id.toString()];
        return answer !== "non" && answer !== "" && answer !== null;
      });
      processedData[part] = Object.fromEntries(
        filteredQuestions.map((question) => [
          question.question,
          data[question.id.toString()],
        ])
      );
    }

    return processedData;
  };

  const bodyData = {
    data: processData(),
  };

  fetch("/api/email", {
    method: "POST",
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((response) => {
      if ("message" in response) toast.success(response.message);
      toast.error(response.error);
    });
};
