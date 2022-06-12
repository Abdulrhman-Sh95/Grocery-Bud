let input = document.getElementById("name");
let submit = document.getElementById("submit");
let container = document.getElementById("container");
let alert = document.getElementById("alert");
let showItems = document.getElementById("items");
let items = [];
let edited = "";
if (
  localStorage.getItem("items") !== "[]" &&
  localStorage.getItem("items") !== null
) {
  items = JSON.parse(localStorage.getItem("items"));
  createItems();
}
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submit.click();
  }
});
submit.addEventListener("click", function click() {
  if (submit.innerText != "Edit") {
    if (input.value !== "") {
      items.push({ name: `${input.value}`, id: Date.now() });
      createItems();
      localStorage.setItem("items", JSON.stringify(items));
      input.value = "";
      alert.innerText = "item add to the list";
      alert.style.opacity = "1";
      alert.classList.add("add");
      setTimeout(() => {
        alert.style.opacity = "0";
        alert.classList.remove("add");
      }, 1000);
    } else {
      alert.innerText = "Please enter value";
      alert.style.opacity = "1";
      alert.classList.add("danger");
      setTimeout(() => {
        alert.style.opacity = "0";
        alert.classList.remove("danger");
      }, 1000);
    }
  }
});

function createItems() {
  showItems.innerHTML = "";
  items.forEach((e) => {
    let item = document.createElement("div");
    item.classList.add("item");
    item.innerText = `${e.name}`;
    item.setAttribute("id", e.id);
    showItems.appendChild(item);
    let btns = document.createElement("div");
    btns.classList.add("buttons");
    item.appendChild(btns);
    let edit = document.createElement("i");
    edit.classList.add("edit", "fa-solid", "fa-pen-to-square");
    btns.appendChild(edit);
    let remove = document.createElement("i");
    remove.classList.add("remove", "fa-solid", "fa-trash-can");
    btns.appendChild(remove);
  });
  let clearAll = document.createElement("div");
  clearAll.innerText = "clear list";
  clearAll.classList.add("clear-all");
  showItems.appendChild(clearAll);
  clearAll.addEventListener("click", () => {
    localStorage.clear();
    showItems.innerHTML = "";
    alert.innerText = "list deleted";
    alert.style.opacity = "1";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.style.opacity = "0";
      alert.classList.remove("danger");
    }, 1000);
    items = [];
  });
}
showItems.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    let removedName = e.target.parentElement.parentElement.textContent;
    items = items.filter((e) => {
      return e.name !== removedName.toLowerCase().trim();
    });
    if (showItems.children.length === 1) {
      showItems.innerHTML = "";
    }
    alert.innerText = "item removed";
    alert.style.opacity = "1";
    alert.classList.add("danger");
    setTimeout(() => {
      alert.style.opacity = "0";
      alert.classList.remove("danger");
    }, 1000);
    localStorage.setItem("items", JSON.stringify(items));
  }
});
showItems.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    edited = e.target.parentElement.parentElement;
    input.value = edited.innerText;
    input.focus();
    submit.innerText = "Edit";
  }
});

submit.addEventListener("click", () => {
  if (submit.innerText == "Edit") {
    edited.innerHTML =`
    ${input.value}
    <div class="buttons">
    <i class="edit fa-solid fa-pen-to-square"></i>
    <i class="remove fa-solid fa-trash-can"></i>
    </div>
    `;
    for (i=0  ; i < items.length ; i++) {
      if (edited.id == items[i].id) {
        items[i].name = edited.innerText.toLowerCase()
      }
    }
    
    localStorage.setItem("items",JSON.stringify(items)) 
    input.value = "";
    submit.innerText = "Submit";
    alert.innerText = "item edited";
    alert.style.opacity = "1";
    alert.classList.add("add");
    setTimeout(() => {
      alert.style.opacity = "0";
      alert.classList.remove("add");
    }, 1000);
  }
});

