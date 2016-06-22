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
  this.gm1 = Number(arr[3]);
  this.gm2 = Number(arr[4]);
  this.gm3 = Number(arr[5]);
}

csvp.Parser.prototype.printAll = function(cards) {
  var out = "";
  while(cards.length > 0) {
    var c = cards.pop();
    out = out + this.createCSV(c);
  }
  return out;
}

csvp.Parser.prototype.createCSV = function(c) {
    var out = "";
    for(i=0;i<c.amount;i++) {
      var n = this.iconPrintGuide(c, i);
      out = out + c.text + ";" + c.level + ";" + n + "\n";
    }
    return out;
}

//logic stolen from chmod, gm1 = r, gm2 = w, gm3 = x
csvp.Parser.prototype.iconPrintGuide = function(c,i) {
  var n = 0;
  if(c.gm1 > i)
    n = n + 4;
  if(c.gm2 > i)
    n = n + 2;
  if(c.gm3 > i)
    n = n + 1;
  return n;
}
