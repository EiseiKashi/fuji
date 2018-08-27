// SPAN RANDOM
var CharAnimation = function(label, element) {
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

        _animation.formula  = label.formula;
        
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
        var length = Math.min(_stateFrom.length, _textLength);
        var lengthInt = Math.floor(length);
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

        if(null != span && _textLength != length){
            span.setOpacity(lengthDouble);
        }
    }

    this.playIn = function(seconds, delay){
        _self.stop();

        _isOut              = false;
        _animation.seconds  = seconds;
        console.log("START  ///////////", _animation.seconds);
        element.innerHTML   = "";
        setAnimation();

        delay               = isNumber(delay) ? delay : 0;
        
        clearTimeout(_idTimeout);
        _idTimeout = setTimeout(onAnimationStart, delay);        
    }

    this.playOut = function(seconds, delay){
        if(null == _spanList){
            return;
        }

        _self.stop();
        _isOut              = true;
        
        _animation.seconds  = seconds;
        element.innerHTML   = "";
        
        delay               = isNumber(delay) ? delay : 0;
        for(var index = 0; index < _textLength; index++ ){
            _span = _spanList[index];
            element.appendChild(_span.span);
        }

        clearTimeout(_idTimeout);
        _idTimeout = setTimeout(onAnimationStart, delay);
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