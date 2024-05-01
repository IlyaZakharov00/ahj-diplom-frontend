export const sendToServer = async (e) => {
  console.log(e);
  let eId = e.getAttribute("id");
  let eTypeMsg = e.getAttribute("type");
  let eDate = e.querySelector(".element-date").textContent;
  let eTime = e.querySelector(".element-time").textContent;
  let eContent = e.querySelector(".element-content").textContent;
  let eCoords = e.querySelector(".element-geolocation").textContent;

  const data = {
    id: eId,
    type: eTypeMsg,
    date: eDate,
    time: eTime,
    content: eContent,
    coords: eCoords,
  };

  console.log(data);
  let server = "https://ahj-diplom-backend.onrender.com/";
  let method = "POST";
  const body = JSON.stringify(data);

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });

  const data_ = response.json();
  console.log(response, data_);
};

// document.addEventListener("submit", async (e) => {
//   const form = e.target;

//   const formData = new FormData(form);
//   const json = Object.fromEntries(formData.entries());
//   const body = JSON.stringify(json);

//   const response = await fetch(action, {
//     headers: { "Content-Type": "application/json" },
//     method,
//     body,
//   });

//   const data = response.json();
// });
