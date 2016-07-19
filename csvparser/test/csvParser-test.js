var csvp = csvp || {}

describe("csvp.Parser", function() {
    var url = "https://docs.google.com/spreadsheets/d/1vl97C3ZdUkbJSBA9zUGaADbzVm-b0GK9GX0YPopgvQ8/export?exportFormat=tsv&gid=1405862604";
    var parser = new csvp.Parser();
    var prefetch = parser.fetchData(url);

    beforeEach(function(){
      });

    afterEach(function() {
      });

    it("initializes", function() {
      expect(parser).not.toBeNull();
      });

    it("is able to get data csv from a file", function() {
      var data = prefetch.slice(0);
      expect(data.length).toEqual(35);
      expect(data[1][0]).toEqual('B');
      });

    it("is able to read a line", function() {
      var arr = prefetch.slice(0);
      var s = parser.parseLine(arr);
      expect(s[0]).toEqual("Try to do the exact opposite of all the rules");
      expect(s[5]).toEqual("1");
      });

    it("is able to create a card out of a line", function() {
        var arr = prefetch.slice(0);
        var i;
        for(i=1;i<7;i++) {
        var s = parser.parseLine(arr);
        }
        var card = new csvp.Card(s);
        expect(card.text).toEqual("You can only talk if you interrupt someone");
        expect(card.level).toEqual(2);
        expect(card.amount).toEqual(2);
        expect(card.gm1).toEqual(1);
        expect(card.gm2).toEqual(1);
        expect(card.gm3).toEqual(2);
        });

    it("is able to parse a whole file", function() {
        var arr = prefetch.slice(0);
        var cards = parser.createCards(arr);

        var arr2 = parser.fetchData(url);
        var s = parser.parseLine(arr2);
        var card = new csvp.Card(s);
        expect(cards.length).toEqual(34);
        expect(cards[0]).toEqual(card);
        });


    it("is able to create print csv-files with a card", function() {
        var arr = prefetch.slice(0);
        var cards = parser.createCards(arr);
        var csv = parser.createCSV(cards[18]);
        expect(csv).toEqual("Stand up to talk;level1;gamemode1;gamemode2;gamemode3\nStand up to talk;level1;transparent;transparent;gamemode3\nStand up to talk;level1;transparent;transparent;gamemode3\nStand up to talk;level1;transparent;transparent;gamemode3\nStand up to talk;level1;transparent;transparent;gamemode3\n");
        });

    //ffs, missed this, didn't fail fabulously enough
    it("doesn't choke on a line with comma or double quote", function() {
        var arr = prefetch.slice(0);
        var cards = parser.createCards(arr);
        var csv = parser.createCSV(cards[16]);
        expect(csv).toEqual("Start your responses with \"Yes, but...\";level2;gamemode1;transparent;transparent\n");
    });

    //not an actual test, just to manually get the CSV out for now
    it("is able to produce a full CSV file of cards", function() {
        var arr = prefetch.slice(0);
        var cards = parser.createCards(arr);
        var all = parser.printAll(cards);
        alert(all);
        });   


});


