const bcrypt = require('bcryptjs')

module.exports = {
    hashPassword: (password) => {
        var salt = bcrypt.genSaltSync(+process.env.SALT)
        return bcrypt.hashSync(password, salt)
    },
    comparePassword: (inputPassword, password) => {
        return bcrypt.compareSync(inputPassword, password)
    }
}