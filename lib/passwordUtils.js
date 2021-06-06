const bcrypt = require('bcrypt')

module.exports.validatePassword = async (password, hashedpassword) => {
    return await bcrypt.compare(password, hashedpassword)
}

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}