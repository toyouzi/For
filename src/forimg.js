define(function (require, exports, module) {
    "require:nomunge,exports:nomunge,module:nomunge";
    var domains = require('http://a.myhd.wumeiwang.com/hdgw/model/domains/dist/domains.js');
    var $ = require("http://a.myhd.wumeiwang.com/hdgw/model/lib/jquery/seajs-jquery-1.8.3.min.js");
    var _$ = function (t) {
        return t instanceof $ ? t : $(t);
    };
    //循环图片基类
    var wmForImg = function (op) {
        var _op;
        this.op = _op = $.extend({
            forImgBoxEle: '.wm_forimg_box',
            forImgBoxListEle: '.wm_forimg_list',
            forImgItemEle: '.for_img_item',
            forImgIndexsEle: '.index_item',
            interval: 3000
        }, op);
        this.forImgBox = _$(_op.forImgBoxEle);
        this.forImgItem = this.forImgBox.find(_op.forImgItemEle);
        this.forImgBoxList = this.forImgBox.find(_op.forImgBoxListEle);
        this.indexs = this.forImgBox.find(_op.forImgIndexsEle);
        //this.index = 0;
        this.prev = function () { };
        this.next = function () { };
        this.stop = function () { };
        this.automatic = function () { };
        this.setIndex = function () { };
    };
    //洗牌式的滑动
    var Shuffle = function (_op) {
        var self = this, _automatic;
        //继承基类
        wmForImg.apply(this, arguments);
        var isMotion = false, isAutomatic = false, direction = _op.direction;
        var _setIndex, _nextCallBack;
        _setIndex = function (LorR) {
            var $curr = self.forImgBox.find(".curr");
            var _index = $curr.index();
            $curr.removeClass("curr");
            if (LorR) {
                _index++
                if (_index >= self.indexs.length) {
                    _index = 0;
                }
            } else {
                _index--;
                if (_index < 0) {
                    _index = self.indexs.length - 1;
                }
            }
            self.indexs.eq(_index).addClass("curr");
        };
        _nextCallBack = function () {
            var $this = $(this);
            self.forImgBoxList.append($this);
            if (direction) {
                $this.css({ "height": self.Step });
            } else {
                $this.css({ "width": self.Step });
            }

            self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
        };
        this.Step = _op.Step || (direction ? this.forImgItem.eq(0).outerHeight() : this.forImgItem.eq(0).outerWidth());
        this.forImgBox.css({ "position": "relative" });
        !direction && this.forImgBoxList.css({ "position": "absolute", "width": self.Step * self.forImgItem.length });
        this.prev = function (i, callBack) {
            var eq0;
            if (isMotion) { return; }
            isMotion = true;
            i = i || 1;
            if (typeof i === "function") {
                callBack = i;
                i = 1;
            }
            while (i--) {
                _setIndex(false);
                self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
                eq0 = self.forImgItem.eq(self.forImgItem.length - 1).css((direction ? "height" : "width"), 0);
                self.forImgBoxList.prepend(eq0);
                if (direction) {
                    eq0.animate({ "height": self.Step }, 1000, function () {
                        self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                } else {
                    eq0.animate({ "width": self.Step }, 1000, function () {
                        self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                }

            }

        };
        this.next = function (i, callBack) {
            if (isMotion) { return; }
            isMotion = true;
            i = i || 1
            if (typeof i === "function") {
                callBack = i;
                i = 1;
            }
            for (var _i = 0; _i < i; _i++) {
                _setIndex(true);
                if (direction) {
                    self.forImgItem.eq(_i).animate({ "height": 0 }, 1000, function () {
                        _nextCallBack.call(this);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                } else {
                    self.forImgItem.eq(_i).animate({ "width": 0 }, 1000, function () {
                        _nextCallBack.call(this);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                }

            }
        };
        this.stop = function (_setInterval) {
            clearInterval(_setInterval || _automatic);
        };
        this.automatic = function (LorR, callback) {
            if (isAutomatic) { return }
            isAutomatic = true;

            self.forImgBox.hover(function () {
                self.stop(_automatic);
            }, function () {
                self.stop(_automatic);
                _automatic = setInterval(function () {
                    LorR ? self.next(callback) : self.prev(callback);
                }, self.op.interval);
            });
            _automatic = setInterval(function () {
                LorR ? self.next(callback) : self.prev(callback);
            }, self.op.interval);
        };
        this.setIndex = function (t) {
            var $this = _$(t), _index = self.forImgBox.find(".curr").index(), i;
            if ($this.hasClass("curr")) { return }
            //self.indexs.removeClass("curr");
            //$this.addClass("curr");
            i = _index - $this.index();
            if (i < 0) {
                self.next(Math.abs(i));
            } else {
                self.prev(i);
            }

        };
        typeof _op.callback === "function" && _op.callback.call(this);
    };
    //跑马灯式滚动
    var Slide = function (_op) {
        var self = this, _automatic;
        //继承基类
        wmForImg.apply(this, arguments);
        var isMotion = false, isAutomatic = false, direction = _op.direction;
        var _setIndex, _nextCallBack;
        _setIndex = function (LorR) {
            var $curr = self.forImgBox.find(".curr");
            var _index = $curr.index();
            $curr.removeClass("curr");
            if (LorR) {
                _index++
                if (_index >= self.indexs.length) {
                    _index = 0;
                }
            } else {
                _index--;
                if (_index < 0) {
                    _index = self.indexs.length - 1;
                }
            }
            self.indexs.eq(_index).addClass("curr");
        };
        _nextCallBack = function () {
            var $this = $(this);
            self.forImgBoxList.append($this);
            if (direction) {
                $this.css({ "marginTop": 0 });
            } else {
                $this.css({ "marginLeft": 0 });
            }

            self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
        };
        this.Step = _op.Step || (direction ? this.forImgItem.eq(0).outerHeight() : this.forImgItem.eq(0).outerWidth());
        this.forImgBox.css({ "position": "relative" });
        !direction && this.forImgBoxList.css({ "position": "absolute", "width": self.Step * self.forImgItem.length });
        this.prev = function (i, callBack) {
            var eq0;
            if (isMotion) { return; }
            isMotion = true;
            i = i || 1;
            if (typeof i === "function") {
                callBack = i;
                i = 1;
            }
            while (i--) {
                _setIndex(false);
                self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
                eq0 = self.forImgItem.eq(self.forImgItem.length - 1).css((direction ? "marginTop" : "marginLeft"), -this.Step);
                self.forImgBoxList.prepend(eq0);
                if (direction) {
                    eq0.animate({ "marginTop": 0 }, 1000, function () {
                        self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                } else {
                    eq0.animate({ "marginLeft": 0 }, 1000, function () {
                        self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                }

            }

        };
        this.next = function (i, callBack) {
            if (isMotion) { return; }
            isMotion = true;
            i = i || 1
            if (typeof i === "function") {
                callBack = i;
                i = 1;
            }
            for (var _i = 0; _i < i; _i++) {
                _setIndex(true);
                if (direction) {
                    self.forImgItem.eq(_i).animate({ "marginTop": -self.Step }, 1000, function () {
                        _nextCallBack.call(this);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                } else {
                    self.forImgItem.eq(_i).animate({ "marginLeft": -self.Step }, 1000, function () {
                        _nextCallBack.call(this);
                        isMotion = false;
                        typeof callBack === "function" && callBack.call(self);
                    });
                }
            }
        };
        this.stop = function (_setInterval) {
            clearInterval(_setInterval || _automatic);
        };
        this.automatic = function (LorR, callback) {
            if (isAutomatic) { return }
            isAutomatic = true;


            self.forImgBox.hover(function () {
                self.stop(_automatic);
            }, function () {
                self.stop(_automatic);
                _automatic = setInterval(function () {
                    LorR ? self.next(callback) : self.prev(callback);
                }, self.op.interval);
            });
            _automatic = setInterval(function () {
                LorR ? self.next(callback) : self.prev(callback);
            }, self.op.interval);
        };
        this.setIndex = function (t) {
            var $this = _$(t), _index = self.forImgBox.find(".curr").index(), i;
            if ($this.hasClass("curr")) { return }
            //self.indexs.removeClass("curr");
            //$this.addClass("curr");
            i = _index - $this.index();
            if (i < 0) {
                self.next(Math.abs(i));
            } else {
                self.prev(i);
            }

        };
        typeof _op.callback === "function" && _op.callback.call(this);
    };
    //淡入淡出
    var Fade = function (_op) {
        var self = this, _automatic;
        //继承基类
        wmForImg.apply(this, arguments);
        var isMotion = false, isAutomatic = false;
        this.forImgBox.css({ "position": "relative" })
        this.forImgBoxList.css({ "position": "relative" });
        this.forImgItem.css({ "position": "absolute", "display": "none" });
        this.forImgItem.eq(0).css({ "display": "block" });
        this.prev = function (callBack) {
            var $curr = this.forImgBox.find(self.op.forImgItemEle + ":visible"), $prev;
            $prev = $curr.prev();
            self.setIndex($prev.length ? $prev : self.forImgItem.last(), callBack);
        };
        this.next = function (callBack) {
            var $curr = this.forImgBox.find(self.op.forImgItemEle + ":visible"), $next;
            $next = $curr.next();
            self.setIndex($next.length ? $next : self.forImgItem.first(), callBack);
        };
        this.stop = function (_setInterval) {
            clearInterval(_setInterval || _automatic);
        };
        this.automatic = function (LorR, callback) {
            if (isAutomatic) { return }
            isAutomatic = true;
            self.forImgBox.hover(function () {
                self.stop(_automatic);
            }, function () {
                self.stop(_automatic);
                _automatic = setInterval(function () {
                    LorR ? self.next(callback) : self.prev(callback);
                }, self.op.interval);
            });
            _automatic = setInterval(function () {
                LorR ? self.next(callback) : self.prev(callback);
            }, self.op.interval);
        };
        this.setIndex = function (t, callBack) {
            if (isMotion) { return }
            isMotion = true;
            if (typeof t === "number") {
                t = this.forImgItem.eq(t);
            }
            var $this = _$(t), _index = $this.index();
            var $hide = this.forImgBox.find(this.op.forImgItemEle + ":visible");
            this.indexs.removeClass("curr");
            this.indexs.eq(_index).addClass("curr");
            $hide.fadeOut(500);
            self.forImgItem.eq(_index).fadeIn(1000, function () {
                isMotion = false;
                typeof callBack === "function" && callBack.call(self, $(this));
            });
        };
        typeof _op.callback === "function" && _op.callback.call(this);
    };
    /*
    改变大小
    配置比较恶心，有空优化
    */
    var ChangeSise = function (_op) {
        var self = this, _automatic;
        if (!_op.forData || _op.forData.constructor != Array || !_op.forData.length) {
            throw "forImg module interface parameters forData abnormal ChangeSise！";
        }
        var _forData = _op.forData;
        //继承基类
        wmForImg.apply(this, arguments);
        var isMotion = false, isAutomatic = false;
        this.forImgBox.css({ "position": "relative" })
        this.forImgBoxList.css({ "position": "relative" });
        var _init = function () {
            _for();
        };
        var _forImgItemLength = this.forImgItem.length;
        var _showLength = _forData.length;
        var _maxIndex = parseInt(_forImgItemLength / _showLength) + (_forImgItemLength%2?1:0);
        var _for = function (callback) {
            if (isMotion) { return }
            isMotion = true;
            self.forImgItem.each(function () {
                var $this = $(this);
                var _thisIndex = $this.index() + 1;
                var _index = _thisIndex;
                var _data = _forData[_thisIndex - 1] || _forData[_showLength - 1]
                if (_thisIndex > _maxIndex) {
                    _index = _maxIndex - (_thisIndex - _maxIndex);
                }
                if (_forData[_thisIndex - 1]) {
                    _index++;
                }
                $this.css({
                    'z-index': _index <= 0 ? 1 : _index,
                    'position': 'absolute'
                });
                if (_data.addClass) {
                    typeof _data.addClass === "function" && _data.addClass.call($this);
                    typeof _data.addClass === "string" && $this.addClass(_data.addClass);
                }
                $this.stop().animate($.extend({
                    'top': '50%',
                    'left': '50%'
                }, _data.style), self.animateOutTime || 1000, function () {
                    if (_data.removeClass) {
                        typeof _data.removeClass === "function" && _data.removeClass.call($this);
                        typeof _data.removeClass === "string" && $this.removeClass(_data.removeClass);
                    }
                    typeof callback === "function" && callback.call(self);
                    isMotion = false;
                });
            });
        };
        this.prev = function (callback) {
            if (isMotion) { return }
            var _data = _forData[_showLength - 1];
            self.forImgBoxList.append(self.forImgItem.eq(0));
            self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
            _for(callback);
        };
        this.next = function (callback) {
            if (isMotion) { return }
            var _data = _forData[0];
            self.forImgBoxList.prepend(self.forImgItem.last());
            self.forImgItem = self.forImgBox.find(self.op.forImgItemEle);
            _for(callback);
        };
        this.stop = function (_setInterval) {
            clearInterval(_setInterval || _automatic);
        };
        this.automatic = function (LorR, callback) {
            if (isAutomatic) { return }
            isAutomatic = true;
            self.forImgBox.hover(function () {
                self.stop(_automatic);
            }, function () {
                self.stop(_automatic);
                _automatic = setInterval(function () {
                    LorR ? self.next(callback) : self.prev(callback);
                }, self.op.interval);
            });
            _automatic = setInterval(function () {
                LorR ? self.next(callback) : self.prev(callback);
            }, self.op.interval);
        };
        typeof _op.callback === "function" && _op.callback.call(this);
        _init();
    };
    exports.Shuffle = Shuffle;
    exports.Slide = Slide;
    exports.Fade = Fade;
    exports.ChangeSise = ChangeSise;
});