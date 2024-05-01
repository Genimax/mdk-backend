const express = require("express");
const path = require("path");
const cors = require("cors");

const data = require("./data");
const points = require("./data/points.json");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const audioFilesDirectory = path.join(__dirname, "audio");
const videoFilesDirectory = path.join(__dirname, "videos");
const imageFilesDirectory = path.join(__dirname, "images");

/////////////////// Получить список объектов
app.get("/data", (req, res) => {
  res.json(points);
});

/////////////////// Получить данные объекта по ID
app.get("/data/:id", (req, res) => {
  const objectId = Number(req.params.id);
  const object = points.points.find((obj) => obj.id === objectId);

  if (object) {
    res.json(object);
  } else {
    res.status(404).json({ message: "Object not found" });
  }
});

////////////////// Получить картинку по пути файла
app.get("/imageLink/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const fileURL = `http://${req.headers.host}/image/${imageName}`;
  res.json({ url: fileURL });
});
app.use("/image", express.static(imageFilesDirectory));

////////////////// Получить аудио по пути файла
app.get("/audioLink/:audioName", (req, res) => {
  const audioName = req.params.audioName;
  const fileURL = `http://${req.headers.host}/audio/${audioName}`;
  // res.sendFile(path.join(__dirname, "audio", audioName));
  res.json({ url: fileURL });
});
app.use("/audio", express.static(audioFilesDirectory));

////////////////// Получить видео по пути файла
app.get("/videoLink/:videoName", (req, res) => {
  const videoName = req.params.videoName;
  const fileURL = `http://${req.headers.host}/video/${videoName}`;
  // res.sendFile(path.join(__dirname, "videos", videoName));
  res.json({ url: fileURL });
});
app.use("/video", express.static(videoFilesDirectory));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
