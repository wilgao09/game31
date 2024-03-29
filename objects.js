/*
 * this project is on my github!
 * https://github.com/theffabot00
 * this is probably the only project im going to finish to date lol
 * 
 * the general format to this file is
 * 1: objects and preinitialize content
 * 2: functions that assist those objects
 * 3: functinos interacting with the above two to make the game work
 * 4: random utils
 * 
 * this is the first time ive encountered this kind of issue with js
 * probably because i threw everything outside of functinos this time
 * really makes you forget the language goes line by line 
 * so not everything is following the above order
 * some stuff will inevitably be below others
 * 
*/  

/*
 *
 *THIS IS THE START OF THE OBJECT FOUNDATION AND CREATION
 *
 */

//in order, players 0 , 1 , 2 , 3
function Card(soot, numbro) {
    this.suit = soot;
    this.val = numbro;
    this.img = "imgAsset/" + this.val + "-" + this.suit + ".png";
}

function Stack() {
}

Stack.prototype = Array.prototype;
Stack.prototype.shuffle = function() {
    var tDeck = new Stack();
    while(this.length) {
        var aCard = this.splice(drawRando(0,this.length - 1),1)[0];
        tDeck.push(aCard);
    }
    this.push.apply(this,tDeck);
}
Stack.prototype.getSum = function(toRet = 0) {
    var sumBySuit = [0, 0, 0, 0];
    //hmmm whats happening here??
    //maybe i just wanna flex my dumb ideas
    var vals = {};
    var max = -Infinity;
    for (var n = 0; n != this.length; n++) {
        var baseVal = this[n].val;
        if (vals[baseVal] == undefined ) {
            vals[baseVal] = 1;
        } else {
            vals[baseVal]++;
        }
        
        if (baseVal > 10) {
            baseVal = 10;
        } 
        if (baseVal == 1) {
            baseVal = 11;
        }
        
        sumBySuit[this[n].suit] += baseVal;
    }
    for (val in vals) {
        if (vals[val] >= 3) {
            max = 30;
        }
    }

    for (var n = 0; n != 4; n++) {
        if (sumBySuit[n] > max) {
            max = sumBySuit[n]
            // soit = n;
        }
    }
    var data = [max, sumBySuit, vals];
    return(data[toRet]);
}


/*
 *
 *THIS IS THE INITIALIZATION OF OBJECTS (stuff outside functions i dont plan on recalling so thats fine)
 *
 */

players = [new Stack(), new Stack(), new Stack(), new Stack()];
//bots have been moved
//to the other file

for (var n = 0; n != 4; n++) {
    players[n].strikes = 0;
    players[n].seat = n;
}


//im writing this in advance; unsure if this is necessary
function rebootBoard() {

    drawPile = new Stack();
    for (var v = 1; v != 14; v++) {
        for (var s = 0; s != 4; s++) {
            drawPile.push( new Card(s, v) );
        }
    }

    drawPile.shuffle();

    discoPile = new Stack();

    //clean out hands

    for (var aUser = 0; aUser != players.length; aUser++) {
        
        while (players[aUser].length) {
            players[aUser].pop();
        }
        
    }


    //refill
    for (var aUser = 0; aUser != players.length; aUser++) {
        for (var n = 0; n != 3; n++) {
            players[aUser].push(drawPile.shift());
        }
    }

    knocker = -6;
    updateScreen();
}


//some random untilities 
function drawRando(low, high) {
    var diff = (high - (low - 1));
    var rando = Math.ceil( Math.random() * diff) + (low - 1) ;

    return(rando);
}

function getMax(ar) {
    var m = -Infinity;
    var loc = [];
    for (var n = 0; n != ar.length; n++) {
        if (m < ar[n]) {
            m = ar[n];
        }
    }
    var dummy = ar.slice();
    while (dummy.indexOf(m) > 0) {
        loc.push(dummy.indexOf(m));
    }
    return({
        "max":m,
        "loc":loc
    });
}

function getMin(ar) {
    var m = Infinity;
    var loc = [];
    for (var n = 0; n != ar.length; n++) {
        if (m > ar[n]) {
            m = ar[n];
        }
    }
    var dummy = ar.slice();
    while (dummy.indexOf(m) > 0) {
        loc.push(dummy.indexOf(m));
    }
    return({
        "min":m,
        "loc":loc
    });
}


