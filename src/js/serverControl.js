let server1 = "http://localhost:3030";
let server2 = "https://ahj-diplom-backend.onrender.com";
let server = server1;

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

  let server_ = server + "/sendMessage";
  let method = "POST";
  const body = JSON.stringify(data);

  const response = await fetch(server_, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });

  console.log(response);
};

export const deleteAllMesseges = async (e) => {
  let server_ = server + "/clearAll";
  let method = "DELETE";

  const response = await fetch(server_, {
    headers: { "Content-Type": "application/json" },
    method,
  });
  console.log(response);
};

export const deleteThisMsg = async (e) => {
  let server_ = server + "/delete";
  let method = "DELETE";

  let msg = e.target.closest(".msg");
  let elementContent = msg.querySelector(".element-content");
  let typeMsg = msg.getAttribute("type");
  let typeMsgWithoutFileName = ["txt", "link", "audio", "video"];

  let audio = msg.querySelector(".audio");
  let video = msg.querySelector(".video");

  let format;
  let fileName;

  if (audio) {
    format = ".mp3";
  } else if (video) {
    format = ".mp4";
  }

  if (typeMsgWithoutFileName.includes(typeMsg)) {
    fileName = "";
  } else if (typeMsg == "file") {
    fileName = elementContent.textContent;
  }

  let data = { id: msg.id, nameFile: fileName, format: format };
  let body = JSON.stringify(data);

  const response = await fetch(server_, {
    headers: { "Content-Type": "application/json" },
    method,
    body,
  });

  msg.remove();

  console.log(response);
};

export const sendMediaMsg = async (element, blob) => {
  let eId = element.getAttribute("id");
  let eTypeMsg = element.getAttribute("type");
  let eDate = element.querySelector(".element-date").textContent;
  let eTime = element.querySelector(".element-time").textContent;
  let eCoords = element.querySelector(".element-geolocation").textContent;

  let audioContent = element.querySelector(".audio");
  let videoContent = element.querySelector(".video");
  let format;

  if (audioContent) {
    format = ".mp3";
  } else if (videoContent) {
    format = ".mp4";
  }

  let file = new File([blob], `${eId}`, {
    type: format,
  });

  const formData = new FormData();
  formData.append("file", file);

  const data = {
    id: eId,
    type: eTypeMsg,
    date: eDate,
    time: eTime,
    coords: eCoords,
    format: format,
  };

  const dataJSON = JSON.stringify(data);
  formData.append("data", dataJSON);

  let server_ = server + "/sendMediaMessage";
  let method = "POST";

  const response = await fetch(server_, {
    method,
    body: formData,
  });

  console.log(response);
  return response;
};

export const getAllMsgFromServer = async (e) => {
  let server_ = server + "/getAllMessages";
  let method = "GET";

  const response = await fetch(server_, {
    headers: { "Content-Type": "application/json" },
    method,
  }).then((response_) => {
    return response_.json();
  });

  console.log(response);
  return response;
};

export const availableServer = async (e) => {
  let server_ = server + "/serverAvailable";
  let method = "GET";

  const response = await fetch(server_, {
    headers: { "Content-Type": "application/json" },
    method,
  }).then((response_) => {
    return response_.json();
  });

  console.log(response);
  return response;
};

export const sendFileToServer = async (msgElement, filesList) => {
  let form = document.querySelector(".form-send-file");
  let file = filesList[0];
  const formData = new FormData();
  formData.append("file_", file);

  let server_ = server + "/sendFile";
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
    format: filesList[0].type,
    coords: eCoords,
  };
  const dataJSON = JSON.stringify(data);
  formData.append("data", dataJSON);

  const response = await fetch(server_, {
    method,
    body: formData,
  });

  form.reset();
  console.log(response);
  return response;
};

export const downloadFile = async (e) => {
  let method = "GET";
  let msg = e.target.closest(".msg");
  let content = msg.querySelector(".element-content");
  console.log(e.target);

  let id = msg.getAttribute("id");
  let server11 = server + `/downloadFile?id=${id}`;

  const response = await fetch(server11, {
    headers: { "Content-Type": "application/json" },
    method,
  }).then((response_) => {
    return response_.blob();
  });

  let link = URL.createObjectURL(response);
  content.setAttribute("href", link);
  content.download = content.textContent;

  content.removeEventListener("click", downloadFile);
  content.click();

  console.log(response);
  return response;
};

export const createMediaMessageFromServer = async (e) => {
  let method = "GET";
  let msg = e.target.closest(".msg");
  let audio = msg.querySelector(".audio");
  let video = msg.querySelector(".video");
  let content;
  audio ? (content = audio) : (content = video);
  video ? (content = video) : (content = audio);

  let id = msg.getAttribute("id");
  let server11 = server + `/downloadMediaMessage?id=${id}`;

  const response = await fetch(server11, {
    headers: { "Content-Type": "application/json" },
    method,
  }).then((response_) => {
    return response_.blob();
  });

  let link = URL.createObjectURL(response);
  content.setAttribute("src", link);

  console.log(response);
  return response;
};
