
/*
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
            var type = _isOut ? _self.EVENT_OUT_END : _self.EVENT_IN_END; 
            emit(type);
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
            var type
            if(_isOut){
                type = _self.EVENT_OUT_END;
                _label.innerHTML = "";
            }else{
                type = _self.EVENT_IN_END;
                _label.innerHTML = _text;
            } 
             emit(type);
        }
    }
    
    var charIn = function(seconds, delay){
        _isOut              = false;
        _label.innerHTML    = "";
        word                = new Array(_text.length).join(" ").split("");
        _styleLabel.opacity = 1;
        _styleLabel.left    = 0;
        _styleLabel.top     = 0;

        if(!_element.contains(_container)){
            _element.appendChild(_container);    
        }

        clearInterval(_intervalId);
        _intervalId = setTimeout(animateChar, delay);
    }

    var charOut = function(seconds, delay){
        _isOut             = true;
        _styleLabel.opacity = 1;
        _styleLabel.left    = 0;
        _styleLabel.top     = 0;

        clearInterval(_intervalId);
        _intervalId = setTimeout(animateChar, delay);
    }
}

var animateChar = function(method, interval){
    top         = _text.length;
    increment   = 1;
    times       = 5;
    counter     = 0;
    charCounter = 0;

    var method; 
    
    if(_self.ANIMATION_LINEAR == _self.animationType){
        currentIndex    = 0;
        method = onOrderChar;
    }
    
    if(_self.ANIMATION_RANDOM == _self.animationType){
        randomIndex = [];
        for(var index=0; index<top; index++){
            randomIndex.push(index);
        }
        currentIndex = Math.floor(Math.random()*randomIndex.length);
        method = onRandomChar;
    }

    var interval    = (seconds/(top*times))*1000;
    
    clearInterval(_intervalId);
    _intervalId = setInterval(method, interval);
}
*/