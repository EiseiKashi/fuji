var PositionAnimation = function(target, animation, state) {
    'strict mode'
    var _self           = this;
    var _styleTarget    = target.styleTarget;
    var _from;

    var _isOut;
    var _position;

    animation.addEventListener(animation.EVENT_COMPLETE, onAnimationComplete);

    this.playIn = function(seconds, delay){
        _seconds    = isNumber(seconds) ? seconds : _seconds;
        _isOut      = false;

        setAnimation();
        
        state[_from]        = 0+"px";
        state.opacity       = 1;
        _styleTarget[_from]  = _position;
        animation.play(_seconds, delay);
    }

    this.playOut = function(seconds, delay){
        _seconds    = isNumber(seconds) ? seconds : _seconds;
        _isOut      = true;

        setAnimation();

        state[_from]    = _position;
        state.opacity   = 0;
        animation.play(_seconds, delay);
    }

    this.stop = function(){
        animation.stop();
    }

    this.onComplete = function (type){
    }
    
    function setAnimation (){
        _from = target.from;
        switch(_from){
            case "top" :
                _position   = "-" + target.height;        
            break;
            
            case "right" :
                _from       = "left";
                _position   = target.width;      
            break;
            
            case "bottom" :
                _from       = "top";
                _position   = target.height;    
            break;
            
            case "left" :
                _position   = "-" + target.width;
            break;

            default :
                _position   = "-" + target.width;
            break;
        }
    }

    function onAnimationComplete(){
        var type = _isOut ? target.EVENT_OUT_END : target.EVENT_IN_END;
        _self.onComplete(type);
    }
}

function Panel (width, height, background){
    // background, shorthand example: background: #ffffff url("img_tree.png") no-repeat right top;

    this.ANIMATION_POSITION         = "positionAnimation";
    this.ANIMATION_CHAR             = "charAnimation";
    this.ANIMATION_RANDOM           = "randomAnimation";
    this.ANIMATION_LINEAR           = "linearAnimation";
    this.ANIMATION_RANDOM_SPINNER   = "randomSpinner";
    this.ANIMATION_LINEAR_SPRINNER  = "linearSpinner";

    this.EVENT_IN_START             = EVENT_IN_START;
    this.EVENT_IN_END               = EVENT_IN_END;
    this.EVENT_OUT_START            = EVENT_OUT_START;
    this.EVENT_OUT_END              = EVENT_OUT_END;
    this.EVENT_BLINK_END            = EVENT_BLINK_END;

    var _self           = this;
    var _emitter        = new Emitter(this);
    var _width          = "100px";
    var _height         = "100px";
    var _background     = "grey";
    var _from           = "left";
    var _formula        = "outBack";
    var _element        = document.body;
    var _yasashiku      = new Yasashiku();
    var _animatorList   = {}
    var _state          = {};

    var _animator;
    var _isOut;
    var _target;
    var _idInterval;
    var _blinkCounter;
    var _blinkTimes;
    var _container;
    var _styleContainer;
    var _styleTarget;

    this.width          = width;
    this.height         = height;
    this.background     = background;
    this.from           = _from;
    this.animationType  = _self.ANIMATION_POSITION;
    this.formula        = _formula;

    this.formulaIn;
    this.formulaOut;
    this.styleTarget;
    this.styleContainer;
    
    _target                     = document.createElement("fuji-panel");
    _styleTarget                = _target.style; 
    _styleTarget.display        = "inline-block";
    _styleTarget.position       = "relative";
    
    _container                  = document.createElement("fuji-container");
    _styleContainer             = _container.style;
    _styleContainer.display     = "inline-block";
    _styleContainer.position    = "relative";
    _styleContainer.overflow    = "hidden";

    _container.appendChild(_target);

    this.styleTarget            = _styleTarget;
    this.styleContainer         = _styleContainer;

    _yasashiku.add(_styleTarget, _state);

    // INTERFACE
    this.appendTo = function (element){
        if(null != element && element != _element && typeof element.appendChild == "function"){
            _element = element;
        }
    }

    this.playIn = function(seconds, delay){
        _isOut          = false;
        _self.formula   = _self.formulaIn;
        play(seconds, delay);
    }

    this.playOut = function(seconds, delay){
        _isOut          = true;
        _self.formula   = _self.formulaOut;
        play(seconds, delay);
    }

    this.stop = function(){
        _styleTarget.display = "inline-block"
        clearInterval(_idInterval);
        if(null == _animator){
            _animator.stop();
        }
    }

    this.blink = function(times){
        _blinkTimes             = isNumber(times) ? Math.round(times) : 2;
        _blinkCounter           = 0;
        _styleTarget.display    = "inline-block"
        clearInterval(_idInterval);
        _idInterval = setInterval(blinker, 50);
    }

    // HELPERS
    this.addEventListener = function(type, listener, context){
        _emitter.addEventListener(type, listener, context);
    }

    this.removeEventListener = function(type, listener, context){
        _emitter.removeEventListener(type, listener, context);
    }

    function blinker(){
        if(_styleTarget.display == "inline-block"){
            _styleTarget.display = "none";
            _blinkCounter++;
        }else{
            if(_blinkCounter == _blinkTimes){
                clearInterval(_idInterval);
                emit(_self.EVENT_BLINK_END);
            }
            _styleTarget.display = "inline-block";
        }
    }

    function play (seconds, delay){
        clearInterval(_idInterval);
        _styleTarget.display == "inline-block";
        
        if(isNumber(parseFloat(_self.width))){
            _width = _self.width;
        }else{
            _self.width = _width;
        }
        
        if(isNumber(parseFloat(_self.height))){
            _height = _self.height;
        }else{
            _self.height = _height;
        }

        if(null != _self.formula){
            _formula = _self.formula;
        }else{
            _self.formula = _formula;
        }

        if(null != _self.background){
            _formula = _self.background;
        }else{
            _self.background = _background;
        }

        _yasashiku.formula          = _formula;
        _self.formula               = _yasashiku.formula; 
        _from                       = _self.from;
        _styleContainer.width       = "100%";
        _styleContainer.height      = "100%";

        _styleTarget.width          = _width;
        _styleTarget.height         = _height;
        _styleTarget.background     = _background;
        
        if(!_element.contains(_container)){
            _element.appendChild(_container);    
        }

        var typeToEmit = _isOut ? _self.EVENT_OUT_START : _self.EVENT_IN_START;
        emit(typeToEmit);

        if(null != _animator){
            _animator.stop();
        }

        _animator = null;
        
        switch(_self.animationType){
            //////////////////////////////
            case _self.ANIMATION_POSITION :      
                if(null == _animatorList[_self.ANIMATION_POSITION]){           
                    _animatorList[_self.ANIMATION_POSITION] = new PositionAnimation(_self, _yasashiku, _state);
                }
                _animator               =  _animatorList[_self.ANIMATION_POSITION];
                _animator.onComplete    = onAnimationComplete;
                break;
            //////////////////////////////
        }

        if(null != _animator){
            if(_isOut){
                _animator.playOut(seconds, delay);
            }else{
                _animator.playIn(seconds, delay);
            }
        }
    }

    function onAnimationComplete (type){
        emit(type);
    }

    function emit(type){
        _emitter.emit(type)
    }
}