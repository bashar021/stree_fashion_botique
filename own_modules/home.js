exports.home_content = function (app, upload,fs, path,Home,verification) {
    app.post('/admin/home/logo',verification, upload.single('img'),function(req,res){
        const data = {
            logo :{
                itemimg:{ data: fs.readFileSync(path.join(__dirname, "../", '/upload/' + req.file.filename))
                }
            },
        }
        Home.findByIdAndUpdate({_id:'62fe419adfc6759665727bb5'},{$set:data},function(err,result){
                    if(err){
                        req.flash('canceled', 'Your image has not been uploaded please try again later ')
                        res.status(502).redirect('back')
                    }
                    else{
                        fs.unlinkSync(path.join(__dirname, "../", '/upload/' + req.file.filename));
                        req.flash('submited', 'Your Image Has Been Uploaded ')
                        res.status(301).redirect('back')
                    }
        })
    })

    app.post('/admin/home/wedding',verification,upload.single('img'),function(req,res){
        const data = {
            wedding :{
                itemimg:{ data: fs.readFileSync(path.join(__dirname, "../", '/upload/' + req.file.filename))
                }
            }
        }
        Home.findByIdAndUpdate({_id:'62fe419adfc6759665727bb5'},{$set:data},function(err,result){
                    if(err){
                        req.flash('canceled', 'Your image has not been uploaded please try again later ')
                        res.status(502).redirect('back')
                    }
                    else{
                        fs.unlinkSync(path.join(__dirname, "../", '/upload/' + req.file.filename));
                        req.flash('submited', 'Your Image Has Been Uploaded ')
                        res.status(301).redirect('back')
                    }
        })
    })
    app.post('/admin/home/western',verification,upload.single('img'),function(req,res){
        const data = {
            western :{
                itemimg:{ data: fs.readFileSync(path.join(__dirname, "../", '/upload/' + req.file.filename))
                }
            },
        }
        Home.findByIdAndUpdate({_id:'62fe419adfc6759665727bb5'},{$set:data},function(err,result){
                    if(err){
                        req.flash('canceled', 'Your image has not been uploaded please try again later ')
                        res.status(502).redirect('back')
                    }
                    else{
                        fs.unlinkSync(path.join(__dirname, "../", '/upload/' + req.file.filename));
                        req.flash('submited', 'Your Image Has Been Uploaded ')
                        res.status(301).redirect('back')
                    }

        })
    })
    app.post('/admin/home/traditional',verification,upload.single('img'),function(req,res){
        const data = {
            traditional :{
                itemimg:{ data: fs.readFileSync(path.join(__dirname, "../", '/upload/' + req.file.filename))
                }
            },
        }
        Home.findByIdAndUpdate({_id:'62fe419adfc6759665727bb5'},{$set:data},function(err,result){
                    if(err){
                        req.flash('canceled', 'Your image has not been uploaded please try again later ')
                        res.status(502).redirect('back')
                    }
                    else{
                        fs.unlinkSync(path.join(__dirname, "../", '/upload/' + req.file.filename));
                        req.flash('submited', 'Your Image Has Been Uploaded ')
                        res.status(301).redirect('back')
                    }
        })
    })
}
