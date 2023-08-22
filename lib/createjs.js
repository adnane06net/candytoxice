/*
 TweenJS
 Visit http://createjs.com/ for documentation, updates and examples.

 Copyright (c) 2010 gskinner.com, inc.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
 screenfull
 v5.0.0 - 2019-09-09
 (c) Sindre Sorhus; MIT License
*/
this.createjs = this.createjs || {};
createjs.extend = function (a, e) {
  function b() {
    this.constructor = a;
  }
  b.prototype = e.prototype;
  return (a.prototype = new b());
};
this.createjs = this.createjs || {};
createjs.promote = function (a, e) {
  var b = a.prototype,
    g = (Object.getPrototypeOf && Object.getPrototypeOf(b)) || b.__proto__;
  if (g) {
    b[(e += "_") + "constructor"] = g.constructor;
    for (var d in g)
      b.hasOwnProperty(d) && "function" == typeof g[d] && (b[e + d] = g[d]);
  }
  return a;
};
this.createjs = this.createjs || {};
createjs.deprecate = function (a, e) {
  return function () {
    var b = "Deprecated property or method '" + e + "'. See docs for info.";
    console && (console.warn ? console.warn(b) : console.log(b));
    return a && a.apply(this, arguments);
  };
};
this.createjs = this.createjs || {};
(function () {
  function a(b, g, d) {
    this.type = b;
    this.currentTarget = this.target = null;
    this.eventPhase = 0;
    this.bubbles = !!g;
    this.cancelable = !!d;
    this.timeStamp = new Date().getTime();
    this.removed =
      this.immediatePropagationStopped =
      this.propagationStopped =
      this.defaultPrevented =
        !1;
  }
  var e = a.prototype;
  e.preventDefault = function () {
    this.defaultPrevented = this.cancelable && !0;
  };
  e.stopPropagation = function () {
    this.propagationStopped = !0;
  };
  e.stopImmediatePropagation = function () {
    this.immediatePropagationStopped = this.propagationStopped = !0;
  };
  e.remove = function () {
    this.removed = !0;
  };
  e.clone = function () {
    return new a(this.type, this.bubbles, this.cancelable);
  };
  e.set = function (b) {
    for (var g in b) this[g] = b[g];
    return this;
  };
  e.toString = function () {
    return "[Event (type=" + this.type + ")]";
  };
  createjs.Event = a;
})();
this.createjs = this.createjs || {};
(function () {
  function a() {
    this._captureListeners = this._listeners = null;
  }
  var e = a.prototype;
  a.initialize = function (b) {
    b.addEventListener = e.addEventListener;
    b.on = e.on;
    b.removeEventListener = b.off = e.removeEventListener;
    b.removeAllEventListeners = e.removeAllEventListeners;
    b.hasEventListener = e.hasEventListener;
    b.dispatchEvent = e.dispatchEvent;
    b._dispatchEvent = e._dispatchEvent;
    b.willTrigger = e.willTrigger;
  };
  e.addEventListener = function (b, g, d) {
    var h = d
      ? (this._captureListeners = this._captureListeners || {})
      : (this._listeners = this._listeners || {});
    var k = h[b];
    k && this.removeEventListener(b, g, d);
    (k = h[b]) ? k.push(g) : (h[b] = [g]);
    return g;
  };
  e.on = function (b, g, d, h, k, l) {
    g.handleEvent && ((d = d || g), (g = g.handleEvent));
    d = d || this;
    return this.addEventListener(
      b,
      function (r) {
        g.call(d, r, k);
        h && r.remove();
      },
      l
    );
  };
  e.removeEventListener = function (b, g, d) {
    if ((d = d ? this._captureListeners : this._listeners)) {
      var h = d[b];
      if (h)
        for (var k = 0, l = h.length; k < l; k++)
          if (h[k] == g) {
            1 == l ? delete d[b] : h.splice(k, 1);
            break;
          }
    }
  };
  e.off = e.removeEventListener;
  e.removeAllEventListeners = function (b) {
    b
      ? (this._listeners && delete this._listeners[b],
        this._captureListeners && delete this._captureListeners[b])
      : (this._listeners = this._captureListeners = null);
  };
  e.dispatchEvent = function (b, g, d) {
    if ("string" == typeof b) {
      var h = this._listeners;
      if (!(g || (h && h[b]))) return !0;
      b = new createjs.Event(b, g, d);
    } else b.target && b.clone && (b = b.clone());
    try {
      b.target = this;
    } catch (k) {}
    if (b.bubbles && this.parent) {
      d = this;
      for (g = [d]; d.parent; ) g.push((d = d.parent));
      h = g.length;
      for (d = h - 1; 0 <= d && !b.propagationStopped; d--)
        g[d]._dispatchEvent(b, 1 + (0 == d));
      for (d = 1; d < h && !b.propagationStopped; d++)
        g[d]._dispatchEvent(b, 3);
    } else this._dispatchEvent(b, 2);
    return !b.defaultPrevented;
  };
  e.hasEventListener = function (b) {
    var g = this._listeners,
      d = this._captureListeners;
    return !!((g && g[b]) || (d && d[b]));
  };
  e.willTrigger = function (b) {
    for (var g = this; g; ) {
      if (g.hasEventListener(b)) return !0;
      g = g.parent;
    }
    return !1;
  };
  e.toString = function () {
    return "[EventDispatcher]";
  };
  e._dispatchEvent = function (b, g) {
    var d,
      h,
      k = 2 >= g ? this._captureListeners : this._listeners;
    if (b && k && (h = k[b.type]) && (d = h.length)) {
      try {
        b.currentTarget = this;
      } catch (r) {}
      try {
        b.eventPhase = g | 0;
      } catch (r) {}
      b.removed = !1;
      h = h.slice();
      for (k = 0; k < d && !b.immediatePropagationStopped; k++) {
        var l = h[k];
        l.handleEvent ? l.handleEvent(b) : l(b);
        b.removed && (this.off(b.type, l, 1 == g), (b.removed = !1));
      }
    }
    2 === g && this._dispatchEvent(b, 2.1);
  };
  createjs.EventDispatcher = a;
})();
this.createjs = this.createjs || {};
(function () {
  function a() {
    throw "Ticker cannot be instantiated.";
  }
  a.RAF_SYNCHED = "synched";
  a.RAF = "raf";
  a.TIMEOUT = "timeout";
  a.timingMode = null;
  a.maxDelta = 0;
  a.paused = !1;
  a.removeEventListener = null;
  a.removeAllEventListeners = null;
  a.dispatchEvent = null;
  a.hasEventListener = null;
  a._listeners = null;
  createjs.EventDispatcher.initialize(a);
  a._addEventListener = a.addEventListener;
  a.addEventListener = function () {
    !a._inited && a.init();
    return a._addEventListener.apply(a, arguments);
  };
  a._inited = !1;
  a._startTime = 0;
  a._pausedTime = 0;
  a._ticks = 0;
  a._pausedTicks = 0;
  a._interval = 50;
  a._lastTime = 0;
  a._times = null;
  a._tickTimes = null;
  a._timerId = null;
  a._raf = !0;
  a._setInterval = function (g) {
    a._interval = g;
    a._inited && a._setupTick();
  };
  a.setInterval = createjs.deprecate(a._setInterval, "Ticker.setInterval");
  a._getInterval = function () {
    return a._interval;
  };
  a.getInterval = createjs.deprecate(a._getInterval, "Ticker.getInterval");
  a._setFPS = function (g) {
    a._setInterval(1e3 / g);
  };
  a.setFPS = createjs.deprecate(a._setFPS, "Ticker.setFPS");
  a._getFPS = function () {
    return 1e3 / a._interval;
  };
  a.getFPS = createjs.deprecate(a._getFPS, "Ticker.getFPS");
  try {
    Object.defineProperties(a, {
      interval: { get: a._getInterval, set: a._setInterval },
      framerate: { get: a._getFPS, set: a._setFPS },
    });
  } catch (g) {
    console.log(g);
  }
  a.init = function () {
    a._inited ||
      ((a._inited = !0),
      (a._times = []),
      (a._tickTimes = []),
      (a._startTime = a._getTime()),
      a._times.push((a._lastTime = 0)),
      (a.interval = a._interval));
  };
  a.reset = function () {
    if (a._raf) {
      var g =
        window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame;
      g && g(a._timerId);
    } else clearTimeout(a._timerId);
    a.removeAllEventListeners("tick");
    a._timerId = a._times = a._tickTimes = null;
    a._startTime = a._lastTime = a._ticks = a._pausedTime = 0;
    a._inited = !1;
  };
  a.getMeasuredTickTime = function (g) {
    var d = 0,
      h = a._tickTimes;
    if (!h || 1 > h.length) return -1;
    g = Math.min(h.length, g || a._getFPS() | 0);
    for (var k = 0; k < g; k++) d += h[k];
    return d / g;
  };
  a.getMeasuredFPS = function (g) {
    var d = a._times;
    if (!d || 2 > d.length) return -1;
    g = Math.min(d.length - 1, g || a._getFPS() | 0);
    return 1e3 / ((d[0] - d[g]) / g);
  };
  a.getTime = function (g) {
    return a._startTime ? a._getTime() - (g ? a._pausedTime : 0) : -1;
  };
  a.getEventTime = function (g) {
    return a._startTime
      ? (a._lastTime || a._startTime) - (g ? a._pausedTime : 0)
      : -1;
  };
  a.getTicks = function (g) {
    return a._ticks - (g ? a._pausedTicks : 0);
  };
  a._handleSynch = function () {
    a._timerId = null;
    a._setupTick();
    a._getTime() - a._lastTime >= 0.97 * (a._interval - 1) && a._tick();
  };
  a._handleRAF = function () {
    a._timerId = null;
    a._setupTick();
    a._tick();
  };
  a._handleTimeout = function () {
    a._timerId = null;
    a._setupTick();
    a._tick();
  };
  a._setupTick = function () {
    if (null == a._timerId) {
      var g = a.timingMode;
      if (g == a.RAF_SYNCHED || g == a.RAF) {
        var d =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame;
        if (d) {
          a._timerId = d(g == a.RAF ? a._handleRAF : a._handleSynch);
          a._raf = !0;
          return;
        }
      }
      a._raf = !1;
      a._timerId = setTimeout(a._handleTimeout, a._interval);
    }
  };
  a._tick = function () {
    var g = a.paused,
      d = a._getTime(),
      h = d - a._lastTime;
    a._lastTime = d;
    a._ticks++;
    g && (a._pausedTicks++, (a._pausedTime += h));
    if (a.hasEventListener("tick")) {
      var k = new createjs.Event("tick"),
        l = a.maxDelta;
      k.delta = l && h > l ? l : h;
      k.paused = g;
      k.time = d;
      k.runTime = d - a._pausedTime;
      a.dispatchEvent(k);
    }
    for (a._tickTimes.unshift(a._getTime() - d); 100 < a._tickTimes.length; )
      a._tickTimes.pop();
    for (a._times.unshift(d); 100 < a._times.length; ) a._times.pop();
  };
  var e = window,
    b =
      e.performance.now ||
      e.performance.mozNow ||
      e.performance.msNow ||
      e.performance.oNow ||
      e.performance.webkitNow;
  a._getTime = function () {
    return (
      ((b && b.call(e.performance)) || new Date().getTime()) - a._startTime
    );
  };
  createjs.Ticker = a;
})();
this.createjs = this.createjs || {};
(function () {
  function a(b) {
    this.EventDispatcher_constructor();
    this.ignoreGlobalPause = !1;
    this.loop = 0;
    this.bounce = this.reversed = this.useTicks = !1;
    this.timeScale = 1;
    this.position = this.duration = 0;
    this.rawPosition = -1;
    this._paused = !0;
    this._labelList =
      this._labels =
      this._parent =
      this._prev =
      this._next =
        null;
    b &&
      ((this.useTicks = !!b.useTicks),
      (this.ignoreGlobalPause = !!b.ignoreGlobalPause),
      (this.loop = !0 === b.loop ? -1 : b.loop || 0),
      (this.reversed = !!b.reversed),
      (this.bounce = !!b.bounce),
      (this.timeScale = b.timeScale || 1),
      b.onChange && this.addEventListener("change", b.onChange),
      b.onComplete && this.addEventListener("complete", b.onComplete));
  }
  var e = createjs.extend(a, createjs.EventDispatcher);
  e._setPaused = function (b) {
    createjs.Tween._register(this, b);
    return this;
  };
  e.setPaused = createjs.deprecate(e._setPaused, "AbstractTween.setPaused");
  e._getPaused = function () {
    return this._paused;
  };
  e.getPaused = createjs.deprecate(e._getPaused, "AbstactTween.getPaused");
  e._getCurrentLabel = function (b) {
    var g = this.getLabels();
    null == b && (b = this.position);
    for (var d = 0, h = g.length; d < h && !(b < g[d].position); d++);
    return 0 === d ? null : g[d - 1].label;
  };
  e.getCurrentLabel = createjs.deprecate(
    e._getCurrentLabel,
    "AbstractTween.getCurrentLabel"
  );
  try {
    Object.defineProperties(e, {
      paused: { set: e._setPaused, get: e._getPaused },
      currentLabel: { get: e._getCurrentLabel },
    });
  } catch (b) {}
  e.advance = function (b, g) {
    this.setPosition(this.rawPosition + b * this.timeScale, g);
  };
  e.setPosition = function (b, g, d, h) {
    var k = this.duration,
      l = this.loop,
      r = this.rawPosition,
      y = 0;
    0 > b && (b = 0);
    if (0 === k) {
      var t = !0;
      if (-1 !== r) return t;
    } else {
      var z = (b / k) | 0;
      y = b - z * k;
      (t = -1 !== l && b >= l * k + k) && (b = (y = k) * (z = l) + k);
      if (b === r) return t;
      !this.reversed !== !(this.bounce && z % 2) && (y = k - y);
    }
    this.position = y;
    this.rawPosition = b;
    this._updatePosition(d, t);
    t && (this.paused = !0);
    h && h(this);
    g || this._runActions(r, b, d, !d && -1 === r);
    this.dispatchEvent("change");
    t && this.dispatchEvent("complete");
  };
  e.calculatePosition = function (b) {
    var g = this.duration,
      d = this.loop,
      h = 0;
    if (0 === g) return 0;
    -1 !== d && b >= d * g + g
      ? ((b = g), (h = d))
      : 0 > b
      ? (b = 0)
      : ((h = (b / g) | 0), (b -= h * g));
    return !this.reversed !== !(this.bounce && h % 2) ? g - b : b;
  };
  e.getLabels = function () {
    var b = this._labelList;
    if (!b) {
      b = this._labelList = [];
      var g = this._labels,
        d;
      for (d in g) b.push({ label: d, position: g[d] });
      b.sort(function (h, k) {
        return h.position - k.position;
      });
    }
    return b;
  };
  e.setLabels = function (b) {
    this._labels = b;
    this._labelList = null;
  };
  e.addLabel = function (b, g) {
    this._labels || (this._labels = {});
    this._labels[b] = g;
    var d = this._labelList;
    if (d) {
      for (var h = 0, k = d.length; h < k && !(g < d[h].position); h++);
      d.splice(h, 0, { label: b, position: g });
    }
  };
  e.gotoAndPlay = function (b) {
    this.paused = !1;
    this._goto(b);
  };
  e.gotoAndStop = function (b) {
    this.paused = !0;
    this._goto(b);
  };
  e.resolve = function (b) {
    var g = Number(b);
    isNaN(g) && (g = this._labels && this._labels[b]);
    return g;
  };
  e.toString = function () {
    return "[AbstractTween]";
  };
  e.clone = function () {
    throw "AbstractTween can not be cloned.";
  };
  e._init = function (b) {
    (b && b.paused) || (this.paused = !1);
    b && null != b.position && this.setPosition(b.position);
  };
  e._updatePosition = function (b, g) {};
  e._goto = function (b) {
    b = this.resolve(b);
    null != b && this.setPosition(b, !1, !0);
  };
  e._runActions = function (b, g, d, h) {
    if (this._actionHead || this.tweens) {
      var k = this.duration,
        l = this.reversed,
        r = this.bounce,
        y = this.loop,
        t,
        z,
        D;
      if (0 === k) {
        var u = (t = z = D = 0);
        l = r = !1;
      } else
        (u = (b / k) | 0), (t = (g / k) | 0), (z = b - u * k), (D = g - t * k);
      -1 !== y && (t > y && ((D = k), (t = y)), u > y && ((z = k), (u = y)));
      if (d) return this._runActionsRange(D, D, d, h);
      if (u !== t || z !== D || d || h) {
        -1 === u && (u = z = 0);
        b = b <= g;
        g = u;
        do {
          y = g === u ? z : b ? 0 : k;
          var m = g === t ? D : b ? k : 0;
          !l !== !(r && g % 2) && ((y = k - y), (m = k - m));
          if (
            (!r || g === u || y !== m) &&
            this._runActionsRange(y, m, d, h || (g !== u && !r))
          )
            return !0;
          h = !1;
        } while ((b && ++g <= t) || (!b && --g >= t));
      }
    }
  };
  e._runActionsRange = function (b, g, d, h) {};
  createjs.AbstractTween = createjs.promote(a, "EventDispatcher");
})();
this.createjs = this.createjs || {};
(function () {
  function a(d, h) {
    this.AbstractTween_constructor(h);
    this.pluginData = null;
    this.target = d;
    this.passive = !1;
    this._stepTail = this._stepHead = new e(null, 0, 0, {}, null, !0);
    this._stepPosition = 0;
    this._injected =
      this._pluginIds =
      this._plugins =
      this._actionTail =
      this._actionHead =
        null;
    h && ((this.pluginData = h.pluginData), h.override && a.removeTweens(d));
    this.pluginData || (this.pluginData = {});
    this._init(h);
  }
  function e(d, h, k, l, r, y) {
    this.next = null;
    this.prev = d;
    this.t = h;
    this.d = k;
    this.props = l;
    this.ease = r;
    this.passive = y;
    this.index = d ? d.index + 1 : 0;
  }
  function b(d, h, k, l, r) {
    this.next = null;
    this.prev = d;
    this.t = h;
    this.d = 0;
    this.scope = k;
    this.funct = l;
    this.params = r;
  }
  var g = createjs.extend(a, createjs.AbstractTween);
  a.IGNORE = {};
  a._tweens = [];
  a._plugins = null;
  a._tweenHead = null;
  a._tweenTail = null;
  a.get = function (d, h) {
    return new a(d, h);
  };
  a.tick = function (d, h) {
    for (var k = a._tweenHead; k; ) {
      var l = k._next;
      (h && !k.ignoreGlobalPause) || k._paused || k.advance(k.useTicks ? 1 : d);
      k = l;
    }
  };
  a.handleEvent = function (d) {
    "tick" === d.type && this.tick(d.delta, d.paused);
  };
  a.removeTweens = function (d) {
    if (d.tweenjs_count) {
      for (var h = a._tweenHead; h; ) {
        var k = h._next;
        h.target === d && a._register(h, !0);
        h = k;
      }
      d.tweenjs_count = 0;
    }
  };
  a.removeAllTweens = function () {
    for (var d = a._tweenHead; d; ) {
      var h = d._next;
      d._paused = !0;
      d.target && (d.target.tweenjs_count = 0);
      d._next = d._prev = null;
      d = h;
    }
    a._tweenHead = a._tweenTail = null;
  };
  a.hasActiveTweens = function (d) {
    return d ? !!d.tweenjs_count : !!a._tweenHead;
  };
  a._installPlugin = function (d) {
    for (
      var h = (d.priority = d.priority || 0),
        k = (a._plugins = a._plugins || []),
        l = 0,
        r = k.length;
      l < r && !(h < k[l].priority);
      l++
    );
    k.splice(l, 0, d);
  };
  a._register = function (d, h) {
    var k = d.target;
    if (!h && d._paused)
      k && (k.tweenjs_count = k.tweenjs_count ? k.tweenjs_count + 1 : 1),
        (k = a._tweenTail)
          ? ((a._tweenTail = k._next = d), (d._prev = k))
          : (a._tweenHead = a._tweenTail = d),
        !a._inited &&
          createjs.Ticker &&
          (createjs.Ticker.addEventListener("tick", a), (a._inited = !0));
    else if (h && !d._paused) {
      k && k.tweenjs_count--;
      k = d._next;
      var l = d._prev;
      k ? (k._prev = l) : (a._tweenTail = l);
      l ? (l._next = k) : (a._tweenHead = k);
      d._next = d._prev = null;
    }
    d._paused = h;
  };
  g.wait = function (d, h) {
    0 < d && this._addStep(+d, this._stepTail.props, null, h);
    return this;
  };
  g.to = function (d, h, k) {
    if (null == h || 0 > h) h = 0;
    h = this._addStep(+h, null, k);
    this._appendProps(d, h);
    return this;
  };
  g.label = function (d) {
    this.addLabel(d, this.duration);
    return this;
  };
  g.call = function (d, h, k) {
    return this._addAction(k || this.target, d, h || [this]);
  };
  g.set = function (d, h) {
    return this._addAction(h || this.target, this._set, [d]);
  };
  g.play = function (d) {
    return this._addAction(d || this, this._set, [{ paused: !1 }]);
  };
  g.pause = function (d) {
    return this._addAction(d || this, this._set, [{ paused: !0 }]);
  };
  g.w = g.wait;
  g.t = g.to;
  g.c = g.call;
  g.s = g.set;
  g.toString = function () {
    return "[Tween]";
  };
  g.clone = function () {
    throw "Tween can not be cloned.";
  };
  g._addPlugin = function (d) {
    var h = this._pluginIds || (this._pluginIds = {}),
      k = d.ID;
    if (k && !h[k]) {
      h[k] = !0;
      h = this._plugins || (this._plugins = []);
      k = d.priority || 0;
      for (var l = 0, r = h.length; l < r; l++)
        if (k < h[l].priority) {
          h.splice(l, 0, d);
          return;
        }
      h.push(d);
    }
  };
  g._updatePosition = function (d, h) {
    var k = this._stepHead.next,
      l = this.position,
      r = this.duration;
    if (this.target && k) {
      for (var y = k.next; y && y.t <= l; ) (k = k.next), (y = k.next);
      this._updateTargetProps(
        k,
        h ? (0 === r ? 1 : l / r) : (l - k.t) / k.d,
        h
      );
    }
    this._stepPosition = k ? l - k.t : 0;
  };
  g._updateTargetProps = function (d, h, k) {
    if (!(this.passive = !!d.passive)) {
      var l,
        r = d.prev.props,
        y = d.props;
      if ((l = d.ease)) h = l(h, 0, 1, 1);
      l = this._plugins;
      var t;
      a: for (t in r) {
        var z = r[t];
        var D = y[t];
        z = z !== D && "number" === typeof z ? z + (D - z) * h : 1 <= h ? D : z;
        if (l) {
          D = 0;
          for (var u = l.length; D < u; D++) {
            var m = l[D].change(this, d, t, z, h, k);
            if (m === a.IGNORE) continue a;
            void 0 !== m && (z = m);
          }
        }
        this.target[t] = z;
      }
    }
  };
  g._runActionsRange = function (d, h, k, l) {
    var r = (k = d > h) ? this._actionTail : this._actionHead,
      y = h,
      t = d;
    k && ((y = d), (t = h));
    for (var z = this.position; r; ) {
      var D = r.t;
      if (D === h || (D > t && D < y) || (l && D === d))
        if ((r.funct.apply(r.scope, r.params), z !== this.position)) return !0;
      r = k ? r.prev : r.next;
    }
  };
  g._appendProps = function (d, h, k) {
    var l = this._stepHead.props,
      r = this.target,
      y = a._plugins,
      t,
      z,
      D = h.prev,
      u = D.props,
      m = h.props || (h.props = this._cloneProps(u)),
      p = {};
    for (t in d)
      if (d.hasOwnProperty(t) && ((p[t] = m[t] = d[t]), void 0 === l[t])) {
        var A = void 0;
        if (y)
          for (z = y.length - 1; 0 <= z; z--) {
            var C = y[z].init(this, t, A);
            void 0 !== C && (A = C);
            if (A === a.IGNORE) {
              delete m[t];
              delete p[t];
              break;
            }
          }
        A !== a.IGNORE &&
          (void 0 === A && (A = r[t]), (u[t] = void 0 === A ? null : A));
      }
    for (t in p) {
      var x;
      for (d = D; (x = d) && (d = x.prev); )
        if (d.props !== x.props) {
          if (void 0 !== d.props[t]) break;
          d.props[t] = u[t];
        }
    }
    if (!1 !== k && (y = this._plugins))
      for (z = y.length - 1; 0 <= z; z--) y[z].step(this, h, p);
    if ((k = this._injected))
      (this._injected = null), this._appendProps(k, h, !1);
  };
  g._injectProp = function (d, h) {
    (this._injected || (this._injected = {}))[d] = h;
  };
  g._addStep = function (d, h, k, l) {
    h = new e(this._stepTail, this.duration, d, h, k, l || !1);
    this.duration += d;
    return (this._stepTail = this._stepTail.next = h);
  };
  g._addAction = function (d, h, k) {
    d = new b(this._actionTail, this.duration, d, h, k);
    this._actionTail ? (this._actionTail.next = d) : (this._actionHead = d);
    this._actionTail = d;
    return this;
  };
  g._set = function (d) {
    for (var h in d) this[h] = d[h];
  };
  g._cloneProps = function (d) {
    var h = {},
      k;
    for (k in d) h[k] = d[k];
    return h;
  };
  createjs.Tween = createjs.promote(a, "AbstractTween");
})();
this.createjs = this.createjs || {};
(function () {
  function a(b) {
    if (b instanceof Array || (null == b && 1 < arguments.length)) {
      var g = b;
      var d = arguments[1];
      b = arguments[2];
    } else b && ((g = b.tweens), (d = b.labels));
    this.AbstractTween_constructor(b);
    this.tweens = [];
    g && this.addTween.apply(this, g);
    this.setLabels(d);
    this._init(b);
  }
  var e = createjs.extend(a, createjs.AbstractTween);
  e.addTween = function (b) {
    b._parent && b._parent.removeTween(b);
    var g = arguments.length;
    if (1 < g) {
      for (var d = 0; d < g; d++) this.addTween(arguments[d]);
      return arguments[g - 1];
    }
    if (0 === g) return null;
    this.tweens.push(b);
    b._parent = this;
    b.paused = !0;
    g = b.duration;
    0 < b.loop && (g *= b.loop + 1);
    g > this.duration && (this.duration = g);
    0 <= this.rawPosition && b.setPosition(this.rawPosition);
    return b;
  };
  e.removeTween = function (b) {
    var g = arguments.length;
    if (1 < g) {
      for (var d = !0, h = 0; h < g; h++)
        d = d && this.removeTween(arguments[h]);
      return d;
    }
    if (0 === g) return !0;
    g = this.tweens;
    for (h = g.length; h--; )
      if (g[h] === b)
        return (
          g.splice(h, 1),
          (b._parent = null),
          b.duration >= this.duration && this.updateDuration(),
          !0
        );
    return !1;
  };
  e.updateDuration = function () {
    for (var b = (this.duration = 0), g = this.tweens.length; b < g; b++) {
      var d = this.tweens[b],
        h = d.duration;
      0 < d.loop && (h *= d.loop + 1);
      h > this.duration && (this.duration = h);
    }
  };
  e.toString = function () {
    return "[Timeline]";
  };
  e.clone = function () {
    throw "Timeline can not be cloned.";
  };
  e._updatePosition = function (b, g) {
    for (var d = this.position, h = 0, k = this.tweens.length; h < k; h++)
      this.tweens[h].setPosition(d, !0, b);
  };
  e._runActionsRange = function (b, g, d, h) {
    for (var k = this.position, l = 0, r = this.tweens.length; l < r; l++)
      if ((this.tweens[l]._runActions(b, g, d, h), k !== this.position))
        return !0;
  };
  createjs.Timeline = createjs.promote(a, "AbstractTween");
})();
this.createjs = this.createjs || {};
(function () {
  function a() {
    throw "Ease cannot be instantiated.";
  }
  a.linear = function (e) {
    return e;
  };
  a.none = a.linear;
  a.get = function (e) {
    -1 > e ? (e = -1) : 1 < e && (e = 1);
    return function (b) {
      return 0 == e
        ? b
        : 0 > e
        ? b * (b * -e + 1 + e)
        : b * ((2 - b) * e + (1 - e));
    };
  };
  a.getPowIn = function (e) {
    return function (b) {
      return Math.pow(b, e);
    };
  };
  a.getPowOut = function (e) {
    return function (b) {
      return 1 - Math.pow(1 - b, e);
    };
  };
  a.getPowInOut = function (e) {
    return function (b) {
      return 1 > (b *= 2)
        ? 0.5 * Math.pow(b, e)
        : 1 - 0.5 * Math.abs(Math.pow(2 - b, e));
    };
  };
  a.quadIn = a.getPowIn(2);
  a.quadOut = a.getPowOut(2);
  a.quadInOut = a.getPowInOut(2);
  a.cubicIn = a.getPowIn(3);
  a.cubicOut = a.getPowOut(3);
  a.cubicInOut = a.getPowInOut(3);
  a.quartIn = a.getPowIn(4);
  a.quartOut = a.getPowOut(4);
  a.quartInOut = a.getPowInOut(4);
  a.quintIn = a.getPowIn(5);
  a.quintOut = a.getPowOut(5);
  a.quintInOut = a.getPowInOut(5);
  a.sineIn = function (e) {
    return 1 - Math.cos((e * Math.PI) / 2);
  };
  a.sineOut = function (e) {
    return Math.sin((e * Math.PI) / 2);
  };
  a.sineInOut = function (e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  };
  a.getBackIn = function (e) {
    return function (b) {
      return b * b * ((e + 1) * b - e);
    };
  };
  a.backIn = a.getBackIn(1.7);
  a.getBackOut = function (e) {
    return function (b) {
      return --b * b * ((e + 1) * b + e) + 1;
    };
  };
  a.backOut = a.getBackOut(1.7);
  a.getBackInOut = function (e) {
    e *= 1.525;
    return function (b) {
      return 1 > (b *= 2)
        ? 0.5 * b * b * ((e + 1) * b - e)
        : 0.5 * ((b -= 2) * b * ((e + 1) * b + e) + 2);
    };
  };
  a.backInOut = a.getBackInOut(1.7);
  a.circIn = function (e) {
    return -(Math.sqrt(1 - e * e) - 1);
  };
  a.circOut = function (e) {
    return Math.sqrt(1 - --e * e);
  };
  a.circInOut = function (e) {
    return 1 > (e *= 2)
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  };
  a.bounceIn = function (e) {
    return 1 - a.bounceOut(1 - e);
  };
  a.bounceOut = function (e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  };
  a.bounceInOut = function (e) {
    return 0.5 > e
      ? 0.5 * a.bounceIn(2 * e)
      : 0.5 * a.bounceOut(2 * e - 1) + 0.5;
  };
  a.getElasticIn = function (e, b) {
    var g = 2 * Math.PI;
    return function (d) {
      if (0 == d || 1 == d) return d;
      var h = (b / g) * Math.asin(1 / e);
      return -(e * Math.pow(2, 10 * --d) * Math.sin(((d - h) * g) / b));
    };
  };
  a.elasticIn = a.getElasticIn(1, 0.3);
  a.getElasticOut = function (e, b) {
    var g = 2 * Math.PI;
    return function (d) {
      return 0 == d || 1 == d
        ? d
        : e *
            Math.pow(2, -10 * d) *
            Math.sin(((d - (b / g) * Math.asin(1 / e)) * g) / b) +
            1;
    };
  };
  a.elasticOut = a.getElasticOut(1, 0.3);
  a.getElasticInOut = function (e, b) {
    var g = 2 * Math.PI;
    return function (d) {
      var h = (b / g) * Math.asin(1 / e);
      return 1 > (d *= 2)
        ? -0.5 * e * Math.pow(2, 10 * --d) * Math.sin(((d - h) * g) / b)
        : e * Math.pow(2, -10 * --d) * Math.sin(((d - h) * g) / b) * 0.5 + 1;
    };
  };
  a.elasticInOut = a.getElasticInOut(1, 0.3 * 1.5);
  createjs.Ease = a;
})();
this.createjs = this.createjs || {};
(function () {
  function a() {
    throw "MotionGuidePlugin cannot be instantiated.";
  }
  a.priority = 0;
  a.ID = "MotionGuide";
  a.install = function () {
    createjs.Tween._installPlugin(a);
    return createjs.Tween.IGNORE;
  };
  a.init = function (e, b, g) {
    "guide" == b && e._addPlugin(a);
  };
  a.step = function (e, b, g) {
    for (var d in g)
      if ("guide" === d) {
        var h = b.props.guide,
          k = a._solveGuideData(g.guide, h);
        h.valid = !k;
        var l = h.endData;
        e._injectProp("x", l.x);
        e._injectProp("y", l.y);
        if (k || !h.orient) break;
        h.startOffsetRot =
          (void 0 === b.prev.props.rotation
            ? e.target.rotation || 0
            : b.prev.props.rotation) - h.startData.rotation;
        if ("fixed" == h.orient)
          (h.endAbsRot = l.rotation + h.startOffsetRot), (h.deltaRotation = 0);
        else {
          k = void 0 === g.rotation ? e.target.rotation || 0 : g.rotation;
          l = k - h.endData.rotation - h.startOffsetRot;
          var r = l % 360;
          h.endAbsRot = k;
          switch (h.orient) {
            case "auto":
              h.deltaRotation = l;
              break;
            case "cw":
              h.deltaRotation =
                ((r + 360) % 360) + 360 * Math.abs((l / 360) | 0);
              break;
            case "ccw":
              h.deltaRotation =
                ((r - 360) % 360) + -360 * Math.abs((l / 360) | 0);
          }
        }
        e._injectProp("rotation", h.endAbsRot);
      }
  };
  a.change = function (e, b, g, d, h, k) {
    if (
      (d = b.props.guide) &&
      b.props !== b.prev.props &&
      d !== b.prev.props.guide
    ) {
      if (
        ("guide" === g && !d.valid) ||
        "x" == g ||
        "y" == g ||
        ("rotation" === g && d.orient)
      )
        return createjs.Tween.IGNORE;
      a._ratioToPositionData(h, d, e.target);
    }
  };
  a.debug = function (e, b, g) {
    e = e.guide || e;
    var d = a._findPathProblems(e);
    d && console.error("MotionGuidePlugin Error found: \n" + d);
    if (!b) return d;
    var h,
      k = e.path,
      l = k.length;
    b.save();
    b.lineCap = "round";
    b.lineJoin = "miter";
    b.beginPath();
    b.moveTo(k[0], k[1]);
    for (h = 2; h < l; h += 4)
      b.quadraticCurveTo(k[h], k[h + 1], k[h + 2], k[h + 3]);
    b.strokeStyle = "black";
    b.lineWidth = 4.5;
    b.stroke();
    b.strokeStyle = "white";
    b.lineWidth = 3;
    b.stroke();
    b.closePath();
    k = g.length;
    if (g && k) {
      l = {};
      var r = {};
      a._solveGuideData(e, l);
      for (h = 0; h < k; h++)
        (l.orient = "fixed"),
          a._ratioToPositionData(g[h], l, r),
          b.beginPath(),
          b.moveTo(r.x, r.y),
          b.lineTo(
            r.x + 9 * Math.cos(0.0174533 * r.rotation),
            r.y + 9 * Math.sin(0.0174533 * r.rotation)
          ),
          (b.strokeStyle = "black"),
          (b.lineWidth = 4.5),
          b.stroke(),
          (b.strokeStyle = "red"),
          (b.lineWidth = 3),
          b.stroke(),
          b.closePath();
    }
    b.restore();
    return d;
  };
  a._solveGuideData = function (e, b) {
    var g;
    if ((g = a.debug(e))) return g;
    var d = (b.path = e.path);
    b.orient = e.orient;
    b.subLines = [];
    b.totalLength = 0;
    b.startOffsetRot = 0;
    b.deltaRotation = 0;
    b.startData = { ratio: 0 };
    b.endData = { ratio: 1 };
    b.animSpan = 1;
    var h = d.length,
      k,
      l = {};
    var r = d[0];
    var y = d[1];
    for (g = 2; g < h; g += 4) {
      var t = d[g];
      var z = d[g + 1];
      var D = d[g + 2];
      var u = d[g + 3];
      var m = { weightings: [], estLength: 0, portion: 0 },
        p = r;
      var A = y;
      for (k = 1; 10 >= k; k++)
        a._getParamsForCurve(r, y, t, z, D, u, k / 10, !1, l),
          (p = l.x - p),
          (A = l.y - A),
          (A = Math.sqrt(p * p + A * A)),
          m.weightings.push(A),
          (m.estLength += A),
          (p = l.x),
          (A = l.y);
      b.totalLength += m.estLength;
      for (k = 0; 10 > k; k++) (A = m.estLength), (m.weightings[k] /= A);
      b.subLines.push(m);
      r = D;
      y = u;
    }
    A = b.totalLength;
    d = b.subLines.length;
    for (g = 0; g < d; g++) b.subLines[g].portion = b.subLines[g].estLength / A;
    g = isNaN(e.start) ? 0 : e.start;
    d = isNaN(e.end) ? 1 : e.end;
    a._ratioToPositionData(g, b, b.startData);
    a._ratioToPositionData(d, b, b.endData);
    b.startData.ratio = g;
    b.endData.ratio = d;
    b.animSpan = b.endData.ratio - b.startData.ratio;
  };
  a._ratioToPositionData = function (e, b, g) {
    var d = b.subLines,
      h,
      k = 0,
      l = e * b.animSpan + b.startData.ratio;
    var r = d.length;
    for (h = 0; h < r; h++) {
      var y = d[h].portion;
      if (k + y >= l) {
        var t = h;
        break;
      }
      k += y;
    }
    void 0 === t && ((t = r - 1), (k -= y));
    d = d[t].weightings;
    var z = y;
    r = d.length;
    for (h = 0; h < r; h++) {
      y = d[h] * z;
      if (k + y >= l) break;
      k += y;
    }
    t = 4 * t + 2;
    r = b.path;
    a._getParamsForCurve(
      r[t - 2],
      r[t - 1],
      r[t],
      r[t + 1],
      r[t + 2],
      r[t + 3],
      h / 10 + ((l - k) / y) * 0.1,
      b.orient,
      g
    );
    b.orient &&
      (g.rotation =
        0.99999 <= e && 1.00001 >= e && void 0 !== b.endAbsRot
          ? b.endAbsRot
          : g.rotation + (b.startOffsetRot + e * b.deltaRotation));
    return g;
  };
  a._getParamsForCurve = function (e, b, g, d, h, k, l, r, y) {
    var t = 1 - l;
    y.x = t * t * e + 2 * t * l * g + l * l * h;
    y.y = t * t * b + 2 * t * l * d + l * l * k;
    r &&
      (y.rotation =
        57.2957795 *
        Math.atan2((d - b) * t + (k - d) * l, (g - e) * t + (h - g) * l));
  };
  a._findPathProblems = function (e) {
    var b = e.path,
      g = (b && b.length) || 0;
    if (6 > g || (g - 2) % 4)
      return (
        "\tCannot parse 'path' array due to invalid number of entries in path. There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\nOnly [ " +
        (g +
          " ] values found. Expected: " +
          Math.max(4 * Math.ceil((g - 2) / 4) + 2, 6))
      );
    for (var d = 0; d < g; d++)
      if (isNaN(b[d])) return "All data in path array must be numeric";
    b = e.start;
    if (isNaN(b) && void 0 !== b)
      return "'start' out of bounds. Expected 0 to 1, got: " + b;
    b = e.end;
    if (isNaN(b) && void 0 !== b)
      return "'end' out of bounds. Expected 0 to 1, got: " + b;
    if (
      (e = e.orient) &&
      "fixed" != e &&
      "auto" != e &&
      "cw" != e &&
      "ccw" != e
    )
      return (
        'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' +
        e
      );
  };
  createjs.MotionGuidePlugin = a;
})();
this.createjs = this.createjs || {};
(function () {
  var a = (createjs.TweenJS = createjs.TweenJS || {});
  a.version = "1.0.0";
  a.buildDate = "Thu, 14 Sep 2017 19:47:47 GMT";
})();
(function () {
  function a(x) {
    x = String(x);
    return x.charAt(0).toUpperCase() + x.slice(1);
  }
  function e(x, w) {
    var H = -1,
      v = x ? x.length : 0;
    if ("number" == typeof v && -1 < v && v <= u)
      for (; ++H < v; ) w(x[H], H, x);
    else g(x, w);
  }
  function b(x) {
    x = String(x).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(x) ? x : a(x);
  }
  function g(x, w) {
    for (var H in x) p.call(x, H) && w(x[H], H, x);
  }
  function d(x) {
    return null == x ? a(x) : A.call(x).slice(8, -1);
  }
  function h(x, w) {
    var H = null != x ? typeof x[w] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(H) &&
      ("object" == H ? !!x[w] : !0)
    );
  }
  function k(x) {
    return String(x).replace(/([ -])(?!$)/g, "$1?");
  }
  function l(x, w) {
    var H = null;
    e(x, function (v, G) {
      H = w(H, v, G, x);
    });
    return H;
  }
  function r(x) {
    function w(X) {
      return l(X, function (T, U) {
        var da = U.pattern || k(U);
        !T &&
          (T =
            RegExp("\\b" + da + " *\\d+[.\\w_]*", "i").exec(x) ||
            RegExp("\\b" + da + " *\\w+-[\\w]*", "i").exec(x) ||
            RegExp(
              "\\b" + da + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(x)) &&
          ((T = String(
            U.label && !RegExp(da, "i").test(U.label) ? U.label : T
          ).split("/"))[1] &&
            !/[\d.]+/.test(T[0]) &&
            (T[0] += " " + T[1]),
          (U = U.label || U),
          (T = b(
            T[0]
              .replace(RegExp(da, "i"), U)
              .replace(RegExp("; *(?:" + U + "[_-])?", "i"), " ")
              .replace(RegExp("(" + U + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return T;
      });
    }
    function H(X) {
      return l(X, function (T, U) {
        return (
          T ||
          (RegExp(
            U + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(x) || 0)[1] ||
          null
        );
      });
    }
    var v = t,
      G = x && "object" == typeof x && "String" != d(x);
    G && ((v = x), (x = null));
    var K = v.navigator || {},
      B = K.userAgent || "";
    x || (x = B);
    var Y = G
        ? !!K.likeChrome
        : /\bChrome\b/.test(x) && !/internal|\n/i.test(A.toString()),
      V = G ? "Object" : "ScriptBridgingProxyObject",
      aa = G ? "Object" : "Environment",
      P = G && v.java ? "JavaPackage" : d(v.java),
      Q = G ? "Object" : "RuntimeObject";
    aa = (P = /\bJava/.test(P) && v.java) && d(v.environment) == aa;
    var N = P ? "a" : "\u03b1",
      S = P ? "b" : "\u03b2",
      Z = v.document || {},
      R = v.operamini || v.opera,
      ia = m.test((ia = G && R ? R["[[Class]]"] : d(R))) ? ia : (R = null),
      F,
      ja = x;
    G = [];
    var I = null,
      ba = x == B;
    B = ba && R && "function" == typeof R.version && R.version();
    var O = (function (X) {
        return l(X, function (T, U) {
          return (
            T ||
            (RegExp("\\b" + (U.pattern || k(U)) + "\\b", "i").exec(x) &&
              (U.label || U))
          );
        });
      })([
        { label: "EdgeHTML", pattern: "Edge" },
        "Trident",
        { label: "WebKit", pattern: "AppleWebKit" },
        "iCab",
        "Presto",
        "NetFront",
        "Tasman",
        "KHTML",
        "Gecko",
      ]),
      M = (function (X) {
        return l(X, function (T, U) {
          return (
            T ||
            (RegExp("\\b" + (U.pattern || k(U)) + "\\b", "i").exec(x) &&
              (U.label || U))
          );
        });
      })([
        "Adobe AIR",
        "Arora",
        "Avant Browser",
        "Breach",
        "Camino",
        "Electron",
        "Epiphany",
        "Fennec",
        "Flock",
        "Galeon",
        "GreenBrowser",
        "iCab",
        "Iceweasel",
        "K-Meleon",
        "Konqueror",
        "Lunascape",
        "Maxthon",
        { label: "Microsoft Edge", pattern: "Edge" },
        "Midori",
        "Nook Browser",
        "PaleMoon",
        "PhantomJS",
        "Raven",
        "Rekonq",
        "RockMelt",
        { label: "Samsung Internet", pattern: "SamsungBrowser" },
        "SeaMonkey",
        { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
        "Sleipnir",
        "SlimBrowser",
        { label: "SRWare Iron", pattern: "Iron" },
        "Sunrise",
        "Swiftfox",
        "Waterfox",
        "WebPositive",
        "Opera Mini",
        { label: "Opera Mini", pattern: "OPiOS" },
        "Opera",
        { label: "Opera", pattern: "OPR" },
        "Chrome",
        { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
        { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
        { label: "Firefox for iOS", pattern: "FxiOS" },
        { label: "IE", pattern: "IEMobile" },
        { label: "IE", pattern: "MSIE" },
        "Safari",
      ]),
      W = w([
        { label: "BlackBerry", pattern: "BB10" },
        "BlackBerry",
        { label: "Galaxy S", pattern: "GT-I9000" },
        { label: "Galaxy S2", pattern: "GT-I9100" },
        { label: "Galaxy S3", pattern: "GT-I9300" },
        { label: "Galaxy S4", pattern: "GT-I9500" },
        { label: "Galaxy S5", pattern: "SM-G900" },
        { label: "Galaxy S6", pattern: "SM-G920" },
        { label: "Galaxy S6 Edge", pattern: "SM-G925" },
        { label: "Galaxy S7", pattern: "SM-G930" },
        { label: "Galaxy S7 Edge", pattern: "SM-G935" },
        "Google TV",
        "Lumia",
        "iPad",
        "iPod",
        "iPhone",
        "Kindle",
        { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
        "Nexus",
        "Nook",
        "PlayBook",
        "PlayStation Vita",
        "PlayStation",
        "TouchPad",
        "Transformer",
        { label: "Wii U", pattern: "WiiU" },
        "Wii",
        "Xbox One",
        { label: "Xbox 360", pattern: "Xbox" },
        "Xoom",
      ]),
      ca = (function (X) {
        return l(X, function (T, U, da) {
          return (
            T ||
            ((U[W] ||
              U[/^[a-z]+(?: +[a-z]+\b)*/i.exec(W)] ||
              RegExp("\\b" + k(da) + "(?:\\b|\\w*\\d)", "i").exec(x)) &&
              da)
          );
        });
      })({
        Apple: { iPad: 1, iPhone: 1, iPod: 1 },
        Archos: {},
        Amazon: { Kindle: 1, "Kindle Fire": 1 },
        Asus: { Transformer: 1 },
        "Barnes & Noble": { Nook: 1 },
        BlackBerry: { PlayBook: 1 },
        Google: { "Google TV": 1, Nexus: 1 },
        HP: { TouchPad: 1 },
        HTC: {},
        LG: {},
        Microsoft: { Xbox: 1, "Xbox One": 1 },
        Motorola: { Xoom: 1 },
        Nintendo: { "Wii U": 1, Wii: 1 },
        Nokia: { Lumia: 1 },
        Samsung: {
          "Galaxy S": 1,
          "Galaxy S2": 1,
          "Galaxy S3": 1,
          "Galaxy S4": 1,
        },
        Sony: { PlayStation: 1, "PlayStation Vita": 1 },
      }),
      E = (function (X) {
        return l(X, function (T, U) {
          var da = U.pattern || k(U);
          if (
            !T &&
            (T = RegExp("\\b" + da + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(x))
          ) {
            var ea = T,
              ka = U.label || U,
              fa = {
                "10.0": "10",
                6.4: "10 Technical Preview",
                6.3: "8.1",
                6.2: "8",
                6.1: "Server 2008 R2 / 7",
                "6.0": "Server 2008 / Vista",
                5.2: "Server 2003 / XP 64-bit",
                5.1: "XP",
                5.01: "2000 SP1",
                "5.0": "2000",
                "4.0": "NT",
                "4.90": "ME",
              };
            da &&
              ka &&
              /^Win/i.test(ea) &&
              !/^Windows Phone /i.test(ea) &&
              (fa = fa[/[\d.]+$/.exec(ea)]) &&
              (ea = "Windows " + fa);
            ea = String(ea);
            da && ka && (ea = ea.replace(RegExp(da, "i"), ka));
            T = ea = b(
              ea
                .replace(/ ce$/i, " CE")
                .replace(/\bhpw/i, "web")
                .replace(/\bMacintosh\b/, "Mac OS")
                .replace(/_PowerPC\b/i, " OS")
                .replace(/\b(OS X) [^ \d]+/i, "$1")
                .replace(/\bMac (OS X)\b/, "$1")
                .replace(/\/(\d)/, " $1")
                .replace(/_/g, ".")
                .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "")
                .replace(/\bx86\.64\b/gi, "x86_64")
                .replace(/\b(Windows Phone) OS\b/, "$1")
                .replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1")
                .split(" on ")[0]
            );
          }
          return T;
        });
      })([
        "Windows Phone",
        "Android",
        "CentOS",
        { label: "Chrome OS", pattern: "CrOS" },
        "Debian",
        "Fedora",
        "FreeBSD",
        "Gentoo",
        "Haiku",
        "Kubuntu",
        "Linux Mint",
        "OpenBSD",
        "Red Hat",
        "SuSE",
        "Ubuntu",
        "Xubuntu",
        "Cygwin",
        "Symbian OS",
        "hpwOS",
        "webOS ",
        "webOS",
        "Tablet OS",
        "Tizen",
        "Linux",
        "Mac OS X",
        "Macintosh",
        "Mac",
        "Windows 98;",
        "Windows ",
      ]);
    O && (O = [O]);
    ca && !W && (W = w([ca]));
    if ((F = /\bGoogle TV\b/.exec(W))) W = F[0];
    /\bSimulator\b/i.test(x) && (W = (W ? W + " " : "") + "Simulator");
    "Opera Mini" == M &&
      /\bOPiOS\b/.test(x) &&
      G.push("running in Turbo/Uncompressed mode");
    "IE" == M && /\blike iPhone OS\b/.test(x)
      ? ((F = r(x.replace(/like iPhone OS/, ""))),
        (ca = F.manufacturer),
        (W = F.product))
      : /^iP/.test(W)
      ? (M || (M = "Safari"),
        (E =
          "iOS" +
          ((F = / OS ([\d_]+)/i.exec(x)) ? " " + F[1].replace(/_/g, ".") : "")))
      : "Konqueror" != M || /buntu/i.test(E)
      ? (ca &&
          "Google" != ca &&
          ((/Chrome/.test(M) && !/\bMobile Safari\b/i.test(x)) ||
            /\bVita\b/.test(W))) ||
        (/\bAndroid\b/.test(E) && /^Chrome/.test(M) && /\bVersion\//i.test(x))
        ? ((M = "Android Browser"), (E = /\bAndroid\b/.test(E) ? E : "Android"))
        : "Silk" == M
        ? (/\bMobi/i.test(x) || ((E = "Android"), G.unshift("desktop mode")),
          /Accelerated *= *true/i.test(x) && G.unshift("accelerated"))
        : "PaleMoon" == M && (F = /\bFirefox\/([\d.]+)\b/.exec(x))
        ? G.push("identifying as Firefox " + F[1])
        : "Firefox" == M && (F = /\b(Mobile|Tablet|TV)\b/i.exec(x))
        ? (E || (E = "Firefox OS"), W || (W = F[1]))
        : !M ||
          (F = !/\bMinefield\b/i.test(x) && /\b(?:Firefox|Safari)\b/.exec(M))
        ? (M &&
            !W &&
            /[\/,]|^[^(]+?\)/.test(x.slice(x.indexOf(F + "/") + 8)) &&
            (M = null),
          (F = W || ca || E) &&
            (W || ca || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(E)) &&
            (M =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(E) ? E : F) +
              " Browser"))
        : "Electron" == M &&
          (F = (/\bChrome\/([\d.]+)\b/.exec(x) || 0)[1]) &&
          G.push("Chromium " + F)
      : (E = "Kubuntu");
    B ||
      (B = H([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        k(M),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (F =
        ("iCab" == O && 3 < parseFloat(B) && "WebKit") ||
        (/\bOpera\b/.test(M) && (/\bOPR\b/.test(x) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(x) &&
          !/^(?:Trident|EdgeHTML)$/.test(O) &&
          "WebKit") ||
        (!O && /\bMSIE\b/i.test(x) && ("Mac OS" == E ? "Tasman" : "Trident")) ||
        ("WebKit" == O && /\bPlayStation\b(?! Vita\b)/i.test(M) && "NetFront"))
    )
      O = [F];
    "IE" == M && (F = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(x) || 0)[1])
      ? ((M += " Mobile"),
        (E = "Windows Phone " + (/\+$/.test(F) ? F : F + ".x")),
        G.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(x)
      ? ((M = "IE Mobile"),
        (E = "Windows Phone 8.x"),
        G.unshift("desktop mode"),
        B || (B = (/\brv:([\d.]+)/.exec(x) || 0)[1]))
      : "IE" != M &&
        "Trident" == O &&
        (F = /\brv:([\d.]+)/.exec(x)) &&
        (M && G.push("identifying as " + M + (B ? " " + B : "")),
        (M = "IE"),
        (B = F[1]));
    if (ba) {
      if (h(v, "global"))
        if (
          (P &&
            ((F = P.lang.System),
            (ja = F.getProperty("os.arch")),
            (E =
              E ||
              F.getProperty("os.name") + " " + F.getProperty("os.version"))),
          aa)
        ) {
          try {
            (B = v.require("ringo/engine").version.join(".")), (M = "RingoJS");
          } catch (X) {
            (F = v.system) &&
              F.global.system == v.system &&
              ((M = "Narwhal"), E || (E = F[0].os || null));
          }
          M || (M = "Rhino");
        } else
          "object" == typeof v.process &&
            !v.process.browser &&
            (F = v.process) &&
            ("object" == typeof F.versions &&
              ("string" == typeof F.versions.electron
                ? (G.push("Node " + F.versions.node),
                  (M = "Electron"),
                  (B = F.versions.electron))
                : "string" == typeof F.versions.nw &&
                  (G.push("Chromium " + B, "Node " + F.versions.node),
                  (M = "NW.js"),
                  (B = F.versions.nw))),
            M ||
              ((M = "Node.js"),
              (ja = F.arch),
              (E = F.platform),
              (B = (B = /[\d.]+/.exec(F.version)) ? B[0] : null)));
      else
        d((F = v.runtime)) == V
          ? ((M = "Adobe AIR"), (E = F.flash.system.Capabilities.os))
          : d((F = v.phantom)) == Q
          ? ((M = "PhantomJS"),
            (B =
              (F = F.version || null) &&
              F.major + "." + F.minor + "." + F.patch))
          : "number" == typeof Z.documentMode &&
            (F = /\bTrident\/(\d+)/i.exec(x))
          ? ((B = [B, Z.documentMode]),
            (F = +F[1] + 4) != B[1] &&
              (G.push("IE " + B[1] + " mode"), O && (O[1] = ""), (B[1] = F)),
            (B = "IE" == M ? String(B[1].toFixed(1)) : B[0]))
          : "number" == typeof Z.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(M) &&
            (G.push("masking as " + M + " " + B),
            (M = "IE"),
            (B = "11.0"),
            (O = ["Trident"]),
            (E = "Windows"));
      E = E && b(E);
    }
    B &&
      (F =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(B) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(x + ";" + (ba && K.appMinorVersion)) ||
        (/\bMinefield\b/i.test(x) && "a")) &&
      ((I = /b/i.test(F) ? "beta" : "alpha"),
      (B =
        B.replace(RegExp(F + "\\+?$"), "") +
        ("beta" == I ? S : N) +
        (/\d+\+?/.exec(F) || "")));
    if (
      "Fennec" == M ||
      ("Firefox" == M && /\b(?:Android|Firefox OS)\b/.test(E))
    )
      M = "Firefox Mobile";
    else if ("Maxthon" == M && B) B = B.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(W))
      "Xbox 360" == W && (E = null),
        "Xbox 360" == W && /\bIEMobile\b/.test(x) && G.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(M) &&
        (!M || W || /Browser|Mobi/.test(M))) ||
      ("Windows CE" != E && !/Mobi/i.test(x))
    )
      if ("IE" == M && ba)
        try {
          null === v.external && G.unshift("platform preview");
        } catch (X) {
          G.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(W) || /\bBB10\b/.test(x)) &&
        (F =
          (RegExp(W.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(x) ||
            0)[1] || B)
          ? ((F = [F, /BB10/.test(x)]),
            (E =
              (F[1] ? ((W = null), (ca = "BlackBerry")) : "Device Software") +
              " " +
              F[0]),
            (B = null))
          : this != g &&
            "Wii" != W &&
            ((ba && R) ||
              (/Opera/.test(M) && /\b(?:MSIE|Firefox)\b/i.test(x)) ||
              ("Firefox" == M && /\bOS X (?:\d+\.){2,}/.test(E)) ||
              ("IE" == M &&
                ((E && !/^Win/.test(E) && 5.5 < B) ||
                  (/\bWindows XP\b/.test(E) && 8 < B) ||
                  (8 == B && !/\bTrident\b/.test(x))))) &&
            !m.test((F = r.call(g, x.replace(m, "") + ";"))) &&
            F.name &&
            ((F = "ing as " + F.name + ((F = F.version) ? " " + F : "")),
            m.test(M)
              ? (/\bIE\b/.test(F) && "Mac OS" == E && (E = null),
                (F = "identify" + F))
              : ((F = "mask" + F),
                (M = ia ? b(ia.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(F) && (E = null),
                ba || (B = null)),
            (O = ["Presto"]),
            G.push(F));
    else M += " Mobile";
    if ((F = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(x) || 0)[1])) {
      F = [parseFloat(F.replace(/\.(\d)$/, ".0$1")), F];
      if ("Safari" == M && "+" == F[1].slice(-1))
        (M = "WebKit Nightly"), (I = "alpha"), (B = F[1].slice(0, -1));
      else if (
        B == F[1] ||
        B == (F[2] = (/\bSafari\/([\d.]+\+?)/i.exec(x) || 0)[1])
      )
        B = null;
      F[1] = (/\bChrome\/([\d.]+)/i.exec(x) || 0)[1];
      537.36 == F[0] &&
        537.36 == F[2] &&
        28 <= parseFloat(F[1]) &&
        "WebKit" == O &&
        (O = ["Blink"]);
      ba && (Y || F[1])
        ? (O && (O[1] = "like Chrome"),
          (F =
            F[1] ||
            ((F = F[0]),
            530 > F
              ? 1
              : 532 > F
              ? 2
              : 532.05 > F
              ? 3
              : 533 > F
              ? 4
              : 534.03 > F
              ? 5
              : 534.07 > F
              ? 6
              : 534.1 > F
              ? 7
              : 534.13 > F
              ? 8
              : 534.16 > F
              ? 9
              : 534.24 > F
              ? 10
              : 534.3 > F
              ? 11
              : 535.01 > F
              ? 12
              : 535.02 > F
              ? "13+"
              : 535.07 > F
              ? 15
              : 535.11 > F
              ? 16
              : 535.19 > F
              ? 17
              : 536.05 > F
              ? 18
              : 536.1 > F
              ? 19
              : 537.01 > F
              ? 20
              : 537.11 > F
              ? "21+"
              : 537.13 > F
              ? 23
              : 537.18 > F
              ? 24
              : 537.24 > F
              ? 25
              : 537.36 > F
              ? 26
              : "Blink" != O
              ? "27"
              : "28")))
        : (O && (O[1] = "like Safari"),
          (F =
            ((F = F[0]),
            400 > F
              ? 1
              : 500 > F
              ? 2
              : 526 > F
              ? 3
              : 533 > F
              ? 4
              : 534 > F
              ? "4+"
              : 535 > F
              ? 5
              : 537 > F
              ? 6
              : 538 > F
              ? 7
              : 601 > F
              ? 8
              : "8")));
      O &&
        (O[1] +=
          " " + (F += "number" == typeof F ? ".x" : /[.+]/.test(F) ? "" : "+"));
      "Safari" == M && (!B || 45 < parseInt(B)) && (B = F);
    }
    "Opera" == M && (F = /\bzbov|zvav$/.exec(E))
      ? ((M += " "),
        G.unshift("desktop mode"),
        "zvav" == F ? ((M += "Mini"), (B = null)) : (M += "Mobile"),
        (E = E.replace(RegExp(" *" + F + "$"), "")))
      : "Safari" == M &&
        /\bChrome\b/.exec(O && O[1]) &&
        (G.unshift("desktop mode"),
        (M = "Chrome Mobile"),
        (B = null),
        /\bOS X\b/.test(E) ? ((ca = "Apple"), (E = "iOS 4.3+")) : (E = null));
    B &&
      0 == B.indexOf((F = /[\d.]+$/.exec(E))) &&
      -1 < x.indexOf("/" + F + "-") &&
      (E = String(E.replace(F, "")).replace(/^ +| +$/g, ""));
    O &&
      !/\b(?:Avant|Nook)\b/.test(M) &&
      (/Browser|Lunascape|Maxthon/.test(M) ||
        ("Safari" != M && /^iOS/.test(E) && /\bSafari\b/.test(O[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          M
        ) &&
          O[1])) &&
      (F = O[O.length - 1]) &&
      G.push(F);
    G.length && (G = ["(" + G.join("; ") + ")"]);
    ca && W && 0 > W.indexOf(ca) && G.push("on " + ca);
    W && G.push((/^on /.test(G[G.length - 1]) ? "" : "on ") + W);
    if (E) {
      var L =
        (F = / ([\d.+]+)$/.exec(E)) &&
        "/" == E.charAt(E.length - F[0].length - 1);
      E = {
        architecture: 32,
        family: F && !L ? E.replace(F[0], "") : E,
        version: F ? F[1] : null,
        toString: function () {
          var X = this.version;
          return (
            this.family +
            (X && !L ? " " + X : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (F = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(ja)) && !/\bi686\b/i.test(ja)
      ? (E &&
          ((E.architecture = 64),
          (E.family = E.family.replace(RegExp(" *" + F), ""))),
        M &&
          (/\bWOW64\b/i.test(x) ||
            (ba &&
              /\w(?:86|32)$/.test(K.cpuClass || K.platform) &&
              !/\bWin64; x64\b/i.test(x))) &&
          G.unshift("32-bit"))
      : E &&
        /^OS X/.test(E.family) &&
        "Chrome" == M &&
        39 <= parseFloat(B) &&
        (E.architecture = 64);
    x || (x = null);
    v = {};
    v.description = x;
    v.layout = O && O[0];
    v.manufacturer = ca;
    v.name = M;
    v.prerelease = I;
    v.product = W;
    v.ua = x;
    v.version = M && B;
    v.os = E || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    v.parse = r;
    v.toString = function () {
      return this.description || "";
    };
    v.version && G.unshift(B);
    v.name && G.unshift(M);
    E &&
      M &&
      (E != String(E).split(" ")[0] || (E != M.split(" ")[0] && !W)) &&
      G.push(W ? "(" + E + ")" : "on " + E);
    G.length && (v.description = G.join(" "));
    return v;
  }
  var y = { function: !0, object: !0 },
    t = (y[typeof window] && window) || this,
    z = y[typeof exports] && exports;
  y = y[typeof module] && module && !module.nodeType && module;
  var D = z && y && "object" == typeof global && global;
  !D || (D.global !== D && D.window !== D && D.self !== D) || (t = D);
  var u = Math.pow(2, 53) - 1,
    m = /\bOpera/;
  D = Object.prototype;
  var p = D.hasOwnProperty,
    A = D.toString,
    C = r();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((t.platform = C),
      define(function () {
        return C;
      }))
    : z && y
    ? g(C, function (x, w) {
        z[w] = x;
      })
    : (t.platform = C);
}.call(this));
