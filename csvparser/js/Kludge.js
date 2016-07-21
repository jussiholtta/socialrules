//KLUDGE WITH NO TESTS
fetchAndConvertDataFromGSheets = function() {
  var url = document.getElementById("urlinput").value;
  var parser = new csvp.Parser();
  var data = parser.fetchData(url);
  var cards = parser.createCards(data);
  var all = parser.printAll(cards);

  //display
  document.getElementById("output").innerHTML = all;
  //download as file
  var a = document.createElement("a");
  var file = new Blob([all], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = "cards.csv";
  a.click();
}

