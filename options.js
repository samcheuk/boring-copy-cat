// Google Analytics
var _gaq = _gaq || []
_gaq.push(['_setAccount', 'UA-93987323-1'])
_gaq.push(['_trackPageview', 'options.html']);

(function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true
  ga.src = 'https://ssl.google-analytics.com/ga.js'
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s)
})()
// End Google Analytics

// Saves options to chrome.storage
function save_options () {
  _gaq.push(['_trackEvent', 'option_save', 'clicked'])

  var saveDict = []
  $('input').map(function () {
    var dict = {
      id: 'scbcc' + this.id,
      value: this.value
    }
    saveDict.push(dict)
  }).get()
  chrome.storage.sync.set({
    scbccRegexDict: saveDict
  })
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options () {
  chrome.storage.sync.get({
    scbccRegexDict: []
  }, function (items) {
    $('#field1').attr('value', items.scbccRegexDict[0].value)
    for (var i = 0; i < items.scbccRegexDict.length; i++) {
      var value = items.scbccRegexDict[i].value
      var next = i
      var addto = '#field' + next
      var addRemove = '#field' + (next)
      next = next + 1
      var newIn = '<input autocomplete="off" placeholder="e.g. /this is test/g" id="field' + next + '" name="field' + next + '" type="text" tabindex="1" value=' + value + '>'
      var newInput = $(newIn)
      var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">'
      var removeButton = $(removeBtn)
      $(addto).after(newInput)
      $(addRemove).after(removeButton)
      $('#field' + next).attr('data-source', $(addto).attr('data-source'))
      $('#count').val(next)

      $('.remove-me').click(function (e) {
        e.preventDefault()
        var fieldNum = this.id.charAt(this.id.length - 1)
        var fieldID = '#field' + fieldNum
        $(this).remove()
        $(fieldID).remove()
      })
    }

    var next = items.scbccRegexDict.length || 1
    $('.add-more').click(function (e) {
      e.preventDefault()
      var addto = '#field' + next
      var addRemove = '#field' + (next)
      next = next + 1
      var newIn = '<input autocomplete="off" placeholder="e.g. /this is test/g" id="field' + next + '" name="field' + next + '" type="text" tabindex="1">'
      var newInput = $(newIn)
      var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">'
      var removeButton = $(removeBtn)
      $(addto).after(newInput)
      $(addRemove).after(removeButton)
      $('#field' + next).attr('data-source', $(addto).attr('data-source'))
      $('#count').val(next)

      $('.remove-me').click(function (e) {
        e.preventDefault()
        var fieldNum = this.id.charAt(this.id.length - 1)
        var fieldID = '#field' + fieldNum
        $(this).remove()
        $(fieldID).remove()
      })
    })
  })
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
