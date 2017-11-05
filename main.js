// Google Analytics
var _gaq = _gaq || []
_gaq.push(['_setAccount', 'UA-93987323-1']);

(function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true
  ga.src = 'https://ssl.google-analytics.com/ga.js'
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s)
})()
// End Google Analytics

function makeCopy () {
  var copyValue = this
  var copyFrom = document.createElement('textarea')
  copyFrom.textContent = copyValue
  var body = document.getElementsByTagName('body')[0]
  body.appendChild(copyFrom)
  copyFrom.select()
  document.execCommand('copy')
  body.removeChild(copyFrom)

  console.log('BoringCopyCat: ' + copyValue)
}

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action === 'getSource') {
    var htmlcode = request.source

    chrome.storage.sync.get({
      scbccRegexDict: []
    }, function (items) {
      var html = ''
      var values = []
      for (var i = 0; i < items.scbccRegexDict.length; i++) {
        var value = htmlcode.match(items.scbccRegexDict[i].value)[0]
        values.push(value)
        var inputFieldId = 'field' + i
        var buttonId = 'b' + i
        html += '<input id=' + inputFieldId + ' type="text" value="' + value + '"/>'
        html += '<button id=' + buttonId + " class='btn add-more' type='button'>COPY</button>"
      }
      document.getElementById('copy_text_area').innerHTML = html

      for (var j = 0; j < values.length; j++) {
        document.getElementById('b' + j).addEventListener('click', makeCopy.bind(values[j]))
      }
    })
  }
})

window.onload = function () {
  _gaq.push(['_trackEvent', 'cat_icon', 'clicked'])
  chrome.tabs.executeScript(null, {
    file: 'get_page_source.js'
  })
//   chrome.browserAction.onClicked.addListener(
//     function (tab) {
//       _gaq.push(['_trackEvent', 'cat_icon', 'clicked'])
//       chrome.tabs.executeScript(null, {
//         file: 'get_page_source.js'
//       })
//     }
//   )
}
