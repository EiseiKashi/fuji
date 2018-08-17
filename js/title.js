
var fontList = [
                     "'Rajdhani', sans-serif"
                    ,"'Rationale', sans-serif"
                    ,"'Share Tech', monospace"
                ]

var delay = 3000;
var camelUP = document.createElement("h1");
var camelDOWN = document.createElement("h1");
var family = document.createElement("h6");

var lowerCase   = "System Sakura 85 52 78";
var uppperCase  = lowerCase.toLocaleUpperCase();


document.body.appendChild(camelUP);
document.body.appendChild(camelDOWN);
document.body.appendChild(family);

var index = 0;
var changeFont = function(){
    var font            = fontList[index];
    camelUP.innerHTML   = uppperCase;
    camelDOWN.innerHTML = lowerCase;
    family.innerHTML    = font;

    document.body.style.fontFamily = font;
    index++;

    if(index == fontList.length){
        index = 0;
    }
    setTimeout(changeFont, delay)
}

//changeFont();

//========================================
/*
var TitleBottom = function(text){
    var _text = text == null ? "" : text;
    
    var titleContainer = document.createElement("section");
    titleContainer.style.position   = "relative";
    titleContainer.style.fontFamily = fontList[0];
    titleContainer.style.fontSize   = size +"px";
    titleContainer.style.width      = width + "px";
    titleContainer.style.height     = (size*2)+"px";
    titleContainer.style.overflow   = "hidden";

    var title = document.createElement("h1");
        title.innerHTML = text;
        title.style.position = "relative";

    titleContainer.appendChild(title);

    document.body.appendChild(titleContainer);
    title.style.bottom = -(size*2)+"px";
    title.style.opacity = 0;
    var state = {bottom:"0px", opacity:1};
    var titleAnimation = new Yasashiku();
        titleAnimation.formula = "outBack";
        titleAnimation.add(title.style, state);
        
    this.play = function(seconds, delay){
        titleAnimation.play(seconds, delay);
    }

    this.textStyle = title.style;
    this.containerStyle = titleContainer.style;
}

title0 = new TitleBottom("SAKURA", 20, 200);
title1 = new TitleBottom("code", 10, 200);
title2 = new TitleBottom("code", 5, 200);

title0.play(.7, 5)

title1.play(.7, 5.5)

title2.play(.7, 6)
*/

var fuji    = new Fuji();
var label   = fuji.createLabel("SAKURA");
    label.width = "150px";
    label.playIn(0.7)