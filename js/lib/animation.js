// SPAN RANDOM
var CharAnimation = function(label, element, formula) {
    'strict mode'

    function SpanData(char, isSpinner){
        var _span               = document.createElement("span");
            _span.style.opacity = 0;
            _span.innerHTML     = char;
        this.span               = _span;
        
        var _isSpinner          = isSpinner;
        var _intervalId;
        var _charCounter        = 0;
        var _top                = 0;

        function change(){
            _span.style.opacity = _isOut ? 0 : 1;
            if(_charCounter < _top){
                var charTmp = char; 
                if(_isSpinner){
                    charTmp = LETTERS[Math.floor(LETTERS.length*Math.random())];
                }else{
                    charTmp =  char;
                }
                _span.innerHTML = charTmp; 
                _charCounter++;
            }else{
                clearInterval(_intervalId);
                _span.innerHTML = _isOut ? "" : char;
            }
        }

        this.animate = function(milliseconds, delay, isSpinner){
            clearInterval(_intervalId);
            _isSpinner              = isSpinner;
            _span.style.transition  = "all " + milliseconds + "ms";

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
            _span.innerHTML = char;
        }
    }


    var _self       = this;
    var _formula    = formula;
    var _animation  = new Yasashiku();
    var _stateFrom  = {length:0};
    var _stateTo    = {length:0};
        _animation.add(_stateFrom, _stateTo);
        _animation.addEventListener(_animation.EVENT_TICK, onTick);
        _animation.addEventListener(_animation.EVENT_COMPLETE, onAnimationComplete);
    
    var _isOut;
    var _milliseconds;
    var _span;
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

        _stateFrom.length   = _isOut ? _textLength  : 0;
        _stateTo.length     = _isOut ? 0            : _textLength;
        
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

    function onTick(event){
        console.log(_stateFrom.length);
        /*
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
        */
    }

    this.playIn = function(seconds, delay){
        _self.stop();

        _isOut              = false;
        _animation.seconds  = seconds;
        console.log("START  ///////////");
        setAnimation();
        _animation.play();
    }

    this.playOut = function(seconds, delay){
        if(null == _spanList){
            return;
        }

        _self.stop();
        _isOut              = true;
        
        _animation.seconds  = seconds;
        delay               = isNumber(delay) ? delay : 0;
        element.innerHTML   = "";

        for(var index = 0; index < _textLength; index++ ){
            _span = _spanList[index];
            element.appendChild(_span.span);
        }
    }

    this.stop = function(){
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

    function onAnimationComplete(){
        element.innerHTML = _isOut ? "" : label.text;
        
        var type = _isOut ? label.EVENT_OUT_END : label.EVENT_IN_END;
        _self.onComplete(type);

        console.log("END  ///////////");
    }

    this.onComplete = function (type){
    }
}
var LETTERS = "ABCEDEFGHIJKLNOPQRSTUVWXYZ 123456789abcdeefghijklnopqrstuvwxyz".split("");