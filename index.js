var flip = require('flip-text')
  , http = require('http')

function contentLength(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g)
  return str.length + (m ? m.length : 0)
}

http.createServer(function (req, res) {
  if (req.method === 'GET') {
    var text = decodeURIComponent(req.url.substr(1))
    if (text === 'favicon.ico') {
      res.writeHead(404)
      res.end()
    } else {
      text = flip(text)
      res.writeHead(200, {
          'content-type': 'text/plain; charset=utf-8'
        , 'content-length': contentLength(text)
      })
      res.end(text)
    }
  } else {
    // TODO: handle POST?
    res.writeHead(400)
    res.end()
  }
}).listen(process.env.PORT || 33331)
