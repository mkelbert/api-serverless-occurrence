// const fn = require('./handler/user')

// fn.new(null, null, (err, res) => {
//     console.log(err, res)
// })

const User = require('./Class/User');
// require('./Class/User');
let user = new User('teste', 'kelvin@', 'kelvin', '100110')
console.log(user.toString())
user.email = 'teste';
console.log(user.toString())