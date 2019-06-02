var mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/TIMEBLOCK';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function () {
    console.error('数据库连接成功:' + DB_URL);
});
mongoose.connection.on('error', function (err) {
    console.error('数据库连接异常: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.error('数据库连接断开' + DB_URL);
});

/*  Schema  */
const userdataSchema = new mongoose.Schema({
    account: String,
    password: String,
    blocks: Array,
    presets: Array,
    progresses: Array
})
/*  Model  */
var userdataModel = mongoose.model('userdata', userdataSchema)


module.exports = {
    userdataModel: userdataModel
}