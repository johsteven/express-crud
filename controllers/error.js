exports.notFound = function(req, res) {
    res.render("errors/404", {
        layout: "layouts/main",
        url: req.url,
        title: "404 Not Found"
    })
}