const cluster = require("cluster");
const app = require("./app");

const models = require("./models/index");

// this should't be here but since i didnt figured out why this dont work inside a seed
// i will leave it here for now
models.Post.syncUpvotes();

if (cluster.isMaster) {
  const cpuCount = process.env.WORKERS || require("os").cpus().length;

  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
    cluster.on("exit", function () {
      console.log(new Date() + " Worker crashed");
      cluster.fork();
    });
  }
} else {
  const port = process.env.PORT || 3002;
  app.listen(port, () => console.log(`Server Spinning port ${port} - using ${process.env.NODE_ENV || "development"} environment - worker pid ${process.pid}`));
}
