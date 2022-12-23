const superUserAuth = async (req, res, next) => {
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

module.exports = superUserAuth