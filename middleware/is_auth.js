/**
 * 
 */
module.exports = (req,res,next)=>{
    if(!req.session.isLoggedIn && !req.session.userinfo){
        res.clearCookie('connect.sid');
        return res.redirect('/Sumeru/login');
    }
    next();
};