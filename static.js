
$(document).ready(function() {
    $("#search").on("click",function(event){
        event.preventDefault();
        var searchTerm = $("#searchTerm").val();
        var url1 = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+"list%20of%20tourist%20attractions%20in"+" "+searchTerm+"&format=json&callback=?";
        $.ajax({
            url: url1,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(data, status, jqXHR) {
                console.log(data);
                $("#searchLocation").html();                           
                $("#newSearchText").prepend(data[1][0]+data[2][0]+data[3][0]);
                $("#searchInformationHere").html();
                $(".wikiLink").attr("href", data[3][0]);
                
            }
        });
        var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(searchTerm);
        $.getJSON(URL, function(data){
            if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            else
            console.log('No hits');
            console.log(data);
            $("#cSlide1").attr("src", data.hits[0].webformatURL)
            $("#cSlide2").attr("src", data.hits[1].webformatURL)
            $("#cSlide3").attr("src", data.hits[2].webformatURL)
        });
    });
});

function pageload1(){
    var search = "Paris";
    var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(search);
        $.getJSON(URL, function(data){
            if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            else
            console.log('No hits');
            console.log(data);
            $("#ParisPic").attr("src", data.hits[0].previewURL)
            
        });
}
function pageload2(){
    var search = "Mumbai";
    var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(search);
        $.getJSON(URL, function(data){
            if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            else
            console.log('No hits');
            console.log(data);
            $("#MumbaiPic").attr("src", data.hits[0].previewURL)
            
        });
}

function pageload3(){
    var search = "Dubai";
    var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(search);
        $.getJSON(URL, function(data){
            if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            else
            console.log('No hits');
            console.log(data);
            $("#DubaiPic").attr("src", data.hits[0].previewURL)
            
        });
}

function pageload4(){
    var search = "Denmark";
    var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(search);
        $.getJSON(URL, function(data){
            if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            else
            console.log('No hits');
            console.log(data);
            $("#DenmarkPic").attr("src", data.hits[0].previewURL)
            
        });
}
function pageload5(){
    var search = "Bangalore";
    var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(search);
        $.getJSON(URL, function(data){
            if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            else
            console.log('No hits');
            console.log(data);
            $("#BangalorePic").attr("src", data.hits[1].previewURL)
            
        });
}

function pageload6(){
    var search = "Amsterdam";
    var API_KEY = '9020108-050b7e5675dcdeec71c928ead';
        var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(search);
        $.getJSON(URL, function(data){
            if (parseInt(data.totalHits) > 0)
            $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
            else
            console.log('No hits');
            console.log(data);
            $("#AmsterdamPic").attr("src", data.hits[0].previewURL)
            
        });
}

pageload1();
pageload2();
pageload3();
pageload4();
pageload5();
pageload6();



// Initialize Firebase
var config = {
    apiKey: "AIzaSyBKDO_BGRk1EVjsvzPt_89-ZLTRkYlMvwM",
    authDomain: "groupproject-417be.firebaseapp.com",
    databaseURL: "https://groupproject-417be.firebaseio.com",
    projectId: "groupproject-417be",
    storageBucket: "groupproject-417be.appspot.com",
    messagingSenderId: "66042039765"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
  var recentSearch = "";

  // Capture Button Click
  $("#search").on("click", function(event) {
    event.preventDefault();
    //console.log("buttonclicked")
    recentSearch = $("#searchTerm").val().trim();

        dataRef.ref().push({
            recentSearch: recentSearch,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });
    });

dataRef.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().recentSearch);
    // Add each search's data into the table
  $("#searchTable > tbody").prepend("<tr><td>" + childSnapshot.val().recentSearch); 

// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    $("#searchTable > tbody").html("");
  });
