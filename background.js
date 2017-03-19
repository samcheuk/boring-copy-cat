// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-93987323-1']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
// End Google Analytics


chrome.browserAction.onClicked.addListener(
  function(tab) { 
    _gaq.push(['_trackEvent', 'cat_icon', 'clicked']);
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
