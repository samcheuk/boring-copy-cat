chrome.browserAction.onClicked.addListener(
  function(tab) { 
    chrome.tabs.executeScript(null, {
      file: "get_page_source.js"
    });
  }
);

function makeCopy(copyValue) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = copyValue;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
  
  console.log("BoringCopyCat: " + copyValue);
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    // console.log(request.source);
    var htmlcode = request.source;
    
    // get option value
    chrome.storage.sync.get({
      scbccRegexString: '',
      scbccRegexFrom: '',
      scbccRegexTo: '',
    }, function(items) {
      var res = htmlcode.match(items.scbccRegexString);
      // get first result
      res = res[0];
      var copyValue = res.slice(items.scbccRegexFrom, res.length - items.scbccRegexTo);
      makeCopy(copyValue);
    });
  }
});
