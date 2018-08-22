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

    // CHAR ANIMATION
    var CharAnimation = function(label, element) {
        'strict mode'
        var _self       = this;
        var _styleLabel = label.styleLabel;

        var _isOut;

        var _counter;
        var _charIndex;
        var _currentIndex;
        var _increment;
        var _times;
        var _top;
        var _charCounter;
        var _randomIndex;
        var _letterList;
        var _intervalId;
        var _seconds;

        this.text;
        this.animationType;

        this.playIn = function(seconds, delay){
            _isOut              = false;
            element.innerHTML   = "";
            _letterList         = new Array(_self.text.length).join(" ").split("");
            _styleLabel.opacity = 1;
            _styleLabel.left    = 0;
            _styleLabel.top     = 0;
            _seconds            = seconds*1000;
            
            _top                = _self.text.length;
            _increment          = 1;
            _currentIndex       = 0;

            clearInterval(_intervalId);
            _intervalId = setTimeout(animateChar, delay*1000);
        }

        this.playOut = function(seconds, delay){
            _isOut              = true;
            _styleLabel.opacity = 1;
            _styleLabel.left    = 0;
            _styleLabel.top     = 0;
            _seconds            = seconds*1000;

            _top                = label.ANIMATION_RANDOM == _self.animationType ? _self.text.length : -1;
            _increment          = -1;
            _currentIndex       = _self.text.length-1;
            clearInterval(_intervalId);
            _intervalId = setTimeout(animateChar, delay*1000);
        }

        this.stop = function(){
            clearInterval(_intervalId);
        }

        function animateChar(){
            
            _times       = 5;
            _counter     = 0;
            _charCounter = 0;

            var method; 
            
            if(label.ANIMATION_LINEAR == _self.animationType){
                
                method = onOrderChar;
            }
            
            if(label.ANIMATION_RANDOM == _self.animationType){
                _randomIndex = [];
                for(var index=0; index<_top; index++){
                    _randomIndex.push(index);
                }
                _currentIndex   = Math.floor(Math.random()*_randomIndex.length);
                method          = onRandomChar;
            }

            var interval    = (_seconds/(_top*_times))*1000;
            
            clearInterval(_intervalId);
            _intervalId = setInterval(method, 20);
        }

        function onOrderChar(isFirst){
            var char = LETTERS[Math.floor(Math.random()*LETTERS.length)];
            if(++_counter%_times == 0){
                _letterList[_currentIndex] = _isOut ? "" : _self.text.charAt(_currentIndex);
                _currentIndex += _increment;
                _charCounter ++;
            }else{
                _letterList[_currentIndex] = char;
            }
            element.innerHTML = _letterList.join("");

            if(_charCounter == _top){
                clearInterval(_intervalId);
                element.innerHTML = _isOut ? "" : _self.text;
                var type = _isOut ? _self.EVENT_OUT_END : _self.EVENT_IN_END; 
                onAnimationComplete();
            }
        }

        function onRandomChar(isFirst){
            var char = LETTERS[Math.floor(Math.random()*LETTERS.length)];
            if(++_counter%_times == 0){
                
                _charIndex = _randomIndex[_currentIndex];
                _letterList[_charIndex] = _isOut ? "" : _self.text.charAt(_charIndex);
                _randomIndex.splice(_currentIndex, 1);
                _currentIndex = Math.floor(Math.random()*_randomIndex.length);
                _charIndex = _randomIndex[_currentIndex];
                _charCounter ++;
            }else{
                _letterList[_charIndex] = char;
            }
            element.innerHTML = _letterList.join("");

            if(_charCounter == _top){
                clearInterval(_intervalId);
                var type
                if(_isOut){
                    type                = _self.EVENT_OUT_END;
                    element.innerHTML   = "";
                }else{
                    type                = _self.EVENT_IN_END;
                    element.innerHTML   = _self.text;
                } 

                onAnimationComplete();
            }
        }

        function onAnimationComplete(){
            var type = _isOut ? label.EVENT_OUT_END : label.EVENT_IN_END;
            _self.onComplete(type);
        }

        this.onComplete = function (type){
        }
    }

    function Label (text){
        this.ANIMATION_WORD    = "wordAnimation";
        this.ANIMATION_RANDOM  = "randomAnimation";
        this.ANIMATION_LINEAR  = "linearAnimation";
        this.ANIMATION_SPAN    = "spanAnimation"
        this.ANIMATION_CHAR    = "charAnimation";
        this.EVENT_IN_START    = EVENT_IN_START;
        this.EVENT_IN_END      = EVENT_IN_END;
        this.EVENT_OUT_START   = EVENT_OUT_START;
        this.EVENT_OUT_END     = EVENT_OUT_END;

        var _self           = this;
        var _emitter        = new Emitter(this);
        var _text           = text == null ? "Label" : text;
        var _fontFamily     = fontList[2];
        var _fontSize       = "36px";
        var _width          = "100px";
        var _height         = (parseFloat(_fontSize)*2)+"px";
        var _from           = "left";
        var _position       = "-"+_width;
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
                case _self.ANIMATION_WORD :
                    if(null != _animator){
                        _animator.stop();
                    }
                    if(null == _animatorList[_self.ANIMATION_WORD]){
                        _animatorList[_self.ANIMATION_WORD] = new WordAnimation(_self, _yasashiku, _state);
                    }
                    _animator =  _animatorList[_self.ANIMATION_WORD];
                    _animator.onComplete = onAnimationComplete;
                    break;
                case _self.ANIMATION_LINEAR :
                case _self.ANIMATION_RANDOM :
                    if(null == _animatorList[_self.ANIMATION_CHAR]){
                        _animatorList[_self.ANIMATION_CHAR] = new CharAnimation(_self, _label);
                    }
                    _animator               =  _animatorList[_self.ANIMATION_CHAR];
                    _animator.animationType = _self.animationType
                    _animator.text          = _text;
                    _animator.onComplete    = onAnimationComplete;
                    break;
                case _self.ANIMATION_SPAN :
                    if(null == _animatorList[_self.ANIMATION_SPAN]){
                        _animatorList[_self.ANIMATION_SPAN] = new SpanAnimation(_self, _yasashiku);
                    }
                    _animator =  _animatorList[_self.ANIMATION_SPAN];
                    _animator.onComplete = onAnimationComplete;
                    break;
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