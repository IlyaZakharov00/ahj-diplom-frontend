import { Message } from "./message";
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

export class Chat {
  constructor(
    containerMenu,
    allMessages,
    iconSendVoiceMessage,
    iconSendVideoMessage,
    smileMenu,
    timer,
    textArea
  ) {
    this.containerMenu = containerMenu;
    this.allMessages = allMessages;
    this.iconSendVoiceMessage = iconSendVoiceMessage;
    this.iconSendVideoMessage = iconSendVideoMessage;
    this.smileMenu = smileMenu;
    this.timer = timer;
    this.textArea = textArea;
  }

  headerMenuVisible = () => {
    this.containerMenu.style.visibility = "visible";
    this.containerMenu.style.opacity = "1";
  };

  headerMenuHidden = () => {
    this.containerMenu.style.opacity = "0";
    this.containerMenu.style.visibility = "hidden";
  };

  showAllMessagesBlock = () => {
    this.allMessages.style.visibility = "visible";
    this.allMessages.style.opacity = "1";
    this.containerMenu.style.visibility = "hidden";
  };

  closeAllMessagesBlock = () => {
    this.allMessages.style.opacity = "0";
    this.allMessages.style.visibility = "hidden";
  };

  changeMicroToMessage = (e) => {
    let sendText = document.querySelector(".send-text-message");
    if (
      e.data == null &&
      e.data !== undefined &&
      (this.textArea.value == "" || !sendText)
    ) {
      this.iconSendVoiceMessage.classList.remove("send-text-message");
      this.iconSendVoiceMessage.classList.add("send-voice-message");
      sendText.addEventListener("click", startRecordAudio);
      sendText.removeEventListener("click", sendTextMessage);
      return;
    }

    if (this.textArea.value == "" || !sendText) {
      this.iconSendVoiceMessage.classList.remove("send-text-message");
    }

    if (
      (e.data == " " || sendText || e.data == null) &&
      !sendText &&
      e.data !== undefined
    ) {
      this.iconSendVoiceMessage.classList.add("send-voice-message");
      sendText.addEventListener("click", startRecordAudio);
      sendText.removeEventListener("click", sendTextMessage);
      return;
    }
    this.iconSendVoiceMessage.classList.add("send-text-message");
    this.iconSendVoiceMessage.classList.remove("send-voice-message");
    sendText = document.querySelector(".send-text-message");
    sendText.addEventListener("click", sendTextMessage);
    sendText.removeEventListener("click", startRecordAudio);
  };

  showSmileMenu = () => {
    this.smileMenu.style.opacity = "1";
    this.smileMenu.style.visibility = "visible";
    this.timer = setTimeout(this.closeMenuSmile, 2000);
  };

  closeMenuSmile = () => {
    this.smileMenu.style.opacity = "0";
    this.smileMenu.style.visibility = "hidden";
  };

  listenerEmojiClick = (e) => {
    clearTimeout(this.timer);
    this.textArea.value += e.target.textContent;
    this.changeMicroToMessage(e);
    this.smileMenu.style.opacity = "0";
    this.smileMenu.style.visibility = "hidden";
  };

  listenerEmojiMouseOver = () => {
    clearTimeout(this.timer);
  };

  listenerEmojiMouseOut = () => {
    this.timer = setTimeout(this.closeMenuSmile, 2000);
  };
}
