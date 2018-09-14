function Fuji (){
    'strict mode'

    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    Array.isNotArray = function(arg) {
        return !(Object.prototype.toString.call(arg) === '[object Array]');
    };
    
    var fontList = [
        "'Rajdhani',    sans-serif"
       ,"'Rationale',   sans-serif"
       ,"'Share Tech',  monospace"
    ]

    var EVENT_IN_START  = "inStart";
    var EVENT_IN_END    = "inEnd";
    var EVENT_OUT_START = "outStart";
    var EVENT_OUT_END   = "outEnd";
    var EVENT_BLINK_END = "blinkEnd";

    // ANIMATIONS
    {
        var LETTERS = "ABCEDEFGHIJKLNOPQRSTUVWXYZ 123456789abcdeefghijklnopqrstuvwxyz".split("");
        // STYLE ANIMATION
        var WordAnimation = function(target, animation, state) {
            'strict mode'
            var _self       = this;
            var _styleTarget = target.styleTarget;
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
                        _position   = "-"+target.height;        
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
                        _position   = "-"+ target.width;
                    break;

                default :
                        _position   = "-"+target.width;
                    break;
                }
            }

            function onAnimationComplete(){
                var type = _isOut ? target.EVENT_OUT_END : target.EVENT_IN_END;
                _self.onComplete(type);
            }
        }
        
        // SPAN RANDOM
        var CharAnimation = function(target, element) {
            'strict mode'

            function SpanData(char){
                var _span               = document.createElement("span");
                    _span.style.opacity = 0;
                    _span.innerHTML     = char;
                this.span               = _span;

                var _intervalId;
                var _charCounter        = 0;
                var _top                = 0;
                var _isPlaying          = false;

                function spine(){
                    _span.style.opacity = _isOut ? 0 : 1;
                    if(_charCounter < _top){
                        charTmp = LETTERS[Math.floor(LETTERS.length*Math.random())];
                        _span.innerHTML = charTmp; 
                        _charCounter++;
                    }else{
                        clearInterval(_intervalId);
                        _span.innerHTML = _isOut ? "" : char;
                    }
                }

                this.setOpacity = function(opacity){
                    _span.style.opacity = opacity;
                }

                this.animate = function(seconds){
                    if(_isPlaying){
                        return;
                    }
                    clearInterval(_intervalId);
                    _isPlaying      = true;
                    _charCounter    = 0;
                    _top            = Math.floor(Math.random()*(seconds*10));
                    
                    spine();
                    clearInterval(_intervalId);
                    _intervalId = setInterval(spine, 100);
                }

                this.stop = function(){
                    clearInterval(_intervalId);
                    _span.innerHTML = char;
                    _isPlaying = false;
                }
            }

            var _self       = this;
            var _animation  = new Yasashiku();
            var _stateFrom  = {length:0};
            var _stateTo    = {length:0};
                _animation.add(_stateFrom, _stateTo);
                _animation.addEventListener(_animation.EVENT_TICK, onTick);
                _animation.addEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
            
            var _isOut;
            var _span;
            var _spanList;
            var _text;
            var _textLength;
            var _idTimeout;
            
            this.isLinear   = false;
            this.isSpinner  = false;

            function setAnimation(){
                var char;
                var span;
                _text               = target.text;
                _textLength         = _text.length;
                element.innerHTML   = "";
                orderList           = [];
                _spanList           = [];
                for(var index = 0; index < _textLength; index++ ){
                    char = _text.charAt(index);
                    span = new SpanData(char);
                    _spanList.push(span);
                    
                    element.appendChild(span.span);
                    orderList.push(index);
                }

                _animation.formula  = target.formula;
                
                if(_self.isLinear){
                    unOrderList = orderList.slice();
                    orderList.length = 0;
                    return; 
                }

                var randomIndex;
                unOrderList = orderList;
                for(var index=0; index < _textLength; index++ ){
                    randomIndex = Math.floor(orderList.length*Math.random());
                    unOrderList.push(orderList[randomIndex]);
                    orderList.splice(randomIndex, 1);
                }

            }
            
            this.playIn = function(seconds, delay){
                _self.stop();

                _isOut              = false;
                _animation.seconds  = seconds;
                element.innerHTML   = "";
                setAnimation();

                delay               = isNumber(delay) ? delay : 0;
                
                clearTimeout(_idTimeout);
                _idTimeout = setTimeout(onAnimationStart, delay*1000);        
            }

            this.playOut = function(seconds, delay){
                if(null == _spanList){
                    return;
                }

                _self.stop();
                _isOut              = true;
                
                _animation.seconds  = seconds;
                _animation.formula  = target.formula;
                
                element.innerHTML   = "";
                
                delay               = isNumber(delay) ? delay : 0;
                for(var index = 0; index < _textLength; index++ ){
                    _span = _spanList[index];
                    element.appendChild(_span.span);
                }

                clearTimeout(_idTimeout);
                _idTimeout = setTimeout(onAnimationStart, delay*1000);
            }

            this.stop = function(){
                clearTimeout(_idTimeout);
                if(null == _spanList){
                    // Early return
                    return;
                }
                var length = _spanList.length;
                for(var index = 0; index < length; index++ ){
                    _spanList[index].stop();
                }
                _animation.stop();
            }

            function onAnimationStart(){
                _stateFrom.length   = _isOut ? _textLength  : 0;
                _stateTo.length     = _isOut ? 0            : _textLength;
                _stateFrom.opacity  = _isOut ? 1            : 0;
                _stateTo.opacity    = _isOut ? 0            : 1;

                _animation.play();
            }

            function onTick(event){
                var length = Math.min(_stateFrom.length, _textLength);
                var lengthInt = Math.round(length);
                var lengthDouble = (length - lengthInt);
                
                length = Math.floor(length + lengthDouble);

                for(var index=0; index < _textLength; index++){
                    var span = _spanList[index];
                    span.setOpacity(0);
                }
                
                span = null;
                
                for(var index=0; index < lengthInt; index++){
                    var span = _spanList[unOrderList[index]];
                    span.setOpacity(1);
                    if(_self.isSpinner){
                        span.animate(event.seconds-event.lapsed);
                    }
                }

                if(null != span && !event.isLast){
                    span.setOpacity(lengthDouble);
                }
            }

            function onAnimationComplete(){
                element.innerHTML = _isOut ? "" : target.text;
                var type = _isOut ? target.EVENT_OUT_END : target.EVENT_IN_END;
                _self.onComplete(type);
            }

            this.onComplete = function (type){
            }
        }
        var LETTERS = "ABCEDEFGHIJKLNOPQRSTUVWXYZ 123456789abcdeefghijklnopqrstuvwxyz".split("");
    }
    
    function Label (text){
        this.ANIMATION_WORD             = "wordAnimation";
        this.ANIMATION_CHAR             = "charAnimation";
        this.ANIMATION_RANDOM           = "randomAnimation";
        this.ANIMATION_LINEAR           = "linearAnimation";
        this.ANIMATION_RANDOM_SPINNER   = "randomSpinner";
        this.ANIMATION_LINEAR_SPRINNER  = "linearSpinner";

        this.EVENT_IN_START    = EVENT_IN_START;
        this.EVENT_IN_END      = EVENT_IN_END;
        this.EVENT_OUT_START   = EVENT_OUT_START;
        this.EVENT_OUT_END     = EVENT_OUT_END;
        this.EVENT_BLINK_END   = EVENT_BLINK_END;

        var _self           = this;
        var _emitter        = new Emitter(this);
        var _text           = text == null ? "Label" : text;
        var _fontFamily     = fontList[1];
        var _fontSize       = "36px";
        var _width          = "100px";
        var _height         = (parseFloat(_fontSize)*2)+"px";
        var _from           = "left";
        var _formula        = "inOutQuad";
        var _seconds        = .8;
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
        
        this.text           = _text;
        this.fontFamily     = _fontFamily;
        this.fontSize       = _fontSize;
        this.width          = _width;
        this.height         = _height;
        this.from           = _from;
        this.animationType  = _self.ANIMATION_LINEAR_SPRINNER;
        this.formula        = _formula;
        this.formulaIn;
        this.formulaOut;
        this.styleTarget;
        this.styleContainer;
        
        _target                     = document.createElement("fuji-label");
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
            
            if(null != _self.text){
                _text = _self.text;
            }else{
                _self.text = _text;
            }
            
            if(null != _self.fontFamily){
                _fontFamily = _self.fontFamily;
            }else{
                _self.fontFamily = _fontFamily;
            }
            

            if(isNumber(parseFloat(_fontSize))){
                _fontSize = _self.fontSize;
            }else{
                _self.fontSize = _fontSize;
            }
            
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

            _yasashiku.formula          = _formula;
            _self.formula               = _yasashiku.formula; 
            _from                       = _self.from;
            _target.innerHTML           = _text;
            _styleContainer.fontFamily  = _fontFamily;
            _styleContainer.fontSize    = _fontSize;
            _styleContainer.width       = _width;
            _styleContainer.height      = _height;

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
                case _self.ANIMATION_WORD :
                    if(null == _animatorList[_self.ANIMATION_WORD]){
                        _animatorList[_self.ANIMATION_WORD] = new WordAnimation(_self, _yasashiku, _state);
                    }
                    _animator               =  _animatorList[_self.ANIMATION_WORD];
                    _animator.onComplete    = onAnimationComplete;
                    break;
                //////////////////////////////
                case _self.ANIMATION_RANDOM :
                case _self.ANIMATION_LINEAR :
                case _self.ANIMATION_RANDOM_SPINNER :
                case _self.ANIMATION_LINEAR_SPRINNER :
                    if(null == _animatorList[_self.ANIMATION_CHAR]){
                        _animatorList[_self.ANIMATION_CHAR] = new CharAnimation(_self, _target);
                    }
                    _animator               =  _animatorList[_self.ANIMATION_CHAR];
                    _animator.isLinear      =  _self.ANIMATION_LINEAR == _self.animationType || 
                                               _self.ANIMATION_LINEAR_SPRINNER == _self.animationType;
                    _animator.isSpinner     =  _self.ANIMATION_RANDOM_SPINNER  == _self.animationType ||
                                               _self.ANIMATION_LINEAR_SPRINNER == _self.animationType;
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

    this.createLabel = function(text, container){
        var target = new Label(text);
            target.appendTo(container);
        return target;
    }

    this.createPanel = function(width, height, background, container){
        var target = new Panel(width, height, background);
            target.appendTo(container);
        return target;
    }
}