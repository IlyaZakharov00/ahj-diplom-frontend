export const loadFile = (e) => {
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
