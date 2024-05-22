export const loadFile = (e) => {
  console.log("loadfile " + e);
  if (e.srcElement.files.length == 0) return;
  let inputSendFileTextArea = document.getElementById("write-message-input");
  let form = document.querySelector(".form-send-file");
  let sticker = document.querySelector(".send-file-sticker");
  let btnSubmit = document.querySelector(".form-btn-submit");

  form.classList.add("form-send-file-loaded");
  btnSubmit.classList.add("form-btn-submit-loaded");
  sticker.style.visibility = "visible";
  inputSendFileTextArea.style.display = "none";
  sticker.textContent++;
};

export const dropListener = (e) => {
  //   e.preventDefault();
  let fileName = e.dataTransfer.files[0].name;
  let fileFormat = e.dataTransfer.files[0].type;

  let inputSendFile = document.getElementById("img-input");
  let inputSendFileTextArea = document.getElementById("write-message-input");
  let list = new DataTransfer();
  let file = new File([e.dataTransfer.files[0]], `${fileName}`);
  let change = new Event("change");

  list.items.add(file);
  inputSendFile.files = list.files;
  inputSendFile.dispatchEvent(change);
  inputSendFileTextArea.style.display = "none";
};

export const validateCoords = (coords) => {
  let check = [coords].join("").includes(",");

  if (!check) {
    alert("Не правильно введены координаты!");
    return;
  }

  let userCoords_ = coords.split(",");
  let _userCoords = [];
  for (const coord of userCoords_) {
    let coord_ = coord.replaceAll(" ", "");
    let coord__ = coord_.replaceAll("[", "");
    let coord___ = coord__.replaceAll("]", "");
    _userCoords.push(coord___);
  }
  console.log(_userCoords);
  return _userCoords;
};

export const msgOnGroup = (fullMessages) => {
  let lastFiveMsg = [];
  let fiveGroup = [];
  let otherMsg = [];

  for (let i = fullMessages.length; i > fullMessages.length - 5; i--) {
    if (fullMessages[i - 1] === undefined) continue;
    lastFiveMsg.push(fullMessages[i - 1]);
  }

  for (let i = fullMessages.length; i > 0; i--) {
    if (!lastFiveMsg.includes(fullMessages[i - 1])) {
      fiveGroup.push([fullMessages[i - 1]]);
      if (fiveGroup.length == 5) {
        otherMsg.push(fiveGroup);
        fiveGroup = [];
      } else if (i == 1 && fiveGroup.length !== 5) {
        otherMsg.push(fiveGroup);
      }
    }
  }

  for (const item of otherMsg) {
    for (const msg of item) {
      let id = msg[0].id;
      if (!id) id = msg[0].data.id;
      let msgById = document.getElementById(id);

      msgById.classList.add("hidden");
    }
  }
  return { lastFiveMsg, otherMsg };
};

export const loadMoreMsg = (msgsArray, firstElemAfterVisible) => {
  let chatMain = document.querySelector(".chat-main");

  let allOtherMsg = msgsArray;
  let nextGroupMsg = msgsArray[0];
  if (allOtherMsg.length == 0) return;

  for (const item of nextGroupMsg) {
    for (const msg of item) {
      let id = msg.id;
      if (!id) id = msg.data.id;
      let msgElement = document.getElementById(id);
      msgElement.classList.remove("hidden");
    }
  }
  firstElemAfterVisible.scrollIntoView(top);
  allOtherMsg.splice(0, 1);
  nextGroupMsg = undefined;
};
