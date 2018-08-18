function onLastFiniched(event){
    event.target.playOut(1.2)
}

var fuji    = new Fuji();

var delay = 0;

var label0              = fuji.createLabel("Ayumi Kotegawa");
    label0.width        = "500px";
    label0.from         = "top";
    label0.formulaOut   = "outBack";

var label = label0;
    label.addEventListener(label.EVENT_IN_END, onLastFiniched);
    label.playIn(1.2, delay+=2);

/*
var label1              = fuji.createLabel("Ayumi Kotegawa");
    label1.width        = "500px";
    label1.from         = "right";
    label1.formulaOut   = "outBack";
    
var label2              = fuji.createLabel("Ayumi Kotegawa");
    label2.width        = "500px";
    label2.from         = "bottom";
    label2.formulaOut   = "outBack";
    
var label3              = fuji.createLabel("Ayumi Kotegawa");
    label3.width        = "500px";
    label3.from         = "left";
    label3.formulaOut   = "outBack";
*/
