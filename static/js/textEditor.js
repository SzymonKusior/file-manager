const lines = document.getElementById("lines");
const editor = document.getElementById("textEditor");
document.addEventListener("DOMContentLoaded", function () {
  loadConfig();
  function updateLineNumbers() {
    const lineCount = editor.value.split("\n").length;
    lines.innerHTML = Array.from({ length: lineCount }, (_, i) => i + 1).join(
      "\n"
    );
  }

  function loadConfig() {
    fetch("/getConfig")
      .then((response) => response.json())
      .then((data) => {
        lines.style.fontSize = data.fontSize;
        editor.style.fontSize = data.fontSize;

        lines.style.backgroundColor = data.backgroundColor;
        editor.style.backgroundColor = data.backgroundColor;
      })
      .catch((err) => console.log(err));
  }

  editor.addEventListener("input", updateLineNumbers);
  editor.addEventListener("scroll", () => {
    lines.scrollTop = editor.scrollTop;
  });

  updateLineNumbers();
});

function openDialog(id) {
  document.getElementById(id).showModal();
}

function changeFontSize(change) {
  // const editor = document.getElementById("textEditor");
  // const lines = document.getElementById("lines");

  editor.style.fontSize = `${parseInt(editor.style.fontSize) + change}px`;
  lines.style.fontSize = `${parseInt(lines.style.fontSize) + change}px`;
  console.log(editor.style.fontSize);
}

const colors = [
  "rgb(43, 43, 43)",
  "rgb(100, 25, 110)",
  "rgb(26, 124, 111)",
  "rgb(0, 0, 0)",
];
function changeColor() {
  // const editor = document.getElementById("textEditor");
  const currColor = editor.style.backgroundColor;
  console.log("poprzedni: " + currColor);
  console.log(colors[0]);

  if (colors[0] === currColor) {
    const c = colors.shift();
    colors.push(c);
    console.log("nowy: " + colors[0]);
  } else {
    console.log("else");
  }
  editor.style.backgroundColor = colors[0];
  lines.style.backgroundColor = colors[0];
}

function saveConfig() {
  const fontSize = editor.style.fontSize;
  const backgroundColor = editor.style.backgroundColor;
  fetch(`/saveConfig?fontSize=${fontSize}&backgroundColor=${backgroundColor}`)
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((err) => console.log(err));
}
