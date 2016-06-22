var csvp = csvp || {}

describe("csvp.Parser", function() {
    var parser = new csvp.Parser();
    var myFile = "#Modifier|Level|# in deck|Pair #|New Team #|Carnival # |Tested IRL\n\Blank|0|7|0|0|0|amount needs to scale with players to delay chaos, probably also need blanks on lower levels? current beta one subtle, 6 extreme\n\Ask the most quiet person to comment on the matter occasionally.|1|1||1|1|x\n\Stretch before speaking|1|1||1|1|x\n\Take a deep breath before answering|1|1|1|1|1|x\n\Take a deep breath after talking|1|1|1|1|1|x\n\Stare at someone else when replying to people|1|1|||1|x\n\Pick a person and mirror their posture and movements|1|1|1|1|1|\n\Keep your hands and legs crossed|1|1|1|1|1|\n\Keep your hands crossed|1|1|1|1|1|\n\Hold one hand in front of your mouth while others are speaking|1|1|||1|\n\Let someone else to start the discussion (WAS: Don't talk first)|1|1||1|1|(x)\n\Non-verbally agree with everything being said|1|1||1|1|\n\Start doing something else, but stay with the group.|1|1|1||1|x\n\Talk reaaaally sloowwwly|1|1|1||1|x\n\Wholeheartedly verbally agree with every 3rd comment|1|1||1|1|x\n\Stand up to talk|1|5|1|1|5|x (all as a 1, a bit extreme)\n\Keep your eyes closed while someone is talking|2|1|1||1|x\n\Start your responses with \"Yes, but...\"|2|1|1|||\n\Start your responses with \"Yes, and...\"|2|1|1|1|1|x\n\Always ask the people right next to you repeat what they say|2|1|||1|x (as 2 and 3, better as 2)\n\Apologize for not listening if someone tries to talk to you|2|1||1|1|x\n\Start a side discussion with someone else|2|2||1|2|x\n\Speak really fast|2|1|1|1|1|x\n\Thank each person who talks to you|2|1||1|1|x\n\Clap your hands together once before talking|2|1|1|1|1|\n\Stand up and sit down to talk|2|1|||1|x\n\Circle the group, but continue to participate|2|1|||1|x\n\Start a discussion in a different language|2|1||1|1|x\n\You can only talk if you interrupt someone|2|2|1|1|2|x\n\Leave the discussion, for example go get something to drink. Come back after 1 min and ask people to repeat what you missed.|3|1|1|1|1|x\n\Turn away from the group when you speak|3|1|1||1|x\n\Change your seat after talking|3|1||1|1|exists, but has never been played\n\Chaos Monkey - do whatever you can without harming people to disrupt the system|3|1|||1|x\n\Try to do the exact opposite of all the rules|3|1|1|1|1|x"
    beforeEach(function(){
      });

    afterEach(function() {
      });

    it("initializes", function() {
      expect(parser).not.toBeNull();
      });

    it("is able to read a textArea to an array of lines", function() {
      var arr = parser.readTextArea(myFile);
      expect(arr[1]).not.toBeNull();
      expect(arr.length).toEqual(35);
      expect(arr[1][0]).toEqual('B');
      }); 

    it("is able to read a line", function() {
      var arr = parser.readTextArea(myFile);
      var s = parser.parseLine(arr);
      expect(s[0]).toEqual("Try to do the exact opposite of all the rules");
      expect(s[5]).toEqual("1");
      });

    it("is able to create a card out of a line", function() {
        var arr = parser.readTextArea(myFile);
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
        var arr = parser.readTextArea(myFile);
        var cards = parser.createCards(arr);

        var arr2 = parser.readTextArea(myFile);
        var s = parser.parseLine(arr2);
        var card = new csvp.Card(s);
        expect(cards.length).toEqual(34);
        expect(cards[0]).toEqual(card);
        });


    it("is able to create print csv-files with a card", function() {
        var arr = parser.readTextArea(myFile);
        var cards = parser.createCards(arr);
        var csv = parser.createCSV(cards[18]);
        expect(csv).toEqual("Stand up to talk;1;7\nStand up to talk;1;1\nStand up to talk;1;1\nStand up to talk;1;1\nStand up to talk;1;1\n"); 
    });

    it("is able to produce a full CSV file of cards", function() {
        var arr = parser.readTextArea(myFile);
        var cards = parser.createCards(arr);
        var all = parser.printAll(cards);
alert(all);
    });   


});


