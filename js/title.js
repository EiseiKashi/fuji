
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
var titleContainer = document.createElement("section");
    titleContainer.style.position = "relative";
    titleContainer.style.fontFamily = fontList[0];
    titleContainer.style.fontSize = "20px";
    titleContainer.style.width = "200px";
    titleContainer.style.height = "40px";
    titleContainer.style.overflow = "hidden";

var title = document.createElement("h1");
    title.innerHTML = "SAKURA";
    title.style.position = "relative";

titleContainer.appendChild(title);

document.body.appendChild(titleContainer);
title.style.bottom = "-40px";
title.style.opacity = 0;
var state = {bottom:"0px", opacity:1};
var titleAnimation = new Yasashiku();
    titleAnimation.formula = "outBack";
    titleAnimation.add(title.style, state);

titleAnimation.play(0.7);