let front = document.querySelector("#front");
let start = document.getElementById("start");
let time = document.querySelector(".time");
let day = document.querySelector("#day");
let [, p1, p2, p3] = document.querySelector(".result").children;
let { hour, min } = createTime();

let storage = localStorage.getItem("daojishitime");
if (storage) {
  let obj = JSON.parse(storage);
  start.value = obj.start1;
  front.value = obj.front1;
  day.value = obj.day1;
  hour.value = obj.hour1;
  min.value = obj.min1;
}

hour.onchange = change;
min.onchange = change;
start.onchange = change;
front.onchange = change;
day.onchange = change;

setInterval(() => {
  mathTime();
}, 1000);

// 计算时间
function mathTime() {
  let start1 = start.value;
  let front1 = front.value;
  let day1 = day.value;
  let hour1 = hour.value;
  let min1 = min.value;
  if (start1 && front1 && day1 && hour1 && min1) {
    let mubiao = new Date(start1);
    let daoda = new Date(front1);
    let chuxing,
      chaju = mubiao - daoda,
      chufa;
    let shijianchuo = daoda - 1000 * (day1 * 24 * 3600 + hour1 * 60 * 60 + min1 * 60);
    chuxing = new Date(new Date(shijianchuo).toLocaleDateString()) - new Date(new Date().toLocaleDateString());
    chufa = new Date(shijianchuo) - Date.now();
    let ri = parseInt(chuxing / 1000 / 60 / 60 / 24);
    if (ri >= 0) {
      if (ri == 0) {
        chuxing = "今天 ";
      } else if (ri == 1) {
        chuxing = "明天 ";
      } else if (ri == 2) {
        chuxing = "后天 ";
      } else if (ri == 3) {
        chuxing = "大后天 ";
      } else {
        chuxing = new Date(shijianchuo).toLocaleDateString();
      }
    } else {
      chuxing = new Date(shijianchuo).toLocaleDateString();
    }
    let s1 = p1.children[1];
    let s2 = p2.children[1];
    let s3 = p3.children[1];
    let time2 = new Date(shijianchuo).toLocaleTimeString().split(":");
    s1.innerText = chuxing + `\xa0\xa0` + time2[0] + " 点 " + time2[1] + " 分 " + time2[2] + " 秒";
    s2.innerText = huangsuan(+chaju);
    s3.innerText = huangsuan(chufa);
  }
}

// 改变执行
function change(e) {
  // let value = e.target.value;
  let start1 = start.value;
  let front1 = front.value;
  let day1 = day.value;
  let hour1 = hour.value;
  let min1 = min.value;
  if (start1 && front1 && day1 && hour1 && min1) {
    localStorage.setItem("daojishitime", JSON.stringify({ start1, front1, day1, hour1, min1 }));
  }
}

// 换算
function huangsuan(num) {
  return (
    (parseInt(num / 1000 / 60 / 60 / 24) == 0 ? "" : parseInt(num / 1000 / 60 / 60 / 24) + " 天 ") +
    (parseInt((num / 1000 / 60 / 60) % 24) == 0 && parseInt(num / 1000 / 60 / 60 / 24) == 0 ? "" : parseInt((num / 1000 / 60 / 60) % 24) + " 时 ") +
    parseInt((num / 1000 / 60) % 60) +
    " 分 " +
    parseInt((num / 1000) % 60) +
    " 秒"
  );
}

// 创建时间选择
function createTime() {
  let hour = document.createElement("select");
  hour.name = "时";
  let min = document.createElement("select");
  min.name = "分";
  for (let i = 0; i < 60; i++) {
    if (i < 24) {
      let child = document.createElement("option");
      child.innerText = i;
      hour.appendChild(child);
    }
    let child = document.createElement("option");
    child.innerText = i;
    min.appendChild(child);
  }
  time.appendChild(hour);
  time.appendChild(document.createTextNode("时"));
  time.appendChild(min);
  time.appendChild(document.createTextNode("分"));

  return { hour, min };
}
