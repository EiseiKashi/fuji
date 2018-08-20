// STYLE ANIMATION
var WordAnimation = function(label, animation, state) {
    'strict mode'
    var _self       = this;
    var _animation  = animation;
    var _state      = state;

    var _isOut;
    var _position;

    this.playIn = function(seconds, delay){
        _isOut = false;

        setAnimation();
        
        var from            = label.from;
        _state[from]        = 0+"px";
        _state.opacity      = 1;
        _styleLabel[from]   = _position;
        
        _animation.addEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
        _animation.play(seconds, delay);
    }

    this.playOut = function(seconds, delay){
        setAnimation();

        _state[label.from]  = _position;
        _state.opacity      = 0;

        _animation.addEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
        _animation.play(seconds, delay);
    }

    this.stop = function(){
        _animation.stop();
        _animation.removeEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
    }

    var setAnimation = function(){
        switch(_from){
            case "top" :
                _from       = "top";
                _position   = "-"+_height;        
            break;
            
            case "right" :
                _from       = "left";
                _position   = _width;      
            break;
            
            case "bottom" :
                _from       = "top";
                _position   = _height;    
            break;
            
            case "left" :
                _position   = "-"+_width;
            break;

           default :
                _from       = "left";
                _position   = "-"+_width;
            break;
        }   
    }
    
    var onAnimationComplete = function(){
        var type = _isOut ? label.EVENT_OUT_END : label.EVENT_IN_END; 
        _self.onComplete(type);
        _animation.removeEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
    }

    this.onComplete = function(type){
    }
}