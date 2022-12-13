const fs = require("fs");
fs.readdir("D:\\项目仓库服务网站\\TSQ\\image",'utf-8', (err, data) => {
  fs.writeFile("./imageName.txt", JSON.stringify(data), (err, fd) => {
    if (err) {
      console.log(err);
    }
  });
});
