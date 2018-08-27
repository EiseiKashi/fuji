var fuji = new Fuji();

function onEndComplete(event){
    event.target.playOut(1.2, 5);
}


var formulas = [
     "linearTween"
    ,"inQuad"
    ,"outQuad"
    ,"inOutQuad"
    ,"inCubic"
    ,"outCubic"
    ,"inOutCubic"
    ,"inQuart"
    ,"outQuart"
    ,"inOutQuart"
    ,"inQuint"
    ,"outQuint"
    ,"inOutQuint"
    ,"inSine"
    ,"outSine"
    ,"inOutSine"
    ,"inExpo"
    ,"outExpo"
    ,"inOutExpo"
    ,"inCirc"
    ,"outCirc"
    ,"inOutCirc"
    ,"inElastic"
    ,"outElastic"
    ,"inOutElastic"
    ,"inBack"
    ,"outBack"
    ,"inOutBack"
    ,"inBounce"
    ,"outBounce"
    ,"inOutBounce"
]

var label              = fuji.createLabel("Ayumi Kotegawa");
    label.width        = "1000px";
    label.from         = "left";
    label.formulaIn    = "outBounce";
    label.formulaOut   = "inBounce";

    label.addEventListener(label.EVENT_IN_END, onEndComplete);
    
    label.animationType = label.ANIMATION_RANDOM;
    label.animationType = label.ANIMATION_RANDOM_SPINNER;
    label.animationType = label.ANIMATION_LINEAR_SPRINNER;
    label.animationType = label.ANIMATION_LINEAR;
    
    label.playIn(1.2);