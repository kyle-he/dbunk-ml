// Saves options to chrome.storage
function save_options() {
  var showbias = document.getElementById('show-bias').checked;
  var threshhold = document.getElementById('threshhold').value;
  var displayType = document.getElementById('display-type').value;

  //var unknownLimit = document.getElementById('unknown-limit').checked;
  chrome.storage.local.set({
    showbias: showbias,
    threshhold: threshhold,
    displayType: displayType,
    //unknownLimit: unknownLimit
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    showbias: true,
    threshhold: 0.6,
    displayType: "vertical",
  }, function (items) {
    document.getElementById('show-bias').checked = items.showbias;
    document.getElementById('threshhold').outerHTML = `<input type="text" id="threshhold" name= "threshhold" value="${items.threshhold}">`;
    document.getElementById(items.displayType).outerHTML= `<option selected="selected" id="${items.displayType}" value="${items.displayType}">${items.displayType}</option>`;
    //document.getElementById('unknown-limit').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
