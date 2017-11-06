
// Saves options to chrome.storage
function save_options () {
  var saveDict = []
  var i = 1
  $('input').map(function () {
    var dict = {
      id: 'scbcc' + i,
      value: this.value
    }
    i++
    console.log('save: ', dict)
    ga('send', 'event', 'setting', 'save', this.value)
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
      var addto = '#remove' + next
      var addRemove = '#field' + (next + 1)
      next = next + 1
      var newIn = '<input autocomplete="off" placeholder="e.g. /this is test/g" id="field' + next + '" name="field' + next + '" type="text" tabindex="1" value=' + value + '>'
      var newInput = $(newIn)
      var removeBtn = '<button id="remove' + (next) + '" class="btn btn-danger remove-me" >-</button>'
      var removeButton = $(removeBtn)
      $(addto).after(newInput)
      if (i !== 0) {
        $(addRemove).after(removeButton)
      }
      $('#count').val(next)

      $('.remove-me').click(function (e) {
        e.preventDefault()
        ga('send', 'event', 'setting', 'remove_regex')
        var fieldNum = this.id.charAt(this.id.length - 1)
        var fieldID = '#field' + fieldNum
        $(this).remove()
        $(fieldID).remove()
        $('#style').attr('href', 'extra/styles.css')
      })
    }

    var next = items.scbccRegexDict.length || 1
    $('.add-more').click(function (e) {
      ga('send', 'event', 'setting', 'add_regex')
      e.preventDefault()
      var addto = '#remove' + next
      var addRemove = '#field' + (next + 1)
      next = next + 1
      var newIn = '<input autocomplete="off" placeholder="e.g. /this is test/g" id="field' + next + '" name="field' + next + '" type="text" tabindex="1">'
      var newInput = $(newIn)
      var removeBtn = '<button id="remove' + (next) + '" class="btn btn-danger remove-me" >-</button>'
      var removeButton = $(removeBtn)
      $(addto).after(newInput)
      $(addRemove).after(removeButton)
      $('#count').val(next)

      $('.remove-me').click(function (e) {
        e.preventDefault()
        ga('send', 'event', 'setting', 'remove_regex')
        var fieldNum = this.id.charAt(this.id.length - 1)
        var fieldID = '#field' + fieldNum
        $(this).remove()
        $(fieldID).remove()
        $('#style').attr('href', 'extra/styles.css')
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
