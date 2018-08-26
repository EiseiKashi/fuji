function Fuji (){
    'strict mode'
    var fontList = [
        "'Rajdhani',    sans-serif"
       ,"'Rationale',   sans-serif"
       ,"'Share Tech',  monospace"
    ]

    var EVENT_IN_START  = "inStart";
    var EVENT_IN_END    = "inEnd";
    var EVENT_OUT_START = "outStart";
    var EVENT_OUT_END   = "outEnd";

    // ANIMATIONS
    {
        var LETTERS = "ABCEDEFGHIJKLNOPQRSTUVWXYZ 123456789abcdeefghijklnopqrstuvwxyz".split("");
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
                _self.onComplete(type);
            }
        }

        // SPAN RANDOM
        var CharAnimation1 = function(label, element, animation) {
            'strict mode'

            function SpanData(char, isSpinner){
                var span                = document.createElement("span");
                    span.style.opacity  = 0;
                    span.innerHTML      = char;
                this.span               = span;
                
                var _isSpinner          = isSpinner;
                var _intervalId;
                var _charCounter        = 0;
                var _top                = 0;
                
                function change(){
                    span.style.opacity = _isOut ? 0 : 1;
                    if(_charCounter < _top){
                        var charTmp = char; 
                        if(_isSpinner){
                            charTmp = LETTERS[Math.floor(LETTERS.length*Math.random())];
                        }else{
                            charTmp =  char;
                        }
                        span.innerHTML = charTmp; 
                        _charCounter++;
                    }else{
                        clearInterval(_intervalId);
                        span.innerHTML = _isOut ? "" : char;
                    }
                }

                this.animate = function(milliseconds, delay, isSpinner){
                    clearInterval(_intervalId);
                    _isSpinner              = isSpinner;
                    span.style.transition   = "all " + milliseconds + "ms";

                    _charCounter    = 0;
                    _top            = Math.floor(Math.random()*20)+3;
                    
                    setTimeout(function(){
                        change();
                        clearInterval(_intervalId);
                        _intervalId = setInterval(change, milliseconds/_top);
                    }, delay);
                }

                this.stop = function(){
                    clearInterval(_intervalId);
                    span.innerHTML = char;
                }
            }

            var _self = this;
            var _isOut;
            var _milliseconds;
            var _spanList;
            var _intervalId;
            var _text;
            var _textLength;

            this.isLinear   = false;
            this.isSpinner  = false;

            function setAnimation(){
                var char;
                var span;
                _text               = label.text;
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

            function animate(){
                var fracc = _milliseconds / _textLength;
                var delay = 0; 
                if(!_isOut){
                    for(index=0; index < _textLength; index++){
                        var span = _spanList[unOrderList[index]];
                            span.animate(_milliseconds-delay, delay, _self.isSpinner);
                            delay += fracc;
                    }
                }else{
                    for(index=_textLength-1; index > -1; index--){
                        var span = _spanList[unOrderList[index]];
                            span.animate(_milliseconds-delay, delay, _self.isSpinner);
                            delay += fracc;
                    }
                }

                clearInterval(_intervalId);
                _intervalId = setTimeout(onAnimationComplete, _milliseconds);
            }

            this.playIn = function(seconds, delay){
                _self.stop();
                _isOut          = false;
                _milliseconds   = seconds*1000;
                delay           = isNumber(delay) ? delay : 0;
                setAnimation()
                clearInterval(_intervalId);
                _intervalId = setTimeout(animate, delay*1000);
            }

            this.playOut = function(seconds, delay){
                if(null == _spanList){
                    return;
                }
                this.stop();
                _isOut          = true;
                _milliseconds   = seconds*1000;
                delay           = isNumber(delay) ? delay : 0;
                element.innerHTML = "";
                var length = _spanList.length;
                for(var index = 0; index < _textLength; index++ ){
                    span = _spanList[index];
                    element.appendChild(span.span);
                }
                clearInterval(_intervalId);
                _intervalId = setTimeout(animate, delay*1000);
            }

            this.stop = function(){
                clearInterval(_intervalId);
                if(null == _spanList){
                    // Early return
                    return;
                }
                var length = _spanList.length;
                for(var index = 0; index < length; index++ ){
                    _spanList[index].stop();
                }
            }

            function onAnimationComplete(){
                element.innerHTML = _isOut ? "" : label.text;
                
                var type = _isOut ? label.EVENT_OUT_END : label.EVENT_IN_END;
                _self.onComplete(type);
            }

            this.onComplete = function (type){
            }
        }

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

        var _self           = this;
        var _emitter        = new Emitter(this);
        var _text           = text == null ? "Label" : text;
        var _fontFamily     = fontList[1];
        var _fontSize       = "36px";
        var _width          = "100px";
        var _height         = (parseFloat(_fontSize)*2)+"px";
        var _from           = "left";
        var _formula        = "outBack";
        var _element        = document.body;
        var _yasashiku      = new Yasashiku();
        var _animatorList   = {}
        var _state          = {};
        var _animator;
        var _isOut;
        var _label;
        var _container;
        var _styleContainer;
        var _styleLabel;
        
        this.text           = _text;
        this.fontFamily     = _fontFamily;
        this.fontSize       = _fontSize;
        this.width          = _width;
        this.height         = _height;
        this.from           = _from;
        this.animationType  = "word";
        this.formula        = _formula;
        this.formulaIn;
        this.formulaOut;
        this.styleLabel;
        this.styleContainer;
        
        _label                      = document.createElement("fuji-label");
        _styleLabel                 = _label.style; 
        _styleLabel.display         = "inline-block";
        _styleLabel.position        = "relative";
        
        _container                  = document.createElement("fuji-container");
        _styleContainer             = _container.style;
        _styleContainer.display     = "inline-block";
        _styleContainer.position    = "relative";
        _styleContainer.overflow    = "hidden";

        _container.appendChild(_label);

        this.styleLabel             = _styleLabel;
        this.styleContainer         = _styleContainer;

        _yasashiku.add(_styleLabel, _state);

        this.appendTo = function (element){
            if(null != element && element != _element && typeof element.appendChild == "function"){
                _element = element;
            }
        }

        this.playIn = function(seconds, delay){
            _isOut = false;
            play(seconds, delay);
        }

        this.playOut = function(seconds, delay){
            _isOut = true;
            play(seconds, delay);
        }

        function play (seconds, delay){
            
            if(_self.text != _text){
                _text = _self.text;
            }
            
            if(_self.fontFamily != _fontFamily){
                _fontFamily = _self.fontFamily;
            }
            
            if(_self.fontSize != _fontSize){
                if(isNumber(parseFloat(_fontSize))){
                    _fontSize = _self.fontSize;
                }
            }
            
            if(_self.width != _width){
                if(isNumber(parseFloat(_self.width))){
                    _width = _self.width;
                }
            }
            
            if(_self.height != _height){
                if(isNumber(parseFloat(_self.height))){
                    _height = _self.height;
                }
            }

            _self.formula = _self.formulaIn;
            if(_self.formula != _formula){
                _formula = _self.formula;
            }

            _yasashiku.formula          = _formula;
            _from                       = _self.from;
            _label.innerHTML            = _text;
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
                        _animatorList[_self.ANIMATION_CHAR] = new CharAnimation(_self, _label);
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

        // Event emitter
        this.addEventListener = function(type, listener, context){
            _emitter.addEventListener(type, listener, context);
        }

        this.removeEventListener = function(type, listener, context){
            _emitter.removeEventListener(type, listener, context);
        }

        function onAnimationComplete (type){
            emit(type);
        }

        function emit(type){
            _emitter.emit(type)
        }
    }

    this.createLabel = function(text, container){
        var label = new Label(text);
            label.appendTo(container);
        return label;
    }
}