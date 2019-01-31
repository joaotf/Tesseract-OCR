var Tesseract = require('tesseract.js')
var request = require('request')
var fs = require('fs')
var url = 'https://image.slidesharecdn.com/portugus2b-170225215804/95/texto-verbal-e-noverbal-13-638.jpg?cb=1488059893'
var filename = 'pic.png'

var writeFile = fs.createWriteStream(filename)

request(url).pipe(writeFile).on('close', function() {
  console.log(url, 'saved to', filename)
  Tesseract.recognize(filename)
    .progress(function  (p) { console.log('progress', p)  })
    .catch(err => console.error(err))
    .then(function (result) {
      console.log(result.text)
      process.exit(0)
    })
});