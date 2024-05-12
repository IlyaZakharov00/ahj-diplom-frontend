import { deleteThisMsg } from "./serverControl";
import { downloadFile } from "./serverControl";

export class MsgFromServer {
  constructor() {}

  crtUlList() {
    let container = document.querySelector(".messages-container");
    let chatMain = document.querySelector(".chat-main");
    if (!container) {
      container = document.createElement("ul");
    }
    container.classList.add("list-msg");
    chatMain.appendChild(container);
  }

  crtMsg(item) {
    this.crtUlList();

    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let content = document.createElement("p");
    let footer = document.createElement("div");
    let geolocation = document.createElement("span");
    let deleteMsg = document.createElement("span");

    element.setAttribute("type", "txt");
    element.setAttribute("id", item.id);

    element.classList.add("msg");
    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");
    content.classList.add("element-content");
    footer.classList.add("element-footer");
    geolocation.classList.add("element-geolocation");
    deleteMsg.classList.add("element-delete");

    content.textContent = item.content;
    geolocation.textContent = item.coords;
    date.textContent = item.date;
    time.textContent = item.time;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(content);
    footer.appendChild(geolocation);
    footer.appendChild(deleteMsg);
    element.appendChild(footer);

    ul.append(element);
    return element;
  }

  crteLink(item) {
    this.crtUlList();

    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let link = document.createElement("a");
    let content = document.createElement("p");
    let footer = document.createElement("div");
    let geolocation = document.createElement("span");
    let deleteMsg = document.createElement("span");

    element.setAttribute("type", "link");
    element.setAttribute("id", item.id);
    link.setAttribute("href", item.link);

    element.classList.add("msg");
    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");
    link.classList.add("element-link");
    content.classList.add("element-content");
    footer.classList.add("element-footer");
    geolocation.classList.add("element-geolocation");
    deleteMsg.classList.add("element-delete");

    content.textContent = item.content;
    geolocation.textContent = item.coords;
    date.textContent = item.date;
    time.textContent = item.time;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(link);
    link.appendChild(content);
    footer.appendChild(geolocation);
    footer.appendChild(deleteMsg);
    element.appendChild(footer);

    ul.append(element);
    return element;
  }

  crtFile(file) {
    let blob = new Blob([file.file.data]);
    console.log(blob);

    this.crtUlList();

    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let contentContainer = document.createElement("div");
    let content = document.createElement("a");
    let save = document.createElement("p");
    let footer = document.createElement("div");
    let geolocation = document.createElement("span");
    let deleteMsg = document.createElement("span");

    element.setAttribute("type", "file");
    element.setAttribute("id", file.data.id);

    element.classList.add("msg");
    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");
    contentContainer.classList.add("element-content-container");
    content.classList.add("element-content");
    save.classList.add("element-save-content");
    footer.classList.add("element-footer");
    geolocation.classList.add("element-geolocation");
    deleteMsg.classList.add("element-delete");

    content.textContent = file.data.name;
    date.textContent = file.data.date;
    time.textContent = file.data.time;
    geolocation.textContent = file.data.coords;

    header.appendChild(date);
    header.appendChild(time);
    contentContainer.appendChild(content);
    contentContainer.appendChild(save);
    footer.appendChild(geolocation);
    footer.appendChild(deleteMsg);
    element.appendChild(header);
    element.appendChild(contentContainer);
    element.appendChild(footer);

    ul.append(element);

    return element;
  }

  crtVideo(item, link) {
    this.crtUlList();

    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let video = document.createElement("video");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let content = document.createElement("p");
    let footer = document.createElement("div");
    let geolocation = document.createElement("span");
    let deleteMsg = document.createElement("span");

    element.setAttribute("type", "video");
    element.setAttribute("id", item.id);

    element.classList.add("msg");

    video.classList.add("video");
    video.setAttribute("src", link);
    video.controls = true;

    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");

    content.classList.add("element-content");

    footer.classList.add("element-footer");
    geolocation.classList.add("element-geolocation");
    deleteMsg.classList.add("element-delete");

    content.textContent = item.content;
    geolocation.textContent = item.coords;
    date.textContent = item.date;
    time.textContent = item.time;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(video);
    footer.appendChild(geolocation);
    footer.appendChild(deleteMsg);
    element.appendChild(footer);

    ul.append(element);
    return element;
  }

  crtAudio(item, link) {
    // let link_ = new File(link, 'myFile');

    this.crtUlList();

    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let audio = document.createElement("audio");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let content = document.createElement("p");
    let footer = document.createElement("div");
    let geolocation = document.createElement("span");
    let deleteMsg = document.createElement("span");

    element.setAttribute("type", "audio");
    element.setAttribute("id", item.id);

    element.classList.add("msg");

    audio.classList.add("audio");
    audio.setAttribute("src", link);
    audio.controls = true;

    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");

    content.classList.add("element-content");

    footer.classList.add("element-footer");
    geolocation.classList.add("element-geolocation");
    deleteMsg.classList.add("element-delete");

    content.textContent = item.content;
    geolocation.textContent = item.coords;
    date.textContent = item.date;
    time.textContent = item.time;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(audio);
    footer.appendChild(geolocation);
    footer.appendChild(deleteMsg);
    element.appendChild(footer);

    ul.append(element);
    return element;
  }

  crtAllMsg(item) {
    if (item.type == "txt") {
      let message = this.crtMsg(item);
      let deleteMsg = message.querySelector(".element-delete");
      deleteMsg.addEventListener("click", deleteThisMsg);
      return;
    }

    if (item.type == "link") {
      let message = this.crteLink(item);
      let deleteMsg = message.querySelector(".element-delete");
      deleteMsg.addEventListener("click", deleteThisMsg);
      return;
    }

    if (item.data.type == "file") {
      //создание файлов
      let message = this.crtFile(item);
      let deleteMsg = message.querySelector(".element-delete");
      let saveFile = message.querySelector(".element-save-content");
      let content = message.querySelector(".element-content");

      content.addEventListener("click", downloadFile);
      saveFile.addEventListener("click", downloadFile);

      deleteMsg.addEventListener("click", deleteThisMsg);
      return;
    }

    if (item.type == "audio") {
      let reader = new FileReader();
      let blob = new Blob([item.content]);
      let message_ = this;

      reader.readAsText(blob);

      reader.onload = function () {
        let link;
        link = reader.result;
        console.log(link);

        let message = message_.crtAudio(item, link);
        let deleteMsg = message.querySelector(".element-delete");
        deleteMsg.addEventListener("click", deleteThisMsg);
        return;
      };
    }

    if (item.type == "video") {
      let reader = new FileReader();
      let blob = new Blob([item.content]);
      let message_ = this;

      reader.readAsText(blob);

      reader.onload = function () {
        let link;
        link = reader.result;
        console.log(link);

        let message = message_.crtVideo(item, link);
        let deleteMsg = message.querySelector(".element-delete");
        deleteMsg.addEventListener("click", deleteThisMsg);
        return;
      };
    }
  }
}
