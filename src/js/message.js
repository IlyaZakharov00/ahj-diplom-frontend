export class Message {
  constructor(coords) {
    this.coords = coords;
  }

  createtUlList() {
    let container = document.querySelector(".messages-container");
    let chatMain = document.querySelector(".chat-main");
    if (!container) {
      container = document.createElement("ul");
    }
    container.classList.add("list-msg");
    chatMain.appendChild(container);
  }

  createMsg(data) {
    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let content = document.createElement("p");
    let geolocation = document.createElement("span");

    element.setAttribute("type", "txt");
    element.setAttribute("id", this.createId());

    element.classList.add("msg");
    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");
    content.classList.add("element-content");
    geolocation.classList.add("element-geolocation");

    content.textContent = data;
    geolocation.textContent = `[${this.coords[0]},` + ` ${this.coords[1]}]`;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(content);
    element.appendChild(geolocation);

    ul.append(element);
    return element;
  }

  createLink(data) {
    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let link = document.createElement("a");
    let content = document.createElement("p");
    let geolocation = document.createElement("span");

    element.setAttribute("type", "link");
    element.setAttribute("id", this.createId());
    link.setAttribute("href", data);

    element.classList.add("msg");
    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");
    content.classList.add("element-content");
    geolocation.classList.add("element-geolocation");

    content.textContent = data;
    geolocation.textContent = `[${this.coords[0]},` + ` ${this.coords[1]}]`;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(link);
    link.appendChild(content);
    element.appendChild(geolocation);

    ul.append(element);
    return element;
  }

  createVideo(data) {
    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let video = document.createElement("video");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let content = document.createElement("p");
    let geolocation = document.createElement("span");

    element.setAttribute("type", "video");
    element.setAttribute("id", this.createId());

    element.classList.add("msg");

    video.classList.add("video");
    video.controls = true;

    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");

    content.classList.add("element-content");
    geolocation.classList.add("element-geolocation");

    content.textContent = data;
    geolocation.textContent = `[${this.coords[0]},` + ` ${this.coords[1]}]`;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(video);
    element.appendChild(geolocation);

    ul.append(element);
    return element;
  }

  createAudio(data) {
    let ul = document.querySelector(".list-msg");
    let element = document.createElement("li");
    let audio = document.createElement("audio");
    let header = document.createElement("div");
    let date = document.createElement("span");
    let time = document.createElement("span");
    let content = document.createElement("p");
    let geolocation = document.createElement("span");

    element.setAttribute("type", "audio");
    element.setAttribute("id", this.createId());

    element.classList.add("msg");

    audio.classList.add("audio");
    audio.controls = true;

    header.classList.add("element-header");
    date.classList.add("element-date");
    time.classList.add("element-time");

    content.classList.add("element-content");
    geolocation.classList.add("element-geolocation");

    content.textContent = data;
    geolocation.textContent = `[${this.coords[0]},` + ` ${this.coords[1]}]`;

    header.appendChild(date);
    header.appendChild(time);
    element.appendChild(header);
    element.appendChild(audio);
    element.appendChild(geolocation);

    ul.append(element);
    return element;
  }

  createAttribute(element) {
    let data = element.querySelector(".element-date");
    let time = element.querySelector(".element-time");

    let date = new Date();
    let year = date.getFullYear();
    let mounth = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (String(mounth).length == 1) mounth = "0" + mounth;
    if (String(day).length == 1) mounth = "0" + day;
    if (String(hours).length == 1) hours = "0" + hours;
    if (String(minutes).length == 1) minutes = "0" + minutes;
    if (String(seconds).length == 1) seconds = "0" + seconds;

    data.textContent = day + "." + mounth + "." + year;
    time.textContent = hours + ":" + minutes + ":" + seconds;
  }

  createId = () => Math.random().toString(36).slice(2);
}
