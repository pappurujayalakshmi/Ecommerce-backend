let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
require("dotenv").config();

const rt = require("./routes/rt");

let app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/pimgs", express.static("./prodimgs"));
app.use("/", rt);

// Connect DB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));