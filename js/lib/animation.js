// CHAR ANIMATION
var SpanAnimation = function(label, element) {
    'strict mode'
    var _self       = this;
    var _styleLabel = label.styleLabel;

    var _isOut;

    var _counter;
    var _charIndex;
    var _currentIndex;
    var _times;
    var _top;
    var _charCounter;
    var _randomIndex;
    var _spanList;
    var _intervalId;

    this.text;
    this.animationType;

    this.playIn = function(seconds, delay){
        _isOut              = false;
        element.innerHTML   = "";
        _styleLabel.opacity = 1;
        _styleLabel.left    = 0;
        _styleLabel.top     = 0;
        _top                = _self.text.length;
        _currentIndex       = 0;

        clearInterval(_intervalId);
        _intervalId = setTimeout(animateChar, delay*1000);
    }

    this.playOut = function(seconds, delay){
        _isOut              = true;
            _styleLabel.opacity = 1;
            _styleLabel.left    = 0;
            _styleLabel.top     = 0;
            _top                = _self.text.length;
            _currentIndex       = 0;
            clearInterval(_intervalId);
            _intervalId = setTimeout(animateChar, delay*1000);
    }

    this.stop = function(){
        clearInterval(_intervalId);
    }

    function animateChar(){
        _times              = 5;
        _counter            = 0;
        _charCounter        = 0;
        element.innerHTML   = ""
        _spanList           = [];
        for(var index=0; index<_top; index++){
            var span                = document.createElement("char-fuji");
                span.style.display  = "inline-block";
                span.style.position = "relative";
            var char = _isOut ? _self.text.charAt(index) : " "
            _spanList.push(span);
            element.appendChild(span);
            span.innerHTML = char;
        }

        _randomIndex = [];
        for(var index=0; index<_top; index++){
            _randomIndex.push(index);
        }

        _currentIndex   = Math.floor(Math.random()*_randomIndex.length);
        _charIndex      = _randomIndex[_currentIndex];
        clearInterval(_intervalId);
        _intervalId = setInterval(onRandomChar, 45);
    }

    function onRandomChar(isFirst){
        var char = LETTERS[Math.floor(Math.random()*LETTERS.length)];
        if(++_counter%_times == 0){
            _charIndex = _randomIndex[_currentIndex];
            _spanList[_charIndex].innerHTML = _isOut ? "" : _self.text.charAt(_charIndex);
            _randomIndex.splice(_currentIndex, 1);
            _currentIndex = Math.floor(Math.random()*_randomIndex.length);
            _charIndex = _randomIndex[_currentIndex];
            _charCounter ++;
        }else{
            if(_spanList[_charIndex]== null)
            {
                debugger;
            }
            _spanList[_charIndex].innerHTML = char;
        }

        if(_charCounter == _top){
            clearInterval(_intervalId);
            var type
            if(_isOut){
                type                = _self.EVENT_OUT_END;
                //element.innerHTML   = "";
            }else{
                type                = _self.EVENT_IN_END;
                //element.innerHTML   = _self.text;
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

var LETTERS = "ABCEDEFGHIJKLNOPQRSTUVWXYZ 123456789abcdeefghijklnopqrstuvwxyz".split("");