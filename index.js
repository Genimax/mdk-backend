const express = require("express");
const path = require("path");
const cors = require("cors");

const data = require("./data");

const app = express();
const PORT = 80;

app.use(express.json());
app.use(cors());

/////////////////// Получить список объектов
app.get("/data", (req, res) => {
  res.json(data);
});

/////////////////// Получить данные объекта по ID
app.get("/data/:id", (req, res) => {
  const objectId = Number(req.params.id);
  const object = data.find((obj) => obj.id === objectId);

  if (object) {
    res.json(object);
  } else {
    res.status(404).json({ message: "Object not found" });
  }
});

////////////////// Получить картинку по пути файла
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, "images", imageName));
});

////////////////// Получить аудио по пути файла
app.get("/audio/:audioName", (req, res) => {
  const audioName = req.params.audioName;
  res.sendFile(path.join(__dirname, "audio", audioName));
});

////////////////// Получить видео по пути файла
app.get("/videos/:videoName", (req, res) => {
  const videoName = req.params.videoName;
  res.sendFile(path.join(__dirname, "videos", videoName));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
