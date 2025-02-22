import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

const app = express();
const PORT = 3000;


app.use(express.json());oiooooo
app.use(cors());



mongoose.connect("mongodb+srv://magarsaurabh59:KGgEB4izM7PRapuo@cluster0.lq6uf.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const imageSchema = new mongoose.Schema({
  image: Buffer, // Store image as binary data
  contentType: String,
});

const Image = mongoose.model("Image", imageSchema);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      image: req.file.buffer,
      contentType: req.file.mimetype,
    });

    const savedImage = await newImage.save();
    res.json({ message: "Image uploaded successfully!", id: savedImage._id });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
});


app.get("/image/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    res.set("Content-Type", image.contentType);
    res.send(image.image);
  } catch (error) {
    res.status(500).json({ message: "Error fetching image", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
