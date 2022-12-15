exports.trending_bottomdesigns = function (app, upload, Bottomdesigns, fs, path,verification) {
    app.post('/bottomdesigns',verification, upload.single('img'), function (req, res) {
        Bottomdesigns.findOne({ name: "Bottomdesigns" }, function (err, finddata) {
            if (err) {
                req.flash('submited', 'Your image has been uploaded please try again later ')
                res.status(502).redirect('back')
            }
            else {
                const toupdatedata = {
                    itemtitle: req.body.name,
                    itemimg: {
                        data: fs.readFileSync(path.join(__dirname, '../', '/upload/' + req.file.filename))
                    }
                }
                Bottomdesigns.findOneAndUpdate(finddata, { $push: { trending: toupdatedata } }, function (err, updatedata) {
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
    app.post('/bottomdesigns-m',verification, upload.single('img'), function (req, res) {
        Bottomdesigns.findOne({ name: 'Bottomdesigns' }, function (err, result) {
            if (err) {
                req.flash('canceled', 'Your image has not been uploaded please try again later ')
                res.status(502).redirect('back')
            }
            else {
                const toupdatedata = {
                    itemtitle: req.body.name,
                    itemimg: {
                        data: fs.readFileSync(path.join(__dirname, '../', '/upload/' + req.file.filename))
                    }
                }
                Bottomdesigns.findOneAndUpdate(result, { $push: { more: toupdatedata } }, function (err, updatedata) {
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
    app.post('/bottomdesigns-s',verification, upload.single('img'), function (req, res) {
        Bottomdesigns.findOne({ name: "Bottomdesigns" }, function (err, result) {
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
                Bottomdesigns.findOneAndUpdate({ name: 'Bottomdesigns' }, { $push: { slides: toupdatedata } }, function (err, updatedata) {
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
    app.get('/Bottomdesigns/delete/:category/:id/:imgid',verification, function (req, res) {
        const newcategory = req.params.category
        if (newcategory == 'trending') {
            Bottomdesigns.findOneAndUpdate({ _id: req.params.id }, { $pull: { trending: { _id: req.params.imgid } } }, function (err, result) {
                if (err) {
                    res.status(424).send('Unabel to delete the image please try again later')
                }
                else {
                    res.status(200).send('Image has been deleted ')
                }
            })
        }
        else if (newcategory == 'slides') {
            Bottomdesigns.findOneAndUpdate({ _id: req.params.id }, { $pull: { slides: { _id: req.params.imgid } } }, function (err, result) {
                if (err) {
                    res.status(424).send('Unabel to delete the image please try again later')
                }
                else {
                    res.status(200).send('Image has been deleted ')
                }
            })

        }
        else {
            Bottomdesigns.findOneAndUpdate({ _id: req.params.id }, { $pull: { more: { _id: req.params.imgid } } }, function (err, result) {
                if (err) {
                    res.status(424).send('Unabel to delete the image please try again later')
                }
                else {
                    res.status(200).send('Image has been deleted ')
                }
            })
        }
    })



}
