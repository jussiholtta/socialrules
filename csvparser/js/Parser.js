var csvp = csvp || {}

csvp.Parser = function() {
}

csvp.Parser.prototype.readTextArea = function(s) {
  return s.split('\n');
}

csvp.Parser.prototype.parseLine = function(arr) { 
  var l = arr.pop();
  if(l[0] === "#") {
    return "";
  }
  return l.split('|');
}

csvp.Parser.prototype.createCards = function(arr) {
  var i;
  var cards = [];
  var length = arr.length;
  for(i=0;i<length;i++) {
    var l = this.parseLine(arr);
    if(l != "") {
      var c = new csvp.Card(l);
      cards.push(c);
    }
  }
  return cards;
}

csvp.Card = function(arr) {
  this.text = arr[0];
  this.level = Number(arr[1]);
  this.amount = Number(arr[2]);
  this.gm1 = Number(arr[3]) > 0;
  this.gm2 = Number(arr[4]) > 0;
  this.gm3 = Number(arr[5]) > 0;
}

