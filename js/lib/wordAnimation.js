// STYLE ANIMATION
var WordAnimation = function(label, animation, state) {
    'strict mode'
    var _self       = this;
    var _styleLabel = label.styleLabel;
    var _from;

    var _isOut;
    var _position;

    animation.addEventListener(animation.EVENT_COMPLETE, onAnimationComplete);

    this.playIn = function(seconds, delay){
        _isOut = false;

        setAnimation();
        
        state[_from]        = 0+"px";
        state.opacity       = 1;
        _styleLabel[_from]  = _position;
        animation.play(seconds, delay);
    }

    this.playOut = function(seconds, delay){
        _isOut = true;
        setAnimation();

        state[_from]    = _position;
        state.opacity   = 0;
        animation.play(seconds, delay);
    }

    this.stop = function(){
        animation.stop();
    }

    this.onComplete = function (type){
    }
    
    function setAnimation (){
        _from = label.from;
        switch(_from){
            case "top" :
                _position   = "-"+label.height;        
            break;
            
            case "right" :
                _from       = "left";
                _position   = label.width;      
            break;
            
            case "bottom" :
                _from       = "top";
                _position   = label.height;    
            break;
            
            case "left" :
                _position   = "-"+ label.width;
            break;

           default :
                _position   = "-"+label.width;
            break;
        }
    }

    function onAnimationComplete(){
        var type = _isOut ? label.EVENT_OUT_END : label.EVENT_IN_END;
        console.log(type, " ANIMATION COMPLETE");
        _self.onComplete(type);
    }
}