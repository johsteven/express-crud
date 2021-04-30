const fs = require("fs");

const fileBuffer = fs.readFileSync("database/data_mahasiswa.json", "utf8");
const dataMahasiswaFile = JSON.parse(fileBuffer);

exports.index = function(req, res) {
    res.render("data_mahasiswa", {
        layout: "layouts/main",
        session: {
            successMsg: req.flash("successMsg")
        },
        url: req.url,
        title: "Data Mahasiswa",
        dataMahasiswa: dataMahasiswaFile
    })
}

exports.create = function(req, res) {
    res.render("tambah-data_mahasiswa", {
        layout: "layouts/main",
        url: req.url,
        title: "Tambah Data Mahasiswa",
    })
}

exports.store = function(req, res) {
    const data = req.body;
    if (dataMahasiswaFile.length != 0) {
        const latestId = dataMahasiswaFile[dataMahasiswaFile.length - 1].id + 1;
        let id = data.id = latestId;
    } else {
        data.id = 1;
    }
    dataMahasiswaFile.push(data);
    saveAndRedirect(req, res, "ditambah!");
}

exports.edit = function(req, res) {
    const idParam = +req.param("id");
    res.render("edit-data_mahasiswa", {
        layout: "layouts/main",
        url: req.url,
        title: "Edit Data Mahasiswa",
        dataMahasiswaByID: getDataByID(idParam)
    })
}

exports.update = function(req, res) {
    const idParam = +req.param("id");
    const data = req.body;
    const index = dataMahasiswaFile.map(item => item.id).indexOf(idParam);
    data.id = idParam;
    dataMahasiswaFile.splice(index, 1, data);
    saveAndRedirect(req, res, "diedit!");
}

exports.delete = function(req, res) {
    const idParam = +req.param("id");
    const index = dataMahasiswaFile.map(item => item.id).indexOf(idParam);
    dataMahasiswaFile.splice(index, 1);
    saveAndRedirect(req, res, "dihapus!");
}

function getDataByID(idParam) {
    return dataMahasiswaFile.filter(el => el.id == idParam)[0]
}

function saveAndRedirect(req, res, msg) {
    fs.writeFileSync("database/data_mahasiswa.json", JSON.stringify(dataMahasiswaFile));
    req.flash("successMsg", `Data berhasil ${msg}`);
    res.redirect("/data_mahasiswa");
}