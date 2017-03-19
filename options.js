// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-93987323-1']);
_gaq.push(['_trackPageview', 'options.html']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
// End Google Analytics

// Saves options to chrome.storage
function save_options() {
  _gaq.push(['_trackEvent', 'option_save', 'clicked']);
  
  var regexString = document.getElementById('regexString').value;
  var regexFrom = document.getElementById('regexFrom').value;
  var regexTo = document.getElementById('regexTo').value;
  chrome.storage.sync.set({
    scbccRegexString: regexString,
    scbccRegexFrom: regexFrom,
    scbccRegexTo: regexTo
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    scbccRegexString: '',
    scbccRegexFrom: '',
    scbccRegexTo: '',
  }, function(items) {
    document.getElementById('regexString').value = items.scbccRegexString;
    document.getElementById('regexFrom').value = items.scbccRegexFrom;
    document.getElementById('regexTo').value = items.scbccRegexTo;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);