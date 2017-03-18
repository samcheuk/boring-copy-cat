chrome.browserAction.onClicked.addListener(
  function(tab) { 
    chrome.tabs.executeScript(null, {
      file: "get_page_source.js"
    });
  }
);

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    // console.log(request.source);
    var htmlcode = request.source;
    var res = htmlcode.match(/dd/g);
    var x = res[0];
    var copyvalue = x.slice(3, x.length - 4);
    
    // make a copy
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = copyvalue;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    body.removeChild(copyFrom);
  }
});
