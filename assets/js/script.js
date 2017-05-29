document.addEventListener('DOMContentLoaded', function () {

    /* Portfolio Section */
    var index = 0;
    var len = Object.keys(data).length;
    var right = document.getElementById('right');
    var left = document.getElementById('leftish');

    right.onclick = function() {
        if (index < len-1) {
            index = index + 1;
        } else {
            index = 0;
        }
        insert();
    }

    left.onclick = function() {
        if (index === 0) {
            index = len-1;
        } else {
            index = index - 1;
        }
        insert();
    }
    var port = document.getElementById('portfolioBox');
    function insert() {
        // title;
        var title = document.getElementById('title');
        title.innerHTML = data[index].title;

        
        port.style.backgroundImage = "url("+data[index].picture+")";

        // desc;
        var desc = document.getElementById('desc');
        desc.innerHTML = data[index].description;

        // tags;
        var bottom = document.getElementById('bottomBox');
        bottom.innerHTML = '';
        var ele = data[index].lang.split(',');
        for (var i = 0; i < ele.length; ++i) {
            var span = document.createElement('span');
            $.addClass(span, 'tag');
            var tagText = document.createTextNode(ele[i]);
            span.appendChild(tagText);
            bottom.appendChild(span);
        }

        // link
        if (data[index].link !== '') {
            var a = document.createElement('a');
            $.addClass(a, 'link');
            var aText = document.createTextNode("View Site");
            a.href = data[index].link;
            a.setAttribute('target', '_blank');
            a.appendChild(aText);
            bottom.appendChild(a);
        }
        if (data[index].github !== '') {
            var a = document.createElement('a');
            $.addClass(a, 'link');
            var aText = document.createTextNode("Github");
            a.href = data[index].github;
            a.setAttribute('target', '_blank');
            a.appendChild(aText);
            bottom.appendChild(a);
        }

    }
      /* End of Portfolio Section */

  /* Messaging System */
  // get input from input field
  var input = document.getElementById('input')
  input.addEventListener('onkeyup', (evt) => {
    return evt
  }, false)

  input.onkeyup = function (event) {
    if (event.keyCode === 13) {
      var parent = document.getElementById('messages')
      var div = document.createElement('div')
      $.addClass(div, 'yourMessage')
      sendSMS(input.value)
      var text = document.createTextNode(input.value)
      input.value = ''
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
      messageBox[0].style.transition = 'height 0.3s'
      messageBox[0].style.height = '425px';
      contact.innerHTML = 'close'
    } else {
      messageBox[0].style.transition = 'opacity, height 0.3s'
      messageBox[0].style.opacity = 0
      messageBox[0].style.height = '0px';
      contact.innerHTML = 'contact'
    }
  }

  var exit = document.getElementById('exit')
  exit.onclick = function () {
    messageBox[0].style.transition = 'opacity, height 0.3s'
    messageBox[0].style.opacity = 0
    messageBox[0].style.height = '0px';
    contact.innerHTML = 'contact'
  }
  /* End Of Messaging System */

  /* About Me  */
  var aboutButton = document.getElementById('aboutButton')
  var about = document.getElementById('about');
  aboutButton.onclick = function () {
    about.style.transition = 'opacity 1s'
    about.style.opacity = '1'
    about.style.display = 'block';
    port.style.opacity = '0';
    port.style.display = 'none';
  }
var projects = document.getElementById('projects');
  projects.onclick = function() {
    port.style.transition = 'opacity 1s'
    port.style.opacity = '1'
    port.style.display = 'block';
    about.style.opacity = '0';
    about.style.display = 'none';
  }



}, false);


const $ = {
  addClass: function (element, className) {
    element.className += ' ' + className
  }
}

function sendSMS (message) {
  var messageOverlay = document.getElementById('messageBoxOverlay')
  messageOverlay.style.opacity = 0.6
  messageOverlay.style.transition = 'width 1s'
  messageOverlay.style.width = '300px'
  var SID = keys.SID
  var Key = keys.Key + 'DEV'
  jQuery.ajax({
    type: 'POST',
    url: 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json',
    data: {
      'To': keys.To,
      'From': keys.From,
      'Body': message
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(SID + ':' + Key))
    },
    success: function (data) {
      var parent = document.getElementById('messages')
      var dateField = document.createElement('small')
      $.addClass(dateField, 'dateMessage')
      var date = new Date().toLocaleString()
      let newText = document.createTextNode('Sent at ' + date)
      dateField.appendChild(newText)
      parent.appendChild(dateField)

      var div = document.createElement('div')
      $.addClass(div, 'defaultMessage')
      var thankYou = document.createTextNode("Thanks! I'll try to get back to you as soon as possible")
      div.appendChild(thankYou)
      parent.appendChild(div)
      parent.scrollTop = parent.scrollHeight
      messageOverlay.style.opacity = 0
      messageOverlay.style.width = '0px'
    },
    error: function (data) {
      var parent = document.getElementById('messages')
      var dateField = document.createElement('small')
      $.addClass(dateField, 'dateMessageError')
      let newText = document.createTextNode('Error Sending Message.')
      dateField.appendChild(newText)
      parent.appendChild(dateField)

      var div = document.createElement('div')
      $.addClass(div, 'defaultMessage')
      var thankYou = document.createTextNode("Hmmm, it looks like it didn't get sent through. You can reach me at weatherfordmat@gmail.com")
      div.appendChild(thankYou)
      parent.appendChild(div)
      parent.scrollTop = parent.scrollHeight
      messageOverlay.style.opacity = 0
      messageOverlay.style.width = '0px'
    }
  })
}
