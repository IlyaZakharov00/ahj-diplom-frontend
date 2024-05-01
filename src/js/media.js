import { Message } from "./message";
import { validateCoords } from "./validateCoords";
import { sendToServer } from "./senToServer";

let userCoords;
let videoPermisiion;
let audioPermisiion;
let timer;

let recorder;
let videoPlayer;
let stream;
let src;

let audioPlayer;

let iconSendVoiceMessage = document.querySelector(".send-voice-message"); // кнопка для ввода голосового сообщения
let iconSendVideoMessage = document.querySelector(".send-video"); // кнопка для ввода видео сообщения
let smileMenu = document.querySelector(".send-smile"); // кнопка для ввода видео сообщения

let send_ = document.querySelector(".send_");
let timer_ = document.querySelector(".timer_");
let stop_ = document.querySelector(".stop_");

export const getPermissionCoords = async function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        userCoords = [latitude, longitude];
        resolve(userCoords);
      },
      async function () {
        coordsErrorForm();
        let formError = document.querySelector(".form-error");
        let btnSendCoords = document.querySelector(".btn-send-coords");
        let btnClose = document.querySelector(".form-close");
        let textarea = document.querySelector(".textarea-form-error");

        btnClose.addEventListener("click", async () => {
          alert("Введите координаты!");
        });

        btnSendCoords.addEventListener("click", async (e) => {
          e.preventDefault();
          let coords = await textarea.value;
          console.log("данные получили");
          if (!coords || coords == " " || coords == "\n") {
            console.log("Координат нет!");
            alert("Координат нет!");
            return;
          } else if (validateCoords(coords)) {
            coords = validateCoords(coords);
            userCoords = coords;
            resolve(userCoords);
            formError.remove();
            console.log("данные коректные");
          }
        });
      }
    );
  });
}; // получение координат и валидация

export const getPermissionAudio = async function () {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    audioPlayer = new Message(userCoords);
    audioPlayer.createtUlList();
    let li = audioPlayer.createAudio();

    let audioPlayerElement = li.querySelector(".audio");
    audioPlayerElement.classList.add("recording");
    audioPlayer.createAttribute(li);

    // videoPlayerElement.srcObject = stream;
    // videoPlayerElement.addEventListener("canplay", () => {
    //   videoPlayerElement.play();
    // });

    recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.start();

    recorder.addEventListener("start", () => {
      console.log("start");
    });

    recorder.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });

    recorder.addEventListener("stop", () => {
      const blob = new Blob(chunks);

      audioPlayerElement.src = URL.createObjectURL(blob);
      src = URL.createObjectURL(blob);
    });

    audioPermisiion = true;
  } catch (error) {
    console.log(error);
    alert("Предоставьте доступ к микрофону, чтобы записывать аудио-сообщения!");
  }
}; // получение разрешения на аудио

export const getPermissionVideo = async function () {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoPlayer = new Message(userCoords);
    videoPlayer.createtUlList();
    let li = videoPlayer.createVideo();

    let videoPlayerElement = li.querySelector(".video");
    videoPlayerElement.classList.add("recording");
    videoPlayer.createAttribute(li);

    // videoPlayerElement.srcObject = stream;
    // videoPlayerElement.addEventListener("canplay", () => {
    //   videoPlayerElement.play();
    // });

    recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.start();

    recorder.addEventListener("start", () => {
      console.log("start");
    });

    recorder.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });

    recorder.addEventListener("stop", () => {
      const blob = new Blob(chunks);

      videoPlayerElement.src = URL.createObjectURL(blob);
      src = URL.createObjectURL(blob);
    });

    videoPermisiion = true;
  } catch (error) {
    console.log(error);
    alert("Предоставьте доступ к камере, чтобы записывать видео-сообщения!");
  }
}; // получение разрешения на видео

export const coordsErrorForm = () => {
  let form = ` <form class="form-error">
              <div class="form-error-title">
                  <div class="title-error">Что то пошло не так :(</div>
                  <div class="form-close"></div>
              </div>
              <div class="error-description">К сожалению, нам не удалось опрделить ваше местоположение.
              Пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.
              Широта и долгота через запятую.
              </div>
              <textarea class="textarea-form-error" placeholder="Ваши координаты"></textarea>
              <button class="btn-send-coords">Отправить</button>
          </form>`;
  document.body.insertAdjacentHTML("afterbegin", form);
}; // создание формы если доступ к координатам недоступен

export const sendTextMessage = async function (e) {
  if (e instanceof KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
    } else return;
  }

  if (!userCoords) {
    await getPermissionCoords();
  }

  let inputText = document.querySelector(".write-message");
  let text = inputText.value;
  if (text == "") text = "Пустое сообщение :(";

  if (text.toString().match(/^http.{0,}/g)) {
    console.log("это ссылка", text);
    let newMessage = new Message(userCoords);
    newMessage.createtUlList();
    let msgElement = newMessage.createLink(text);
    newMessage.createAttribute(msgElement);
    sendToServer(msgElement);
    return;
  }

  let newMessage = new Message(userCoords);
  newMessage.createtUlList();
  let msgElement = newMessage.createMsg(text);
  newMessage.createAttribute(msgElement);
  sendToServer(msgElement);
}; // стандартная функция отправка текстовых сообщений. ее слушаем обычно если не записываем видео или аудио

export const startRecordAudio = async () => {
  if (!userCoords) await getPermissionCoords();
  await getPermissionAudio();

  if (!audioPermisiion) return;

  console.log("audio");

  changeBtnToTimer();

  send_.addEventListener("click", sendAudio);
  stop_.addEventListener("click", deleteAudio);
  createTimer();
}; // по стандарту слушаем на кнопке аудио

export const sendAudio = async function () {
  console.log("send audio");

  changeBtnToStandart();

  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());

  let player = document.querySelector(".recording");
  // let playerParent = player.parentElement;
  // sendToServer(playerParent);
  player.classList.remove("recording");

  send_.removeEventListener("click", sendAudio);
  stop_.removeEventListener("click", deleteAudio);

  deleteTimer();
}; // функция отправки аудио

export const deleteAudio = async function () {
  console.log("delete audio");

  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());

  let player = document.querySelector(".recording");
  let msg = player.parentNode;
  msg.remove();
  player.remove();

  send_.removeEventListener("click", sendAudio);
  stop_.removeEventListener("click", deleteAudio);

  changeBtnToStandart();

  deleteTimer();
}; // функция удаления аудио

export const startRecordVideo = async () => {
  if (!userCoords) await getPermissionCoords();
  await getPermissionVideo();

  if (!videoPermisiion) return;

  changeBtnToTimer();

  send_.addEventListener("click", sendVideo);
  stop_.addEventListener("click", deleteVideo);

  createTimer();
}; // по стандарту слушаем на кнопке видео

export const sendVideo = async function () {
  console.log("send video");

  changeBtnToStandart();

  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());

  let player = document.querySelector(".recording");
  // let playerParent = player.parentElement;
  // sendToServer(playerParent);

  player.classList.remove("recording");

  send_.removeEventListener("click", sendVideo);
  stop_.removeEventListener("click", deleteVideo);

  deleteTimer();
}; // функция отправки видео

export const deleteVideo = async function (e) {
  console.log("delete video");

  recorder.stop();
  stream.getTracks().forEach((track) => track.stop());

  let player = document.querySelector(".recording");
  let msg = player.parentNode;
  msg.remove();
  player.remove();

  send_.removeEventListener("click", sendVideo);
  stop_.removeEventListener("click", deleteVideo);

  changeBtnToStandart();

  deleteTimer();
}; // функция удаления видео

export const createTimer = () => {
  let timer_ = document.querySelector(".timer");
  let minutes = 0;
  let seconds = 0;
  timer_.textContent = `0${minutes}:0${seconds}`;

  timer = setInterval(() => {
    // debugger;
    timer_.textContent = `${minutes}:${seconds++}`;

    if (String(seconds).length == 1 && String(minutes).length == 1) {
      timer_.textContent = `0${minutes}:0${seconds}`;
    } else if (String(seconds).length > 1 && String(minutes).length == 1) {
      timer_.textContent = `0${minutes}:${seconds}`;
    } else if (String(seconds).length == 1 && String(minutes).length > 1) {
      timer_.textContent = `${minutes}:0${seconds}`;
    } else if (String(seconds).length > 1 && String(minutes).length > 1) {
      timer_.textContent = `${minutes}:${seconds}`;
    }

    if (seconds > 59) {
      seconds = 0 + "0";
      minutes += 1;
      if (String(minutes).length == 1) {
        timer_.textContent = `0${minutes}:${seconds}`;
      } else {
        timer_.textContent = `${minutes}:${seconds}`;
      }
    }
  }, 1000);
}; // создаем таймер

export const deleteTimer = () => {
  clearInterval(timer);
  timer_.classList.remove("timer");
  timer_.textContent = "";
}; //удаляем таймер

export const changeBtnToTimer = () => {
  iconSendVoiceMessage.style.display = "none";
  iconSendVideoMessage.style.display = "none";
  smileMenu.style.display = "none";

  send_.classList.add("check-mark");
  send_.classList.add("icon");
  stop_.classList.add("cross");
  stop_.classList.add("icon");
  timer_.classList.add("timer");

  send_.style.display = "inline-block";
  stop_.style.display = "inline-block";
  timer_.style.display = "inline-block";

  send_.style.visibility = "visible";
  stop_.style.visibility = "visible";
  timer_.style.visibility = "visible";
};

export const changeBtnToStandart = () => {
  iconSendVoiceMessage.style.display = "inline-block";
  iconSendVideoMessage.style.display = "inline-block";
  smileMenu.style.display = "inline-block";

  send_.classList.remove("check-mark");
  send_.classList.remove("icon");
  stop_.classList.remove("cross");
  stop_.classList.remove("icon");
  timer_.classList.remove("timer");

  send_.style.display = "none";
  stop_.style.display = "none";
  timer_.style.display = "none";

  send_.style.visibility = "hidden";
  stop_.style.visibility = "hidden";
  timer_.style.visibility = "hidden";
};
