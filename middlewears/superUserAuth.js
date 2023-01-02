require('dotenv').config();
const superUserAuth = async (req, res, next) => {
    if (process.env.TOKEN_AUTH === 'enabled') {

        try {
            if (req.user.isAdmin) {
                console.log(`WELCOME ${req.user.email}: MR SUPER USER`);
                next()
            } else {
                res.status(401).send({
                    error: 'Sorry You Are Not Super-User',
                })
            }
        } catch (e) {
            res.status(401).send({
                error: 'Auth token is not provided',
            })
        }
    }
    else{
        next();
    }
}

module.exports = superUserAuth