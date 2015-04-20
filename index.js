var flip = require('flip-text')
  , http = require('http')
  , fs = require('fs')

function contentLength(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g)
  return str.length + (m ? m.length : 0)
}

http.createServer(function (req, res) {
  if (req.method === 'GET') {
    var text = decodeURIComponent(req.url.substr(1))
    switch (text) {
      case 'bundle.js':
        res.writeHead(200, {
            'content-type': 'text/javascript; charset=utf-8'
        })
        fs.createReadStream(__dirname + '/bundle.js').pipe(res)
        return
      case '':
        res.writeHead(200, {
            'content-type': 'text/html; charset=utf-8'
        })
        fs.createReadStream(__dirname + '/index.html').pipe(res)
        return
      default:
        text = flip(text)
        res.writeHead(200, {
            'content-type': 'text/plain; charset=utf-8'
          , 'content-length': contentLength(text)
        })
        res.end(text)
        return
    }
  } else {
    // TODO: handle POST?
    res.writeHead(400)
    res.end()
  }
}).listen(process.env.PORT || 33331)
