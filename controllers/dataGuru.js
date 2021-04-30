const fs = require("fs");

const fileBuffer = fs.readFileSync("database/data_guru.json", "utf8");
const dataGuruFile = JSON.parse(fileBuffer);

exports.index = function(req, res) {
    res.render("data_guru", {
        layout: "layouts/main",
        session: {
            successMsg: req.flash("successMsg")
        },
        url: req.url,
        title: "Data Guru",
        dataGuru: dataGuruFile
    })
}

exports.create = function(req, res) {
    res.render("tambah-data_guru", {
        layout: "layouts/main",
        url: req.url,
        title: "Tambah Data Guru",
    })
}

exports.store = function(req, res) {
    const data = req.body;
    if (dataGuruFile.length != 0) {
        const latestId = dataGuruFile[dataGuruFile.length - 1].id + 1;
        let id = data.id = latestId;
    } else {
        data.id = 1;
    }
    dataGuruFile.push(data);
    saveAndRedirect(req, res, "ditambah!");
}

exports.edit = function(req, res) {
    const idParam = +req.param("id");
    res.render("edit-data_guru", {
        layout: "layouts/main",
        url: req.url,
        title: "Edit Data Guru",
        dataGuruByID: getDataByID(idParam)
    })
}

exports.update = function(req, res) {
    const idParam = +req.param("id");
    const data = req.body;
    const index = dataGuruFile.map(item => item.id).indexOf(idParam);
    data.id = idParam;
    dataGuruFile.splice(index, 1, data);
    saveAndRedirect(req, res, "diedit!");
}

exports.delete = function(req, res) {
    const idParam = +req.param("id");
    const index = dataGuruFile.map(item => item.id).indexOf(idParam);
    dataGuruFile.splice(index, 1);
    saveAndRedirect(req, res, "dihapus!");
}

function getDataByID(idParam) {
    return dataGuruFile.filter(el => el.id == idParam)[0]
}

function saveAndRedirect(req, res, msg) {
    fs.writeFileSync("database/data_guru.json", JSON.stringify(dataGuruFile));
    req.flash("successMsg", `Data berhasil ${msg}`);
    res.redirect("/data_guru");
}