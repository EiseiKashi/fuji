function Fuji (){
    'strict mode'
    var fontList = [
        "'Rajdhani', sans-serif"
       ,"'Rationale', sans-serif"
       ,"'Share Tech', monospace"
    ]

    var LETTERS = "ABCEDEFGHIJKLNOPQRSTUVWXYZ 123456789abcdeefghijklnopqrstuvwxyz".split("");

    function Label (text){
        this.ANIMATION_WORD    = "word";
        this.ANIMATION_RANDOM  = "random";
        this.ANIMATION_LINEAR  = "linear";
        this.EVENT_IN_START    = "inStart";
        this.EVENT_IN_END      = "inEnd";
        this.EVENT_OUT_START   = "inStart";
        this.EVENT_OUT_END     = "outEnd";

        var _self       = this;
        var _emitter    = new Emitter(this);
        var _text       = text == null ? "Label" : text;
        var _fontFamily = fontList[2];
        var _fontSize   = "36px";
        var _width      = "100px";
        var _height     = (parseFloat(_fontSize)*2)+"px";
        var _from       = "left";
        var _position   = "-"+_width;
        var _formula    = "outBack";
        var _element    = document.body;
        var _animation  = new Yasashiku();
        var _state      = {};
        var _isOut;

        var _label;
        var _container;
        var _styleContainer;
        var _styleLabel;
        var _intervalId;
        
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

        _animation.add(_styleLabel, _state);

        this.appendTo = function (element){
            if(null != element && element != _element && typeof element.appendChild == "function"){
                _element = element;
            }
        }

        var setPlay = function(){
            clearInterval(_intervalId);
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
            
            _label.innerHTML            = _text;
            _styleContainer.fontFamily  = _fontFamily;
            _styleContainer.fontSize    = _fontSize;
            _styleContainer.width       = _width;
            _styleContainer.height      = _height;
            if(!_element.contains(_container)){
                _element.appendChild(_container);    
            }
        }

        this.playIn = function(seconds, delay){
            _isOut = false;
            
            setPlay();

            _animation.removeEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
            clearInterval(_intervalId);
            
            switch(this.animationType){
                case _self.ANIMATION_WORD :
                    doPlay = wordIn; 
                    break;
                case _self.ANIMATION_LINEAR :
                case _self.ANIMATION_RANDOM :
                    doPlay = charIn; 
                    break;
                default: 
                    doPlay = wordIn; 
            }
            emit(_self.EVENT_IN_START);
            doPlay.apply(this, [seconds, delay]);
        }

        this.playOut = function(seconds, delay){
            _isOut = true;
            
            setPlay();

            _animation.removeEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
            clearInterval(_intervalId);

            switch(this.animationType){
                case _self.ANIMATION_WORD :
                    doPlay = wordOut; 
                    break;
                case _self.ANIMATION_LINEAR :
                case _self.ANIMATION_RANDOM :
                    doPlay = charOut; 
                    break;
                default: 
                    doPlay = wordOut; 
            }
            emit(_self.EVENT_OUT_START);
            doPlay.apply(this, [seconds, delay]);
        }

        // WORD ANIMATION
        {
            var onAnimationComplete = function(){
                var type = _isOut ? _self.EVENT_OUT_END : _self.EVENT_IN_END; 
                emit(type);
                _animation.removeEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
            }

            var setWordAnimation = function(){
                _self.formula = _self.formulaIn;
                if(_self.formula != _formula){
                    _formula = _self.formula;
                }
                _animation.formula = _formula;

                if(_self.from != _from){
                    _from = _self.from;
                    switch(_from){
                        case "top" :
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
                        default:
                        _position   = "-"+_width;      
                        break;
                    }
                }
                
            }

            var wordIn = function(seconds, delay){
                setWordAnimation();
                _state[_from]       = 0+"px";
                _state.opacity      = 1;

                _styleLabel[_from]  = _position;
                _animation.addEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
                _animation.play(seconds, delay);
            }

            var wordOut = function(seconds, delay){
                setWordAnimation();
                _state[_from]   = _position;
                _state.opacity  = 0;
                _animation.addEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
                _animation.play(seconds, delay);
            }
        }

        // CHARACTER RANDOM and LINEAR
        {
            var counter;
            var charIndex;
            var currentIndex;
            var increment;
            var times;
            var top;
            var charCounter;
            var randomIndex;
            var onOrderChar = function(isFirst){
                var char = LETTERS[Math.floor(Math.random()*LETTERS.length)];
                if(++counter%times == 0){
                    word[currentIndex] = _isOut ? "" : _text.charAt(currentIndex);
                    currentIndex += increment;
                    charCounter ++;
                }else{
                    word[currentIndex] = char;
                }
                _label.innerHTML = word.join("");

                if(charCounter == top){
                    clearInterval(_intervalId);
                    _label.innerHTML = _isOut ? "" : _text;
                }
            }

            var onRandomChar = function(isFirst){
                var char = LETTERS[Math.floor(Math.random()*LETTERS.length)];
                if(++counter%times == 0){
                    
                    charIndex = randomIndex[currentIndex];
                    word[charIndex] = _isOut ? "" : _text.charAt(charIndex);
                    randomIndex.splice(currentIndex, 1);
                    currentIndex = Math.floor(Math.random()*randomIndex.length);
                    charIndex = randomIndex[currentIndex];
                    charCounter ++;
                }else{
                    word[charIndex] = char;
                }
                _label.innerHTML = word.join("");

                if(charCounter == top){
                    clearInterval(_intervalId);
                }
            }
            
            var charIn = function(seconds, delay){
                _label.innerHTML    = "";
                word                = new Array(_text.length).join(" ").split("");
                _styleLabel.opacity = 1;
                _styleLabel.left    = 0;
                _styleLabel.top     = 0;

                if(!_element.contains(_container)){
                    _element.appendChild(_container);    
                }

                top         = _text.length;
                increment   = 1;
                times       = 5;
                counter     = 0;
                charCounter = 0;

                var method; 
                
                if(Label.ANIMATION_LINEAR){
                    currentIndex    = 0;
                    method = onOrderChar;
                }
                
                if(Label.ANIMATION_RANDOM){
                    randomIndex = [];
                    for(var index=0; index<top; index++){
                        randomIndex.push(index);
                    }
                    currentIndex = Math.floor(Math.random()*randomIndex.length);
                    method = onRandomChar;
                }

                var interval    = (seconds/(top*times))*1000;
                _intervalId     = setInterval(method, interval);
            }

            var charOut = function(seconds, delay){
                 _isOut             = true;
                _styleLabel.opacity = 1;
                _styleLabel.left    = 0;
                _styleLabel.top     = 0;

                top         = _text.length;
                increment   = -1;
                times       = 3;
                index       = _text.length;
                counter     = 0;
                charCounter = 0;
                var interval = (seconds/(top*times))*1000;
                _intervalId = setInterval(onOrderChar, interval);
            }
        }

        // Event emitter
        this.addEventListener = function(type, listener, context){
            _emitter.addEventListener(type, listener, context);
        }

        this.removeEventListener = function(type, listener, context){
            _emitter.removeEventListener(type, listener, context);
        }

        var emit = function(type){
            _emitter.emit(type)
        }
    }

    this.createLabel = function(text, container){
        var label = new Label(text);
            label.appendTo(container);
        return label;
    }
}