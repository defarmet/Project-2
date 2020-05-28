
function displayBookSearchInfo(book) {

 // var searchBook = $(this).attr("data-name");
  var queryURL = "https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key=0px3CVea4TPmJTT2exNRdQ&q=" + book;
  
 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
 console.log(response); 

var text, parser, xmlDoc;
parser = new DOMParser();
xmlDoc = parser.parseFromString(response,"application/xml");
console.log(xmlDoc);
 
//xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;

var parsedResponse = JSON.parse(xmlDoc);
console.log(parsedResponse);

  var bookTitle = $("<h1>").text(parsedResponse.title);
  var authorName =  $("<h2>").text(parsedResponse.author);
  var bookRating =  $("<h2>").text(parsedResponse.average_rating);
  var bookImage =  $("<img>").attr("src", parsedResponse.small_image_url);

  // Empty the contents of the artist-div, append the new artist content
  $("#search-results").empty();
  $("#search-results").append(bookTitle, authorName, bookRating, bookImage)

  });
}

//  .on("click") function associated with the Search button
$("#search-btn").on("click", function(event) {
  event.preventDefault();
  var inputTitle = $("#title-search").val().trim();
  var inputAuthor = $("#author-search").val().trim();
  displayBookSearchInfo(inputTitle);
  displayBookSearchInfo(inputAuthor);
});


//  .on("click") function associated with the clear button
function clear(){
  $("#title").empty(); 
  $("#author").empty(); 
  $("#rating").empty(); 
  $("#book-image").empty(); 
}
$("#clear-btn").on("click", clear);


