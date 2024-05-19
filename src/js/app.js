import { Chat } from "./Chat";
import { MsgFromServer } from "./MsgFromServer";
import { dropListener } from "./callbacks";
import { loadFile } from "./callbacks";
import { sendTextMessage } from "./mediaControl";
import { startRecordAudio } from "./mediaControl";
import { startRecordVideo } from "./mediaControl";
import { availableServer } from "./serverControl";
import { getAllMsgFromServer } from "./serverControl";

document.addEventListener("DOMContentLoaded", async () => {
  let connectionServer = document.querySelector(".connection-to-server");
  let connectionServerRes = document.querySelector(
    ".connection-to-server-result"
  );

  await availableServer()
    .then(() => {
      connectionServer.style.animation = "none";
      connectionServer.style.backgroundColor = "green";
      connectionServerRes.textContent = "Соединение с сервером установлено!";
      let noClickElement = document.querySelector(".no-click-element");
      noClickElement.remove();
    })
    .catch(() => {
      connectionServerRes.textContent =
        "Соединение с сервером не удалось установить. Пожалуйста, перезагрузите страницу!";
      connectionServer.style.animation = "none";
      connectionServer.style.backgroundColor = "red";

      return;
    });

  let allMsgFromServer = await getAllMsgFromServer();
  for (const object of allMsgFromServer.fullMessages) {
    let msg = new MsgFromServer();
    msg.crtAllMsg(object);
  }
  ///
  const btnMenu = document.querySelector(".menu"); // кнопка меню в header
  const containerMenu = document.querySelector(".container-menu"); // меню с пунктами в header
  const closeMenu = containerMenu.querySelector(".close-menu"); // кнопка закрывания меню в header
  const showFiles = containerMenu.querySelector(".show-messages"); // кнопка показа всех вложений
  const allMessages = document.querySelector(".all-messages"); // меню с категориями всех собщений
  const closeAllMessages = allMessages.querySelector(".close-all-messages"); // закрыть меню с категориями всех сообщений
  const textArea = document.querySelector(".write-message"); // поле для воода сообщения
  const iconSendVoiceMessage = document.querySelector(".send-voice-message"); // кнопка для ввода голосового сообщения
  const iconSendVideoMessage = document.querySelector(".send-video"); // кнопка для ввода видео сообщения
  const smileOpenMenu = document.querySelector(".send-smile"); // кнопка для открытия меню со смайлами
  const smileMenu = document.querySelector(".smile-container"); // контейнер где хранятся все смайлы
  const btnClearAllMesages = document.querySelector(".clear-chat"); // кнопка очистки всех сообщений
  let inputSendFile = document.getElementById("img-input"); // кнопка для отправки файлов
  let sendFormFile = document.querySelector(".form-send-file"); // кнопка для отправки файлов
  let writeMessageInput = document.querySelector(".write-message-input"); // input в textarea
  const emojies = smileMenu.querySelectorAll(".emoji"); // смайлы
  let typesMessages = document.querySelectorAll(".type-message"); // кнопки для фильтрации сообщений
  let timer;

  const chat = new Chat(
    containerMenu,
    allMessages,
    iconSendVoiceMessage,
    iconSendVideoMessage,
    smileMenu,
    timer,
    textArea
  );

  btnMenu.addEventListener("click", chat.headerMenuVisible);
  closeMenu.addEventListener("click", chat.headerMenuHidden);

  showFiles.addEventListener("click", chat.showAllMessagesBlock);
  closeAllMessages.addEventListener("click", chat.closeAllMessagesBlock);

  textArea.addEventListener("input", chat.changeMicroToMessage);
  textArea.addEventListener("keypress", sendTextMessage);

  writeMessageInput.addEventListener("click", (e) => {
    e.preventDefault();
    textArea.focus();
  });
  writeMessageInput.addEventListener("drop", dropListener);

  smileOpenMenu.addEventListener("mouseover", chat.showSmileMenu);
  for (const emoji of emojies) {
    emoji.addEventListener("click", chat.listenerEmojiClick);

    emoji.addEventListener("mouseover", chat.listenerEmojiMouseOver);

    emoji.addEventListener("mouseout", chat.listenerEmojiMouseOut);
  }

  iconSendVoiceMessage.addEventListener("click", startRecordAudio);
  iconSendVideoMessage.addEventListener("click", startRecordVideo);

  btnClearAllMesages.addEventListener("click", chat.clearChat);

  inputSendFile.addEventListener("change", loadFile);
  sendFormFile.addEventListener("submit", chat.sendFile);

  let flyFile = document.getElementById("img-input");
  inputSendFile.addEventListener("drop", dropListener);

  for (const type of typesMessages) {
    type.addEventListener("click", chat.filterMessages);
  }
});
