//initialize database 
var config = {
    apiKey: "AIzaSyAaRjNvhIZoBo4_7h0FClWxZw14_oUQExo",
    authDomain: "clumsy-shipping.firebaseapp.com",
    databaseURL: "https://clumsy-shipping.firebaseio.com",
    projectId: "clumsy-shipping",
    storageBucket: "clumsy-shipping.appspot.com",
    messagingSenderId: "836657363401"
  };
  firebase.initializeApp(config);

//rename databae for easier coding
  var database = firebase.database();


$("#add-post").on("click", function(event) {
    event.preventDefault();

//creates object for added train in database
    var posts = {
      name: name,
      position: position,
      date: date,
      text: text,
      email: email,
      phone: phone
    };
//pushed all new data to firebase database
    database.ref().push(posts); 

//clear out entry boxes
  $("#name-input").val("");
  $("#position-input").val("");
  $("#email-input").val("");
  $("#comment-input").val("");
});

//snapshot of information send to database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var name = childSnapshot.val().name;
  var position = childSnapshot.val().position;
  var date = childSnapshot.val().date;
  var text = childSnapshot.val().text;
  var email = childSnapshot.val().email;
  var phone = childSnapshot.val().phone;

//appends new row with information for train
  $("#employee-table > tbody").append("<tr><td>" + name + "</td><td>" + position + "</td><td>" +
  date + "</td><td>" + text + "</td><td>" + email + "</td></tr>" + phone + "</td></tr>");

});
