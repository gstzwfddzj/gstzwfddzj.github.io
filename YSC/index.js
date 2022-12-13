const fs = require("fs");
fs.readdir("./image",'utf-8', (err, data) => {
  fs.writeFile("./imageName.txt", JSON.stringify(data), (err, fd) => {
    if (err) {
      console.log(err);
    }
  });
});
