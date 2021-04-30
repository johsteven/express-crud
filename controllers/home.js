exports.index = function(req, res) {
    res.render("index", {
        layout: "layouts/main",
        url: req.url,
        title: "Halaman Home"
    })
}