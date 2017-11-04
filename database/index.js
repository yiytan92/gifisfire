const Sequelize = require ('sequelize');
const sequelize = new Sequelize('database',null,null,{
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'gifDB.sql'
});

const Gif = sequelize.define('gif',{
  url: Sequelize.STRING,
  score: Sequelize.INTEGER,
  title: Sequelize.STRING,
  permalink: Sequelize.STRING,
  seen: Sequelize.BOOLEAN
});

const User = sequelize.define('user',{
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  userscore: Sequelize.INTEGER
});


Gif.sync();
User.sync();

exports.Gif = Gif;
exports.User = User;
