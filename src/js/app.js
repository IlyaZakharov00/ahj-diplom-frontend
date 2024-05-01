import { Chat } from "./Chat";
import { getPermissionCoords } from "./media";
import { getPermissionAudio } from "./media";
import { getPermissionVideo } from "./media";
import { coordsErrorForm } from "./media";
import { sendTextMessage } from "./media";
import { startRecordAudio } from "./media";
import { sendAudio } from "./media";
import { deleteAudio } from "./media";
import { startRecordVideo } from "./media";
import { sendVideo } from "./media";
import { deleteVideo } from "./media";
import { createTimer } from "./media";
import { deleteTimer } from "./media";

document.addEventListener("DOMContentLoaded", () => {
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
  const emojies = smileMenu.querySelectorAll(".emoji");
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

  smileOpenMenu.addEventListener("mouseover", chat.showSmileMenu);
  for (const emoji of emojies) {
    emoji.addEventListener("click", chat.listenerEmojiClick);

    emoji.addEventListener("mouseover", chat.listenerEmojiMouseOver);

    emoji.addEventListener("mouseout", chat.listenerEmojiMouseOut);
  }

  iconSendVoiceMessage.addEventListener("click", startRecordAudio);
  iconSendVideoMessage.addEventListener("click", startRecordVideo);
});
