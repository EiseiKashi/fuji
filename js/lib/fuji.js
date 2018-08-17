function Fuji (){
    'strict mode'
    var fontList = [
        "'Rajdhani', sans-serif"
       ,"'Rationale', sans-serif"
       ,"'Share Tech', monospace"
   ]

    function Title (text){
        var _text = text == null ? "" : text;
        var _target
        this.text       = _text;
        this.fontFamily = fontList[0];
        this.fontSize;
        this.width;
        this.height;


        var titleContainer = document.createElement("container");
            titleContainer.style.display    = "inline-block";
            titleContainer.style.position   = "relative";
            titleContainer.style.overflow   = "hidden";
            
            
            var title = document.createElement("title");
            title.style.display     = "inline-block";
            title.style.position    = "relative";
            
            titleContainer.style.fontFamily = fontList[0];
            titleContainer.style.fontSize   = size +"px";
            titleContainer.style.width      = width + "px";
            titleContainer.style.height     = (size*2)+"px";
            title.innerHTML         = text;
            titleContainer.appendChild(title);
            title.style.bottom = -(size*2)+"px";
            title.style.opacity = 0;
        var state = {bottom:"0px", opacity:1};
        var titleAnimation = new Yasashiku();
            titleAnimation.formula = "outBack";
            titleAnimation.add(title.style, state);
            document.body.appendChild(titleContainer);
        
        this.appendTo = function (element){
            if(null != element && typeof element.appendChild == "function"){
                element.appendChild();
            }
        }

        this.play = function(seconds, delay){
            titleAnimation.play(seconds, delay);
        }
        
        this.textStyle = title.style;
        this.containerStyle = titleContainer.style;
    }

    function Fuji(){

    }
    return new Fuji();
}