export const handleSendMail = (data) => {
  const bodyData = {
    name: data["1"],
    message: "test d'envoie de mail",
  };
  fetch("/api/email", {
    method: "POST",
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
};
