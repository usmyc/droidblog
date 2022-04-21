const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // set header content type
  //   res.setHeader("Content-Type", "text/html");
  //   res.write("index.html");
  //   res.end();

  // path creating
  const num = _.random(0, 20);
  console.log(num);

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    case "/contact":
      path += "contact.html";
      res.statusCode = 200;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //send html file

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port number ");
});
