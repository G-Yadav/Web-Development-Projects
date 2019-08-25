function average(scores) {
    var sum =0;
    for(var i=0; i<scores.length; i++) {
        sum += scores[i];
    }

    console.log(Math.round(sum/scores.length));
}

var scores = [ 90, 98, 89, 100, 100, 86, 94];
average(scores);
