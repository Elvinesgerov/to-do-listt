const container = document.querySelector(".container");
const closerIcon = document.querySelectorAll(".inputicon img");
const inputiconInput = document.querySelectorAll(".inputicon input");
const box1h2 = document.querySelector(".box1 h2");
const sorticon = document.querySelector(".sorticon");
const hiddencontainer = document.querySelector(".hiddencontainer");
const button = document.querySelector(".button");
const addInput = document.querySelector(".addInput");
const searce = document.querySelector(".searce");
const addicon = document.querySelector(".addicon");
const seraceicon = document.querySelector(".seraceicon");
const noteOl = document.querySelector(".note ol");
let flag = true;
let arry = [];

container.addEventListener("mousemove", (e) => {
 const rect = container.getBoundingClientRect();
 const x = e.clientX - rect.left;
 const y = e.clientY - rect.top;

 const centerX = rect.width / 2;
 const centerY = rect.height / 2;

 const rotateX = ((y - centerY) / centerY) * 10;
 const rotateY = ((x - centerX) / centerX) * 10;

 container.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
})

container.addEventListener("mouseleave", () => {
 container.style.transform = "rotateX(0deg) rotateY(0deg)";
});

function tarix() {
 box1h2.textContent = new Date().toLocaleString();
}
setInterval(tarix, 1000);

function changeImgOnHover(img, srcOnHover, srcOnLeave) {
 img.addEventListener("mouseover", () => (img.src = srcOnHover));
 img.addEventListener("mouseleave", () => (img.src = srcOnLeave));
}

function createDeleteIcon() {
 const img = document.createElement("img");
 img.src = "./image/icon3.svg";
 changeImgOnHover(img, "./image/icon2.svg", "./image/icon3.svg");
 return img;
}

function clearInputs() {
 inputiconInput.forEach(input => (input.value = ""));
}

function renderList() {
 noteOl.innerHTML = "";

 arry.forEach(item => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.classList.add("spantext");
  span.textContent = item;
  li.appendChild(span);

  const deleteIcon = createDeleteIcon();
  deleteIcon.addEventListener("click", () => {
   const index = arry.indexOf(item);
   if (index > -1) arry.splice(index, 1);
   renderList();
  });

  li.appendChild(deleteIcon);
  noteOl.appendChild(li);
 });

 hiddencontainer.style.display = arry.length ? "block" : "none";

 const showSearch = arry.length > 0;
 addInput.style.display = showSearch ? "none" : "block";
 addicon.style.display = showSearch ? "none" : "block";
 searce.style.display = showSearch ? "block" : "none";
 seraceicon.style.display = showSearch ? "block" : "none";

 if (!showSearch) flag = true;
}

function clickAdd() {
 const value = addInput.value.trim();
 if (!value) return;
 arry.push(value);
 addInput.value = "";
 flag = false;
 renderList();
}

function newAdd() {
 hiddencontainer.style.display = "block";
 addInput.style.display = "block";
 addicon.style.display = "block";
 searce.style.display = "none";
 seraceicon.style.display = "none";
 flag = true;
}

function filter() {
 const filterValue = searce.value.toLowerCase().trim();
 const spanfilter = document.querySelectorAll(".spantext");
 let found = false;

 if (spanfilter.length === 0) return;

 if (filterValue === "") {
  spanfilter.forEach(item => {
   item.closest("li").style.display = "list-item";
  });
  return;
 }

 spanfilter.forEach(item => {
  const li = item.closest("li");
  if (item.textContent.toLowerCase().includes(filterValue)) {
   li.style.display = "list-item";
   found = true;
  } else {
   li.style.display = "none";
  }
 });

 if (!found) {
  spanfilter.forEach(item => {
   item.closest("li").style.display = "list-item";
  });
 }
}

closerIcon.forEach(img => {
 changeImgOnHover(img, "./image/icon2.svg", "./image/icon3.svg");
 img.addEventListener("click", clearInputs);
});

searce.addEventListener("input", filter);

addInput.addEventListener("keydown", e => {
 if (e.key === "Enter") clickAdd();
});

button.addEventListener("click", () => {
 if (flag && addInput.value.trim() !== "") {
  clickAdd();
 } else if (!flag) {
  newAdd();
 }
});

sorticon.addEventListener("click", () => {
 const isAscending = sorticon.src.includes("icon1.svg");

 if (isAscending) {
  sorticon.src = "./image/icon4.svg";
  arry.sort((a, b) => a.localeCompare(b));
 } else {
  sorticon.src = "./image/icon1.svg";
  arry.sort((a, b) => b.localeCompare(a));
 }
 flag = false;
 renderList();
});