// GETs data from server upon page load, adds usernames + messages data history to display
$.get("http://tiy-orl-proxy.herokuapp.com/messages")
 .then(function (response) {
   var messages = response.messages
   messages.forEach(addToDisplay)
 })

 function addToDisplay (message) {
   var $p = $("<p>")
   $p.append(`${message.username}: ${message.text}`)
   $("div").append($p)
 }

// Form submits username and message to server, then function is run to add new data to display
$("form").submit(function(event){
  event.preventDefault()
  var theName = $('#username').val()
  var theText= $('#message').val()
  $.post("http://tiy-orl-proxy.herokuapp.com/messages",
  {message: { username: theName, text: theText }})
   .then(response => {
     $('#message').val('')
     addToDisplay2(response)
   })
 })

 function addToDisplay2 (message) {
   var $p = $("<p>")
   $p.append(`${message.message.username}: ${message.message.text}`)
   $("div").append($p)
 }


// Saves username to username input field
$("#username").val(getUsername("username"));

function saveUsername(event){
  var id = event.id;
  var val = event.value;
  localStorage.setItem(id, val);
}

function getUsername (v) {
  if (localStorage.getItem(v) === null){
    return "";
  }
  return localStorage.getItem(v);
}



// Does an automatic new pull of server data and repopulates display with all data, including new messages, every 10 seconds
var refresh = setInterval(getNewMessage, 10000)

function getNewMessage () {
  $('div').text("")
  $.get("http://tiy-orl-proxy.herokuapp.com/messages")
   .then(function (response) {
     var messages = response.messages
     var scrollBot = document.getElementById("display");
     var isScrolledToBottom = scrollBot.scrollHeight - scrollBot.clientHeight <= scrollBot.scrollTop + 1;
     messages.forEach(addToDisplay)
     if(isScrolledToBottom)
         scrollBot.scrollTop = scrollBot.scrollHeight - scrollBot.clientHeight;
   })
}
