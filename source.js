const http = require('http');
const fs = require('fs');
const port = 8080;
const path = process.env.MEDIA_PATH || '/media';

const requestHandler = (request, response) => {
  console.log(request.url);
  fs.readdir(path, (err, items) => {
    var msg = {
      'kind': 'ItemList',
      'apiVersion': 'v1',
      'items': []
    };
    if (err || !items) {
      response.end(JSON.stringify(msg));
      return;
    }
    for (var i = 0; i < items.length; i++) {
      if (items[i].endsWith('.mp4')) {
        msg.items.push(items[i]);
      }
    }
    response.end(JSON.stringify(msg));
  });
}

const server = http.createServer(requestHandler);
server.listen(port, (err) => {
  if (err) {
    return console.log('Ошибка запуска сервера', err);
  }
  console.log(`сервер запущен на порте ${port}`);
});
