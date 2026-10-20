document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("img-canvas");
  const context = canvas.getContext("2d");
  let image = new Image();

  image.src = window.filepath;

  image.onload = () => {
    document.getElementById(
      "res"
    ).textContent = `dimensions: ${image.naturalWidth}x${image.naturalHeight}`;
    drawCanvas(
      image.naturalWidth,
      image.naturalHeight
      // document.querySelector("main").offsetWidth,
      // document.querySelector("main").offsetHeight
    );
  };

  function drawCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
    // console.log(width, height);

    context.drawImage(image, 0, 0, canvas.width, canvas.height); // obrazek z filtrem widocznym na canvasie
  }

  window.applyFilter = function (filter) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (filter === "()") {
      context.filter = "none";
    } else {
      context.filter = filter;
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  window.showFilters = function () {
    const filtersContainer = document.getElementById("filters");
    const mainWidth = document.querySelector("main").offsetWidth;
    const mainHeight = document.querySelector("main").offsetHeight;
    if (filtersContainer.style.opacity === "1") {
      console.log("aosidnoasndoiasndoi");

      filtersContainer.style.opacity = "0";
      filtersContainer.style.width = "0";
      // context.clearRect(0, 0, canvas.width, canvas.height);
      // drawCanvas(mainWidth + 100, mainHeight);
    } else {
      filtersContainer.style.width = "200px";
      filtersContainer.style.opacity = "1";
      // context.clearRect(0, 0, canvas.width, canvas.height);
      // drawCanvas(mainWidth - 100, mainHeight);
    }
  };
  window.saveImage = function () {
    // let fileName = filePath.split("/").pop();
    canvas.toBlob((blob) => {
      let fm = new FormData();
      fm.append("blob", blob);
      fm.append("path", window.filepath);

      fetch("/saveImage", {
        method: "POST",
        body: fm,
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => console.error("Error saving file:", error));
    });
  };
});
