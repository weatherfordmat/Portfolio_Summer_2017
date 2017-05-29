document.addEventListener('DOMContentLoaded', function () {
  // get input from input field
  var input = document.getElementById('input')

  input.addEventListener('onkeyup', (evt) => {
    return evt
  }, false)

  input.onkeyup = function (event) {
    if (event.keyCode === 13) {
      var parent = document.getElementById('messages')
      var div = document.createElement('div')
      $.addClass(div, 'yourMessage');
      sendSMS(input.value)
      var text = document.createTextNode(input.value)
      div.appendChild(text)
      parent.appendChild(div)
      parent.scrollTop = parent.scrollHeight
    }
  }

  var contact = document.getElementById('contact')
  var messageBox = document.getElementsByClassName('messageBox')
  contact.onclick = function () {
    var innerT = contact.innerHTML.trim()
    if (innerT === 'contact') {
      messageBox[0].style.opacity = 1
      contact.innerHTML = 'close'
    } else {
      messageBox[0].style.opacity = 0
      contact.innerHTML = 'contact'
    }
  }
}, false)

const $ = {
  addClass: function (element, className) {
    element.className += ' ' + className
  }
}

function sendSMS (message) {
  var SID = keys.SID;
  var Key = keys.Key;
  jQuery.ajax({
    type: 'POST',
    url: 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json',
    data: {
      'To': '+12817430153',
      'From': '+15123577523 ',
      'Body': message
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(SID + ':' + Key))
    },
    success: function (data) {
        console.log(data);
        var parent = document.getElementById('messages');
        var dateField = document.createElement('small');
        $.addClass(dateField, 'dateMessage')
        var date = new Date().toLocaleString();
        let newText = document.createTextNode('Sent at ' +date);
        dateField.appendChild(newText);
        parent.appendChild(dateField);

        var div = document.createElement('div');
        $.addClass(div, 'defaultMessage')
        var thankYou = document.createTextNode('Thanks! I\'ll try to get back to you as soon as possible');
        div.appendChild(thankYou);
        parent.appendChild(div);

    },
    error: function (data) {
      console.log(data)
    }
  })
}
