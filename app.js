const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("req-flash");
const fs = require("fs");
const home = require("./controllers/home");
const dataMahasiswa = require("./controllers/dataMahasiswa");
const dataGuru = require("./controllers/dataGuru");
const error = require("./controllers/error");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'sadojerwonasdkncsjairqppsakfmandpqek',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Home
app.get("/", home.index);

// Data Mahasiswa
app.get("/data_mahasiswa", dataMahasiswa.index);
app.get("/tambah-data_mahasiswa", dataMahasiswa.create);
app.post("/tambah-data_mahasiswa", dataMahasiswa.store);
app.get("/edit-data_mahasiswa/:id", dataMahasiswa.edit);
app.post("/edit-data_mahasiswa/:id", dataMahasiswa.update);
app.post("/hapus-data_mahasiswa/:id", dataMahasiswa.delete);

// Data Guru
app.get("/data_guru", dataGuru.index);
app.get("/tambah-data_guru", dataGuru.create);
app.post("/tambah-data_guru", dataGuru.store);
app.get("/edit-data_guru/:id", dataGuru.edit);
app.post("/edit-data_guru/:id", dataGuru.update);
app.post("/hapus-data_guru/:id", dataGuru.delete);

// Error
app.use("/", error.notFound);

app.listen(port, () => console.log(`Server app listening at http://localhost:${port}`));