const suit_middleware = function(req,res,next){
    console.log('this is middleware')
    next()
}
module.exports = suit_middleware