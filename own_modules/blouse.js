exports.trending_blouse = function (app, upload, Blouse, fs, path,flash,verification) {
    app.post('/blouse', verification,upload.single('img'), function (req, res) {
        Blouse.findOne({ name: "blouseone" }, function (err, finddata) {
            if (err) {
                req.flash('submited', 'Your image has been uploaded please try again later ')
                res.status(502).redirect('back')
            }
            else {
                const toupdatedata = {
                    itemtitle: req.body.name,
                    itemimg: {data: fs.readFileSync(path.join(__dirname, "../", "/upload/" + req.file.filename))}
                }
                Blouse.findOneAndUpdate(finddata, { $push: { trending: toupdatedata } }, function (err, updatedata) {
                    if (err) {
                        req.flash('canceled', 'Your image has not been uploaded please try again later ')
                        res.status(502).redirect('back')   
                    }
                    else {
                        fs.unlinkSync(path.join(__dirname, "../", '/upload/' + req.file.filename));
                        req.flash('submited', 'Your Image Has Been Uploaded ')
                        res.status(301).redirect('back')
                    }
                })
            }
        })
    })
app.post('/blouse-m',verification, upload.single('img'), function (req, res) {
    Blouse.findOne({ name: "blouseone" }, function (err, result) {
        if (err) {
            req.flash('canceled', 'Your image has not been uploaded please try again later ')
            res.status(502).redirect('back')
        }
        else {
            const toupdatedata = {
                itemtitle: req.body.name,
                itemimg: {
                    data: fs.readFileSync(path.join(__dirname, "../", '/upload/' + req.file.filename))
                }
            }
            Blouse.findOneAndUpdate(result, { $push: { more: toupdatedata } }, function (err, updatedata) {
                if (err) {
                    req.flash('canceled', 'Your image has not been uploaded please try again later ')
                    res.status(502).redirect('back')
                }
                else {
                    fs.unlinkSync(path.join(__dirname, "../", '/upload/' + req.file.filename));
                    req.flash('submited', 'Your Image Has Been Uploaded ')
                    res.status(301).redirect('back')
                }
            })
        }
    })
})
app.post('/blouse-s',verification, upload.single('img'), function (req, res) {
    Blouse.findOne({ name: "blouseone" }, function (err, result) {
        if (err) {
            req.flash('canceled', 'Your image has not been uploaded please try again later ')
            res.status(502).redirect('back')
        }
        else {
            const toupdatedata = {
                itemimg: {
                    data: fs.readFileSync(path.join(__dirname, "../", '/upload/' + req.file.filename))
                }
            }
            Blouse.findOneAndUpdate({ name: 'blouseone' }, { $push: { slides: toupdatedata } }, function (err, updatedata) {
                if (err) {
                    req.flash('canceled', 'Your image has not been uploaded please try again later ')
                    res.status(502).redirect('back')
                }
                else {
                    fs.unlinkSync(path.join(__dirname, "../", '/upload/' + req.file.filename));
                    req.flash('submited', 'Your Image Has Been Uploaded ')
                    res.status(301).redirect('back')
                }
            })
        }
    })
})
app.get('/Blouse/delete/:category/:id/:imgid',verification, function (req, res) {
    const newcategory = req.params.category
    if (newcategory == 'trending') {
        Blouse.findOneAndUpdate({ _id: req.params.id }, { $pull: { trending: { _id: req.params.imgid } } }, function (err, result) {
            if (err) {
                res.status(424).send('Unabel to delete the image please try again later')
            }
            else {
                res.status(200).send('Image has been deleted ')
            }
        })
    }
    else if (newcategory == 'slides') {
        Blouse.findOneAndUpdate({ _id: req.params.id }, { $pull: { slides: { _id: req.params.imgid } } }, function (err, result) {
            if (err) {
                res.status(424).send('Unabel to delete the image please try again later')
            }
            else {
                res.status(200).send('Image has been deleted ')
            }
        })
    }
    else {
        Blouse.findOneAndUpdate({ _id: req.params.id }, { $pull: { more: { _id: req.params.imgid } } }, function (err, result) {
            if (err) {
                res.status(424).send('Unabel to delete the image please try again later')
            }
            else {
                res.status(200).send('Image has been deleted')
            }
        })
    }
})
}
