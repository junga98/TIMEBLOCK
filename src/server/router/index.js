module.exports = function (app) {

  app.get('/', function (req, res) {
    res.redirect('/');
  });

  // 首页
  app.use('/api/getDayBlocks', require('./getDayBlocks.js')); // 获取当天blocks、获取指定日期blocks
  app.use('/api/getWeekBlocks', require('./getWeekBlocks.js')); // 获取当周blocks
  app.use('/api/getMonthBlocks', require('./getMonthBlocks.js')); // 获取当月blocks
  app.use('/api/addBlocks', require('./addBlocks.js')); // 当天新增blocks

  // 预设页面
  app.use('/api/getPresets', require('./getPresets.js')); // 获取所有预设
  app.use('/api/addPresets', require('./addPresets.js')); // 新增预设
  app.use('/api/delPresets', require('./delPresets.js')); // 删除某项预设

  // 目标页
  app.use('/api/addProgress', require('./addProgress.js')); // 新增目标
  app.use('/api/getProgress', require('./getProgress.js')); // 获取所有目标
  app.use('/api/delProgress', require('./delProgress.js')); // 删除某一目标

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    console.log(err)
    res.send(err.message)
  })
};