
var mongoose = require('mongoose')
const PPSchema = new mongoose.Schema({
    // name : {type:String,required:true},
    name: { type: String },
    trending: [{
        itemtitle: { type: String },
        itemimg: { data: Buffer }
    }],
    more: [{
        itemtitle: { type: String },
        itemimg: { data: Buffer }

    }],
    slides: [{
        itemimg: { data: Buffer }

    }]
})

// const Blouse = mongoose.model('blouse', PPSchema);
// const Suit = mongoose.model('suit', PPSchema);
// const Lehnga = mongoose.model('lehnga',PPSchema);
// const Paplun = mongoose.model('paplun', PPSchema);
// const Bottomdesigns = mongoose.model('bottomdesigns',PPSchema);
// const Outer = mongoose.model('outer', PPSchema);
// const Top = mongoose.model('top', PPSchema);
// const Skirt = mongoose.model('skirt', PPSchema);
// const Neckdesign = mongoose.model('neckdesign',PPSchema);
// const Sleeves = mongoose.model('sleeves',PPSchema);
// const Kurti = mongoose.model('kurti',PPSchema);
// const Kids = mongoose.model('kid',PPSchema);

module.exports = PPSchema