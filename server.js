const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
const nocache = require("nocache");
app.use(nocache());
const Datastore = require("nedb");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const { v4: uuidv4 } = require("uuid");
const formidable = require("formidable");

app.use(
  express.urlencoded({
    extended: true,
  })
);
const db = new Datastore({ filename: "users.db", autoload: true });
const PORT = 3000;
const TEXT_EXTENSIONS = ["txt", "css", "html", "json"];
const IMG_EXTENSIONS = ["png", "jpg", "jpeg", "gif"];

app.use(express.json());
app.use(express.static("static"));
app.use((req, res, next) => {
  if (req.cookies.login) {
    res.locals.isLoggedIn = req.cookies.login;
    res.locals.username = JSON.parse(req.cookies.login).login;
  }
  next();
});
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main.hbs",
    helpers: {
      icon: function (file) {
        const ext = path.extname(file);
        const iconPath = `/gfx/${ext.slice(1, ext.length)}.png`;
        if (fs.existsSync(path.join(__dirname, "static", iconPath))) {
          return iconPath;
        } else {
          return "/gfx/unknown.png";
        }
      },
      short: function (text) {
        let shortenedText;
        if (text.length > 15) {
          shortenedText = `${text.slice(0, 10)}...${path.extname(text)}`;
        }
        return shortenedText || text;
      },
      isTextExtension: function (file) {
        const ext = path.extname(file).slice(1);
        return TEXT_EXTENSIONS.includes(ext);
      },
      isImage: function (root, file) {
        const filepath = path.join(root, file);
        const fileType = mime.lookup(filepath);

        return fileType && fileType.startsWith("image/");
      },
      isEqual: function (a, b) {
        console.log(a, b);

        return a == b;
      },
      concat: function (a, b) {
        return a + b;
      },
    },
    extname: ".hbs",
    partialsDir: "views/partials",
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  const context = {};
  res.redirect("/filemanager");
});

app.post("/handleUpload", (req, res) => {
  let form = formidable({});
  let message = null;
  form.keepExtensions = true;
  form.multiples = true;

  form.parse(req, function (err, fields, files) {
    const root = fields.root;
    form.uploadDir = path.join(__dirname + "/pliki/", root); // folder do zapisu zdjęcia
    if (err) {
      console.error(err);
    }

    if (!Array.isArray(files.fileUpload)) {
      files.fileUpload = [files.fileUpload];
    }
    files.fileUpload.forEach((file) => {
      if (!file.name) {
        fs.unlink(file.path, (err) => {
          if (err) console.error("Błąd usuwania pliku:", err);
        });
        message = "No file selected";
        return;
      }
      let oldPath = file.path;
      let newPath = path.join(form.uploadDir, file.name);

      if (fs.existsSync(newPath)) {
        message = "File arleady exist";
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Błąd usuwania pliku:", err);
        });
        return;
      }

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error("Błąd zmiany nazwy pliku:", err);
        }
      });
    });
    if (message) {
      return res.redirect(`/filemanager?name=${root}&message=${message}`);
    }
    return res.redirect(`/filemanager?name=${root}`);

    // res.redirect("/");
  });
});

app.get("/filemanager", (req, res) => {
  if (!req.cookies.login) {
    return res.redirect("/login");
  }
  const userData = JSON.parse(req.cookies.login);
  if (req.query.name) {
    if (userData.login !== req.query.name.split("/")[1]) {
      console.log("red");

      return res.redirect("/filemanager");
    }
  }

  db.findOne({ login: userData.login }, (err, user) => {
    if (!user) {
      res.clearCookie("login");
      return res.redirect("/login");
    }
    app.use(
      `/pliki/${userData.login}`,
      express.static(`pliki/${userData.login}`)
    );

    let message = req.query.message || null;

    let directory = req.query.name;
    if (!directory) directory = `/${userData.login}`;

    const links = directory.split("/");
    links.shift();
    let navigation = [];
    let tmp = "";
    links.forEach((link) => {
      tmp += "/" + link;
      navigation.push({
        name: link,
        link: tmp,
      });
    });
    console.log("directory: ", directory);
    const folders = [];
    const fileList = [];
    fs.readdir(path.join(__dirname, "pliki", directory), (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        fs.lstat(
          path.join(__dirname, "pliki", directory, file),
          (err, stats) => {
            if (stats.isDirectory()) {
              folders.push(file);
            } else {
              fileList.push(file);
            }
          }
        );
      });
      const context = {
        folders: folders,
        files: fileList,
        root: directory,
        navigation: navigation,
        message: message,
        extensions: TEXT_EXTENSIONS,
        login: userData,
      };

      res.render("filemanager6.hbs", context);
    });
  });
});

app.get("/createFile", (req, res) => {
  if (req.query.name.trim() == "") {
    res.redirect(`/filemanager?name=${req.query.root}&message=Incorrect name `);
    return;
  }
  req.query.name = req.query.name.trim();
  const fileExtension = req.query.extension;
  let filepath = path.join(
    __dirname,
    "pliki",
    req.query.root,
    req.query.name.trim()
  );
  if (fileExtension) {
    filepath += `.${fileExtension}`;
  }
  if (fs.existsSync(filepath)) {
    res.redirect(
      `/filemanager?name=${req.query.root}&message=File arleady exist`
    );
    return;
  }
  if (req.query.type === "file") {
    if (fileExtension === "txt") {
      fileContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in elementum erat. Pellentesque dui arcu, facilisis et eleifend scelerisque, porttitor id metus.";
    } else if (fileExtension === "html") {
      fileContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>html file</h1>
</body>
</html>`;
    } else if (fileExtension === "json") {
      fileContent = "json";
    } else if (fileExtension === "css") {
      fileContent = `
body {
  background: #222;
}`;
    } else {
      fileContent = "";
    }
    fs.writeFile(filepath, fileContent, (err) => {
      if (err) throw err;
    });
  } else {
    fs.mkdir(filepath, (err) => {
      if (err) throw err;
    });
  }

  res.redirect(`/filemanager?name=${req.query.root}`);
});

app.get("/deleteFile", (req, res) => {
  const filepath = path.join(__dirname, "pliki", req.query.name);
  fs.lstat(path.join(filepath), (err, stats) => {
    if (stats.isDirectory()) {
      fs.rmSync(filepath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    } else {
      fs.unlink(path.join(filepath), (err) => {
        if (err) throw err;
      });
    }
  });
  res.redirect(`/filemanager?name=${req.query.root}`);
});

app.post("/renameFile", (req, res) => {
  if (req.body.renamed.trim().length < 1) {
    return res.redirect(
      `/${req.body.next}?name=${req.body.root}&message=Incorrect name`
    );
  }
  req.body.renamed = req.body.renamed.trim();
  const filePath = path.join(__dirname, "pliki");
  const dirs = req.body.root.split("/");
  const newName = req.body.extension
    ? `${req.body.renamed}.${req.body.extension}`
    : req.body.renamed;

  dirs[dirs.length - 1] = newName;
  const newRoot = dirs.join("/");
  const newPath = path.join(filePath, newRoot);
  if (!fs.existsSync(newPath)) {
    fs.rename(path.join(filePath, req.body.root), newPath, (err) => {
      if (err) console.error(err);
      else {
        console.log("newRoot: ", newRoot);
        // fs.lstat(
        //   path.join(__dirname, "pliki", directory, file),
        //   (err, stats) => {
        //     if (stats.isDirectory()) {
        //     }
        //   }
        // );
        // res.redirect();
      }
      return res.redirect(`/${req.body.next}?name=${newRoot}`);
    });
  } else {
    return res.redirect(
      `/${req.body.next}?name=${req.body.root}&message=Name taken`
    );
  }
});

app.get("/textEditor", (req, res) => {
  console.log("showFile req: ", req.query);
  const file = req.query.name;
  const fileName = file.split("/").pop();
  console.log("fileName: " + fileName);

  // const fileExtension = file.split(".")[file.split(".").length - 1];
  console.log(file);
  const filepath = path.join(__dirname, "pliki", file);
  fs.readFile(filepath, "utf8", function (err, data) {
    const context = {
      file: file,
      fileName: fileName,
      fileContent: data,
      extensions: TEXT_EXTENSIONS,
    };
    res.render("textEditor.hbs", context);
    // });
  });
});

app.get("/saveConfig", (req, res) => {
  const filepath = path.join(__dirname, "textEditorConfig.json");
  const content = {
    fontSize: req.query.fontSize,
    backgroundColor: req.query.backgroundColor,
  };
  console.log(JSON.stringify(content));

  fs.writeFile(filepath, JSON.stringify(content), (err) => {
    if (err) throw err;
    res.json({ message: "ustawienia zapisane" });
    console.log("config zapisany");
  });
});

app.get("/getConfig", (req, res) => {
  const filepath = path.join(__dirname, "textEditorConfig.json");
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) res.status(500).send({ error: err });
    res.send(JSON.parse(data));
  });
});

app.get("/preview", (req, res) => {
  const filepath = path.join(__dirname, "pliki", req.query.file);

  res.sendFile(filepath);
});

app.post("/saveFile", (req, res) => {
  // console.log(req.body);
  const filepath = path.join(__dirname, "pliki", req.body.file);
  fs.writeFile(filepath, req.body.content, (err) => {
    if (err) res.redirect(`/textEditor?name=${file}&message="blad zapisu`);
    res.redirect(`/textEditor?name=${req.body.file}&message="zapisano"`);
  });
});

app.get("/imageEditor", (req, res) => {
  const file = req.query.name;
  const filepath = "/pliki" + file;
  // const extension = path.extname(file).slice(1);
  const effects = [
    { name: "", value: "" },
    { name: "grayscale", value: "100%" },
    { name: "blur", value: "1px" },
    { name: "invert", value: "100%" },
    { name: "sepia", value: "100%" },
  ];
  context = {
    effects: effects,
    filepath: filepath,
    file: file,
    // extension: extension,
    extensions: IMG_EXTENSIONS,
    // imageWidth:/
  };
  res.render("imageEditor.hbs", context);
});

app.post("/saveImage", (req, res) => {
  let form = formidable({});
  form.keepExtensions = true;

  form.parse(req, function (err, fields, files) {
    const file = files.blob;
    let oldPath = file.path;
    let newPath = path.join(__dirname, fields.path);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Error saving file:", err);
        return res.status(500).send({ message: "Error saving file" });
      }
    });
    return res.send({ message: "File saved" });
  });
});

app.get("/register", (req, res) => {
  const context = {};
  res.render("register.hbs", context);
});

app.post("/handleRegister", async (req, res) => {
  const { login, password, password2 } = req.body;

  if (!login || !password || !password2) {
    return res.render("error.hbs", { message: "All fields required" });
  }

  if (password !== password2) {
    return res.render("error.hbs", { message: "Passwords do not match" });
  }

  if (login.trim().length < 3) {
    return res.render("error.hbs", { message: "Login min length is 3" });
  }

  db.findOne({ login }, async (err, user) => {
    if (user) {
      return res.render("error.hbs", { message: "User arleady exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.insert({ login, password: hashedPassword }, (err, newUser) => {
      if (err) {
        return res.render("error.hbs", { message: "Register error" });
      }

      const userFolder = path.join(__dirname, "pliki", login);
      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder);
      }

      const sessionID = uuidv4();
      res.cookie("login", JSON.stringify({ login, sessionID }), {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      });

      res.redirect("/filemanager");
    });
  });
});
app.get("/login", (req, res) => {
  const context = {};
  res.render("login.hbs", context);
});
app.post("/handleLogin", async (req, res) => {
  const { login, password } = req.body;

  db.findOne({ login }, async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("error.hbs", {
        message: "Nieprawidłowy login lub hasło",
      });
    }

    // Generowanie sesji
    const sessionID = uuidv4();
    res.cookie("login", JSON.stringify({ login, sessionID }), {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    res.redirect("/filemanager");
  });
});

app.get("/logout", (req, res) => {
  // res.redirect("/login");
  // const context = {};
  res.render("logout.hbs");
});
app.post("/handleLogout", (req, res) => {
  res.clearCookie("login").redirect("/login");
});

// app.get("/error", (req, res) => {
//   const context = { message: req.bod };
//   res.render("error.hbs", context);
// });

app.listen(PORT, () => {
  console.log("start serwera http://localhost:" + PORT);
});
