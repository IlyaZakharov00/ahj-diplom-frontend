export const sendToServer = async (e) => {
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

  let server = "https://ahj-diplom-backend.onrender.com/sendMessage";
  let method = "POST";
  const body = JSON.stringify(data);

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });

  console.log(response);
};

export const deleteAllMesseges = async (e) => {
  let server = "https://ahj-diplom-backend.onrender.com/clear";
  let method = "DELETE";

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
  });
  console.log(response);
};

export const deleteThisMsg = async (e) => {
  let server = "https://ahj-diplom-backend.onrender.com/clear";
  let method = "DELETE";
  let msg = e.target.closest(".msg");
  let data = { id: msg.id };
  let body = JSON.stringify(data);

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });

  msg.remove();

  console.log(response);
};

export const sendFileToServer = async (msgElement, file) => {
  let server = "https://ahj-diplom-backend.onrender.com/sendMessage";
  let method = "POST";

  let eId = msgElement.getAttribute("id");
  let eTypeMsg = msgElement.getAttribute("type");
  let eDate = msgElement.querySelector(".element-date").textContent;
  let eTime = msgElement.querySelector(".element-time").textContent;
  let eContent = msgElement.querySelector(".element-content").textContent;
  let eLink = msgElement.querySelector(".element-content").getAttribute("href");
  let eCoords = msgElement.querySelector(".element-geolocation").textContent;

  let data = {
    id: eId,
    type: eTypeMsg,
    date: eDate,
    time: eTime,
    name: eContent,
    link: eLink,
    format: file.type,
    coords: eCoords,
  };
  const body = JSON.stringify(data);

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });

  console.log(response);
};

export const sendMediaMsg = async (e) => {
  let eId = e.getAttribute("id");
  let eTypeMsg = e.getAttribute("type");
  let eDate = e.querySelector(".element-date").textContent;
  let eTime = e.querySelector(".element-time").textContent;
  let eCoords = e.querySelector(".element-geolocation").textContent;

  let mediaContent;
  let audioContent = e.querySelector(".audio");
  let videoContent = e.querySelector(".video");
  audioContent ? (mediaContent = audioContent) : (mediaContent = videoContent);
  let eContent = mediaContent.src;

  const data = {
    id: eId,
    type: eTypeMsg,
    date: eDate,
    time: eTime,
    content: eContent,
    coords: eCoords,
  };

  let server = "https://ahj-diplom-backend.onrender.com/sendMessage";
  let method = "POST";
  const body = JSON.stringify(data);

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });

  console.log(response);
};

export const getAllMsgFromServer = async (e) => {
  let server = "https://ahj-diplom-backend.onrender.com/getAllMessages";
  let method = "GET";

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
  }).then((response_) => {
    return response_.json();
  });

  console.log(response);
  return response;
};

export const availableServer = async (e) => {
  let server = "https://ahj-diplom-backend.onrender.com/serverAvailable";
  let method = "GET";

  const response = await fetch(server, {
    headers: { "Content-Type": "application/json" },
    method,
  }).then((response_) => {
    return response_.json();
  });

  console.log(response);
  return response;
};

export const downloadFile = (e) => {
  let msg = e.target.closest(".msg");
  let id = msg.getAttribute("id");
  let content = msg.querySelector(".element-content");
  let link = content.getAttribute("href");
  let name = content.textContent;
  // let type = content.textContent
  // let file = new Blob([])
  console.log(msg, content, link, name);
  // console.log(file);
};
