var fuji = new Fuji();

function onEndComplete(event){
    event.target.playOut(1.2, 5);
}

var label              = fuji.createLabel("Ayumi Kotegawa");
    label.width        = "1000px";
    label.from         = "left";
    label.formulaOut   = "outBack";

    label.addEventListener(label.EVENT_IN_END, onEndComplete);
    
    label.animationType = label.ANIMATION_LINEAR_SPRINNER;
   // label.animationType = label.ANIMATION_RANDOM;
    label.playIn(1.2);