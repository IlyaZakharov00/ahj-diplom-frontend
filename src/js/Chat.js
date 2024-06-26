import { sendTextMessage } from "./mediaControl";
import { startRecordAudio } from "./mediaControl";
import { sendFileEvent } from "./mediaControl";
import { deleteAllMesseges } from "./serverControl";

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
    let btnCloseMenu = document.querySelector(".close-menu");
    btnCloseMenu.click();
    this.allMessages.style.visibility = "visible";
    this.allMessages.style.opacity = "1";
  };

  closeAllMessagesBlock = () => {
    this.allMessages.style.opacity = "0";
    this.allMessages.style.visibility = "hidden";
  };

  changeMicroToMessage = (e) => {
    let sendText = document.querySelector(".send-text-message"); // есть ли уже иконка

    if (
      (e.inputType == "deleteContentBackward" ||
        e.inputType == "deleteContentForward" ||
        e.inputType == "deleteByCut") &&
      (this.textArea.value == "" || !sendText)
    ) {
      this.iconSendVoiceMessage.classList.remove("send-text-message");
      this.iconSendVoiceMessage.classList.add("send-voice-message");
      sendText.addEventListener("click", startRecordAudio);
      sendText.removeEventListener("click", sendTextMessage);
      return;
    }

    if (this.textArea.value == "" && sendText) {
      this.iconSendVoiceMessage.classList.remove("send-text-message");
      sendText.addEventListener("click", startRecordAudio);
      sendText.removeEventListener("click", sendTextMessage);
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

  clearChat = () => {
    deleteAllMesseges();
    let allMsg = document.querySelectorAll(".msg");
    let btnCloseMenu = document.querySelector(".close-menu");
    btnCloseMenu.click();
    for (const msg of allMsg) {
      msg.remove();
    }
  };

  filterMessages = (e) => {
    let chatMain = document.querySelector(".chat-main");
    let showAllMsg = document.querySelector(".allMsgs");
    let closeAllMessages = document.querySelector(".close-all-messages");
    closeAllMessages.click();
    showAllMsg.click();
    let chat = document.querySelector(".messages-container");
    let type = e.target.getAttribute("type");
    let allMsgInChat = chat.querySelectorAll(".msg");
    let msgWithType = chat.querySelectorAll(`[type=${type}]`);

    for (const msg of allMsgInChat) {
      if (msg.getAttribute("type") !== type) {
        msg.style.display = "none";
        msg.classList.add("hidden");
      }
    }

    if (type == null) {
      for (const msg of allMsgInChat) {
        msg.style.display = "block";
        if (msg.classList.contains("hidden")) msg.classList.remove("hidden");
      }
    }
    chatMain.scrollTo(screenTop, innerHeight);
  };

  sendFile = (e) => {
    console.log("send file");
    e.preventDefault();
    let form = e.target;
    let sticker = document.querySelector(".send-file-sticker");
    let btnSubmit = document.querySelector(".form-btn-submit");
    let inputSendFileTextArea = document.getElementById("write-message-input");

    form.classList.remove("form-send-file-loaded");
    btnSubmit.classList.remove("form-btn-submit-loaded");
    sticker.classList.add("sticker-animation");

    sticker.addEventListener("animationend", () => {
      sticker.style.visibility = "hidden";
      sticker.classList.remove("sticker-animation");
      sticker.textContent = "";
    });

    let file = e.srcElement[0].files[0];
    let filesList = e.srcElement[0].files;
    if (!file) return;

    let blob = new Blob([file]);
    let link = URL.createObjectURL(blob);

    inputSendFileTextArea.style.display = "block";
    sendFileEvent(filesList, link);
  };
}
