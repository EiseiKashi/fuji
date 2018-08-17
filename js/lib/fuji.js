function Fuji (){
    'strict mode'
    var fontList = [
        "'Rajdhani', sans-serif"
       ,"'Rationale', sans-serif"
       ,"'Share Tech', monospace"
    ]

    function Label (text){
        var _self       = this;
        var _text       = text == null ? "Label" : text;
        var _fontFamily = fontList[0];
        var _fontSize   = "36px";
        var _width      = "100px";
        var _height     = (parseFloat(_fontSize)*2)+"px";
        var _from       = "bottom";
        var _position   = "-"+_height;
        var _formula    = "outBack";
        var _element    = document.body;
        var _animation  = new Yasashiku();
        var _state      = {};

        var _label;
        var _container;
        var _styleContainer;
        var _styleLabel;
        
        this.text       = _text;
        this.fontFamily = _fontFamily;
        this.fontSize   = _fontSize;
        this.width      = _width;
        this.height     = _height;
        this.formula    = _formula;
        this.from       = _from;
        
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

        this.playIn = function(seconds, delay){
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
            
            if(_self.formula != _formula){
                _formula = _self.formula;
            }
            
            if(_self.from != _from){
                switch(_from){
                    case "top" :
                    _position   = _fontSize*2;        
                    break;
                    
                    case "right" :
                    _position   = _width;      
                    break;
                    
                    case "bottom" :
                    _position   = -_fontSize*2;        
                    break;
                    
                    case "left" :
                    default:
                    _position   = -_width;      
                    break;
                }
            }
            
            _label.innerHTML            = _text;

            _styleLabel[_from]          = _position;
            _styleLabel.opacity         = 0;

            _styleContainer.fontFamily  = _fontFamily;
            _styleContainer.fontSize    = _fontSize;
            _styleContainer.width       = _width;
            _styleContainer.height      = _height;
            
            _state[_from]               = 0+"px";
            _state.opacity              = 1;

            _animation.formula          = _formula
            
            if(!_element.contains(_container)){
                _element.appendChild(_container);    
            }

            _animation.play(seconds, delay);
        }

        this.playOut = function(seconds, delay){
            _styleLabel[_from]          = 0+"px";
            _styleLabel.opacity         = 0;
            _animation.play(seconds, delay);
        }
    }
    
    this.createLabel = function(text, container){
        var label = new Label(text);
            label.appendTo(container);
        return label;
    }
}