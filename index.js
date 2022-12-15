const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const session = require('express-session')
const flash = require('connect-flash')
const compression = require('compression')
const multer = require('multer')
const  cookieParser = require('cookie-parser')
const router = express.Router()
const fs = require('fs')
const { request } = require('http')
const urlencodedparser = bodyParser.urlencoded({extended:true})

const app = express();
dotenv.config();
const port = process.env.PORT ||80

const blouse_module = require('./own_modules/blouse.js')
const suit_module = require('./own_modules/suit.js')
const bottomdesigns_module = require('./own_modules/bottomdesigns.js')
const kids_module = require('./own_modules/kids.js')
const kurti_module = require('./own_modules/kurti.js')
const lehnga_module = require('./own_modules/lehnga.js')
const neckdesign_module = require('./own_modules/neckdesigns.js')
const outer_module = require('./own_modules/outer.js')
const paplun_module = require('./own_modules/paplun.js')
const skirt_module = require('./own_modules/skirt.js')
const sleeves_module = require('./own_modules/sleeves.js')
const top_module = require('./own_modules/top.js')
const home_content = require('./own_modules/home')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret:'secret',
    // cookie:{maxAge:6000},
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static('static'));
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(compression())

const DB = process.env.DB_P
mongoose.connect(DB,{ useNewUrlParser: true, useUnifiedTopology: true })

const PPSchema = new mongoose.Schema({
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
const AdminSchema =  new mongoose.Schema({
    name:{type:String},
    username:{type:String},
    phone :{type:String},
    email :{type:String},
    password :{type:String},
    tokens :[{
        token:{type:String}
    }]
})
const HomepageSchmea = new mongoose.Schema({
    logo: {
        itemimg: { data: Buffer }
    },
    wedding: {
        itemimg: { data: Buffer }
    },
    traditional: {
        itemimg: { data: Buffer }
    },
    western: {
        itemimg: { data: Buffer }
    }
})
const Home = mongoose.model('homapage',HomepageSchmea)
const Admin = mongoose.model('admin',AdminSchema);
const Blouse = mongoose.model('blouse', PPSchema);
const Suit = mongoose.model('suit', PPSchema);
const Lehnga = mongoose.model('lehnga',PPSchema);
const Paplun = mongoose.model('paplun', PPSchema);
const Bottomdesigns = mongoose.model('bottomdesigns',PPSchema);
const Outer = mongoose.model('outer', PPSchema);
const Top = mongoose.model('top', PPSchema);
const Skirt = mongoose.model('skirt', PPSchema);
const Neckdesign = mongoose.model('neckdesign',PPSchema);
const Sleeves = mongoose.model('sleeves',PPSchema);
const Kurti = mongoose.model('kurti',PPSchema);
const Kids = mongoose.model('kid',PPSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })
const verification = function(req,res,next){
    if(req.cookies.jwt != null){
        next()
    }
    else{
        res.status(302).redirect('/admin/login')
    }
}
const genratelogin_token = function(req,res,next){
    if( req.cookies.jwt != null ){
        next()
    }
    else{
        Admin.findOne({name:'parwan'},function(err,result){
            let userId = {userId: result.id}
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(userId, jwtSecretKey);
            res.cookie('jwt',token,{httpOnly:true,expires:new Date(Date.now() + 18000000)});
            next()
        })
    }
}
const confirmpassword = function(req,res,next){
    Admin.findOne(function(err,adminresult){
        if(req.body.username == adminresult.username && req.body.email == adminresult.email && req.body.password == adminresult.password){
           next()
        }
        else{
            req.flash('message', 'Username or Password is incorrect Try again ');
            res.status(401).redirect('/admin/login');
        }
    })   
}
home_content.home_content(app, upload,fs, path,Home,verification)
blouse_module.trending_blouse(app, upload, Blouse, fs, path,flash,verification)
suit_module.trending_suit(app, upload, Suit, fs, path,verification)
lehnga_module.trending_lehnga(app, upload, Lehnga, fs, path,verification)
paplun_module.trending_paplun(app, upload, Paplun, fs, path,verification)
bottomdesigns_module.trending_bottomdesigns(app, upload, Bottomdesigns, fs, path,verification)
outer_module.trending_outer(app, upload, Outer, fs, path,verification)
top_module.trending_top(app, upload, Top, fs, path,verification)
skirt_module.trending_skirt(app, upload, Skirt, fs, path,verification) 
neckdesign_module.trending_neckdesign(app, upload, Neckdesign, fs, path,verification)
sleeves_module.trending_sleeves(app, upload, Sleeves, fs, path,verification)
kurti_module.trending_kurti(app, upload, Kurti, fs, path,verification)
kids_module.trending_kids(app, upload, Kids, fs, path,verification)

app.get('/', async function (req, res) {
    const kurtiresult =  await Kurti.findOne()
    const lehngaresult = await Lehnga.findOne()
    const neckdesignresult = await Neckdesign.findOne()
    const outerresult = await Outer.findOne()
    const paplunresult = await Paplun.findOne()
    const skirtresult = await Skirt.findOne()
    const sleevesresult = await Sleeves.findOne()
    const topresult = await Top.findOne()
    const kidsresult = await Kids.findOne()
    const bottomdesignsresult = await Bottomdesigns.findOne()
    const homeresult = await Home.findOne()
    const dataarray = [bottomdesignsresult, outerresult, topresult, skirtresult, sleevesresult, kurtiresult, neckdesignresult]
    res.render('main.ejs', { DataArray: dataarray, KidsTrending: kidsresult.trending, PaplunTrending: paplunresult.trending, LehngaTrending: lehngaresult.trending ,HomeResult:homeresult})
})
app.get('/Blouse',async function (req, res) {
    const Blouseresult = await Blouse.findOne()
    res.render('Blouse.ejs', { Trending: Blouseresult.trending, More: Blouseresult.more, Result: Blouseresult })
})
app.get('/Suit', async function (req, res) {
    const Suitresult = await Suit.findOne()
    res.render('Suit.ejs', { Trending: Suitresult.trending, More: Suitresult.more, Result: Suitresult })
})
app.get('/Traditional',async function (req, res) {
    const Blouseresult = await Blouse.findOne() 
    const Kurtiresult =  await Kurti.findOne()
    const Lehngaresult = await Lehnga.findOne()
    const Neckdesignresult = await Neckdesign.findOne()
    const Paplunresult = await Paplun.findOne()
    const Sleevesresult = await Sleeves.findOne()
    const Suitresult = await Suit.findOne()
    const Bottomdesignsresult = await Bottomdesigns.findOne()
    const Outerresult = await Outer.findOne()
    res.render("Traditional.ejs", {LehngaMore: Lehngaresult.more,SuitMore: Suitresult.more,PaplunMore:Paplunresult.more,BottomdesignsMore: Bottomdesignsresult.more, NeckdesignsMore: Neckdesignresult.more,SleevesMore: Sleevesresult.more,KurtisMore: Kurtiresult.more,BlouseMore: Blouseresult.more,OuterMore: Outerresult.more})
})
app.get('/Western',async function (req, res) {
    const Outerresult = await Outer.findOne()
    const Topresult = await Top.findOne()
    const Skirtresult = await Skirt.findOne()
    const Bottomdesignsresult = await Bottomdesigns.findOne()
    res.render("Western.ejs", { BottomdesignsMore: Bottomdesignsresult.more, OuterMore: Outerresult.more, TopMore: Topresult.more, SkirtMore:Skirtresult.more })
})
app.get('/Lehnga', async function (req, res) {
    const Lehngaresult = await Lehnga.findOne()
    res.render("Lehnga.ejs", { Trending: Lehngaresult.trending, More: Lehngaresult.more, Result:Lehngaresult })
})
app.get('/Paplun',async function (req, res) {
    const Paplunresult = await Paplun.findOne()
    res.render("Paplun.ejs", { Trending: Paplunresult.trending, More:Paplunresult.more, Result:Paplunresult })
})
app.get('/Bottomdesigns', async function (req, res) {
    const Bottomdesignsresult = await Bottomdesigns.findOne()
    res.render("Bottom-design.ejs", { Trending: Bottomdesignsresult.trending, More: Bottomdesignsresult.more, Result: Bottomdesignsresult })
})
app.get('/Outer', async function (req, res) {
    const Outerresult = await Outer.findOne()
    res.render("Outer.ejs", { Trending: Outerresult.trending, More: Outerresult.more, Result: Outerresult })
})
app.get('/Top',async function (req, res) {
    const Topresult = await Top.findOne()
    res.render("Top.ejs", { Trending: Topresult.trending, More: Topresult.more, Result:Topresult })
})
app.get('/Skirt',async function (req, res) {
    const Skirtresult = await Skirt.findOne()
    res.render("Skirt.ejs", { Trending: Skirtresult.trending, More: Skirtresult.more, Result: Skirtresult })
})
app.get('/Neckdesign',async function (req, res) {
    const Neckdesignresult = await Neckdesign.findOne()
    res.render("Neck-designs.ejs", { Trending: Neckdesignresult.trending, More: Neckdesignresult.more, Result: Neckdesignresult }) 
})
app.get('/Sleeves',async  function (req, res) {
    const Sleevesresult = await Sleeves.findOne()
    res.render("Sleeves.ejs", { Trending:Sleevesresult.trending, More: Sleevesresult.more, Result: Sleevesresult })
})
app.get('/Kurti',async function (req, res) {
    const Kurtiresult =  await Kurti.findOne()
    res.render("Kurtis.ejs", { Trending: Kurtiresult.trending, More: Kurtiresult.more, Result: Kurtiresult })
})
app.get('/Kids', async function (req, res) {
    const Kidsresult = await Kids.findOne()
    res.render("Kids.ejs", { Trending: Kidsresult.trending, More: Kidsresult.more, Result: Kidsresult })
})
app.get('/admin/login',function (req, res) {
    res.render('loginform.ejs',{message:req.flash('message')})
})
app.post('/admin/login',confirmpassword,genratelogin_token,function(req,res){
    res.status(301).redirect('.')
})
app.get('/admin/recovery',function(req,res){
    res.status(404).send()
})
app.get('/admin',verification,async function(req,res){
    const Blouseresult = await Blouse.findOne() 
    const Kurtisresult =  await Kurti.findOne()
    const Lehngaresult = await Lehnga.findOne()
    const Neckdesignsresult = await Neckdesign.findOne()
    const Outerresult = await Outer.findOne()
    const Paplunresult = await Paplun.findOne()
    const Skirtresult = await Skirt.findOne()
    const Sleevesresult = await Sleeves.findOne()
    const Suitresult = await Suit.findOne()
    const Topresult = await Top.findOne()
    const Kidsresult = await Kids.findOne()
    const Bottomdesignsresult = await Bottomdesigns.findOne()
    res.render("Admin.ejs",{
        BlouseResult: Blouseresult, BlouseTrending: Blouseresult.trending, BlouseMore:Blouseresult.more, BlouseSlides:Blouseresult.slides,
        BottomdesignsTrending: Bottomdesignsresult.trending, BottomdesignsMore: Bottomdesignsresult.more, BottomdesignsResult: Bottomdesignsresult, BottomdesignsSlides: Bottomdesignsresult.slides,
        KurtisTrending: Kurtisresult.trending, KurtisMore: Kurtisresult.more, KurtisResult: Kurtisresult, KurtisSlides: Kurtisresult.slides,
        LehngaTrending: Lehngaresult.trending, LehngaMore: Lehngaresult.more, LehngaResult: Lehngaresult, LehngaSlides: Lehngaresult.slides,
        NeckdesignsTrending: Neckdesignsresult.trending, NeckdesignsMore: Neckdesignsresult.more, NeckdesignsSlides: Neckdesignsresult.slides, NeckdesignsResult: Neckdesignsresult,
        OuterTrending: Outerresult.trendin, OuterMore: Outerresult.more, OuterResult: Outerresult, OuterSlides: Outerresult.slides,
        PaplunTrending: Paplunresult.trending, PaplunMore: Paplunresult.more, PaplunResult: Paplunresult, PaplunSlides: Paplunresult.slides,
        SkirtTrending: Skirtresult.trending, SkirtMore: Skirtresult.more, SkirtResult: Skirtresult, SkirtSlides: Skirtresult.slides,
        SleevesTrending: Sleevesresult.trending, SleevesMore: Sleevesresult.more, SleevesResult: Sleevesresult, SleevesSlides: Sleevesresult.slides,
        SuitTrending: Suitresult.trending, SuitMore: Suitresult.more, SuitResult: Suitresult, SuitSlides: Suitresult.slides,
        TopTrending: Topresult.trending, TopMore: Topresult.more, TopResult: Topresult, TopSlides: Topresult.slides,
        KidsTrending: Kidsresult.trending, KidsMore: Kidsresult.more, KidsResult: Kidsresult, KidsSlides: Kidsresult.slides,notdeleted:req.flash("notdeleted")} )
})
app.get('/MoreDesigns/:name',async function (req, res) {
    const catagorie_name = ["blouseone", "suitone", "Lehnga", "Paplun", "Bottomdesigns", "Outer", "Top", "Skirt", "Neckdesigns", "Sleeves", "Kurti", "Kids"]
    const request_name = req.params.name 
    let key;
    for (let index = 0; index < catagorie_name.length; index++) {
        if (catagorie_name[index] == req.params.name) {
            key = index
        }
    }
    switch (key) {
        case 0:
            const Blouseresult = await Blouse.findOne() 
            res.render('View_more.ejs', { More: Blouseresult.more, Result: Blouseresult })
            break;
        case 1:
            const Suitresult = await Suit.findOne()
            res.render('View_more.ejs', { More: Suitresult.more, Result: Suitresult })
            break;
        case 2:
            const Lehngaresult = await Lehnga.findOne()
            res.render("View_more.ejs", { More: Lehngaresult.more, Result: Lehngaresult })
            break;
        case 3:
            const Paplunresult = await Paplun.findOne()
            res.render("View_more.ejs", { More: Paplunresult.more, Result:Paplunresult })
            break;
        case 4:
            const Bottomdesignsresult = await Bottomdesigns.findOne()
            res.render("View_more.ejs", { More: Bottomdesignsresult.more, Result: Bottomdesignsresult })
            break;
        case 5:
            const Outerresult = await Outer.findOne()
            res.render("View_more.ejs", { More: Outerresult.more, Result: Outerresult })
            break;
        case 6:
            const Topresult = await Top.findOne()
            res.render("View_more.ejs", { More: Topresult.more, Result: Topresult })
            break;
        case 7:
            const Skirtresult = await Skirt.findOne()
            res.render("View_more.ejs", { More: Skirtresult.more, Result: Skirtresult })
            break;
        case 8:
            const Neckdesignresult = await Neckdesign.findOne()
            res.render("View_more.ejs", { More: Neckdesignresult.more, Result: Neckdesignresult })
            break;
        case 9:
            const Sleevesresult = await Sleeves.findOne()
            res.render("View_more.ejs", { More: Sleevesresult.more, Result: Sleevesresult })
            break;
        case 10:
            const Kurtisresult =  await Kurti.findOne()
            res.render("View_more.ejs", { More: Kurtiresult.more, Result: Kurtiresult })
            break;
        case 11:
            const Kidsresult = await Kids.findOne()
            res.render("View_more.ejs", { More: Kidsresult.more, Result: Kidsresult })
            break;
        default:
            res.status(404).send()
            break;
    }
})
app.get('/admin/upload',verification,function(req,res){
    res.render('newform.ejs',{submited:req.flash('submited'),canceled:req.flash("canceled")})
})
app.listen(port)
