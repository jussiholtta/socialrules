var csvp = csvp || {}

csvp.Parser = function() {
}

csvp.Parser.prototype.readTextArea = function(s) {
  return s.split('\n');
}

csvp.Parser.prototype.parseLine = function(arr) {  
  var l = arr.pop();
  return l.split('|');
}

csvp.Parser.prototype.createCard = function(arr) {
  var card = {};
  card.text = arr[0];
  card.level = Number(arr[1]);
  card.gm1 = Number(arr[2]) > 0;
  card.gm2 = Number(arr[3]) > 0;
  card.gm3 = Number(arr[4]) > 0;
  card.amount = Number(arr[5]);
  
  return card;
}

