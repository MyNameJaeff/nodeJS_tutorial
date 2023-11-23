const net = require("net"),
  fs = require("fs"),
  filename = process.argv[2],
  server = net.createServer((connection) => {
    console.log("Subscriber connected");
    connection.write(`watching ${filename} for changes`);

    let watcher = fs.watch(filename, (err, data) => {
      connection.write(`${filename} has changed`);
    });

    connection.on("close", () => {
      console.log("Subscriber disconnected");
      watcher.close();
    });
  });
server.listen(3000, () => console.log("listening for subscribers"));
