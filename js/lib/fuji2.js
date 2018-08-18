function Fuji (){
    'strict mode'
    var fontList = [
        "'Rajdhani', sans-serif"
       ,"'Rationale', sans-serif"
       ,"'Share Tech', monospace"
    ]

    var LETTERS = "ABCEDEFGHIJKLNOPQRSTUVWXYZ 123456789abcdeefghijklnopqrstuvwxyz".split("");

    function Label (text){
        var _self       = this;
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

        var doPlay;
        this.playIn = function(seconds, delay){
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
            
            _self.formula = _self.formulaIn;
            if(_self.formula != _formula){
                _formula = _self.formula;
            }

            _label.innerHTML            = _text;
            _styleContainer.fontFamily  = _fontFamily;
            _styleContainer.fontSize    = _fontSize;
            _styleContainer.width       = _width;
            _styleContainer.height      = _height;
            _animation.formula          = _formula
            if(!_element.contains(_container)){
                _element.appendChild(_container);    
            }

            switch(this.animationType){
                case Label.ANIMATION_WORD :
                    doPlay = wordIn; 
                    break;
                default:
                     doPlay = wordIn; 
            }
            doPlay = randomCharIn;
            doPlay.apply(this, [seconds, delay]);
        }

        this.playOut = function(seconds, delay){
            clearInterval(_intervalId);
            switch(this.animationType){
                case Label.ANIMATION_WORD :
                    doPlay = wordOut; 
                    break;
                default: 
                    doPlay = wordOut; 
            }
            doPlay = randomCharOut;
            doPlay.apply(this, [seconds, delay]);
        }

        // WORD ANIMATION
        {
            var wordIn = function(seconds, delay){
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
                
                _styleLabel[_from]          = _position;
                _styleLabel.opacity         = 0;
                _state[_from]               = 0+"px";
                _state.opacity              = 1;
                
                _animation.play(seconds, delay);
            }
            var wordOut = function(seconds, delay){
                _state[_from]   = _position;
                _state.opacity  = 0;
                
                _self.formula = _self.formulaOut;
                if(_self.formula != _formula){
                    _formula = _self.formula;
                }
                _animation.formula = _formula;
                console.log(_formula);
                _animation.play(seconds, delay);
            }
        }

        // RANDOM CHARACTER
        {
            var counter;
            var index;
            var increment;
            var times;
            var top;
            var charCounter;
            var onRandomChar = function(){
                var char = LETTERS[Math.floor(Math.random()*LETTERS.length)];
                if(++counter%times == 0){
                    word[index] = isOut ? "" : _text.charAt(index);
                    index += increment;
                    charCounter ++;
                }else{
                    word[index] = char;
                }
                _label.innerHTML = word.join("");

                if(charCounter == top){
                    clearInterval(_intervalId);
                }
            }
            
            var randomCharIn = function(seconds, delay){
                isOut = false;
                _label.innerHTML    = "";
                word                = new Array(_text.length).join("").split(" ");
                _styleLabel.opacity = 1;
                _styleLabel.left    = 0;
                _styleLabel.top     = 0;

                if(!_element.contains(_container)){
                    _element.appendChild(_container);    
                }
                top         = _text.length;
                increment   = 1;
                times       = 3;
                index       = 0;
                counter     = 0;
                charCounter = 0;
                _intervalId = setInterval(onRandomChar, (seconds/(top*times))*1000);
            }

            var randomCharOut = function(seconds, delay){
                isOut = true;
                _styleLabel.opacity = 1;
                _styleLabel.left    = 0;
                _styleLabel.top     = 0;

                top         = _text.length;
                increment   = -1;
                times       = 3;
                index       = _text.length-1;
                counter     = 0;
                charCounter = 0;
                _intervalId = setTimeout(onRandomChar, seconds*1000);
            }
        }
    }

    Label.ANIMATION_WORD  = "word";
    
    this.createLabel = function(text, container){
        var label = new Label(text);
            label.appendTo(container);
        return label;
    }
}