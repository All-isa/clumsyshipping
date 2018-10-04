// Initialize Firebase
var config = {
    apiKey: "AIzaSyAaRjNvhIZoBo4_7h0FClWxZw14_oUQExo",
    authDomain: "clumsy-shipping.firebaseapp.com",
    databaseURL: "https://clumsy-shipping.firebaseio.com",
    projectId: "clumsy-shipping",
    storageBucket: "clumsy-shipping.appspot.com",
    messagingSenderId: "836657363401"
  };

    firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Initial Values
    var name = "";
    var email = "";
    var position = "";
    var text = "";

    // Capture Button Click
    $("#add-post").on("click", function(event) {
      event.preventDefault();

      name = $("#name-input").val().trim();
      email = $("#email-input").val().trim();
      position = $("#position-input").val().trim();
      comment = $("#comment-input").val().trim();

      dataRef.ref().push({
        
        name: name,
        email: email,
        position: position,
        comment: comment,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });

    // Firebase watcher + initial loader
    dataRef.ref().on("child_added", function(childSnapshot) {


    //   console.log(childSnapshot.val().name);
    //   console.log(childSnapshot.val().email);
    //   console.log(childSnapshot.val().position);
    //   console.log(childSnapshot.val().text);
    //   console.log(childSnapshot.val().joinDate);

      // full list of items to the well
      $("#full-list").append("<div class='well'><strong><span class='name'> " + childSnapshot.val().name +
        " </strong></span><span class='email'> | " + childSnapshot.val().email +
        " </span><span class='position'> |  " + childSnapshot.val().position +
        " </span><tr><span class='comment'> | " + childSnapshot.val().comment + " </span></tr></div><br>");

    // handling errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

      // Changes HTML
      $("#name-display").text(snapshot.val().name);
      $("#email-display").text(snapshot.val().email);
      $("#position-display").text(snapshot.val().age);
      $("#comment-display").text(snapshot.val().comment);
    });