var fuji = new Fuji();

function onEndComplete(event){
    event.target.playOut(.7, 5);
}

var label              = fuji.createLabel("Ayumi Kotegawa Chain");
    label.width        = "1000px";
    label.from         = "left";
    label.formulaOut   = "outBack";

    label.addEventListener(label.EVENT_IN_END, onEndComplete);
    label.animationType = label.ANIMATION_RANDOM;
    label.playIn(.7);

var counter     = 0;
var fromList    = ["top", "right", "bottom", "left"];

function playIn(from, index){
    'stric mode'
    var label               = fuji.createLabel("Ayumi Kotegawa 愛してるよ！");
        label.width         = "1000px";
        label.from          = from;
        label.formulaOut    = "outBack";

        label.addEventListener(label.EVENT_IN_END, function(event){
        label.playOut(1, 3);
    });
    label.playIn(1.2, delay+=2);
    return label;
}

var delay = 2;
var label;
function moIchido(){
    for(var index=0; index < fromList.length; index++){
        label = playIn(fromList[index], delay);
        delay ++;
     }
}

//moIchido();