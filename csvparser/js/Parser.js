var csvp = csvp || {}

csvp.Parser = function() {
}

csvp.Parser.prototype.fetchData = function(url) {
  xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var data = xmlhttp.responseText;
  return data.split('\n');
}

csvp.Parser.prototype.parseLine = function(arr) { 
  var l = arr.pop();
  if(l[0] === "#") {
    return "";
  }
  return l.split('\t');
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
      var guide = this.iconPrintGuide(c, i);
      out = out + c.text + ";level" + c.level + ";" + guide + "\n";
    }
    return out;
}

csvp.Parser.prototype.iconPrintGuide = function(c,i) {
  return this.addGM(c.gm1, 1, i) + ";" + this.addGM(c.gm2, 2, i) + ";" + this.addGM(c.gm3, 3, i);
}

csvp.Parser.prototype.addGM = function(gm, n, i) { 
  var out = "";
  if(gm > i) {
    out = "gamemode" + n; 
  } else {
    out = "transparent"
  }
  return out;
}


