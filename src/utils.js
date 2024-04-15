export const handleSendMail = (data) => {
  const filteredData = () => {
    const newData = {};
    for (const part in data) {
      newData[part] = Object.fromEntries(
        Object.entries(data[part]).filter(([_, valeur]) => valeur !== "non")
      );
    }
    return newData;
  };

  const bodyData = {
    data: filteredData(),
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
