var cluster = require('cluster')
const app = require("./app")

if (cluster.isMaster) {
  var cpuCount = process.env.WORKERS || require('os').cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork()
    cluster.on('exit', function(worker, code, signal) {
      console.log(new Date()+' Worker crashed');
      cluster.fork();
    });
  }
} else {
  const port = process.env.PORT || 3002
  app.listen(port, () => console.log(`Server Spinning port ${port} - using ${process.env.NODE_ENV || "development"} environment - worker pid ${process.pid}`));
}

