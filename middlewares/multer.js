const multer = require('multer')
const storage = multer.diskStorage({
    // console.log(req.body)
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        //   console.log(file);
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })

module.exports = upload