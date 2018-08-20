/*
var label0              = fuji.createLabel("Ayumi Kotegawa");
    label0.width        = "100px";
    label0.from         = "left";
    label0.formulaOut   = "outBack";
var label = label0;
label.addEventListener(label.EVENT_IN_END, onLastFiniched);
label.animationType = label.ANIMATION_LINEAR;
label.playIn(1.2, delay+=2);
*/

var fromList = ["top", "right", "bottom", "left"];
function playIn(from, index){
    'stric mode'
    var label = fuji.createLabel("Ayumi Kotegawa 愛してるよ！");
    label.width        = "1000px";
    label.from         = from;
    label.formulaOut   = "outBack";
    label.addEventListener(label.EVENT_IN_END, function(event){
        label.playOut(1.2, delay+=2);
    });
    label.playIn(1.2, delay+=2);
}

var fuji    = new Fuji();
var delay = 2;

function moIchido(){
    for(var index=0; index < fromList.length; index++){
        playIn(fromList[index]);
     }
}

moIchido();