var fuji    = new Fuji();

var label              = fuji.createLabel("Ayumi Kotegawa");
    label.width        = "1000px";
    label.from         = "left";
    label.formulaOut   = "outBack";

    //label.addEventListener(label.EVENT_IN_END, onLastFiniched);
    label.animationType = label.ANIMATION_LINEAR;
    label.playIn(5, 2);

var counter = 0
var fromList = ["top", "right", "bottom", "left"];
function playIn(from, index){
    'stric mode'
    var label = fuji.createLabel("Ayumi Kotegawa 愛してるよ！");
    label.width        = "1000px";
    label.from         = from;
    label.formulaOut   = "outBack";
    label.addEventListener(label.EVENT_IN_END, function eeeeeeeeeeeeeeeeeeeeee(event){
        label.playOut(1, 3);
        console.log("CLIENT!!!!");
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