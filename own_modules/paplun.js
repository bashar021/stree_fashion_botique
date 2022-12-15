exports.trending_paplun = function (app, upload, Paplun, fs, path,verification) {
    app.post('/paplun',verification, upload.single('img'), function (req, res) {
        Paplun.findOne({ name: "Paplun" }, function (err, finddata) {
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
                Paplun.findOneAndUpdate(finddata, { $push: { trending: toupdatedata } }, function (err, updatedata) {
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
    
    app.post('/paplun-m',verification,upload.single('img'), function (req, res) {
        Paplun.findOne({ name: 'Paplun' }, function (err, result) {
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
                Paplun.findOneAndUpdate(result, { $push: { more: toupdatedata } }, function (err, updatedata) {
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
    
    app.post('/paplun-s',verification, upload.single('img'), function (req, res) {
        Paplun.findOne({ name: "Paplun" }, function (err, result) {
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
                Paplun.findOneAndUpdate({ name: 'Paplun' }, { $push: { slides: toupdatedata } }, function (err, updatedata) {
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
    
    app.get('/Paplun/delete/:category/:id/:imgid',verification, function (req, res) {
        const newcategory = req.params.category
        if (newcategory == 'trending') {
            Paplun.findOneAndUpdate({ _id: req.params.id }, { $pull: { trending: { _id: req.params.imgid } } }, function (err, result) {
                if (err) {
                    res.status(424).send('Unabel to delete the image please try again later')
                }
                else {
                    res.status(200).send('Image has been deleted ')
                }
            })
        }
        else if (newcategory == 'slides') {
            Paplun.findOneAndUpdate({ _id: req.params.id }, { $pull: { slides: { _id: req.params.imgid } } }, function (err, result) {
                if (err) {
                    res.status(424).send('Unabel to delete the image please try again later')
                }
                else {
                    res.status(200).send('Image has been deleted ')
                }
            })

        }
        else {
            Paplun.findOneAndUpdate({ _id: req.params.id }, { $pull: { more: { _id: req.params.imgid } } }, function (err, result) {
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
