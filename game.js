//gradle : adnanenet6@gmail.com



function buildIOSMeta() {
  for (
    var a = [
        {
          name: "viewport",
          content:
            "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
        },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      ],
      e = 0;
    e < a.length;
    e++
  ) {
    var b = document.createElement("meta");
    b.name = a[e].name;
    b.content = a[e].content;
    var g = window.document.head.querySelector('meta[name="' + b.name + '"]');
    g && g.parentNode.removeChild(g);
    window.document.head.appendChild(b);
  }
}
function hideIOSFullscreenPanel() {
  jQuery(".xxx-ios-fullscreen-message").css("display", "none");
  jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
  jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se");
}
function buildIOSFullscreenPanel() {
  jQuery("body").append(
    '<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>'
  );
}
function showIOSFullscreenPanel() {
  jQuery(".xxx-ios-fullscreen-message").css("display", "block");
  jQuery(".xxx-ios-fullscreen-scroll").css("display", "block");
}
function __iosResize() {
  window.scrollTo(0, 0);
  console.log(window.devicePixelRatio);
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  if ("iPhone" === platform.product)
    switch (window.devicePixelRatio) {
      case 2:
        switch (window.innerWidth) {
          case 568:
            320 !== window.innerHeight &&
              jQuery(".xxx-game-iframe-full").addClass(
                "xxx-game-iframe-iphone-se"
              );
            break;
          case 667:
            375 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          case 808:
            414 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          default:
            hideIOSFullscreenPanel();
        }
        break;
      case 3:
        switch (window.innerWidth) {
          case 736:
            414 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          case 724:
            375 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          case 808:
            414 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          default:
            hideIOSFullscreenPanel();
        }
        break;
      default:
        hideIOSFullscreenPanel();
    }
}
function iosResize() {
  __iosResize();
  setTimeout(function () {
    __iosResize();
  }, 500);
}
function iosInIframe() {
  try {
    return window.self !== window.top;
  } catch (a) {
    return !0;
  }
}
function isIOSLessThen13() {
  var a = platform.os,
    e = a.family.toLowerCase();
  a = parseFloat(a.version);
  return "ios" === e && 13 > a ? !0 : !1;
}

$(document).ready(function () {
  platform &&
    "iPhone" === platform.product &&
    "safari" === platform.name.toLowerCase() &&
    isIOSLessThen13() &&
    !iosInIframe() &&
    (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function () {
  platform &&
    "iPhone" === platform.product &&
    "safari" === platform.name.toLowerCase() &&
    isIOSLessThen13() &&
    !iosInIframe() &&
    iosResize();
});
!(function () {
  var a =
      "undefined" != typeof window && void 0 !== window.document
        ? window.document
        : {},
    e = "undefined" != typeof module && module.exports,
    b = (function () {
      for (
        var h,
          k = [
            "requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(
              " "
            ),
            "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(
              " "
            ),
            "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(
              " "
            ),
            "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(
              " "
            ),
            "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(
              " "
            ),
          ],
          l = 0,
          r = k.length,
          y = {};
        l < r;
        l++
      )
        if ((h = k[l]) && h[1] in a) {
          for (l = 0; l < h.length; l++) y[k[0][l]] = h[l];
          return y;
        }
      return !1;
    })(),
    g = { change: b.fullscreenchange, error: b.fullscreenerror },
    d = {
      request: function (h) {
        return new Promise(
          function (k, l) {
            var r = function () {
              this.off("change", r);
              k();
            }.bind(this);
            this.on("change", r);
            h = h || a.documentElement;
            Promise.resolve(h[b.requestFullscreen]())["catch"](l);
          }.bind(this)
        );
      },
      exit: function () {
        return new Promise(
          function (h, k) {
            if (this.isFullscreen) {
              var l = function () {
                this.off("change", l);
                h();
              }.bind(this);
              this.on("change", l);
              Promise.resolve(a[b.exitFullscreen]())["catch"](k);
            } else h();
          }.bind(this)
        );
      },
      toggle: function (h) {
        return this.isFullscreen ? this.exit() : this.request(h);
      },
      onchange: function (h) {
        this.on("change", h);
      },
      onerror: function (h) {
        this.on("error", h);
      },
      on: function (h, k) {
        var l = g[h];
        l && a.addEventListener(l, k, !1);
      },
      off: function (h, k) {
        var l = g[h];
        l && a.removeEventListener(l, k, !1);
      },
      raw: b,
    };
  b
    ? (Object.defineProperties(d, {
        isFullscreen: {
          get: function () {
            return !!a[b.fullscreenElement];
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return a[b.fullscreenElement];
          },
        },
        isEnabled: {
          enumerable: !0,
          get: function () {
            return !!a[b.fullscreenEnabled];
          },
        },
      }),
      e ? (module.exports = d) : (window.screenfull = d))
    : e
    ? (module.exports = { isEnabled: !1 })
    : (window.screenfull = { isEnabled: !1 });
})();
var s_iScaleFactor = 1,
  s_iOffsetX,
  s_iOffsetY,
  s_bIsIphone = !1,
  s_bFocus = !0;
(function (a) {
  (jQuery.browser = jQuery.browser || {}).mobile =
    /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    );
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function () {
  sizeHandler();
});
function trace(a) {
  console.log(a);
}
function getSize(a) {
  var e = a.toLowerCase(),
    b = window.document,
    g = b.documentElement;
  if (void 0 === window["inner" + a]) a = g["client" + a];
  else if (window["inner" + a] != g["client" + a]) {
    var d = b.createElement("body");
    d.id = "vpw-test-b";
    d.style.cssText = "overflow:scroll";
    var h = b.createElement("div");
    h.id = "vpw-test-d";
    h.style.cssText = "position:absolute;top:-1000px";
    h.innerHTML =
      "<style>@media(" +
      e +
      ":" +
      g["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      e +
      ":7px!important}}</style>";
    d.appendChild(h);
    g.insertBefore(d, b.head);
    a = 7 == h["offset" + a] ? g["client" + a] : window["inner" + a];
    g.removeChild(d);
  } else a = window["inner" + a];
  return a;
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
  window.matchMedia("(orientation: portrait)").matches && sizeHandler();
  window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}
function isChrome() {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  );
}
function isIOS() {
  for (
    var a =
      "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(
        ";"
      );
    a.length;

  )
    if (navigator.platform === a.pop()) return (s_bIsIphone = !0);
  return (s_bIsIphone = !1);
}
function isIpad() {
  var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
  return !a &&
    navigator.userAgent.match(/Mac/) &&
    navigator.maxTouchPoints &&
    2 < navigator.maxTouchPoints
    ? !0
    : a;
}
function isMobile() {
  return isIpad() ? !0 : jQuery.browser.mobile;
}
function getIOSWindowHeight() {
  return (
    (document.documentElement.clientWidth / window.innerWidth) *
    window.innerHeight
  );
}
function getHeightOfIOSToolbars() {
  var a =
    (0 === window.orientation ? screen.height : screen.width) -
    getIOSWindowHeight();
  return 1 < a ? a : 0;
}
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (a) {
    return !0;
  }
}
function sizeHandler() {
  window.scrollTo(0, 1);
  if ($("#canvas")) {
    navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    var a =
      null !== platform.name && "safari" === platform.name.toLowerCase()
        ? getIOSWindowHeight()
        : getSize("Height");
    var e = getSize("Width");
    s_bFocus && _checkOrientation(e, a);
    var b = Math.min(a / CANVAS_HEIGHT, e / CANVAS_WIDTH),
      g = Math.round(CANVAS_WIDTH * b);
    b = Math.round(CANVAS_HEIGHT * b);
    if (b < a) {
      var d = a - b;
      b += d;
      g += (CANVAS_WIDTH / CANVAS_HEIGHT) * d;
    } else
      g < e &&
        ((d = e - g), (g += d), (b += (CANVAS_HEIGHT / CANVAS_WIDTH) * d));
    d = a / 2 - b / 2;
    var h = e / 2 - g / 2,
      k = CANVAS_WIDTH / g;
    if (h * k < -EDGEBOARD_X || d * k < -EDGEBOARD_Y)
      (b = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (g = Math.round(CANVAS_WIDTH * b)),
        (b = Math.round(CANVAS_HEIGHT * b)),
        (d = (a - b) / 2),
        (h = (e - g) / 2),
        (k = CANVAS_WIDTH / g);
    s_iOffsetX = -1 * h * k;
    s_iOffsetY = -1 * d * k;
    0 <= d && (s_iOffsetY = 0);
    0 <= h && (s_iOffsetX = 0);
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMapStoryMode &&
      s_oMapStoryMode.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    $("#canvas").css("width", g + "px");
    $("#canvas").css("height", b + "px");
    0 > d || (d = (a - b) / 2);
    $("#canvas").css("top", d + "px");
    $("#canvas").css("left", h + "px");
    fullscreenHandler();
  }
}
function playSound(a, e, b) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(e),
      s_aSounds[a].loop(b),
      s_aSounds[a])
    : null;
}
function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}
function setVolume(a, e) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(e);
}
function setMute(a, e) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(e);
}
function fadeSound(a, e, b, g) {
  if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
    return s_aSounds[a].fade(e, b, g), s_aSounds[a];
}
function soundPlaying(a) {
  if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
    return s_aSounds[a].playing();
}
function _checkOrientation(a, e) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > e
      ? "landscape" === $(".orientation-msg-container").attr("data-orientation")
        ? ($(".orientation-msg-container").css("display", "none"),
          s_oMain.startUpdate())
        : ($(".orientation-msg-container").css("display", "block"),
          s_oMain.stopUpdate())
      : "portrait" === $(".orientation-msg-container").attr("data-orientation")
      ? ($(".orientation-msg-container").css("display", "none"),
        s_oMain.startUpdate())
      : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()));
}
function createBitmap(a, e, b) {
  var g = new createjs.Bitmap(a),
    d = new createjs.Shape();
  e && b
    ? d.graphics.beginFill("#fff").drawRect(0, 0, e, b)
    : d.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  g.hitArea = d;
  return g;
}
function createSprite(a, e, b, g, d, h) {
  a = null !== e ? new createjs.Sprite(a, e) : new createjs.Sprite(a);
  e = new createjs.Shape();
  e.graphics.beginFill("#000000").drawRect(-b, -g, d, h);
  a.hitArea = e;
  return a;
}
function randomFloatBetween(a, e, b) {
  "undefined" === typeof b && (b = 2);
  return parseFloat(Math.min(a + Math.random() * (e - a), e).toFixed(b));
}
function randomIntBetween(a, e) {
  return parseInt(Math.min(a + Math.random() * (e - a), e));
}
function rotateVector2D(a, e) {
  var b = e.getX() * Math.cos(a) + e.getY() * Math.sin(a),
    g = e.getX() * -Math.sin(a) + e.getY() * Math.cos(a);
  e.set(b, g);
}
function tweenVectorsOnX(a, e, b) {
  return a + b * (e - a);
}
Array.prototype.max = function () {
  return Math.max.apply(null, this);
};
Array.prototype.min = function () {
  return Math.min.apply(null, this);
};
function shuffle(a) {
  for (var e = a.length, b, g; 0 !== e; )
    (g = Math.floor(Math.random() * e)),
      --e,
      (b = a[e]),
      (a[e] = a[g]),
      (a[g] = b);
  return a;
}
function bubbleSort(a) {
  do {
    var e = !1;
    for (var b = 0; b < a.length - 1; b++)
      a[b] > a[b + 1] &&
        ((e = a[b]), (a[b] = a[b + 1]), (a[b + 1] = e), (e = !0));
  } while (e);
}
function compare(a, e) {
  return a.index > e.index ? -1 : a.index < e.index ? 1 : 0;
}
function easeLinear(a, e, b, g) {
  return (b * a) / g + e;
}
function easeInQuad(a, e, b, g) {
  return b * (a /= g) * a + e;
}
function easeInSine(a, e, b, g) {
  return -b * Math.cos((a / g) * (Math.PI / 2)) + b + e;
}
function easeInCubic(a, e, b, g) {
  return b * (a /= g) * a * a + e;
}
function getTrajectoryPoint(a, e) {
  var b = new createjs.Point(),
    g = (1 - a) * (1 - a),
    d = a * a;
  b.x = g * e.start.x + 2 * (1 - a) * a * e.traj.x + d * e.end.x;
  b.y = g * e.start.y + 2 * (1 - a) * a * e.traj.y + d * e.end.y;
  return b;
}
function formatTime(a) {
  a /= 1e3;
  var e = Math.floor(a / 60);
  a = Math.floor(a - 60 * e);
  var b = "";
  b = 10 > e ? b + ("0" + e + ":") : b + (e + ":");
  return 10 > a ? b + ("0" + a) : b + a;
}
function degreesToRadians(a) {
  return (a * Math.PI) / 180;
}
function checkRectCollision(a, e) {
  var b = getBounds(a, 0.9);
  var g = getBounds(e, 0.98);
  return calculateIntersection(b, g);
}
function calculateIntersection(a, e) {
  var b, g, d, h;
  var k = a.x + (b = a.width / 2);
  var l = a.y + (g = a.height / 2);
  var r = e.x + (d = e.width / 2);
  var y = e.y + (h = e.height / 2);
  k = Math.abs(k - r) - (b + d);
  l = Math.abs(l - y) - (g + h);
  return 0 > k && 0 > l
    ? ((k = Math.min(Math.min(a.width, e.width), -k)),
      (l = Math.min(Math.min(a.height, e.height), -l)),
      {
        x: Math.max(a.x, e.x),
        y: Math.max(a.y, e.y),
        width: k,
        height: l,
        rect1: a,
        rect2: e,
      })
    : null;
}
function getBounds(a, e) {
  var b = { x: Infinity, y: Infinity, width: 0, height: 0 };
  if (a instanceof createjs.Container) {
    b.x2 = -Infinity;
    b.y2 = -Infinity;
    var g = a.children,
      d = g.length,
      h;
    for (h = 0; h < d; h++) {
      var k = getBounds(g[h], 1);
      k.x < b.x && (b.x = k.x);
      k.y < b.y && (b.y = k.y);
      k.x + k.width > b.x2 && (b.x2 = k.x + k.width);
      k.y + k.height > b.y2 && (b.y2 = k.y + k.height);
    }
    Infinity == b.x && (b.x = 0);
    Infinity == b.y && (b.y = 0);
    Infinity == b.x2 && (b.x2 = 0);
    Infinity == b.y2 && (b.y2 = 0);
    b.width = b.x2 - b.x;
    b.height = b.y2 - b.y;
    delete b.x2;
    delete b.y2;
  } else {
    if (a instanceof createjs.Bitmap) {
      d = a.sourceRect || a.image;
      h = d.width * e;
      var l = d.height * e;
    } else if (a instanceof createjs.Sprite)
      if (
        a.spriteSheet._frames &&
        a.spriteSheet._frames[a.currentFrame] &&
        a.spriteSheet._frames[a.currentFrame].image
      ) {
        d = a.spriteSheet.getFrame(a.currentFrame);
        h = d.rect.width;
        l = d.rect.height;
        g = d.regX;
        var r = d.regY;
      } else (b.x = a.x || 0), (b.y = a.y || 0);
    else (b.x = a.x || 0), (b.y = a.y || 0);
    g = g || 0;
    h = h || 0;
    r = r || 0;
    l = l || 0;
    b.regX = g;
    b.regY = r;
    d = a.localToGlobal(0 - g, 0 - r);
    k = a.localToGlobal(h - g, l - r);
    h = a.localToGlobal(h - g, 0 - r);
    g = a.localToGlobal(0 - g, l - r);
    b.x = Math.min(Math.min(Math.min(d.x, k.x), h.x), g.x);
    b.y = Math.min(Math.min(Math.min(d.y, k.y), h.y), g.y);
    b.width = Math.max(Math.max(Math.max(d.x, k.x), h.x), g.x) - b.x;
    b.height = Math.max(Math.max(Math.max(d.y, k.y), h.y), g.y) - b.y;
  }
  return b;
}
function NoClickDelay(a) {
  this.element = a;
  window.Touch && this.element.addEventListener("touchstart", this, !1);
}
function shuffle(a) {
  for (var e = a.length, b, g; 0 < e; )
    (g = Math.floor(Math.random() * e)),
      e--,
      (b = a[e]),
      (a[e] = a[g]),
      (a[g] = b);
  return a;
}
NoClickDelay.prototype = {
  handleEvent: function (a) {
    switch (a.type) {
      case "touchstart":
        this.onTouchStart(a);
        break;
      case "touchmove":
        this.onTouchMove(a);
        break;
      case "touchend":
        this.onTouchEnd(a);
    }
  },
  onTouchStart: function (a) {
    a.preventDefault();
    this.moved = !1;
    this.element.addEventListener("touchmove", this, !1);
    this.element.addEventListener("touchend", this, !1);
  },
  onTouchMove: function (a) {
    this.moved = !0;
  },
  onTouchEnd: function (a) {
    this.element.removeEventListener("touchmove", this, !1);
    this.element.removeEventListener("touchend", this, !1);
    if (!this.moved) {
      a = document.elementFromPoint(
        a.changedTouches[0].clientX,
        a.changedTouches[0].clientY
      );
      3 == a.nodeType && (a = a.parentNode);
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", !0, !0);
      a.dispatchEvent(e);
    }
  },
};
(function () {
  function a(b) {
    var g = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    b = b || window.event;
    b.type in g
      ? (document.body.className = g[b.type])
      : ((document.body.className = this[e] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? (s_oMain.stopUpdate(), (s_bFocus = !1))
          : (s_oMain.startUpdate(), (s_bFocus = !0)));
  }
  var e = "hidden";
  e in document
    ? document.addEventListener("visibilitychange", a)
    : (e = "mozHidden") in document
    ? document.addEventListener("mozvisibilitychange", a)
    : (e = "webkitHidden") in document
    ? document.addEventListener("webkitvisibilitychange", a)
    : (e = "msHidden") in document
    ? document.addEventListener("msvisibilitychange", a)
    : "onfocusin" in document
    ? (document.onfocusin = document.onfocusout = a)
    : (window.onpageshow =
        window.onpagehide =
        window.onfocus =
        window.onblur =
          a);
})();
function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate();
}
function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate();
}
function getParamValue(a) {
  for (
    var e = window.location.search.substring(1).split("&"), b = 0;
    b < e.length;
    b++
  ) {
    var g = e[b].split("=");
    if (g[0] == a) return g[1];
  }
}
function fullscreenHandler() {
  ENABLE_FULLSCREEN &&
    screenfull.isEnabled &&
    ((s_bFullscreen = screenfull.isFullscreen),
    null !== s_oMenu && s_oMenu.resetFullscreenBut());
}
if (screenfull.isEnabled)
  screenfull.on("change", function () {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
  });
CTLText.prototype = {
  constructor: CTLText,
  __autofit: function () {
    if (this._bFitText) {
      for (
        var a = this._iFontSize;
        (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV ||
          this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) &&
        !(a--,
        (this._oText.font = a + "px " + this._szFont),
        (this._oText.lineHeight = Math.round(a * this._fLineHeightFactor)),
        this.__updateY(),
        this.__verticalAlign(),
        8 > a);

      );
      this._iFontSize = a;
    }
  },
  __verticalAlign: function () {
    if (this._bVerticalAlign) {
      var a = this._oText.getBounds().height;
      this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV;
    }
  },
  __updateY: function () {
    this._oText.y = this._y + this._iPaddingV;
    switch (this._oText.textBaseline) {
      case "middle":
        this._oText.y +=
          this._oText.lineHeight / 2 +
          (this._iFontSize * this._fLineHeightFactor - this._iFontSize);
    }
  },
  __createText: function (a) {
    this._bDebug &&
      ((this._oDebugShape = new createjs.Shape()),
      this._oDebugShape.graphics
        .beginFill("rgba(255,0,0,0.5)")
        .drawRect(this._x, this._y, this._iWidth, this._iHeight),
      this._oContainer.addChild(this._oDebugShape));
    this._oText = new createjs.Text(
      a,
      this._iFontSize + "px " + this._szFont,
      this._szColor
    );
    this._oText.textBaseline = "middle";
    this._oText.lineHeight = Math.round(
      this._iFontSize * this._fLineHeightFactor
    );
    this._oText.textAlign = this._szAlign;
    this._oText.lineWidth = this._bMultiline
      ? this._iWidth - 2 * this._iPaddingH
      : null;
    switch (this._szAlign) {
      case "center":
        this._oText.x = this._x + this._iWidth / 2;
        break;
      case "left":
        this._oText.x = this._x + this._iPaddingH;
        break;
      case "right":
        this._oText.x = this._x + this._iWidth - this._iPaddingH;
    }
    this._oContainer.addChild(this._oText);
    this.refreshText(a);
  },
  setVerticalAlign: function (a) {
    this._bVerticalAlign = a;
  },
  setVisible: function (a) {
    this._oText.visible = a;
  },
  setOutline: function (a) {
    null !== this._oText && (this._oText.outline = a);
  },
  setShadow: function (a, e, b, g) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, e, b, g));
  },
  setColor: function (a) {
    this._oText.color = a;
  },
  setAlpha: function (a) {
    this._oText.alpha = a;
  },
  setY: function (a) {
    this._y = this._oText.y = a;
    this.updateDebug();
  },
  setX: function (a) {
    this._x = this._oText.x = a;
    this.updateDebug();
  },
  updateDebug: function () {
    this._bDebug &&
      ((this._oDebugShape.graphics.command.x = this._x),
      (this._oDebugShape.graphics.command.y = this._y));
  },
  removeTweens: function () {
    createjs.Tween.removeTweens(this._oText);
  },
  getText: function () {
    return this._oText;
  },
  getX: function () {
    return this._x;
  },
  getY: function () {
    return this._y;
  },
  getFontSize: function () {
    return this._iFontSize;
  },
  getBounds: function () {
    return this._oText.getBounds();
  },
  refreshText: function (a) {
    "" === a && (a = " ");
    null === this._oText && this.__createText(a);
    this._oText.text = a;
    this._oText.font = this._iFontSize + "px " + this._szFont;
    this._oText.lineHeight = Math.round(
      this._iFontSize * this._fLineHeightFactor
    );
    this.__autofit();
    this.__updateY();
    this.__verticalAlign();
  },
};
function CTLText(a, e, b, g, d, h, k, l, r, y, t, z, D, u, m, p, A) {
  this._oContainer = a;
  this._x = e;
  this._y = b;
  this._iWidth = g;
  this._iHeight = d;
  this._bMultiline = p;
  this._iFontSize = h;
  this._szAlign = k;
  this._szColor = l;
  this._szFont = r;
  this._iPaddingH = t;
  this._iPaddingV = z;
  this._bVerticalAlign = m;
  this._bFitText = u;
  this._bDebug = A;
  this._oDebugShape = null;
  this._fLineHeightFactor = y;
  this._oText = null;
  D && l && this.__createText(D);
}
function CScoreText(a, e, b) {
  var g;
  this._init = function (d, h, k) {
    g = new CFormatText(h, k, d, "#ffffff", s_oStage, "rgba(0, 0, 0, 0)", 70);
    g.setOutline(5);
    g.getText().alpha = 0;
    var l = this;
    createjs.Tween.get(g.getText())
      .to({ alpha: 1 }, 400, createjs.Ease.cubicIn)
      .call(function () {
        l.moveUp();
      });
  };
  this.moveUp = function () {
    var d = g.getPos().y - 150,
      h = this;
    createjs.Tween.get(g.getText())
      .to({ y: d }, 1500, createjs.Ease.sineIn)
      .call(function () {
        h.unload();
      });
    createjs.Tween.get(g.getText()).wait(750).to({ alpha: 0 }, 750);
  };
  this.unload = function () {
    g.unload();
  };
  this._init(a, e, b);
}
function CVector2(a, e) {
  var b, g;
  this._init = function (d, h) {
    b = d;
    g = h;
  };
  this.add = function (d, h) {
    b += d;
    g += h;
  };
  this.addV = function (d) {
    b += d.getX();
    g += d.getY();
  };
  this.scalarDivision = function (d) {
    b /= d;
    g /= d;
  };
  this.subV = function (d) {
    b -= d.getX();
    g -= d.getY();
  };
  this.scalarProduct = function (d) {
    b *= d;
    g *= d;
  };
  this.invert = function () {
    b *= -1;
    g *= -1;
  };
  this.dotProduct = function (d) {
    return b * d.getX() + g * d.getY();
  };
  this.set = function (d, h) {
    b = d;
    g = h;
  };
  this.setV = function (d) {
    b = d.getX();
    g = d.getY();
  };
  this.length = function () {
    return Math.sqrt(b * b + g * g);
  };
  this.length2 = function () {
    return b * b + g * g;
  };
  this.normalize = function () {
    var d = this.length();
    0 < d && ((b /= d), (g /= d));
  };
  this.getNormalize = function (d) {
    this.length();
    d.set(b, g);
    d.normalize();
  };
  this.rot90CCW = function () {
    var d = b;
    b = -g;
    g = d;
  };
  this.rot90CW = function () {
    var d = b;
    b = g;
    g = -d;
  };
  this.getRotCCW = function (d) {
    d.set(b, g);
    d.rot90CCW();
  };
  this.getRotCW = function (d) {
    d.set(b, g);
    d.rot90CW();
  };
  this.ceil = function () {
    b = Math.ceil(b);
    g = Math.ceil(g);
  };
  this.round = function () {
    b = Math.round(b);
    g = Math.round(g);
  };
  this.toString = function () {
    return "Vector2: " + b + ", " + g;
  };
  this.print = function () {
    trace("Vector2: " + b + ", " + g);
  };
  this.getX = function () {
    return b;
  };
  this.getY = function () {
    return g;
  };
  this._init(a, e);
}
function CSpriteLibrary() {
  var a = {},
    e,
    b,
    g,
    d,
    h,
    k;
  this.init = function (l, r, y) {
    e = {};
    g = b = 0;
    d = l;
    h = r;
    k = y;
  };
  this.addSprite = function (l, r) {
    if (!a.hasOwnProperty(l)) {
      var y = new Image();
      a[l] = e[l] = { szPath: r, oSprite: y, bLoaded: !1 };
      b++;
    }
  };
  this.getSprite = function (l) {
    return a.hasOwnProperty(l) ? a[l].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    b = 0;
    h.call(k);
  };
  this._onSpriteLoaded = function () {
    d.call(k);
    ++g === b && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var l in e)
      (e[l].oSprite.oSpriteLibrary = this),
        (e[l].oSprite.szKey = l),
        (e[l].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (e[l].oSprite.onerror = function (r) {
          var y = r.currentTarget;
          setTimeout(function () {
            e[y.szKey].oSprite.src = e[y.szKey].szPath;
          }, 500);
        }),
        (e[l].oSprite.src = e[l].szPath);
  };
  this.setLoaded = function (l) {
    a[l].bLoaded = !0;
  };
  this.isLoaded = function (l) {
    return a[l].bLoaded;
  };
  this.getNumSprites = function () {
    return b;
  };
}
var CANVAS_WIDTH = 1080,
  CANVAS_HEIGHT = 1920,
  EDGEBOARD_X = 80,
  EDGEBOARD_Y = 310,
  FPS = 60,
  FPS_TIME = 1e3 / FPS,
  DISABLE_SOUND_MOBILE = !1,
  GAME_NAME = "jelly_matching",
  CTL_MODE_NAME = ["story_mode", "time_attack"],
  PRIMARY_FONT = "balsamiq",
  PRIMARY_FONT_COLOR = "#ffffff",
  STROKE_COLOR = null,
  STROKE_COLOR_STAGE = ["#ef8297", "#63e0fa"],
  SOUNDTRACK_VOLUME_IN_GAME = 0.5,
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_PRESS_MOVE_CELL = 4,
  ON_PRESS_UP_CELL = 3,
  ON_SELECT_LANG = 5,
  SWIPE_ON_DESKTOP = !0,
  STORY_MODE = 0,
  TIME_ATTACK = 1,
  MAP_SENSITIVITY = 20,
  NUM_MAP_TILES = 28,
  NUM_CLOUD_SPRITE = 3,
  TYPE_STAR = 8,
  TYPE_BOMB = 9,
  TYPE_CLOCK = 10,
  TYPE_CHANGING = 11,
  TYPE_BLOCK = 12,
  PARTICLE_OFFSET = [
    { x: 0, y: 81 },
    { x: 0, y: 80 },
    { x: -1, y: 81 },
    { x: 0, y: 80 },
    { x: 0, y: 82 },
    { x: 0, y: 81 },
    { x: 0, y: 81 },
    { x: 0, y: 80 },
    { x: -5, y: 81 },
    { x: 0, y: 0 },
    { x: -2, y: 66 },
    ,
    { x: -8, y: 30 },
  ],
  CELL_FILL_NULL = 0,
  CELL_FILL_FACE = 1,
  CELL_FILL_BOMB = 2,
  CELL_FILL_STAR = 3,
  CELL_FILL_BLOCK = 4,
  CELL_FILL_CLOCK = 5,
  CELL_FILL_CHANGE = 6,
  CELL_FILL_STARANDBLOCK = 7,
  CELL_FILL_TRAP = 8,
  CELL_STATE_MATCHED = -1,
  CELL_STATE_DISABLE = -2,
  CELL_STATE_INVISIBLE = -3,
  CHEF_AUDIO_STEP_0 = 0,
  CHEF_AUDIO_STEP_1 = 1,
  HAND_ANIM_NUM_FRAMES = 20,
  CELL_SIZE = 100,
  TIME_FALL = 100,
  TIME_TO_ADD = 15e3,
  TIMER_CHANGING = 2e4,
  TIMER_HINT = 4e3,
  TIME_TO_MAKE_COMBO_FOR_HERO = 2400,
  NUM_TO_MAKE_COMBO_FOR_HERO = 20,
  MAX_SYMBOL_ROT_SPEED = 2,
  JELLY_CHANGING_SPEED = 0.05,
  JELLY_EXPLOSION_FRAMERATE = 25,
  EXPLOSION_ANIMATION_SET = [
    {
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { idle: [0, 8, "end"], end: [8] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    {
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { idle: [0, 8, "end"], end: [8] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    {
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { idle: [0, 8, "end"], end: [8] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    {
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { idle: [0, 8, "end"], end: [8] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    {
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { idle: [0, 8, "end"], end: [8] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    {
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { idle: [0, 8, "end"], end: [8] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    {
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { idle: [0, 8, "end"], end: [8] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    0,
    0,
    {
      frames: { width: 352, height: 352, regX: 176, regY: 176 },
      animations: { idle: [3, 24, "stop"], stop: [24] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
    {
      frames: { width: 320, height: 320, regX: 160, regY: 83 },
      animations: { idle: [0, 9, "stop"], stop: [9] },
      framerate: JELLY_EXPLOSION_FRAMERATE,
    },
  ],
  SCORES_FOR_SINGLE,
  SCORES_FOR_BOMB,
  SCORES_FOR_STAR,
  EXTRA_FACE_MULTIPLIER,
  ENABLE_CHECK_ORIENTATION,
  ENABLE_FULLSCREEN,
  LEVEL_MATRIX,
  CONFIG,
  TIMER_CLOCK_SPAWN,
  NUM_LANGUAGES = 7,
  LANG_EN = 0,
  LANG_ES = 1,
  LANG_FR = 2,
  LANG_DE = 3,
  LANG_PT = 4,
  LANG_IT = 5,
  LANG_RU = 6,
  LANG_CODES = {};
LANG_CODES.en = LANG_EN;
LANG_CODES.es = LANG_ES;
LANG_CODES.fr = LANG_FR;
LANG_CODES.de = LANG_DE;
LANG_CODES.pt = LANG_PT;
LANG_CODES.it = LANG_IT;
LANG_CODES.ru = LANG_RU;
function CSpriteSheets() {
  this._init = function () {
    this.changingNum(CONFIG[s_iCurLevel].numfaces - 1);
  };
  this.changingNum = function (a) {
    a = {
      images: [s_oSpriteLibrary.getSprite("jelly")],
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: {
        type_0: [0],
        type_1: [1],
        type_2: [2],
        type_3: [3],
        type_4: [4],
        type_5: [5],
        type_6: [6],
        type_7: [7],
        star: [8],
        bomb: [9],
        clock: [10],
        changing: [0, a, "changing", JELLY_CHANGING_SPEED],
      },
    };
    s_oJellySpriteSheet = new createjs.SpriteSheet(a);
  };
  this._init();
}
var s_oJellySpriteSheet,
  ON_PRESS_DOWN_TAP_ACTION = 0,
  ON_PRESS_MOVE_TAP_ACTION = 1,
  ON_PRESS_UP_TAP_ACTION = 2,
  TRIGGER_PRESS_MOVE_DISTANCE_THRESHOLD = 4,
  ON_SWIPE_LEFT = 0,
  ON_SWIPE_RIGHT = 1,
  ON_SWIPE_UP = 2,
  ON_SWIPE_DOWN = 3;
function CInputController(a) {
  var e, b;
  a = void 0 === a ? s_oStage : a;
  var g, d, h, k;
  this._init = function (l) {
    g = !0;
    d = [];
    h = [];
    k = [];
    b = e = 0;
  };
  this.setInput = function (l) {
    g = l;
  };
  this.onMouseDownAction = function (l) {
    g && ((e = l.stageX), (b = l.stageY));
  };
  this.onPressMoveAction = function (l) {
    if (g) {
      var r = e - l.stageX,
        y = b - l.stageY;
      e = l.stageX;
      b = l.stageY;
      l = null;
      Math.abs(r) >= TRIGGER_PRESS_MOVE_DISTANCE_THRESHOLD
        ? (l = 0 < r ? ON_SWIPE_LEFT : ON_SWIPE_RIGHT)
        : Math.abs(y) >= TRIGGER_PRESS_MOVE_DISTANCE_THRESHOLD &&
          (l = 0 < y ? ON_SWIPE_UP : ON_SWIPE_DOWN);
      null !== l &&
        ((k[ON_PRESS_MOVE_TAP_ACTION] = { dir: l, offset: { x: r, y: y } }),
        this.triggerEvent(ON_PRESS_MOVE_TAP_ACTION));
    }
  };
  this.onPressUpAction = function () {
    g && this.triggerEvent(ON_PRESS_UP_TAP_ACTION);
  };
  this.unload = function () {};
  this.triggerEvent = function (l) {
    var r = d[l];
    r && d[l].call(h[l], k[l]);
    return r;
  };
  this.addEventListener = function (l, r, y, t) {
    d[l] = r;
    h[l] = y;
    k[l] = t;
  };
  this._init(a);
}
var LEVEL_MATRIX_STORY_MODE = [],
  GOALS = [],
  CONFIG_STORY_MODE = [],
  BACKGROUND = [],
  TIMER_CLOCK_SPAWN_STORY_MODE = [],
  BEST_SCORE_LIMIT = [];
LEVEL_MATRIX_STORY_MODE[1] = [
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
];
GOALS[1] = {
  type0: 0,
  type1: 20,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[1] = {
  time: 6e4,
  numfaces: 3,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[1] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[1] = 0;
BEST_SCORE_LIMIT[1] = 4500;
LEVEL_MATRIX_STORY_MODE[2] = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];
GOALS[2] = {
  type0: 25,
  type1: 25,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[2] = {
  time: 7e4,
  numfaces: 3,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[2] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[2] = 0;
BEST_SCORE_LIMIT[2] = 5e3;
LEVEL_MATRIX_STORY_MODE[3] = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [1, 1, 2, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];
GOALS[3] = {
  type0: 0,
  type1: 0,
  type2: 40,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[3] = {
  time: 6e4,
  numfaces: 3,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[3] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[3] = 0;
BEST_SCORE_LIMIT[3] = 6500;
LEVEL_MATRIX_STORY_MODE[4] = [
  [0, 1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0],
  [1, 1, 0, 0, 1, 1],
  [0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1],
];
GOALS[4] = {
  type0: 30,
  type1: 0,
  type2: 30,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[4] = {
  time: 8e4,
  numfaces: 3,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[4] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[4] = 0;
BEST_SCORE_LIMIT[4] = 5200;
LEVEL_MATRIX_STORY_MODE[5] = [
  [0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];
GOALS[5] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 30,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[5] = {
  time: 1e5,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[5] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[5] = 0;
BEST_SCORE_LIMIT[5] = 6500;
LEVEL_MATRIX_STORY_MODE[6] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
GOALS[6] = {
  type0: 0,
  type1: 25,
  type2: 0,
  type3: 25,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[6] = {
  time: 1e5,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[6] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[6] = 0;
BEST_SCORE_LIMIT[6] = 7400;
LEVEL_MATRIX_STORY_MODE[7] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
GOALS[7] = {
  type0: 0,
  type1: 25,
  type2: 25,
  type3: 25,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[7] = {
  time: 11e4,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[7] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[7] = 0;
BEST_SCORE_LIMIT[7] = 6600;
LEVEL_MATRIX_STORY_MODE[8] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
GOALS[8] = {
  type0: 0,
  type1: 0,
  type2: 32,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 32,
};
CONFIG_STORY_MODE[8] = {
  time: 11e4,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[8] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[8] = 0;
BEST_SCORE_LIMIT[8] = 6500;
LEVEL_MATRIX_STORY_MODE[9] = [
  [0, 4, 4, 0, 0, 4, 4, 0],
  [0, 4, 4, 0, 0, 4, 4, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 4, 4, 0, 0, 4, 4, 0],
  [0, 4, 4, 0, 0, 4, 4, 0],
];
GOALS[9] = {
  type0: 40,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 20,
};
CONFIG_STORY_MODE[9] = {
  time: 14e4,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[9] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[9] = 0;
BEST_SCORE_LIMIT[9] = 1e4;
LEVEL_MATRIX_STORY_MODE[10] = [
  [0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 4, 4],
  [1, 1, 1, 1, 1, 4, 4, 0],
  [1, 1, 1, 1, 4, 4, 0, 0],
  [1, 1, 1, 4, 4, 0, 0, 0],
  [1, 1, 4, 4, 0, 0, 0, 0],
  [1, 4, 4, 0, 0, 0, 0, 0],
];
GOALS[10] = {
  type0: 30,
  type1: 0,
  type2: 0,
  type3: 30,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 13,
};
CONFIG_STORY_MODE[10] = {
  time: 9e4,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[10] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[10] = 0;
BEST_SCORE_LIMIT[10] = 6e3;
LEVEL_MATRIX_STORY_MODE[11] = [
  [0, 0, 4, 4, 4, 0, 0],
  [0, 4, 4, 1, 4, 4, 0],
  [0, 4, 1, 1, 1, 4, 0],
  [0, 4, 1, 5, 1, 4, 0],
  [0, 4, 1, 1, 1, 4, 0],
  [0, 4, 4, 1, 4, 4, 0],
  [0, 0, 4, 4, 4, 0, 0],
];
GOALS[11] = {
  type0: 0,
  type1: 20,
  type2: 20,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 20,
};
CONFIG_STORY_MODE[11] = {
  time: 5e4,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !0,
  changingallowed: !1,
};
BACKGROUND[11] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[11] = 2e4;
BEST_SCORE_LIMIT[11] = 4500;
LEVEL_MATRIX_STORY_MODE[12] = [
  [0, 0, 0, 5, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];
GOALS[12] = {
  type0: 0,
  type1: 50,
  type2: 50,
  type3: 50,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[12] = {
  time: 5e4,
  numfaces: 4,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !0,
  changingallowed: !1,
};
BACKGROUND[12] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[12] = 1e3;
BEST_SCORE_LIMIT[12] = 9300;
LEVEL_MATRIX_STORY_MODE[13] = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];
GOALS[13] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 40,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[13] = {
  time: 12e4,
  numfaces: 5,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[13] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[13] = 0;
BEST_SCORE_LIMIT[13] = 7e3;
LEVEL_MATRIX_STORY_MODE[14] = [
  [0, 4, 0, 4, 0, 4, 0],
  [4, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 4],
  [0, 4, 0, 4, 0, 4, 0],
];
GOALS[14] = {
  type0: 30,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 30,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 12,
};
CONFIG_STORY_MODE[14] = {
  time: 13e4,
  numfaces: 5,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !0,
  changingallowed: !1,
};
BACKGROUND[14] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[14] = 2e4;
BEST_SCORE_LIMIT[14] = 8700;
LEVEL_MATRIX_STORY_MODE[15] = [
  [4, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0, 6, 0, 1],
  [4, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [4, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [4, 1, 1, 1, 1, 1, 1, 1],
  [0, 4, 0, 4, 0, 4, 0, 4],
];
GOALS[15] = {
  type0: 40,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 8,
};
CONFIG_STORY_MODE[15] = {
  time: 13e4,
  numfaces: 5,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !0,
  changingallowed: !0,
};
BACKGROUND[15] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[15] = 2e4;
BEST_SCORE_LIMIT[15] = 7300;
LEVEL_MATRIX_STORY_MODE[16] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 6, 1, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 5, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
GOALS[16] = {
  type0: 70,
  type1: 0,
  type2: 70,
  type3: 0,
  type4: 70,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[16] = {
  time: 12e4,
  numfaces: 5,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !0,
  changingallowed: !0,
};
BACKGROUND[16] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[16] = 2e4;
BEST_SCORE_LIMIT[16] = 15e3;
LEVEL_MATRIX_STORY_MODE[17] = [
  [0, 0, 1, 1, 3, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
];
GOALS[17] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 1,
  block: 0,
};
CONFIG_STORY_MODE[17] = {
  time: 7e4,
  numfaces: 5,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[17] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[17] = 0;
BEST_SCORE_LIMIT[17] = 4e3;
LEVEL_MATRIX_STORY_MODE[18] = [
  [0, 0, 4, 4, 4, 4, 0, 0],
  [0, 1, 1, 1, 3, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 4, 4, 4, 4, 0, 0],
];
GOALS[18] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 2,
  block: 16,
};
CONFIG_STORY_MODE[18] = {
  time: 18e4,
  numfaces: 5,
  starallowed: !0,
  bomballowed: !0,
  clockallowed: !0,
  changingallowed: !1,
};
BACKGROUND[18] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[18] = 2e4;
BEST_SCORE_LIMIT[18] = 15e3;
LEVEL_MATRIX_STORY_MODE[19] = [
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 8, 8, 1, 1, 8, 8, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
];
GOALS[19] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 50,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[19] = {
  time: 18e4,
  numfaces: 5,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[19] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[19] = 0;
BEST_SCORE_LIMIT[19] = 11e3;
LEVEL_MATRIX_STORY_MODE[20] = [
  [4, 4, 4, 4, 4, 4, 4, 4],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
GOALS[20] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 0,
  block: 16,
};
CONFIG_STORY_MODE[20] = {
  time: 18e4,
  numfaces: 5,
  starallowed: !1,
  bomballowed: !0,
  clockallowed: !1,
  changingallowed: !0,
};
BACKGROUND[20] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[20] = 0;
BEST_SCORE_LIMIT[20] = 9500;
LEVEL_MATRIX_STORY_MODE[21] = [
  [0, 0, 3, 0, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 8, 1, 1, 8, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
GOALS[21] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 4,
  block: 0,
};
CONFIG_STORY_MODE[21] = {
  time: 21e4,
  numfaces: 5,
  starallowed: !0,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[21] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[21] = 0;
BEST_SCORE_LIMIT[21] = 13e3;
LEVEL_MATRIX_STORY_MODE[22] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
GOALS[22] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 40,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[22] = {
  time: 19e4,
  numfaces: 6,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !1,
};
BACKGROUND[22] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[22] = 0;
BEST_SCORE_LIMIT[22] = 9500;
LEVEL_MATRIX_STORY_MODE[23] = [
  [4, 0, 0, 0, 0, 0, 0, 4],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 4, 4, 4, 4, 1, 1],
  [1, 1, 4, 1, 1, 4, 1, 1],
  [1, 1, 4, 1, 1, 4, 1, 1],
  [1, 1, 4, 4, 4, 4, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [4, 0, 0, 0, 0, 0, 0, 4],
];
GOALS[23] = {
  type0: 0,
  type1: 20,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 20,
  type6: 0,
  type7: 0,
  star: 0,
  block: 16,
};
CONFIG_STORY_MODE[23] = {
  time: 2e5,
  numfaces: 6,
  starallowed: !1,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !0,
};
BACKGROUND[23] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[23] = 0;
BEST_SCORE_LIMIT[23] = 9500;
LEVEL_MATRIX_STORY_MODE[24] = [
  [0, 1, 1, 1, 3, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 1, 4],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [4, 1, 1, 1, 1, 1, 1, 4],
];
GOALS[24] = {
  type0: 0,
  type1: 0,
  type2: 0,
  type3: 0,
  type4: 0,
  type5: 0,
  type6: 0,
  type7: 0,
  star: 1,
  block: 8,
};
CONFIG_STORY_MODE[24] = {
  time: 19e4,
  numfaces: 6,
  starallowed: !0,
  bomballowed: !1,
  clockallowed: !1,
  changingallowed: !0,
};
BACKGROUND[24] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[24] = 0;
BEST_SCORE_LIMIT[24] = 8300;
LEVEL_MATRIX_STORY_MODE[25] = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 2, 2, 1, 0, 1],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
];
GOALS[25] = {
  type0: 20,
  type1: 20,
  type2: 20,
  type3: 20,
  type4: 20,
  type5: 20,
  type6: 0,
  type7: 0,
  star: 0,
  block: 0,
};
CONFIG_STORY_MODE[25] = {
  time: 280000, // 280 seconds
  numfaces: 4,
  starallowed: false,
  bomballowed: true,
  clockallowed: true,
  changingallowed: false,
};
BACKGROUND[25] = 0;
TIMER_CLOCK_SPAWN_STORY_MODE[27] = 1;
BEST_SCORE_LIMIT[25] = 14000;
var LEVEL_MATRIX_TIME_ATTACK = [],
  CONFIG_TIME_ATTACK = [],
  TIMER_CLOCK_SPAWN_TIME_ATTACK = [];
LEVEL_MATRIX_TIME_ATTACK[1] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
CONFIG_TIME_ATTACK[1] = {
  numfaces: 3,
  bomballowed: !0,
  clockallowed: !0,
  changingallowed: !0,
};
TIMER_CLOCK_SPAWN_TIME_ATTACK[1] = 0;
function CPreloader() {
  var a, e, b, g, d, h, k, l, r;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.loadSprites();
    r = new createjs.Container();
    s_oStage.addChild(r);
  };
  this.unload = function () {
    r.removeAllChildren();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var y = new createjs.Shape();
    y.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    r.addChild(y);
    y = s_oSpriteLibrary.getSprite("200x200");
    k = createBitmap(y);
    k.regX = 0.5 * y.width;
    k.regY = 0.5 * y.height;
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2 - 180;
    r.addChild(k);
    l = new createjs.Shape();
    l.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
    r.addChild(l);
    k.mask = l;
    y = s_oSpriteLibrary.getSprite("progress_bar");
    g = createBitmap(y);
    g.x = CANVAS_WIDTH / 2 - y.width / 2;
    g.y = CANVAS_HEIGHT / 2 + 50;
    r.addChild(g);
    a = y.width;
    e = y.height;
    d = new createjs.Shape();
    d.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, 1, e);
    r.addChild(d);
    g.mask = d;
    b = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2 + 100;
    b.textBaseline = "alphabetic";
    b.textAlign = "center";
    r.addChild(b);
    h = new createjs.Shape();
    h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    r.addChild(h);
    createjs.Tween.get(h)
      .to({ alpha: 0 }, 500)
      .call(function () {
        createjs.Tween.removeTweens(h);
        r.removeChild(h);
      });
  };
  this.refreshLoader = function (y) {
    b.text = y + "%";
    100 === y &&
      (s_oMain._onRemovePreloader(), (b.visible = !1), (g.visible = !1));
    d.graphics.clear();
    y = Math.floor((y * a) / 100);
    d.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, y, e);
  };
  this._init();
}
function CMain(a) {
  var e,
    b = 0,
    g = 0,
    d = STATE_LOADING,
    h,
    k,
    l;
  this.initContainer = function () {
    s_oCanvas = document.getElementById("canvas");
    s_oStage = new createjs.Stage(s_oCanvas);
    createjs.Touch.enable(s_oStage, !0);
    Howler.html5PoolSize = 1;
    s_bMobile = isMobile();
    $("body").css("background-image", 'url("./css/bg_desktop.jpg"');
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.addEventListener("tick", this._update);
    createjs.Ticker.framerate = FPS;
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    seekAndDestroy()
      ? (h = new CPreloader())
      : (h = new CPreloader());
    s_oLocalStorage = new CLocalStorage(GAME_NAME);
    s_oSoundMatching = new CSoundMatching();
  };
  this.updateTotalScore = function () {
    for (var t = 0, z = 1; 26 > z; z++) t += s_aLevelScore[z];
    s_iTotalScore = t;
    s_oLocalStorage.saveDataStoryMode();
  };
  this.preloaderReady = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
    this._loadImages();
    e = !0;
  };
  this.soundLoaded = function () {
    b++;
    h.refreshLoader(Math.floor((b / g) * 100));
  };
  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = [];
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "soundtrack",
      loop: !0,
      volume: 1,
      ingamename: "soundtrack",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "click",
      loop: !1,
      volume: 1,
      ingamename: "click",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "game_over",
      loop: !1,
      volume: 1,
      ingamename: "game_over",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "bomb_explosion",
      loop: !1,
      volume: 1,
      ingamename: "bomb_explosion",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "hourglass_explosion",
      loop: !1,
      volume: 1,
      ingamename: "hourglass_explosion",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "stage_clear",
      loop: !1,
      volume: 1,
      ingamename: "stage_clear",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "star",
      loop: !1,
      volume: 1,
      ingamename: "chime",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "swoosh",
      loop: !1,
      volume: 1,
      ingamename: "swoosh",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "tictac",
      loop: !1,
      volume: 1,
      ingamename: "tictac",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "wood",
      loop: !1,
      volume: 1,
      ingamename: "wood",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "break_changing",
      loop: !1,
      volume: 1,
      ingamename: "break_changing",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "fall_0",
      loop: !1,
      volume: 1,
      ingamename: "fall_0",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "level_up",
      loop: !1,
      volume: 1,
      ingamename: "level_up",
    });
    for (var t = 0; t < NUM_BREAK_SOUNDS; t++)
      s_aSoundsInfo.push({
        path: "./sounds/",
        filename: "break_" + t,
        loop: !1,
        volume: 1,
        ingamename: "break_" + t,
      });
    g += s_aSoundsInfo.length;
    s_aSounds = [];
    for (t = 0; t < s_aSoundsInfo.length; t++)
      this.tryToLoadSound(s_aSoundsInfo[t], !1);
  };
  this.tryToLoadSound = function (t, z) {
    setTimeout(
      function () {
        s_aSounds[t.ingamename] = new Howl({
          src: [t.path + t.filename + ".mp3"],
          autoplay: !1,
          preload: !0,
          loop: t.loop,
          volume: t.volume,
          onload: s_oMain.soundLoaded,
          onloaderror: function (D, u) {
            for (var m = 0; m < s_aSoundsInfo.length; m++)
              if (D === s_aSounds[s_aSoundsInfo[m].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[m], !0);
                break;
              }
          },
          onplayerror: function (D) {
            for (var u = 0; u < s_aSoundsInfo.length; u++)
              if (D === s_aSounds[s_aSoundsInfo[u].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[u].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[u].ingamename].play();
                    "soundtrack" === s_aSoundsInfo[u].ingamename &&
                      null !== s_oGame &&
                      setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
                  }
                );
                break;
              }
          },
        });
      },
      z ? 200 : 0
    );
  };
  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/menu_anim/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("logo", "./sprites/menu_anim/logo.png");
    s_oSpriteLibrary.addSprite("sun", "./sprites/menu_anim/sun.png");
    s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
    s_oSpriteLibrary.addSprite(
      "but_continue_small",
      "./sprites/but_continue_small.png"
    );
    s_oSpriteLibrary.addSprite("but_check", "./sprites/but_check.png");
    s_oSpriteLibrary.addSprite("but_exit_big", "./sprites/but_exit_big.png");
    s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
    s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");
    s_oSpriteLibrary.addSprite("but_lang", "./sprites/but_lang.png");
    for (var t = 0; 4 > t; t++)
      s_oSpriteLibrary.addSprite(
        "rays_" + t,
        "./sprites/end_anim/rays_" + t + ".jpg"
      );
    s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
    s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
    s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
    s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("end_panel", "./sprites/end_panel.png");
    s_oSpriteLibrary.addSprite("stars", "./sprites/stars.png");
    s_oSpriteLibrary.addSprite("star_filled", "./sprites/star_filled.png");
    s_oSpriteLibrary.addSprite("star_empty", "./sprites/star_empty.png");
    for (t = 0; t < NUM_CLOUD_SPRITE; t++)
      s_oSpriteLibrary.addSprite(
        "cloud_" + t,
        "./sprites/map/clouds/cloud_" + t + ".png"
      );
    for (t = 0; t < NUM_MAP_TILES; t++)
      s_oSpriteLibrary.addSprite(
        "jm_" + t,
        "./sprites/map/tiles/jm_" + t + ".jpg"
      );
    s_oSpriteLibrary.addSprite("bg_game_0", "./sprites/bg_game_0.jpg");
    s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
    s_oSpriteLibrary.addSprite(
      "but_restart_big",
      "./sprites/but_restart_big.png"
    );
    s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
    s_oSpriteLibrary.addSprite("but_text", "./sprites/but_text.png");
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_sprites.png");
    s_oSpriteLibrary.addSprite("level_button", "./sprites/level_button.png");
    s_oSpriteLibrary.addSprite("lock_level", "./sprites/lock_level.png");
    s_oSpriteLibrary.addSprite("time_bar", "./sprites/time_bar.png");
    s_oSpriteLibrary.addSprite("time_bar_fill", "./sprites/time_bar_fill.png");
    s_oSpriteLibrary.addSprite("score_panel", "./sprites/score_panel.png");
    s_oSpriteLibrary.addSprite("score_icon", "./sprites/score_icon.png");
    s_oSpriteLibrary.addSprite(
      "best_score_icon",
      "./sprites/best_score_icon.png"
    );
    s_oSpriteLibrary.addSprite("bottom_panel", "./sprites/bottom_panel.png");
    s_oSpriteLibrary.addSprite("balloon_1", "./sprites/balloon_1.png");
    s_oSpriteLibrary.addSprite("cell", "./sprites/cell.png");
    s_oSpriteLibrary.addSprite("bg_symbol", "./sprites/bg_symbol.png");
    s_oSpriteLibrary.addSprite("block", "./sprites/block.png");
    s_oSpriteLibrary.addSprite("trap", "./sprites/trap.png");
    s_oSpriteLibrary.addSprite("jelly", "./sprites/jelly.png");
    s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
    s_oSpriteLibrary.addSprite("level_up", "./sprites/level_up.png");
    s_oSpriteLibrary.addSprite("time_is_up", "./sprites/time_is_up.png");
    for (t = 0; 13 > t; t++)
      7 !== t &&
        8 !== t &&
        11 !== t &&
        s_oSpriteLibrary.addSprite(
          "explosion_" + t,
          "./sprites/explosion_" + t + ".png"
        );
    s_oSpriteLibrary.addSprite("target", "./sprites/target.png");
    for (t = 0; t < HAND_ANIM_NUM_FRAMES; t++)
      s_oSpriteLibrary.addSprite(
        "hand_anim_" + t,
        "./sprites/hand_anim/hand_anim_" + t + ".png"
      );
    g += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    b++;
    h.refreshLoader(Math.floor((b / g) * 100));
  };
  this._onRemovePreloader = function () {
    h.unload();
    k || (playSound("soundtrack", 1, !0), s_oMain.gotoMenu());
  };
  this._onAllImagesLoaded = function () {};
  this.gotoMenu = function () {
    k = new CMenu();
    d = STATE_MENU;
  };
  this.goToModeMenu = function () {
    LEVEL_MATRIX = LEVEL_MATRIX_STORY_MODE;
    CONFIG = CONFIG_STORY_MODE;
    TIMER_CLOCK_SPAWN = TIMER_CLOCK_SPAWN_STORY_MODE;
    new CMapStoryMode();
    d = STATE_MENU;
  };
  this.gotoGameStoryMode = function (t) {
    s_iCurLevel = t;
    l = new CGameStoryMode(r, t);
    d = STATE_GAME;
  };
  this.gotoGameTimeAttack = function () {
    s_iCurLevel = 1;
    d = STATE_GAME;
    LEVEL_MATRIX = LEVEL_MATRIX_TIME_ATTACK;
    CONFIG = CONFIG_TIME_ATTACK;
    TIMER_CLOCK_SPAWN = TIMER_CLOCK_SPAWN_TIME_ATTACK;
    l = new CGameTimeAttack(r, s_iCurLevel);
    d = STATE_GAME;
  };
  this.gotoHelp = function () {
    new CHelp();
    d = STATE_HELP;
  };
  this.stopUpdate = function () {
    e = !1;
    createjs.Ticker.paused = !0;
    $("#block_game").css("display", "block");
    Howler.mute(!0);
  };
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    e = !0;
    createjs.Ticker.paused = !1;
    $("#block_game").css("display", "none");
    s_bAudioActive && Howler.mute(!1);
  };
  this._update = function (t) {
    if (!1 !== e) {
      var z = new Date().getTime();
      s_iTimeElaps = z - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = z;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      null !== s_oMapStoryMode && s_oMapStoryMode.update();
      d === STATE_GAME && l.update();
      s_oStage.update(t);
    }
  };
  s_oMain = this;
  var r = a;
  ENABLE_CHECK_ORIENTATION = a.check_orientation;
  ENABLE_FULLSCREEN = false;a.fullscreen;
  var y = navigator.language.split("-")[0];
  void 0 === LANG_CODES[y] && (y = "en");
  s_iCurLang = LANG_CODES[y];
  console.log("LANG_CODES[" + navigator.language + "] " + s_iCurLang);
  refreshLanguage();
  s_bAudioActive = a.audio_enable_on_startup;
  this.initContainer();
}
var s_bMobile,
  s_bAudioActive,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_iCurLevel,
  s_bFullscreen = !1,
  s_iGameMode = TIME_ATTACK,
  s_oGame = null,
  s_oDrawLayer,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_oCanvas,
  s_aSounds,
  s_aSoundsInfo,
  s_oLocalStorage,
  s_oSoundMatching,
  s_bHelpTimeAttack = !0,
  s_iCurLang = LANG_EN;
function CTextButton(a, e, b, g, d, h, k, l, r, y, t) {
  var z, D, u, m, p, A, C, x, w, H, v, G, K;
  this._init = function (B, Y, V, aa, P, Q, N, S, Z, R) {
    K = z = !1;
    D = 1;
    u = [];
    m = [];
    G = createBitmap(V);
    H = new createjs.Container();
    H.x = B;
    H.y = Y;
    H.regX = V.width / 2;
    H.regY = V.height / 2;
    s_bMobile || (H.cursor = "pointer");
    H.addChild(G);
    t.addChild(H);
    v = new CTLText(
      H,
      Z,
      R,
      V.width,
      V.height,
      N,
      S,
      Q,
      P,
      1,
      30,
      5,
      aa,
      !0,
      !0,
      !0,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    H.off("mousedown", p);
    H.off("pressup", A);
    s_bMobile || (H.off("mouseover", C), H.off("mouseout", x));
    createjs.Tween.removeTweens(H);
    t.removeChild(H);
  };
  this.setVisible = function (B) {
    H.visible = B;
  };
  this.setAlign = function (B) {
    v.textAlign = B;
  };
  this.setTextX = function (B) {
    v.x = B;
  };
  this.setScale = function (B) {
    D = H.scaleX = H.scaleY = B;
  };
  this.block = function (B) {
    z = B;
  };
  this._initListener = function () {
    p = H.on("mousedown", this.buttonDown);
    A = H.on("pressup", this.buttonRelease);
    s_bMobile ||
      ((C = H.on("mouseover", this.buttonOver, this)),
      (x = H.on("mouseout", this.buttonOut, this)));
  };
  this.addEventListener = function (B, Y, V) {
    u[B] = Y;
    m[B] = V;
  };
  this.addEventListenerWithParams = function (B, Y, V, aa) {
    u[B] = Y;
    m[B] = V;
    w = aa;
  };
  this.buttonRelease = function () {
    z ||
      (playSound("click", 1, !1),
      (H.scaleX = D),
      (H.scaleY = D),
      u[ON_MOUSE_UP] && u[ON_MOUSE_UP].call(m[ON_MOUSE_UP], w));
  };
  this.buttonDown = function () {
    z ||
      ((H.scaleX = 0.9 * D),
      (H.scaleY = 0.9 * D),
      u[ON_MOUSE_DOWN] && u[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN]));
  };
  this.buttonOver = function (B) {
    z ||
      ((B.target.cursor = "pointer"),
      playSound("click", 1, !1),
      K && createjs.Tween.removeTweens(H),
      createjs.Tween.get(H, { override: !0 }).to(
        { scaleX: 0.9, scaleY: 0.9 },
        200,
        createjs.Ease.quadOut
      ));
  };
  this.buttonOut = function () {
    z ||
      createjs.Tween.get(H)
        .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.quadIn)
        .call(
          function () {
            K && this.pulseAnimation();
          },
          null,
          this
        );
  };
  this.setPosition = function (B, Y) {
    H.x = B;
    H.y = Y;
  };
  this.tweenPosition = function (B, Y, V, aa, P, Q, N) {
    createjs.Tween.get(H)
      .wait(aa)
      .to({ x: B, y: Y }, V, P)
      .call(function () {
        void 0 !== Q && Q.call(N);
      });
  };
  this.pulseAnimation = function () {
    K = !0;
    createjs.Tween.get(H, { loop: !0 })
      .to({ scaleX: 0.9, scaleY: 0.9 }, 850, createjs.Ease.quadOut)
      .to({ scaleX: 1, scaleY: 1 }, 650, createjs.Ease.quadIn);
  };
  this.changeText = function (B) {
    v.refreshText(B);
  };
  this.setX = function (B) {
    H.x = B;
  };
  this.setY = function (B) {
    H.y = B;
  };
  this.getX = function () {
    return H.x;
  };
  this.getY = function () {
    return H.y;
  };
  this.getContainer = function () {
    return H;
  };
  this.getScale = function () {
    return H.scaleX;
  };
  this._init(a, e, b, g, d, h, k, l, r, y);
}
function CTextButtonNoSprite(a, e, b, g, d, h, k) {
  var l, r, y, t, z, D;
  this._init = function (u, m, p, A, C, x, w) {
    r = [];
    y = [];
    l = p;
    p = w + "px";
    D = new createjs.Text();
    D.text = l;
    D.font = p + " " + PRIMARY_FONT;
    D.color = A;
    D.textAlign = "center";
    D.textBaseline = "middle";
    D.lineWidth = 400;
    A = new createjs.Graphics()
      .beginFill("rgba(158,158,158,0.01)")
      .drawRect(
        -D.getMeasuredWidth() / 2,
        -D.getMeasuredHeight() / 2 - 10,
        D.getMeasuredWidth(),
        D.getMeasuredHeight() + 20
      );
    z = new createjs.Shape(A);
    t = new createjs.Container();
    t.x = u;
    t.y = m;
    t.addChild(D, z);
    C.addChild(t);
    this._initListener();
  };
  this.unload = function () {
    s_bMobile
      ? t.off("mousedown", this.buttonDown)
      : (t.off("mousedown", this.buttonDown),
        t.off("mouseover", this.buttonOver),
        t.off("mouseout", this.buttonOut));
    t.off("pressup", this.buttonRelease);
    d.removeChild(t);
  };
  this.setVisible = function (u) {
    t.visible = u;
  };
  this._initListener = function () {
    if (s_bMobile) t.on("mousedown", this.buttonDown);
    else
      t.on("mousedown", this.buttonDown),
        t.on("mouseover", this.buttonOver),
        t.on("mouseout", this.buttonOut);
    t.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (u, m, p) {
    r[u] = m;
    y[u] = p;
  };
  this.buttonRelease = function () {
    r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(y[ON_MOUSE_UP]);
  };
  this.buttonOver = function (u) {
    t.scaleX = 1.1;
    t.scaleY = 1.1;
    D.color = "#ffa800";
    s_bMobile || ((u.target.cursor = "pointer"), playSound("click", 1, !1));
  };
  this.buttonOut = function () {
    t.scaleX = 1;
    t.scaleY = 1;
    D.color = g;
  };
  this.buttonDown = function () {
    s_bMobile && playSound("click", 1, !1);
    r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(y[ON_MOUSE_DOWN]);
  };
  this.setTextPosition = function (u) {
    D.y = u;
  };
  this.setPosition = function (u, m) {
    t.x = u;
    t.y = m;
  };
  this.setWidth = function (u) {
    D.lineWidth = u;
  };
  this.setX = function (u) {
    t.x = u;
  };
  this.setY = function (u) {
    t.y = u;
  };
  this.getButtonImage = function () {
    return t;
  };
  this.getX = function () {
    return t.x;
  };
  this.getY = function () {
    return t.y;
  };
  this._init(a, e, b, g, d, h, k);
  return this;
}
function CLevelButton(a, e, b, g) {
  var d,
    h,
    k,
    l = [],
    r,
    y,
    t,
    z,
    D,
    u,
    m,
    p,
    A,
    C,
    x,
    w,
    H;
  this._init = function (v, G, K, B) {
    d = !0;
    r = [];
    y = [];
    m = new createjs.Container();
    m.x = v;
    m.y = G;
    v = s_oSpriteLibrary.getSprite("level_button");
    G = {
      images: [v],
      frames: {
        width: v.width / 2,
        height: v.height,
        regX: v.width / 2 / 2,
        regY: v.height / 2,
      },
      animations: { state_active: [0], state_disabled: [1] },
    };
    G = new createjs.SpriteSheet(G);
    p = createSprite(
      G,
      "state_active",
      v.width / 2 / 2,
      v.height / 2,
      v.width / 2,
      v.height
    );
    h = v.width;
    k = v.height;
    m.addChild(p);
    C = new CFormatText(
      0,
      0,
      K,
      PRIMARY_FONT_COLOR,
      m,
      "#ef8297",
      40,
      "center"
    );
    v = s_oSpriteLibrary.getSprite("lock_level");
    w = createBitmap(v);
    w.x = 25;
    w.y = 15;
    m.addChild(w);
    v = s_oSpriteLibrary.getSprite("stars");
    G = {
      images: [v],
      frames: { width: 99, height: 54, regX: 49.5, regY: 27 },
      animations: { stars_0: [0], stars_1: [1], stars_2: [2], stars_3: [3] },
    };
    G = new createjs.SpriteSheet(G);
    H = createSprite(G, 0, 49.5, 27, 99, 54);
    H.y = -55;
    H.gotoAndStop(0);
    m.addChild(H);
    K = new createjs.Graphics()
      .beginFill("rgba(158,158,158,0.01)")
      .drawRect(-h / 4, -k / 2, h / 2, k);
    x = new createjs.Shape(K);
    m.addChild(x);
    B.addChild(m);
    this._initListener();
  };
  this.unload = function () {
    m.off("mousedown", t);
    m.off("pressup", z);
    s_bMobile || (m.off("mouseover", D), m.off("mouseout", u));
    createjs.Tween.removeTweens(m);
    g.removeChild(m);
  };
  this.setVisible = function (v) {
    m.visible = v;
  };
  this._initListener = function () {
    t = m.on("mousedown", this.buttonDown);
    z = m.on("pressup", this.buttonRelease);
    s_bMobile ||
      ((D = m.on("mouseover", this.buttonOver)),
      (u = m.on("mouseout", this.buttonOut)));
  };
  this.addEventListener = function (v, G, K) {
    r[v] = G;
    y[v] = K;
  };
  this.addEventListenerWithParams = function (v, G, K, B) {
    r[v] = G;
    y[v] = K;
    l = B;
  };
  this.addShadow = function (v, G, K) {
    m.shadow = new createjs.Shadow("rgba(100,100,100,0.4)", v, G, K);
  };
  this.buttonRelease = function () {
    d && r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(y[ON_MOUSE_UP], l);
  };
  this.buttonOver = function (v) {
    d &&
      ((v.target.cursor = "pointer"),
      s_bMobile || playSound("click", 1, !1),
      (m.scaleX = 1.1),
      (m.scaleY = 1.1));
  };
  this.buttonOut = function () {
    d && ((m.scaleX = 1), (m.scaleY = 1));
  };
  this.buttonDown = function () {
    d &&
      (r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(y[ON_MOUSE_DOWN], l),
      s_bMobile && playSound("click", 1, !1));
  };
  this.addTextOn = function (v, G, K, B, Y) {
    K = void 0 === K ? PRIMARY_FONT_COLOR : K;
    B = void 0 === B ? STROKE_COLOR : B;
    Y = void 0 === Y ? 30 : Y;
    "left" === G
      ? (A = new CFormatText(-h / 4, -k / 2 - 10, v, K, m, B, Y, "left"))
      : "center" === G
      ? (A = new CFormatText(0, -k / 2 - 10, v, K, m, B, Y, "center"))
      : "bottom" === G &&
        (A = new CFormatText(0, -k / 2 + 120, v, K, m, B, Y, "center"));
  };
  this.setTextPosition = function (v, G) {
    A.setPosition(v, G);
  };
  this.setStars = function (v) {
    d
      ? 0 === v
        ? H.gotoAndStop(0)
        : v >= BEST_SCORE_LIMIT[b]
        ? H.gotoAndStop(3)
        : v > 0.7 * BEST_SCORE_LIMIT[b] && v < BEST_SCORE_LIMIT[b]
        ? H.gotoAndStop(2)
        : H.gotoAndStop(1)
      : (H.visible = !1);
  };
  this.setActive = function (v) {
    d = v;
    w.visible = !v;
    v
      ? p.gotoAndStop("state_active")
      : (p.gotoAndStop("state_disabled"),
        C.setColor(PRIMARY_FONT_COLOR, "#aaa"));
  };
  this.pulseAnimation = function () {
    createjs.Tween.get(m, { loop: !0 })
      .to({ scaleX: 1.1, scaleY: 1.1 }, 850, createjs.Ease.quadOut)
      .to({ scaleX: 1, scaleY: 1 }, 650, createjs.Ease.quadIn);
  };
  this.setPosition = function (v, G) {
    m.x = v;
    m.y = G;
  };
  this.setX = function (v) {
    m.x = v;
  };
  this.setY = function (v) {
    m.y = v;
  };
  this.getButtonImage = function () {
    return m;
  };
  this.getX = function () {
    return m.x;
  };
  this.getY = function () {
    return m.y;
  };
  this.setForInfo = function () {
    d = H.visible = !1;
    w.visible = !1;
    p.gotoAndStop("state_active");
  };
  this._init(a, e, b, g);
  return this;
}
function CFormatText(a, e, b, g, d, h, k, l, r, y, t, z) {
  r = void 0 === r ? PRIMARY_FONT : r;
  var D, u, m, p;
  this._init = function (C, x, w, H, v, G, K, B, Y, V, aa, P) {
    m = new createjs.Container();
    m.x = C;
    m.y = x;
    v.addChild(m);
    V = V ? V : 1.5 * K;
    x = C = 0;
    switch (B) {
      case "center":
        C = -aa / 2;
        x = -V / 2;
        break;
      case "right":
        (C = -aa), (x = -V);
    }
    D = !1;
    G &&
      ((D = new CTLText(
        m,
        C,
        x,
        aa,
        V,
        K,
        B,
        G,
        Y,
        1.1,
        0,
        0,
        w,
        !0,
        !0,
        P,
        !1
      )),
      D.setOutline(4));
    u = new CTLText(m, C, x, aa, V, K, B, H, Y, 1.1, 0, 0, w, !0, !0, P, !1);
  };
  this.unload = function () {
    d.removeChild(m);
  };
  this.disableOutline = function () {
    m.removeChild(D.getText());
  };
  this.setVisible = function (C) {
    m.visible = C;
  };
  this.isVisible = function () {
    return m.visible;
  };
  this.setOutline = function (C) {
    D && D.setOutline(C);
  };
  this.setShadow = function (C) {
    C && D.setShadow("#333333", 2, 2, 6);
  };
  this.setWidth = function (C) {};
  this.setText = function (C) {
    u.refreshText(C);
    D && D.refreshText(C);
  };
  this.setColor = function (C, x) {
    u.setColor(C);
    D && D.setColor(x);
  };
  this.getText = function () {
    return m;
  };
  this.setPos = function (C) {
    m.y = C;
  };
  this.getPos = function () {
    return { x: m.x, y: m.y };
  };
  this.playText = function () {
    p = "";
    this.setText("");
    this._slideText(0);
  };
  this._slideText = function (C) {
    p += b[C];
    this.setText(p);
    C < b.length - 1 &&
      setTimeout(function () {
        A._slideText(C + 1);
      }, 40);
  };
  this.setPosition = function (C, x) {
    m.x = C;
    m.y = x;
  };
  var A = this;
  this._init(
    a,
    e,
    b,
    g,
    d,
    h,
    k,
    void 0 === l ? "left" : l,
    r,
    void 0 === y ? null : y,
    void 0 === t ? 700 : t,
    void 0 === z ? !1 : z
  );
}
function CToggle(a, e, b, g, d) {
  var h, k, l, r, y, t, z, D, u;
  this._init = function (m, p, A, C, x) {
    l = [];
    r = [];
    k = !0;
    var w = new createjs.SpriteSheet({
      images: [A],
      frames: {
        width: A.width / 2,
        height: A.height,
        regX: A.width / 2 / 2,
        regY: A.height / 2,
      },
      animations: { state_true: [0], state_false: [1] },
    });
    h = C;
    u = createSprite(
      w,
      "state_" + h,
      A.width / 2 / 2,
      A.height / 2,
      A.width / 2,
      A.height
    );
    u.x = m;
    u.y = p;
    u.stop();
    x.addChild(u);
    this._initListener();
  };
  this.unload = function () {
    u.off("mousedown", y);
    u.off("pressup", t);
    s_bMobile || (u.off("mouseover", z), u.off("mouseout", D));
    d.removeChild(u);
  };
  this._initListener = function () {
    y = u.on("mousedown", this.buttonDown);
    t = u.on("pressup", this.buttonRelease);
    s_bMobile ||
      ((z = u.on("mouseover", this.buttonOver)),
      (D = u.on("mouseout", this.buttonOut)));
  };
  this.addEventListener = function (m, p, A) {
    l[m] = p;
    r[m] = A;
  };
  this.setActive = function (m) {
    h = m;
    u.gotoAndStop("state_" + h);
  };
  this.buttonRelease = function () {
    u.scaleX = 1;
    u.scaleY = 1;
    h = !h;
    u.gotoAndStop("state_" + h);
    l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(r[ON_MOUSE_UP], h);
  };
  this.buttonOver = function (m) {
    s_bMobile ||
      ((m.target.cursor = "pointer"),
      playSound("click", 1, !1),
      k && ((u.scaleX = 0.9), (u.scaleY = 0.9)));
    u.gotoAndStop("state_" + h);
  };
  this.buttonOut = function () {
    k && ((u.scaleX = 1), (u.scaleY = 1));
    u.gotoAndStop("state_" + h);
  };
  this.buttonDown = function () {
    u.scaleX = 0.9;
    u.scaleY = 0.9;
    s_bMobile && playSound("click", 1, !1);
    l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN]);
  };
  this.getButtonImage = function () {
    return u;
  };
  this.setPosition = function (m, p) {
    u.x = m;
    u.y = p;
  };
  this.setScaleOn = function (m) {
    k = m;
  };
  this._init(a, e, b, g, d);
}
function CGfxButton(a, e, b, g) {
  var d,
    h,
    k,
    l,
    r = [],
    y,
    t,
    z,
    D,
    u,
    m,
    p,
    A,
    C,
    x;
  this._init = function (w, H, v, G) {
    d = !0;
    x = h = !1;
    u = [];
    m = [];
    p = new createjs.Container();
    p.x = w;
    p.y = H;
    A = createBitmap(v);
    A.regX = v.width / 2;
    A.regY = v.height / 2;
    k = v.width;
    l = v.height;
    p.addChild(A);
    G.addChild(p);
    this._initListener();
  };
  this.unload = function () {
    p.off("mousedown", y);
    p.off("pressup", t);
    s_bMobile || (p.off("mouseover", z), p.off("mouseout", D));
    createjs.Tween.removeTweens(p);
    g.removeChild(p);
  };
  this.setVisible = function (w) {
    p.visible = w;
  };
  this._initListener = function () {
    y = p.on("mousedown", this.buttonDown);
    t = p.on("pressup", this.buttonRelease);
    s_bMobile ||
      ((z = p.on("mouseover", this.buttonOver)),
      (D = p.on("mouseout", this.buttonOut)));
  };
  this.addEventListener = function (w, H, v) {
    u[w] = H;
    m[w] = v;
  };
  this.addEventListenerWithParams = function (w, H, v, G) {
    u[w] = H;
    m[w] = v;
    r = G;
  };
  this.buttonRelease = function () {
    x ||
      ((p.scaleX = 1),
      (p.scaleY = 1),
      u[ON_MOUSE_UP] && u[ON_MOUSE_UP].call(m[ON_MOUSE_UP], r));
  };
  this.buttonOver = function (w) {
    s_bMobile || ((w.target.cursor = "pointer"), playSound("click", 1, !1));
    d && ((p.scaleX = 0.9), (p.scaleY = 0.9));
    h && C.setVisible(!0);
  };
  this.buttonOut = function () {
    d && ((p.scaleX = 1), (p.scaleY = 1));
    h && C.setVisible(!1);
  };
  this.buttonDown = function () {
    x ||
      ((p.scaleX = 0.9),
      (p.scaleY = 0.9),
      s_bMobile && playSound("click", 1, !1),
      u[ON_MOUSE_DOWN] && u[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN], r));
  };
  this.setScaleOn = function (w) {
    d = w;
  };
  this.addTextOn = function (w, H) {
    h = !0;
    "left" === H
      ? ((C = new CFormatText(
          -k / 2,
          -l / 2 - 10,
          w,
          "#ffe400",
          p,
          "#ac5124",
          14
        )),
        C.setAlign("left"))
      : "center" === H
      ? ((C = new CFormatText(0, -l / 2 - 10, w, "#ffe400", p, "#ac5124", 14)),
        C.setAlign("center"))
      : "bot" === H &&
        ((C = new CFormatText(0, +l / 2 + 12, w, "#ffe400", p, "#ac5124", 14)),
        C.setAlign("center"));
    C.setVisible(!1);
  };
  this.block = function (w) {
    x = w;
  };
  this.getButtonImage = function () {
    return p;
  };
  this.setPosition = function (w, H) {
    p.x = w;
    p.y = H;
  };
  this.setX = function (w) {
    p.x = w;
  };
  this.setY = function (w) {
    p.y = w;
  };
  this.getButtonImage = function () {
    return p;
  };
  this.pulseAnimation = function () {
    createjs.Tween.get(p, { loop: !0 })
      .to({ scaleX: 0.9, scaleY: 0.9 }, 850, createjs.Ease.quadOut)
      .to({ scaleX: 1, scaleY: 1 }, 650, createjs.Ease.quadIn);
  };
  this.popShowAnimation = function (w, H) {
    w = void 0 === w ? null : w;
    p.scaleX = p.scaleY = 0;
    createjs.Tween.get(p)
      .to(
        { scaleX: 1, scaleY: 1 },
        randomIntBetween(500, 650),
        createjs.Ease.bounceOut
      )
      .call(function () {
        null !== w && w.call(H);
      });
  };
  this.getX = function () {
    return p.x;
  };
  this.getY = function () {
    return p.y;
  };
  this.reverseSprite = function () {
    A.scaleX = -1;
  };
  this._init(a, e, b, g);
  return this;
}
function CMenu() {
  var a,
    e,
    b,
    g,
    d,
    h,
    k,
    l,
    r,
    y,
    t,
    z,
    D,
    u,
    m,
    p,
    A,
    C,
    x,
    w,
    H,
    v,
    G = null,
    K = null,
    B,
    Y,
    V,
    aa;
  this._init = function () {
    fadeSound("soundtrack", s_aSounds.soundtrack.volume(), 1, 500);
    C = null;
    t = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(t);
    z = new createjs.Container();
    z.x = CANVAS_WIDTH / 2;
    z.y = 920;
    z.scaleX = z.scaleY = 0;
    s_oStage.addChild(z);
    var P = s_oSpriteLibrary.getSprite("sun");
    u = createBitmap(P);
    u.regX = P.width / 2;
    u.regY = P.height / 2;
    u.y = -550;
    u.scaleX = u.scaleY = 1.05;
    u.rotation = -4;
    z.addChild(u);
    P = s_oSpriteLibrary.getSprite("logo");
    D = createBitmap(P);
    D.regX = P.width / 2;
    D.regY = P.height;
    z.addChild(D);
    createjs.Tween.get(u, { loop: !0, bounce: !0 }).to(
      { rotation: -u.rotation },
      1e3,
      createjs.Ease.sineInOut
    );
    createjs.Tween.get(z).to(
      { scaleX: 1, scaleY: 1 },
      1e3,
      createjs.Ease.elasticOut
    );
    V = new createjs.Container();
    s_oStage.addChild(V);
    var Q = s_oSpriteLibrary.getSprite("but_exit");
    aa = Q.width + 10;
    a = CANVAS_WIDTH + Q.width / 2;
    e = Q.height / 2 + 10;
    B = new CGfxButton(a, e, Q, V);
    B.addEventListener(ON_MOUSE_UP, this._onExitMode, this);
    var N = s_oSpriteLibrary.getSprite("but_lang");
    b = CANVAS_WIDTH - Q.width - 10;
    g = e;
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (P = s_oSpriteLibrary.getSprite("audio_icon")),
        (r = CANVAS_WIDTH - P.height / 2 - 10),
        (y = e),
        (m = new CToggle(r, y, P, s_bAudioActive, V)),
        m.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (b = r - Q.width - 10),
        (g = y);
    Y = new CButLang(b, g, NUM_LANGUAGES, s_iCurLang, N, V);
    Y.addEventListener(ON_SELECT_LANG, this._onChangeLang, this);
    P = s_oSpriteLibrary.getSprite("but_info");
    k = P.height / 2 + 10;
    l = e;
    p = new CGfxButton(k, l, P, s_oStage);
    p.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this);
    P = s_oSpriteLibrary.getSprite("but_text");
    w = CANVAS_WIDTH / 2 - 240;
    x = new CTextButton(
      w,
      1300,
      P,
      TEXT_TIME_ATTACK,
      PRIMARY_FONT,
      PRIMARY_FONT_COLOR,
      60,
      "center",
      0,
      -10,
      s_oStage
    );
    x.addEventListener(ON_MOUSE_UP, this._onPressUpButTimeAttack, this);
    v = CANVAS_WIDTH / 2 + 240;
    H = new CTextButton(
      v,
      1300,
      P,
      sprintf(TEXT_STORY_MODE, "\n"),
      PRIMARY_FONT,
      PRIMARY_FONT_COLOR,
      60,
      "center",
      0,
      -10,
      s_oStage
    );
    H.addEventListener(ON_MOUSE_UP, this._onPressUpButStoryMode, this);
    P = window.document;
    Q = P.documentElement;
    G =
      Q.requestFullscreen ||
      Q.mozRequestFullScreen ||
      Q.webkitRequestFullScreen ||
      Q.msRequestFullscreen;
    K =
      P.exitFullscreen ||
      P.mozCancelFullScreen ||
      P.webkitExitFullscreen ||
      P.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (G = !1);
    G &&
      screenfull.isEnabled &&
      ((P = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (d = k + P.width / 2 + 10),
      (h = l),
      (A = new CToggle(d, h, P, s_bFullscreen, s_oStage)),
      A.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_oLocalStorage.isUsed() ||
      ((P = new CAreYouSurePanel()),
      P.changeMessage(TEXT_ERR_LS, -300),
      P.setOneButton());
  };
  this._onPressUpButTimeAttack = function () {
	  gradle.event('btn_time_attack');
    s_iGameMode = TIME_ATTACK;
    C = new CMenuTimeAttack(s_oStage);
    C.startTimeAttack();
  };
  this._onPressUpButStoryMode = function () {
	  gradle.event('btn_story_mode');
    s_iGameMode = STORY_MODE;
    C = new CMenuStoryMode(s_oStage);
    0 === s_aLevelScore[1]
      ? C._onButContinueRelease()
      : this._onChooseMode(function () {
          C.show();
        });
  };
  this._onChooseMode = function (P) {
	  gradle.event('btn_choose_mode');
    var Q = H.getContainer(),
      N = Q.getBounds();
    x.block(!0);
    H.block(!0);
    createjs.Tween.get(V).to({ x: -aa }, 500, createjs.Ease.bounceOut);
    createjs.Tween.get(Q).to(
      { x: CANVAS_WIDTH + N.width / 2 },
      500,
      createjs.Ease.cubicOut
    );
    Q = x.getContainer();
    createjs.Tween.get(Q)
      .to({ x: -N.width / 2 }, 500, createjs.Ease.cubicOut)
      .call(P, null, this);
  };
  this._onExitMode = function () {
	  gradle.event('btn_exit_mode');
    B.block(!0);
    createjs.Tween.get(V, { override: !0 })
      .to({ x: 0 }, 500, createjs.Ease.bounceOut)
      .call(function () {
        B.block(!1);
      });
    C.hide(this.showMenuElements, this);
  };
  this.showMenuElements = function () {
    C.unload();
    C = null;
    H.setX(v);
    x.setX(w);
    x.block(!1);
    H.block(!1);
    var P = H.getContainer();
    P.scaleY = P.scaleX = 0;
    var Q = x.getContainer();
    Q.scaleY = Q.scaleX = 0;
    createjs.Tween.get(P).to(
      { scaleX: 1, scaleY: 1 },
      800,
      createjs.Ease.bounceOut
    );
    createjs.Tween.get(Q).to(
      { scaleX: 1, scaleY: 1 },
      800,
      createjs.Ease.bounceOut
    );
  };
  this.unload = function () {
    G && screenfull.isEnabled && A.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m.unload(), (m = null);
    Y.unload();
    C.unload();
    s_oStage.removeAllChildren();
    s_oMenu = t = null;
  };
  this.refreshButtonPos = function (P, Q) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      m.setPosition(r - P, Q + y);
    p.setPosition(k + P, Q + l);
    G && screenfull.isEnabled && A.setPosition(d + P, h + Q);
    Y.setPosition(b - P, g + Q);
    B.setPosition(a - P, Q + e);
  };
  this.resetFullscreenBut = function () {
    G && screenfull.isEnabled && A.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
	  gradle.event('btn_fullscreen_release');
    s_bFullscreen
      ? K.call(window.document)
      : G.call(window.document.documentElement);
    sizeHandler();
  };
  this._onAudioToggle = function () {
	  gradle.event('btn_sound');
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onButContinueRelease = function () {
	  gradle.event('btn_continue');
    this.unload();
    s_oMain.goToModeMenu();
    $(s_oMain).trigger("start_session");
  };
  this._onButPlayRelease = function () {
	  gradle.event('btn_play_release');
	  //gradle.event('btn_play');
    new CWarningPanel();
  };
  this._onButCreditsRelease = function () {
	  gradle.event('btn_credits');
    new CCreditsPanel();
  };
  this._onChangeLang = function (P) {
	  gradle.event('btn_lang');
    s_iCurLang = P;
    refreshLanguage();
    H.changeText(sprintf(TEXT_STORY_MODE, "\n"));
    x.changeText(TEXT_TIME_ATTACK);
    C && C.refreshText(sprintf(TEXT_STORY_MODE, " "));
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;
function CMenuStoryMode(a) {
  var e, b, g, d, h, k, l;
  this._init = function (r) {
    b = r;
    g = new createjs.Container();
    b.addChild(g);
    r = s_oSpriteLibrary.getSprite("but_play");
    d = null;
    e = new CGfxButton(CANVAS_WIDTH / 2 - 300, 1300, r, s_oStage);
    e.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    r = s_oSpriteLibrary.getSprite("but_continue");
    d = new CGfxButton(CANVAS_WIDTH / 2 + 300, 1300, r, s_oStage);
    d.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
    d.getButtonImage().scaleX = 0;
    d.getButtonImage().scaleY = 0;
    e.getButtonImage().scaleX = 0;
    e.getButtonImage().scaleY = 0;
    l = new createjs.Container();
    g.addChild(l);
    k = new CTLText(
      l,
      -250,
      -50,
      500,
      100,
      90,
      "center",
      STROKE_COLOR_STAGE[1],
      PRIMARY_FONT,
      1.1,
      0,
      0,
      sprintf(TEXT_STORY_MODE, " "),
      !0,
      !0,
      !1,
      !1
    );
    k.setOutline(10);
    h = new CTLText(
      l,
      -250,
      -50,
      500,
      100,
      90,
      "center",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      sprintf(TEXT_STORY_MODE, " "),
      !0,
      !0,
      !1,
      !1
    );
    l.x = CANVAS_WIDTH / 2;
    l.y = 1e3;
    l.scaleX = l.scaleY = 0;
  };
  this.show = function () {
    createjs.Tween.get(l).to(
      { scaleX: 1, scaleY: 1 },
      800,
      createjs.Ease.bounceOut
    );
    var r = e.getButtonImage();
    createjs.Tween.get(r)
      .to({ scaleX: 1, scaleY: 1 }, 800, createjs.Ease.bounceOut)
      .call(function () {
        d || e.pulseAnimation();
      });
    d &&
      ((r = d.getButtonImage()),
      createjs.Tween.get(r)
        .to({ scaleX: 1, scaleY: 1 }, 800, createjs.Ease.bounceOut)
        .call(function () {
          d.pulseAnimation();
        }));
  };
  this.hide = function (r, y) {
    r = void 0 === r ? null : r;
    var t = e.getButtonImage(),
      z = t.getBounds();
    createjs.Tween.get(t).to({ x: -z.width / 2 }, 800, createjs.Ease.cubicOut);
    d &&
      ((t = d.getButtonImage()),
      createjs.Tween.get(t).to(
        { x: CANVAS_WIDTH + z.width / 2 },
        800,
        createjs.Ease.cubicOut
      ));
    z = l.getBounds();
    createjs.Tween.get(l)
      .to({ y: CANVAS_HEIGHT + z.height / 2 }, 800, createjs.Ease.cubicOut)
      .call(function () {
        r && r.call(y);
      });
  };
  this.unload = function () {
    d && (d.unload(), (d = null));
    e.unload();
    e = null;
    b.removeChild(g);
    s_oMenuStoryMode = null;
  };
  this.refreshButtonPos = function (r, y) {};
  this.refreshText = function (r) {
    h.refreshText(r);
    k.refreshText(r);
  };
  this._onButContinueRelease = function () {
    s_oMenu.unload();
    s_oMain.goToModeMenu();
    $(s_oMain).trigger("start_session");
  };
  this._onButPlayRelease = function () {
    new CWarningPanel();
  };
  s_oMenuStoryMode = this;
  this._init(a);
}
function CMenuTimeAttack(a) {
  var e, b, g, d;
  this._init = function (h) {
    b = h;
    g = new createjs.Container();
    b.addChild(g);
    h = s_oSpriteLibrary.getSprite("but_play");
    e = new CGfxButton(CANVAS_WIDTH / 2, 1300, h, s_oStage);
    e.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    e.getButtonImage().scaleX = 0;
    e.getButtonImage().scaleY = 0;
    d = new createjs.Container();
    g.addChild(d);
    new CTLText(
      d,
      -250,
      -50,
      500,
      100,
      50,
      "center",
      "#000",
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_TIME_ATTACK,
      !0,
      !0,
      !1,
      !1
    ).setOutline(4);
    new CTLText(
      d,
      -250,
      -50,
      500,
      100,
      50,
      "center",
      "#fff",
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_TIME_ATTACK,
      !0,
      !0,
      !1,
      !1
    );
    s_iBestScore && this._createTextBestScore();
    d.x = CANVAS_WIDTH / 2;
    d.y = 1e3;
    d.scaleX = d.scaleY = 0;
  };
  this._createTextBestScore = function () {
    var h = sprintf(TEXT_BEST_SCORE, s_iBestScore);
    new CTLText(
      d,
      -250,
      0,
      500,
      100,
      50,
      "center",
      STROKE_COLOR_STAGE[1],
      PRIMARY_FONT,
      1.1,
      0,
      0,
      h,
      !0,
      !0,
      !1,
      !1
    ).setOutline(4);
    new CTLText(
      d,
      -250,
      0,
      500,
      100,
      50,
      "center",
      "#fff",
      PRIMARY_FONT,
      1.1,
      0,
      0,
      h,
      !0,
      !0,
      !1,
      !1
    );
  };
  this.show = function () {
    createjs.Tween.get(d).to(
      { scaleX: 1, scaleY: 1 },
      800,
      createjs.Ease.bounceOut
    );
    var h = e.getButtonImage();
    createjs.Tween.get(h)
      .to({ scaleX: 1, scaleY: 1 }, 800, createjs.Ease.bounceOut)
      .call(function () {
        e.pulseAnimation();
      });
  };
  this.hide = function (h, k) {
    h = void 0 === h ? null : h;
    var l = e.getButtonImage(),
      r = l.getBounds();
    createjs.Tween.get(l).to({ x: -r.width / 2 }, 800, createjs.Ease.cubicOut);
    l = d.getBounds();
    createjs.Tween.get(d)
      .to({ x: CANVAS_WIDTH + l.width / 2 }, 800, createjs.Ease.cubicOut)
      .call(function () {
        h && h.call(k);
      });
  };
  this.unload = function () {
    e.unload();
    e = null;
    b.removeChild(g);
    s_oMenuTimeAttack = null;
  };
  this.refreshButtonPos = function (h, k) {};
  this.startTimeAttack = function () {
    s_oMenu.unload();
    s_oMain.gotoGameTimeAttack();
    $(s_oMain).trigger("start_session");
  };
  this._onButPlayRelease = function () {
    this.startTimeAttack();
  };
  s_oMenuTimeAttack = this;
  this._init(a);
}
function CMapStoryMode() {
  var a,
    e,
    b,
    g,
    d,
    h,
    k,
    l,
    r,
    y,
    t,
    z,
    D = !1,
    u = !1,
    m = !1,
    p = 0,
    A = 0,
    C = 0,
    x = 0,
    w,
    H,
    v,
    G,
    K,
    B,
    Y,
    V,
    aa = null,
    P = null,
    Q,
    N,
    S,
    Z,
    R,
    ia,
    F;
  this._init = function () {
    l = k = p = 0;
    B = new createjs.Container();
    s_oStage.addChild(B);
    r = CANVAS_WIDTH / 2 - 60;
    y = 60;
    H = new CFormatText(
      r,
      y,
      TEXT_SELECT_LEVEL,
      PRIMARY_FONT_COLOR,
      s_oStage,
      "#ef8297",
      90,
      "center",
      PRIMARY_FONT,
      135,
      600
    );
    H.setOutline(10);
    N = new createjs.Rectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    S = [];
    Q = [];
    for (var I = (e = a = 0), ba = 0, O = 0; O < NUM_MAP_TILES; O++) {
      var M = s_oSpriteLibrary.getSprite("jm_" + O),
        W = M.width,
        ca = M.height;
      Q[O] = createBitmap(M);
      Q[O].y = I;
      Q[O].x = ba;
      3 > O % 4
        ? (ba += M.width)
        : ((a = ba + M.width), (ba = 0), (I += M.height));
      S.push(new createjs.Rectangle(Q[O].x, Q[O].y, W, ca));
      B.addChild(Q[O]);
    }
    e = I;
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((M = s_oSpriteLibrary.getSprite("but_exit")),
        (V = { x: CANVAS_WIDTH - M.height / 2 - 10, y: M.height / 2 + 10 }),
        (G = new CGfxButton(V.x, V.y, M, s_oStage)),
        G.addEventListener(ON_MOUSE_UP, this._onExit, this),
        (t = V.x - M.width - 10),
        (z = V.y),
        (M = s_oSpriteLibrary.getSprite("audio_icon")),
        (v = new CToggle(t, z, M, s_bAudioActive, s_oStage)),
        v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this))
      : ((M = s_oSpriteLibrary.getSprite("but_exit")),
        (V = { x: CANVAS_WIDTH - M.height / 2 - 10, y: V.y }),
        (G = new CGfxButton(V.x, V.y, M, s_oStage)),
        G.addEventListener(ON_MOUSE_UP, this._onExit, this));
    O = window.document;
    I = O.documentElement;
    aa =
      I.requestFullscreen ||
      I.mozRequestFullScreen ||
      I.webkitRequestFullScreen ||
      I.msRequestFullscreen;
    P =
      O.exitFullscreen ||
      O.mozCancelFullScreen ||
      O.webkitExitFullscreen ||
      O.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (aa = !1);
    aa &&
      screenfull.isEnabled &&
      ((M = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (b = M.height / 2 + 10),
      (g = V.y),
      (Y = new CToggle(b, g, M, s_bFullscreen, s_oStage)),
      Y.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    R = B.on("mousedown", this._mapMoveStartPoint);
    ia = B.on("pressmove", this._mapMove);
    F = B.on("pressup", this._mapMoveStop);
    Z = new createjs.Container();
    B.addChild(Z);
    w = [];
    for (O = I = 0; O < LEVEL_MATRIX.length - 1; O++) {
      w[O + 1] = new CLevelButton(0, 0, O + 1, B);
      w[O + 1].addEventListenerWithParams(
        ON_MOUSE_UP,
        this._startLevel,
        this,
        O + 1
      );
      ba = s_aLevelEnabled[O + 1];
      w[O + 1].setActive(ba);
      if (ba) {
        var E = s_aLevelScore[O + 1];
        0 < E &&
          (w[O + 1].addTextOn(
            sprintf(TEXT_SCORE, E),
            "bottom",
            PRIMARY_FONT_COLOR,
            "#000",
            50
          ),
          2 === O + 1 && w[O + 1].setTextPosition(0, -120),
          (s_aHelpPanelEnabled[O + 1] = !1));
        I = O + 1;
      }
      w[O + 1].setStars(E);
    }
    E = s_aLevelScore[I];
    0 === E && w[I].pulseAnimation();
    this._setLevelPosition();
    this._centerMapToLevel(I);
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    this._activeMapPiece();
    K = [];
    for (O = 0; O < NUM_CLOUD_SPRITE; O++)
      for (E = 0; 3 > E; E++)
        (I = s_oSpriteLibrary.getSprite("cloud_" + O)),
          (I = createBitmap(I)),
          B.addChild(I),
          this._animCloud(I),
          K.push(I);
  };
  this.unload = function () {
    B.off("mousedown", R);
    B.off("pressmove", ia);
    B.off("pressup", F);
    aa && screenfull.isEnabled && Y.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v.unload(), (v = null);
    for (var I = 0; I < K.length; I++) createjs.Tween.removeTweens(K[I]);
    for (I = 1; 26 > I; I++) w[I].unload();
    s_oStage.removeAllChildren();
    s_oMapStoryMode = null;
  };
  this._setLevelPosition = function () {
    w[1].setPosition(1250, 3163);
    w[2].setPosition(1012, 3201);
    w[3].setPosition(880, 3047);
    w[4].setPosition(636, 3096);
    w[5].setPosition(600, 2828);
    w[6].setPosition(1050, 2504);
    w[7].setPosition(1371, 2664);
    w[8].setPosition(1782, 2763);
    w[9].setPosition(1908, 2511);
    w[10].setPosition(1565, 2399);
    w[11].setPosition(1211, 2277);
    w[12].setPosition(1030, 2012);
    w[13].setPosition(920, 1820);
    w[14].setPosition(1184, 1715);
    w[15].setPosition(1514, 1664);
    w[16].setPosition(1764, 1499);
    w[17].setPosition(1914, 1229);
    w[18].setPosition(1364, 1340);
    w[19].setPosition(944, 1425);
    w[20].setPosition(650, 1150);
    w[21].setPosition(686, 758);
    w[22].setPosition(852, 929);
    w[23].setPosition(1388, 941);
    w[24].setPosition(1533, 458);
    w[25].setPosition(1202, 380);
    for (var I = 1; I < w.length; I++) {
      var ba = w[I].getX() + 0,
        O = w[I].getY() + 600;
      w[I].setPosition(ba, O);
    }
    ba = w[1].getX();
    O = w[1].getY();
    var M = new createjs.Shape(),
      W = M.graphics
        .setStrokeDash([20, 10], 0)
        .setStrokeStyle(5)
        .beginStroke("#fff")
        .moveTo(ba, O);
    for (I = 2; I < w.length; I++)
      (ba = w[I].getX()), (O = w[I].getY()), (W = W.lineTo(ba, O));
    W.endStroke();
    Z.addChild(M);
    Z.cache(0, 0, a, e);
  };
  this._centerMapToLevel = function (I) {
    1 === I
      ? this._setMapPosition(
          CANVAS_WIDTH / 2 - w[1].getX(),
          CANVAS_HEIGHT / 2 - w[1].getY()
        )
      : (this._setMapPosition(
          CANVAS_WIDTH / 2 - w[I - 1].getX(),
          CANVAS_HEIGHT / 2 - w[I - 1].getY()
        ),
        this._autoShiftMap(I));
  };
  this._activeMapPiece = function () {
    for (var I = 0; I < NUM_MAP_TILES; I++)
      (S[I].x = Q[I].x + B.x),
        (S[I].y = Q[I].y + B.y),
        null === calculateIntersection(N, S[I])
          ? (Q[I].visible = !1)
          : (Q[I].visible = !0);
  };
  this._mapMoveStartPoint = function (I) {
    createjs.Tween.removeTweens(B);
    k = I.stageX;
    l = I.stageY;
  };
  this._mapMove = function (I) {
    D = !0;
    p = 0;
    var ba = new CVector2(k, l),
      O = new CVector2(I.stageX, I.stageY);
    O.subV(ba);
    A = O.length();
    C = Math.acos(O.getX() / A);
    x = Math.asin(O.getY() / A);
    d = I.stageX - k;
    h = I.stageY - l;
    k = I.stageX;
    l = I.stageY;
    ja._setMapPosition(d, h);
  };
  this._mapMoveStop = function () {
    if (D) {
      u = !0;
      var I = {
        x: B.x + A * MAP_SENSITIVITY * Math.cos(C),
        y: B.y + A * MAP_SENSITIVITY * Math.sin(x),
      };
      isNaN(I.x) || isNaN(I.y)
        ? ((A = 0), (u = !1))
        : (s_oMapStoryMode._checkLimitMapCoordinates(I),
          createjs.Tween.get(B, { override: !0 })
            .to({ x: I.x, y: I.y }, 500, createjs.Ease.cubicOut)
            .call(function () {
              u = !1;
              A = 0;
              ja._activeMapPiece();
            }));
    }
  };
  this._checkLimitMapCoordinates = function (I) {
    0 < I.y ? (I.y = 0) : I.y < CANVAS_HEIGHT - e && (I.y = CANVAS_HEIGHT - e);
    0 < I.x ? (I.x = 0) : I.x < CANVAS_WIDTH - a && (I.x = CANVAS_WIDTH - a);
  };
  this._autoShiftMap = function (I) {
    u = !0;
    I = {
      x: CANVAS_WIDTH / 2 - w[I].getX(),
      y: CANVAS_HEIGHT / 2 - w[I].getY(),
    };
    this._checkLimitMapCoordinates(I);
    createjs.Tween.get(B)
      .to(I, 1e3, createjs.Ease.cubicOut)
      .call(function () {
        u = !1;
      });
  };
  this._setMapPosition = function (I, ba) {
    B.x += I;
    B.y += ba;
    0 < B.y ? (B.y = 0) : B.y < CANVAS_HEIGHT - e && (B.y = CANVAS_HEIGHT - e);
    0 < B.x ? (B.x = 0) : B.x < CANVAS_WIDTH - a && (B.x = CANVAS_WIDTH - a);
    this._activeMapPiece();
  };
  this._animCloud = function (I) {
    var ba = I.image.width,
      O = Math.random() * e;
    I.y = O;
    var M = randomIntBetween(15e3, 4e4),
      W = randomIntBetween(0, 5e3);
    0.5 > Math.random()
      ? ((I.x = -ba),
        (I.scaleX = -1),
        (m = !0),
        createjs.Tween.get(I)
          .wait(W)
          .to({ x: a + ba, y: O }, M)
          .call(function (ca) {
            ja._animCloud(ca.target);
          }))
      : (m && ((I.scaleX *= -1), (m = !1)),
        (I.x = a),
        createjs.Tween.get(I)
          .wait(W)
          .to({ x: -ba, y: O }, M)
          .call(function (ca) {
            ja._animCloud(ca.target);
          }));
  };
  this.refreshButtonPos = function (I, ba) {
    G.setPosition(V.x - I, ba + V.y);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      v.setPosition(t - I, ba + z);
    aa && screenfull.isEnabled && Y.setPosition(b + I, g + ba);
    H.setPosition(r, y + ba);
  };
  this.resetFullscreenBut = function () {
    aa && screenfull.isEnabled && Y.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? P.call(window.document)
      : aa.call(window.document.documentElement);
    sizeHandler();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onButPlayRelease = function () {
    this.unload();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      !0 !== s_bAudioActive ||
      createjs.Sound.play("click");
    s_oMain.gotoGameStoryMode();
  };
  this._onExit = function () {
    this.unload();
    s_oMain.gotoMenu();
    $(s_oMain).trigger("end_session");
  };
  this._startLevel = function (I) {
    this.unload();
    s_oMain.gotoGameStoryMode(I);
  };
  this.update = function () {
    D && ((p += s_iTimeElaps), 50 < p && (D = !1));
    u && this._activeMapPiece();
  };
  s_oMapStoryMode = this;
  var ja = this;
  this._init();
}
var s_oMapStoryMode = null;
function CGameStoryMode(a, e) {
  var b,
    g,
    d,
    h,
    k,
    l = !1,
    r = !1,
    y = !1,
    t,
    z = !1,
    D = !1,
    u,
    m,
    p,
    A,
    C,
    x,
    w,
    H,
    v,
    G,
    K,
    B,
    Y,
    V,
    aa,
    P,
    Q,
    N,
    S,
    Z,
    R,
    ia,
    F,
    ja,
    I,
    ba,
    O,
    M,
    W = 0,
    ca,
    E,
    L,
    X,
    T,
    U = null,
    da,
    ea = null,
    ka,
    fa;
  this._init = function () {
    new CSpriteSheets();
    D = z = k = h = d = g = !1;
    ja = S = Q = 0;
    Y = CONFIG[e].numfaces;
    V = P = V = aa = 0;
    I = CONFIG[e].time + 1e3;
    ba = TIMER_CLOCK_SPAWN[e];
    O = TIMER_CHANGING;
    t = 0;
    s_oSoundMatching.reset();
    fadeSound(
      "soundtrack",
      s_aSounds.soundtrack.volume(),
      SOUNDTRACK_VOLUME_IN_GAME,
      500
    );
    G = [];
    C = [];
    m = [];
    for (var c = 0; 13 > c; c++) m[c] = !1;
    m[9] = !0;
    m[10] = !0;
    m[11] = !0;
    0 === GOALS[e].block && (m[TYPE_BLOCK] = !0);
    L = null;
    c = createBitmap(s_oSpriteLibrary.getSprite("bg_game_" + BACKGROUND[e]));
    s_oStage.addChild(c);
    ca = new createjs.Container();
    ca.x = CANVAS_WIDTH / 2;
    ca.y = CANVAS_HEIGHT / 2 - 40;
    s_oStage.addChild(ca);
    E = new createjs.Container();
    E.x = CANVAS_WIDTH / 2;
    E.y = CANVAS_HEIGHT / 2 - 40;
    s_oStage.addChild(E);
    Z = LEVEL_MATRIX[e][0].length;
    R = LEVEL_MATRIX[e].length;
    this._buildLevel();
    c = s_oSpriteLibrary.getSprite("target");
    T = createBitmap(c);
    T.regX = c.width / 2;
    T.regY = c.height / 2;
    T.visible = !1;
    ca.addChild(T);
    this.initialMatch();
    b = !1;
    u = [];
    for (c = 0; 13 > c; c++) u[c] = 0;
    da = new CInterface(e);
    da.getPanelContainer();
    da.refreshTime(I - 1e3, 1);
    new CHelpPanelStoryMode();
    if (s_bMobile || SWIPE_ON_DESKTOP)
      (ka = new CInputController(s_oStage)),
        this._initInputControllerListeners();
    fa = [];
  };
  this._initInputControllerListeners = function () {
    ka.addEventListener(ON_PRESS_MOVE_TAP_ACTION, this._swipeControl, this);
    ka.addEventListener(
      ON_PRESS_UP_TAP_ACTION,
      this._onPressUpSwipeAction,
      this
    );
  };
  this.onPressMoveCell = function (c) {
    ka.onPressMoveAction(c);
  };
  this.onPressUpCell = function (c, f) {};
  this._onPressUpSwipeAction = function (c) {};
  this._swipeControl = function (c) {
    if (null !== L && !b) {
      c = c.dir;
      b = !0;
      switch (c) {
        case ON_SWIPE_LEFT:
          if (
            0 === L.col ||
            p[L.row][L.col - 1].getType() === CELL_STATE_DISABLE ||
            p[L.row][L.col - 1].getType() === TYPE_BOMB ||
            p[L.row][L.col - 1].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          X = { row: L.row, col: L.col - 1, cell: null };
          break;
        case ON_SWIPE_RIGHT:
          if (
            L.col === Z - 1 ||
            p[L.row][L.col + 1].getType() === CELL_STATE_DISABLE ||
            p[L.row][L.col + 1].getType() === TYPE_BOMB ||
            p[L.row][L.col + 1].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          X = { row: L.row, col: L.col + 1, cell: null };
          break;
        case ON_SWIPE_UP:
          if (
            0 === L.row ||
            p[L.row - 1][L.col].getType() === CELL_STATE_DISABLE ||
            p[L.row - 1][L.col].getType() === TYPE_BOMB ||
            p[L.row - 1][L.col].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          X = { row: L.row - 1, col: L.col, cell: null };
          break;
        case ON_SWIPE_DOWN:
          if (
            L.row === R - 1 ||
            p[L.row + 1][L.col].getType() === CELL_STATE_DISABLE ||
            p[L.row + 1][L.col].getType() === TYPE_BOMB ||
            p[L.row + 1][L.col].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          X = { row: L.row + 1, col: L.col, cell: null };
      }
      this._swapFaces();
    }
  };
  this._createRandomFace = function () {
    var c = Math.floor(Math.random() * Y);
    0 === P &&
      aa < GOALS[e].star &&
      CONFIG[e].starallowed &&
      2 > Math.round(10 * Math.random()) &&
      (aa++, P++, (c = TYPE_STAR));
    CONFIG[e].bomballowed && 20 < V && ((V = 0), (c = TYPE_BOMB));
    if (CONFIG[e].clockallowed && d) {
      var f = I / 1e3,
        n = Math.random();
      1 > (15 > f ? 33 * n : 30 > f ? 80 * n : 60 > f ? 200 * n : 300 * n) &&
        ((c = TYPE_CLOCK), (d = !1));
    }
    CONFIG[e].changingallowed &&
      1.5 > 100 * Math.random() &&
      h &&
      ((c = TYPE_CHANGING), (h = !1));
    return c;
  };
  this._shuffleLevel = function () {
    for (var c, f = 0; f < R; f++)
      for (var n = 0; n < Z; n++)
        0 < LEVEL_MATRIX[e][f][n] &&
          ((c = Math.floor(Math.random() * Y)), p[f][n].setType(c));
    this.initialMatch();
    this._hintCheckMovesAvailable();
  };
  this._buildLevel = function () {
    var c = -((LEVEL_MATRIX[e][0].length * CELL_SIZE) / 2) + CELL_SIZE / 2,
      f = -(LEVEL_MATRIX[e].length * CELL_SIZE) / 2 + CELL_SIZE / 2;
    p = [];
    for (var n = 0; n < R; n++) {
      p[n] = [];
      for (var q = 0; q < Z; q++) {
        var J = Math.floor(Math.random() * Y);
        LEVEL_MATRIX[e][n][q] === CELL_FILL_FACE
          ? (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              J,
              !1,
              !1
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_NULL
          ? (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              CELL_STATE_DISABLE,
              !1,
              !1
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_BOMB
          ? (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              TYPE_BOMB,
              !1,
              !1
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_STAR
          ? ((p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              TYPE_STAR,
              !1,
              !1
            )),
            aa++,
            P++,
            C.push({ row: n, col: q }))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_BLOCK
          ? (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              J,
              !0,
              !1
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_CLOCK
          ? (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              TYPE_CLOCK,
              !1,
              !1
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_CHANGE
          ? (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              TYPE_CHANGING,
              !1,
              !1
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_STARANDBLOCK
          ? (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              TYPE_STAR,
              !0,
              !1
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_TRAP &&
            (p[n][q] = new CCell(
              c + q * CELL_SIZE,
              f + n * CELL_SIZE,
              n,
              q,
              ca,
              J,
              !1,
              !0
            ));
      }
    }
  };
  this.initialMatch = function () {
    do {
      A = [];
      this._matchHorizontal();
      this._matchVertical();
      for (var c, f = 0; f < A.length; f++)
        (c = Math.floor(Math.random() * Y)),
          p[A[f].row][A[f].col].setType(c),
          p[A[f].row][A[f].col].setToDelete(!1);
    } while (0 < A.length);
    this._refreshMatrix();
  };
  this._matchHorizontal = function () {
    var c;
    C = [];
    H = [];
    for (var f = 0; f < R; f++) {
      var n = p[f][0].getType();
      for (var q = (c = 0); q < Z; q++)
        if (
          (p[f][q].getType() === TYPE_STAR && C.push({ row: f, col: q }),
          p[f][q].getType() === n &&
            q === Z - 1 &&
            0 <= p[f][q].getType() &&
            p[f][q].getType() < TYPE_STAR)
        ) {
          if ((c++, 3 <= c)) {
            for (var J = 0; J < c; J++)
              p[f][q - J].setToDelete(!0), A.push({ row: f, col: q - J });
            H.push(c);
          }
        } else if (
          p[f][q].getType() === n &&
          q !== Z - 1 &&
          0 <= p[f][q].getType() &&
          p[f][q].getType() < TYPE_STAR
        )
          c++;
        else {
          if (3 <= c) {
            for (J = 0; J < c; J++)
              p[f][q - 1 - J].setToDelete(!0),
                A.push({ row: f, col: q - 1 - J });
            H.push(c);
          }
          c = 1;
          n = p[f][q].getType();
        }
    }
  };
  this._matchVertical = function () {
    var c;
    v = [];
    for (var f = 0; f < Z; f++) {
      var n = p[0][f].getType();
      for (var q = (c = 0); q < R; q++)
        if (
          p[q][f].getType() === n &&
          q === R - 1 &&
          0 <= p[q][f].getType() &&
          p[q][f].getType() < TYPE_STAR
        ) {
          if ((c++, 3 <= c)) {
            for (var J = 0; J < c; J++)
              p[q - J][f].getToDelete() ||
                (p[q - J][f].setToDelete(!0), A.push({ row: q - J, col: f }));
            v.push(c);
          }
        } else if (
          p[q][f].getType() === n &&
          q !== R - 1 &&
          0 <= p[q][f].getType() &&
          p[q][f].getType() < TYPE_STAR
        )
          c++;
        else {
          if (3 <= c) {
            for (J = 0; J < c; J++)
              p[q - 1 - J][f].getToDelete() ||
                (p[q - 1 - J][f].setToDelete(!0),
                A.push({ row: q - 1 - J, col: f }));
            v.push(c);
          }
          c = 1;
          n = p[q][f].getType();
        }
    }
  };
  this.callTremble = function () {
    l ||
      ((l = !0),
      (M = setInterval(function () {
        la.tremble();
      }, 10)));
  };
  this.tremble = function () {
    if ((r = !r)) {
      var c = 0.5 > Math.random() ? -10 : 10;
      var f = 0.5 > Math.random() ? -10 : 10;
      s_oStage.x = c;
      s_oStage.y = f;
    } else (s_oStage.x = 0), (s_oStage.y = 0);
    W++;
    50 === W && ((W = 0), (l = !1), clearInterval(M));
  };
  this._refreshMatrix = function () {
    for (var c = 0; c < A.length; c++) p[A[c].row][A[c].col].setToDelete(!1);
  };
  this._swapFaces = function () {
    null !== U &&
      (p[U.element0row][U.element0col].stopAnimHint(),
      p[U.element1row][U.element1col].stopAnimHint(),
      (y = !0),
      (t = TIMER_HINT - 2e3));
    playSound("swoosh", 1, !1);
    var c = p[L.row][L.col].getPos().x,
      f = p[L.row][L.col].getPos().y,
      n = p[X.row][X.col].getPos().x,
      q = p[X.row][X.col].getPos().y;
    ia = p[L.row][L.col].getType();
    F = p[X.row][X.col].getType();
    L.cell = new CMovingCell(c, f, ia, ca);
    X.cell = new CMovingCell(n, q, F, ca);
    L.cell.move(n, q);
    X.cell.move(c, f);
    p[L.row][L.col].setType(CELL_STATE_INVISIBLE);
    p[X.row][X.col].setType(CELL_STATE_INVISIBLE);
  };
  this._checkStar = function () {
    for (var c = 0; c < C.length; c++)
      if (C[c].row === R - 1) {
        playSound("chime", 1, !1);
        A.push({ row: R - 1, col: C[c].col });
        var f = new CMovingCell(
          p[R - 1][C[c].col].getPos().x,
          p[R - 1][C[c].col].getPos().y,
          TYPE_STAR,
          ca
        );
        f.fallStar(p[R - 1][C[c].col].getPos().x, 1100);
        P--;
        this._updateScore(SCORES_FOR_STAR);
      } else {
        f = !1;
        for (var n = C[c].row + 1; n < R; n++)
          if (p[n][C[c].col].getType() === CELL_STATE_DISABLE) f = !0;
          else {
            f = !1;
            break;
          }
        f &&
          (playSound("chime", 1, !1),
          A.push({ row: C[c].row, col: C[c].col }),
          (f = new CMovingCell(
            p[C[c].row][C[c].col].getPos().x,
            p[C[c].row][C[c].col].getPos().y,
            TYPE_STAR,
            ca
          )),
          f.fallStar(p[C[c].row][C[c].col].getPos().x, 1100),
          P--,
          this._updateScore(SCORES_FOR_STAR));
      }
    C = [];
  };
  this._checkBombArea = function (c, f) {
    b = !0;
    p[c][f].setToDelete(!0);
    A = [];
    V++;
    for (var n = c - 1; n < c + 2; n++)
      for (var q = f - 1; q < f + 2; q++)
        0 <= n &&
          n < R &&
          0 <= q &&
          q < Z &&
          p[n][q].getType() !== CELL_STATE_DISABLE &&
          (p[n][q].getType() !== TYPE_BOMB ||
            p[n][q].getToDelete() ||
            la._checkBombArea(n, q),
          p[n][q].getType() !== TYPE_STAR &&
            p[n][q].getType() !== TYPE_BOMB &&
            p[n][q].getType() !== TYPE_CHANGING &&
            p[n][q].setToDelete(!0));
  };
  this._detonateBomb = function (c, f) {
    playSound("bomb_explosion", 1, !1);
    this.callTremble();
    this._checkBombArea(c, f);
    for (var n = 0; n < R; n++)
      for (var q = 0; q < Z; q++)
        p[n][q].getToDelete() && A.push({ row: n, col: q });
    this._updateScore((A.length - V) * SCORES_FOR_SINGLE + V * SCORES_FOR_BOMB);
    V = 0;
    this._explosion();
  };
  this._checkSameFaces = function (c) {
    for (var f = 0; f < R; f++)
      for (var n = 0; n < Z; n++)
        p[f][n].getType() === c && A.push({ row: f, col: n });
  };
  this.checkCellClicked = function (c, f, n, q) {
    if (!b)
      if ((s_oSoundMatching.reset(), n === TYPE_BOMB))
        null !== U &&
          (p[U.element0row][U.element0col].stopAnimHint(),
          p[U.element1row][U.element1col].stopAnimHint()),
          this._detonateBomb(c, f),
          (T.visible = !1);
      else if (n === TYPE_CLOCK)
        playSound("hourglass_explosion", 1, !1),
          null !== U &&
            (p[U.element0row][U.element0col].stopAnimHint(),
            p[U.element1row][U.element1col].stopAnimHint()),
          (b = !0),
          (I += TIME_TO_ADD),
          16e3 < I && ((k = !1), da.setTimerColor("#ffffff")),
          I > CONFIG[e].time && (CONFIG[e].time = I),
          A.push({ row: c, col: f }),
          (T.visible = !1),
          this._explosion();
      else if (p[c][f].getType() === TYPE_CHANGING)
        null !== U &&
          (p[U.element0row][U.element0col].stopAnimHint(),
          p[U.element1row][U.element1col].stopAnimHint()),
          (b = !0),
          A.push({ row: c, col: f }),
          (T.visible = !1),
          this._checkSameFaces(n),
          this._updateScore(A.length * SCORES_FOR_SINGLE),
          this._explosion();
      else if (null === L)
        (L = { row: c, col: f, cell: null }),
          (T.visible = !0),
          (T.x = p[c][f].getPos().x),
          (T.y = p[c][f].getPos().y),
          ka.onMouseDownAction(q),
          p[c][f].enableSwipeAction();
      else if (L.row !== c || L.col !== f)
        (2 > Math.abs(c - L.row) && 0 === f - L.col) ||
        (0 === c - L.row && 2 > Math.abs(f - L.col))
          ? ((X = { row: c, col: f, cell: null }), (b = !0), this._swapFaces())
          : ((L = { row: c, col: f, cell: null }),
            (T.x = p[c][f].getPos().x),
            (T.y = p[c][f].getPos().y),
            ka.onMouseDownAction(q),
            p[c][f].enableSwipeAction());
  };
  this.checkMatch = function () {
    S++;
    if (2 === S) {
      A = [];
      p[L.row][L.col].setType(F);
      p[X.row][X.col].setType(ia);
      this._matchHorizontal();
      this._matchVertical();
      if (0 < A.length) this._checkStar(), (V += A.length), this._explosion();
      else {
        playSound("swoosh", 1, !1);
        var c = p[L.row][L.col].getPos().x,
          f = p[L.row][L.col].getPos().y,
          n = p[X.row][X.col].getPos().x,
          q = p[X.row][X.col].getPos().y;
        p[L.row][L.col].setType(ia);
        p[X.row][X.col].setType(F);
        L.cell.moveBack(c, f);
        X.cell.moveBack(n, q);
        p[L.row][L.col].setType(CELL_STATE_INVISIBLE);
        p[X.row][X.col].setType(CELL_STATE_INVISIBLE);
      }
      S = 0;
    }
  };
  this._explosion = function () {
    t = 0;
    s_oSoundMatching.triggerComboSound();
    x = [];
    for (var c = 0; c < Z; c++) x[c] = 0;
    this._updateGoals();
    for (c = 0; c < A.length; c++) {
      var f = A[c].row;
      var n = A[c].col;
      x[n]++;
      p[f][n].setType(CELL_STATE_MATCHED);
    }
    T.visible = !1;
    this._updateMatchScore();
    f = createjs.Tween.get().call(s_oGame._fallFaces);
    f.paused = !0;
    fa.push(f);
  };
  this._fallFaces = function () {
    w = [];
    for (var c = 0; c < Z; c++)
      if (0 < x[c]) {
        var f = !1;
        for (var n = R - 1; 0 <= n; n--)
          p[n][c].getType() === CELL_STATE_MATCHED && (f = !0),
            0 <= p[n][c].getType() &&
              f &&
              w.push({
                jump: 0,
                startrow: n,
                endrow: null,
                col: c,
                cell: new CMovingCell(
                  p[n][c].getPos().x,
                  p[n][c].getPos().y,
                  p[n][c].getType(),
                  ca
                ),
              });
        for (var q = 0; q < x[c]; q++)
          (f = la._createRandomFace()),
            w.push({
              jump: 0,
              startrow: -(q + 1),
              endrow: null,
              col: c,
              cell: new CMovingCell(
                p[0][c].getPos().x,
                p[0][c].getPos().y - CELL_SIZE * (q + 1),
                f,
                ca
              ),
            });
      }
    var J = 0;
    for (c = 0; c < Z; c++)
      if (0 < x[c]) {
        var ha = [];
        for (q = 0; q < R; q++) ha[q] = p[q][c].getType();
        f = !1;
        for (n = R - 1; 0 <= n; n--)
          p[n][c].getType() === CELL_STATE_MATCHED && (f = !0),
            0 <= p[n][c].getType() &&
              f &&
              p[n][c].setType(CELL_STATE_INVISIBLE);
        for (q = R - 1; 0 <= q; q--)
          if (ha[q] === CELL_STATE_MATCHED) {
            w[J].endrow = q;
            w[J].jump = q - w[J].startrow;
            f = !1;
            for (n = R - 1; 0 <= n; n--)
              if ((ha[n] === CELL_STATE_MATCHED && (f = !0), 0 <= ha[n] && f)) {
                ha[n] = CELL_STATE_MATCHED;
                break;
              }
            J++;
          }
      }
    for (c = 0; c < w.length; c++)
      (q = p[w[c].endrow][w[c].col].getPos().x),
        (f = p[w[c].endrow][w[c].col].getPos().y),
        w[c].cell.fall(q, f, w[c].jump);
  };
  this.onFinishFall = function () {
    ja++;
    if (ja === w.length) {
      for (var c = (ja = 0); c < w.length; c++) {
        w[c].cell.unload();
        var f = w[c].endrow,
          n = w[c].col,
          q = w[c].cell.getType();
        p[f][n].setType(q);
      }
      D ||
        (this._refreshMatrix(),
        (A = []),
        this._matchHorizontal(),
        this._matchVertical(),
        this._checkStar(),
        0 < A.length
          ? this._explosion()
          : (null !== L &&
              null !== L.cell &&
              (L.cell.unload(), X.cell.unload()),
            (L = X = null),
            (b = !1),
            this._hintCheckMovesAvailable()),
        this._checkWin());
    }
  };
  this._hintCheckMovesAvailable = function () {
    B = [];
    U = null;
    var c = !1;
    K = [];
    for (var f = 0; f < R; f++) {
      K[f] = [];
      for (var n = 0; n < Z; n++)
        if (
          ((K[f][n] = {
            type: p[f][n].getType(),
            check_up: !1,
            check_down: !1,
            check_left: !1,
            check_right: !1,
          }),
          9 === K[f][n].type || 10 === K[f][n].type || 11 === K[f][n].type)
        )
          c = !0;
    }
    for (f = 0; f < R; f++)
      for (n = 0; n < Z; n++)
        !p[f][n].getTrap() &&
          0 <= p[f][n].getType() &&
          p[f][n].getType() < TYPE_STAR &&
          this._hintMoveAndCheck(f, n);
    if (0 < B.length) (y = !0), (U = B[Math.floor(Math.random() * B.length)]);
    else if (((y = !1), (U = null), !c)) {
      var q = new CFormatText(
        -300,
        CANVAS_HEIGHT / 2,
        TEXT_SHUFFLE,
        PRIMARY_FONT_COLOR,
        s_oStage,
        "#ef8297",
        50,
        "center"
      );
      q.setOutline(10);
      createjs.Tween.get(q.getText())
        .to({ x: CANVAS_WIDTH / 2 }, 500, createjs.Ease.quintOut)
        .wait(1e3)
        .call(function () {
          la._shuffleLevel();
          la.callTremble();
          createjs.Tween.get(q.getText())
            .to({ x: CANVAS_WIDTH + 300 }, 500, createjs.Ease.backIn)
            .call(function () {
              s_oStage.removeChild(q);
            });
        });
    }
  };
  this._hintMoveAndCheck = function (c, f) {
    if (
      0 < c &&
      !K[c][f].check_up &&
      0 <= K[c - 1][f].type &&
      K[c - 1][f].type < TYPE_STAR &&
      !p[c - 1][f].getTrap() &&
      !p[c][f].getTrap()
    ) {
      K[c][f].type = p[c - 1][f].getType();
      K[c - 1][f].type = p[c][f].getType();
      var n = this._hintCheckColumn(K, f),
        q = this._hintCheckRow(K, c),
        J = this._hintCheckRow(K, c - 1);
      K[c][f].type = p[c][f].getType();
      K[c - 1][f].type = p[c - 1][f].getType();
      K[c][f].check_up = !0;
      K[c - 1][f].check_down = !0;
      (n || q || J) &&
        B.push({
          element0row: c,
          element0col: f,
          element1row: c - 1,
          element1col: f,
        });
    }
    c < R - 1 &&
      !K[c][f].check_down &&
      0 <= K[c + 1][f].type &&
      K[c + 1][f].type < TYPE_STAR &&
      !p[c + 1][f].getTrap() &&
      !p[c][f].getTrap() &&
      ((K[c][f].type = p[c + 1][f].getType()),
      (K[c + 1][f].type = p[c][f].getType()),
      (n = this._hintCheckColumn(K, f)),
      (q = this._hintCheckRow(K, c)),
      (J = this._hintCheckRow(K, c + 1)),
      (K[c][f].type = p[c][f].getType()),
      (K[c + 1][f].type = p[c + 1][f].getType()),
      (K[c][f].check_down = !0),
      (K[c + 1][f].check_up = !0),
      (n || q || J) &&
        B.push({
          element0row: c,
          element0col: f,
          element1row: c + 1,
          element1col: f,
        }));
    0 < f &&
      !K[c][f].check_left &&
      0 <= K[c][f - 1].type &&
      K[c][f - 1].type &&
      !p[c][f - 1].getTrap() &&
      !p[c][f].getTrap() &&
      ((K[c][f].type = p[c][f - 1].getType()),
      (K[c][f - 1].type = p[c][f].getType()),
      (q = this._hintCheckRow(K, c)),
      (n = this._hintCheckColumn(K, f)),
      (J = this._hintCheckColumn(K, f - 1)),
      (K[c][f].type = p[c][f].getType()),
      (K[c][f - 1].type = p[c][f - 1].getType()),
      (K[c][f].check_left = !0),
      (K[c][f - 1].check_right = !0),
      (q || n || J) &&
        B.push({
          element0row: c,
          element0col: f,
          element1row: c,
          element1col: f - 1,
        }));
    f < Z - 1 &&
      !K[c][f].check_right &&
      0 <= K[c][f + 1].type &&
      K[c][f + 1].type &&
      !p[c][f + 1].getTrap() &&
      !p[c][f].getTrap() &&
      ((K[c][f].type = p[c][f + 1].getType()),
      (K[c][f + 1].type = p[c][f].getType()),
      (q = this._hintCheckRow(K, c)),
      (n = this._hintCheckColumn(K, f)),
      (J = this._hintCheckColumn(K, f + 1)),
      (K[c][f].type = p[c][f].getType()),
      (K[c][f + 1].type = p[c][f + 1].getType()),
      (K[c][f].check_right = !0),
      (K[c][f + 1].check_left = !0),
      (q || n || J) &&
        B.push({
          element0row: c,
          element0col: f,
          element1row: c,
          element1col: f + 1,
        }));
  };
  this._hintCheckColumn = function (c, f) {
    for (var n = c[0][f], q = 0, J = 0; J < R; J++)
      if (
        (c[J][f].type === n && 0 <= c[J][f].type && c[J][f].type < TYPE_STAR
          ? q++
          : ((q = 1), (n = c[J][f].type)),
        3 <= q)
      )
        return !0;
    return !1;
  };
  this._hintCheckRow = function (c, f) {
    for (var n = c[f][0], q = 0, J = 0; J < Z; J++)
      if (
        (c[f][J].type === n && 0 <= c[f][J].type && c[f][J].type < TYPE_STAR
          ? q++
          : ((q = 1), (n = c[f][J].type)),
        3 <= q)
      )
        return !0;
    return !1;
  };
  this._revealHint = function () {
    p[U.element0row][U.element0col].animHint();
    p[U.element1row][U.element1col].animHint();
  };
  this.printMatrix = function (c) {
    for (var f = "", n = 0; n < R; n++) {
      for (var q = 0; q < Z; q++) f += c[n][q].type + "|";
      f += "\n";
    }
    trace(f);
  };
  this.returnInPosition = function () {
    S++;
    2 === S &&
      (p[L.row][L.col].setType(ia),
      p[X.row][X.col].setType(F),
      L.cell.unload(),
      X.cell.unload(),
      (L = X = null),
      (T.visible = !1),
      (S = 0),
      (b = !1));
  };
  this.updateGoalsForBlock = function () {
    u[TYPE_BLOCK]++;
    0 < GOALS[e].block
      ? (da.refreshGoals(TYPE_BLOCK, u[TYPE_BLOCK]),
        u[TYPE_BLOCK] >= GOALS[e].block && (m[TYPE_BLOCK] = !0))
      : (m[TYPE_BLOCK] = !0);
  };
  this._updateGoals = function () {
    for (var c, f = 0; f < A.length; f++)
      (c = p[A[f].row][A[f].col].getType()), c <= TYPE_STAR && u[c]++;
    0 < GOALS[e].type0
      ? (da.refreshGoals(0, u[0]), u[0] >= GOALS[e].type0 && (m[0] = !0))
      : (m[0] = !0);
    0 < GOALS[e].type1
      ? (da.refreshGoals(1, u[1]), u[1] >= GOALS[e].type1 && (m[1] = !0))
      : (m[1] = !0);
    0 < GOALS[e].type2
      ? (da.refreshGoals(2, u[2]), u[2] >= GOALS[e].type2 && (m[2] = !0))
      : (m[2] = !0);
    0 < GOALS[e].type3
      ? (da.refreshGoals(3, u[3]), u[3] >= GOALS[e].type3 && (m[3] = !0))
      : (m[3] = !0);
    0 < GOALS[e].type4
      ? (da.refreshGoals(4, u[4]), u[4] >= GOALS[e].type4 && (m[4] = !0))
      : (m[4] = !0);
    0 < GOALS[e].type5
      ? (da.refreshGoals(5, u[5]), u[5] >= GOALS[e].type5 && (m[5] = !0))
      : (m[5] = !0);
    0 < GOALS[e].type6
      ? (da.refreshGoals(6, u[6]), u[6] >= GOALS[e].type6 && (m[6] = !0))
      : (m[6] = !0);
    0 < GOALS[e].type7
      ? (da.refreshGoals(7, u[7]), u[7] >= GOALS[e].type7 && (m[7] = !0))
      : (m[7] = !0);
    0 < GOALS[e].star
      ? (da.refreshGoals(TYPE_STAR, u[TYPE_STAR]),
        u[TYPE_STAR] >= GOALS[e].star && (m[TYPE_STAR] = !0))
      : (m[TYPE_STAR] = !0);
  };
  this._updateMatchScore = function () {
    for (var c = 0, f = 0; f < H.length; f++)
      for (var n = 0; n < H[f]; n++)
        c =
          2 < n ? Math.round(c * EXTRA_FACE_MULTIPLIER) : c + SCORES_FOR_SINGLE;
    for (f = 0; f < v.length; f++)
      for (n = 0; n < v[f]; n++)
        c =
          2 < n ? Math.round(c * EXTRA_FACE_MULTIPLIER) : c + SCORES_FOR_SINGLE;
    this._updateScore(c);
  };
  this._updateScore = function (c) {
    Q += c;
    da.refreshScore(Q);
  };
  this._checkWin = function () {
    if (g) {
      for (var c = 0; c < m.length; c++) if (!1 === m[c]) return;
      g = !1;
      N = Math.round((I / 1e3) * 50);
      this.gameOver(!0);
    }
  };
  this.createParticle = function (c, f, n) {
    n === TYPE_BLOCK
      ? G.push(new CParticle(c, f, n, ca))
      : G.push(new CParticle(c, f, n, E));
  };
  this.unload = function () {
    g = !1;
    da.unload();
    null !== ea && (ea.unload(), (ea = null));
    L = null;
    for (var c = 0; c < p.length; c++)
      for (var f = 0; f < p[c].length; f++) p[c][f].unload();
    createjs.Tween.removeAllTweens();
    s_oStage.removeAllChildren();
  };
  this.setBlock = function (c) {
    b = c;
  };
  this.restartGame = function () {
    $(s_oMain).trigger("restart_level", e);
    s_oGame.unload();
    s_oGame._init();
  };
  this.getTweensGroup = function () {
    return fa;
  };
  this._pauseTweenFace = function (c) {
    for (var f = 0; f < fa.length; f++) fa[f].paused = c;
  };
  this.pauseGame = function () {
    g = !1;
    z = !0;
    s_oGame._pauseTweenFace(!0);
  };
  this.resumeGame = function () {
    g = !0;
    z = !1;
    0 < G.length && s_oGame._pauseTweenFace(!1);
  };
  this.onNextLevel = function () {
    this.unload();
    s_iCurLevel++;
    s_iCurLevel === LEVEL_MATRIX.length
      ? new CEndPanel(Q, N)
      : s_oMain.gotoGameStoryMode(s_iCurLevel);
  };
  this.onExit = function () {
    $(s_oMain).trigger("show_interlevel_ad");
    s_oGame.unload();
    s_oMain.gotoMenu();
    $(s_oMain).trigger("end_session");
  };
  this.onExitHelp = function () {
    $(s_oMain).trigger("start_level", e);
    var c = STROKE_COLOR_STAGE[Math.round(Math.random())],
      f = new CFormatText(
        -300,
        CANVAS_HEIGHT / 2,
        sprintf(TEXT_STAGE, s_iCurLevel),
        PRIMARY_FONT_COLOR,
        s_oStage,
        c,
        90,
        "center"
      );
    f.setOutline(12);
    createjs.Tween.get(f.getText())
      .to({ x: CANVAS_WIDTH / 2 }, 500, createjs.Ease.quintOut)
      .wait(500)
      .to({ x: CANVAS_WIDTH + 300 }, 500, createjs.Ease.backIn)
      .call(function () {
        s_oStage.removeChild(f);
      });
    this._hintCheckMovesAvailable();
    g = !0;
  };
  this.gameOver = function (c) {
    g = !1;
    D = !0;
    c
      ? (fadeSound("soundtrack", 1, 0, 500),
        playSound("stage_clear", 0.75, !1).once("end", function () {
          fadeSound("soundtrack", 0, SOUNDTRACK_VOLUME_IN_GAME, 500);
        }))
      : ($(s_oMain).trigger("end_level", e),
        fadeSound("soundtrack", 1, 0, 500),
        playSound("game_over", 0.75, !1).once("end", function () {
          fadeSound("soundtrack", 0, SOUNDTRACK_VOLUME_IN_GAME, 500);
        }));
    ea = new CNextLevelPanel(c, Q, N);
  };
  this._timeTimer = function () {
    ba -= s_iTimeElaps;
    0 > ba && ((ba = TIMER_CLOCK_SPAWN[e]), (d = !0));
  };
  this._changingFaceTimer = function () {
    O -= s_iTimeElaps;
    0 > O && ((O = TIMER_CHANGING), (h = !0));
  };
  this.update = function () {
    if (g) {
      !d && CONFIG[e].clockallowed && this._timeTimer();
      !h && CONFIG[e].changingallowed && this._changingFaceTimer();
      I -= s_iTimeElaps;
      y &&
        ((t += s_iTimeElaps),
        t > TIMER_HINT && ((y = !1), (t = 0), this._revealHint()));
      16e3 > I &&
        !k &&
        ((k = !0), playSound("tictac", 1, !1), da.setTimerColor("#ff0000"));
      if (0 > I && null === ea) {
        I = 0;
        this.gameOver(!1);
        return;
      }
      da.refreshTime(I, I / (CONFIG[e].time + 1e3));
      for (var c = fa.length - 1; 0 <= c; c--)
        1 === fa[c].position / fa[c].duration && fa.splice(c, 1);
    }
    if (!z)
      if (0 < G.length) {
        for (c = 0; c < G.length; c++) G[c].update();
        for (c = G.length - 1; 0 <= c; c--) G[c].isGone() && G.splice(c, 1);
      } else s_oGame._pauseTweenFace(!1);
  };
  s_oGame = this;
  SCORES_FOR_SINGLE = a.scores_for_single;
  SCORES_FOR_BOMB = a.scores_for_bomb;
  SCORES_FOR_STAR = a.scores_for_star;
  EXTRA_FACE_MULTIPLIER = a.extra_item_multiplier;
  var la = this;
  this._init();
}
function CGameTimeAttack(a, e) {
  var b,
    g,
    d,
    h,
    k,
    l = !1,
    r = !1,
    y = !1,
    t,
    z,
    D,
    u,
    m,
    p,
    A,
    C,
    x,
    w,
    H,
    v,
    G,
    K,
    B,
    Y,
    V,
    aa,
    P,
    Q,
    N,
    S,
    Z,
    R,
    ia,
    F,
    ja = 0,
    I,
    ba,
    O = 0,
    M,
    W,
    ca,
    E,
    L,
    X,
    T = null,
    U,
    da = null,
    ea,
    ka,
    fa;
  this._init = function () {
    ka = new CSpriteSheets();
    t = k = h = u = d = g = !1;
    z = !0;
    D = !1;
    Z = aa = V = 0;
    B = CONFIG[e].numfaces;
    Y = Y = 0;
    M = R = STARTING_TIME + 1e3;
    ia = TIMER_CLOCK_SPAWN[e];
    ba = 0;
    setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
    H = [];
    K = [!1, !1, !1, !1];
    E = null;
    s_oSoundMatching.reset();
    var c = createBitmap(s_oSpriteLibrary.getSprite("bg_game_0"));
    s_oStage.addChild(c);
    W = new createjs.Container();
    W.x = CANVAS_WIDTH / 2;
    W.y = CANVAS_HEIGHT / 2 - 20;
    s_oStage.addChild(W);
    ca = new createjs.Container();
    ca.x = W.x;
    ca.y = W.y;
    s_oStage.addChild(ca);
    P = LEVEL_MATRIX[e][0].length;
    Q = LEVEL_MATRIX[e].length;
    this._buildLevel();
    c = s_oSpriteLibrary.getSprite("target");
    X = createBitmap(c);
    X.regX = c.width / 2;
    X.regY = c.height / 2;
    X.visible = !1;
    W.addChild(X);
    this.initialMatch();
    b = !1;
    if (s_bMobile || SWIPE_ON_DESKTOP)
      (ea = new CInputController(s_oStage)),
        this._initInputControllerListeners();
    U = new CInterface(e);
    U.timeAttackMode();
    U.getPanelContainer();
    U.refreshTime(R - 1e3, 1);
    new CHelpPanelTimeAttack();
    fa = [];
  };
  this._initInputControllerListeners = function () {
    ea.addEventListener(ON_PRESS_MOVE_TAP_ACTION, this._swipeControl, this);
    ea.addEventListener(
      ON_PRESS_UP_TAP_ACTION,
      this._onPressUpSwipeAction,
      this
    );
  };
  this.onPressMoveCell = function (c) {
    ea.onPressMoveAction(c);
  };
  this.onPressUpCell = function (c, f) {};
  this._onPressUpSwipeAction = function (c) {};
  this._swipeControl = function (c) {
    if (null !== E && !b) {
      c = c.dir;
      b = !0;
      switch (c) {
        case ON_SWIPE_LEFT:
          if (
            0 === E.col ||
            m[E.row][E.col - 1].getType() === CELL_STATE_DISABLE ||
            m[E.row][E.col - 1].getType() === TYPE_BOMB ||
            m[E.row][E.col - 1].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          L = { row: E.row, col: E.col - 1, cell: null };
          break;
        case ON_SWIPE_RIGHT:
          if (
            E.col === P - 1 ||
            m[E.row][E.col + 1].getType() === CELL_STATE_DISABLE ||
            m[E.row][E.col + 1].getType() === TYPE_BOMB ||
            m[E.row][E.col + 1].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          L = { row: E.row, col: E.col + 1, cell: null };
          break;
        case ON_SWIPE_UP:
          if (
            0 === E.row ||
            m[E.row - 1][E.col].getType() === CELL_STATE_DISABLE ||
            m[E.row - 1][E.col].getType() === TYPE_BOMB ||
            m[E.row - 1][E.col].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          L = { row: E.row - 1, col: E.col, cell: null };
          break;
        case ON_SWIPE_DOWN:
          if (
            E.row === Q - 1 ||
            m[E.row + 1][E.col].getType() === CELL_STATE_DISABLE ||
            m[E.row + 1][E.col].getType() === TYPE_BOMB ||
            m[E.row + 1][E.col].getType() === TYPE_CHANGING
          ) {
            b = !1;
            return;
          }
          L = { row: E.row + 1, col: E.col, cell: null };
      }
      this._swapItems();
    }
  };
  this._createRandomItem = function () {
    var c = Math.floor(Math.random() * B);
    CONFIG[e].bomballowed && t && z && ((c = TYPE_BOMB), (z = t = !1));
    if (CONFIG[e].clockallowed && d) {
      var f = R / 1e3,
        n = Math.random();
      1 > (15 > f ? 50 * n : 30 > f ? 90 * n : 60 > f ? 200 * n : 400 * n) &&
        ((c = TYPE_CLOCK), (d = !1));
    }
    CONFIG[e].changingallowed &&
      !h &&
      D &&
      ((c = TYPE_CHANGING), (D = !1), (h = !0));
    return c;
  };
  this._shuffleLevel = function () {
    for (var c, f = 0; f < Q; f++)
      for (var n = 0; n < P; n++)
        0 < LEVEL_MATRIX[e][f][n] &&
          ((c = Math.floor(Math.random() * B)), m[f][n].setType(c));
    this.initialMatch();
    this._hintCheckMovesAvailable();
  };
  this._buildLevel = function () {
    I = CELL_SIZE + 10;
    var c = -((LEVEL_MATRIX[e][0].length * I) / 2) + I / 2,
      f = -(LEVEL_MATRIX[e].length * I) / 2 + I / 2 + 10;
    m = [];
    for (var n = 0; n < Q; n++) {
      m[n] = [];
      for (var q = 0; q < P; q++) {
        var J = Math.floor(Math.random() * B);
        LEVEL_MATRIX[e][n][q] === CELL_FILL_FACE
          ? (m[n][q] = new CCell(c + q * I, f + n * I, n, q, W, J))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_NULL
          ? (m[n][q] = new CCell(
              c + q * I,
              f + n * I,
              n,
              q,
              W,
              CELL_STATE_DISABLE
            ))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_BOMB
          ? (m[n][q] = new CCell(c + q * I, f + n * I, n, q, W, TYPE_BOMB))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_CLOCK
          ? (m[n][q] = new CCell(c + q * I, f + n * I, n, q, W, TYPE_CLOCK))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_CHANGE
          ? (m[n][q] = new CCell(c + q * I, f + n * I, n, q, W, TYPE_CHANGING))
          : LEVEL_MATRIX[e][n][q] === CELL_FILL_TRAP &&
            (m[n][q] = new CCell(c + q * I, f + n * I, n, q, W, J));
      }
    }
  };
  this.initialMatch = function () {
    do {
      p = [];
      this._matchHorizontal();
      this._matchVertical();
      for (var c, f = 0; f < p.length; f++)
        (c = Math.floor(Math.random() * B)),
          m[p[f].row][p[f].col].setType(c),
          m[p[f].row][p[f].col].setToDelete(!1);
    } while (0 < p.length);
    this._refreshMatrix();
  };
  this._matchHorizontal = function () {
    var c;
    _aStarPosition = [];
    x = [];
    for (var f = 0; f < Q; f++) {
      var n = m[f][0].getType();
      for (var q = (c = 0); q < P; q++)
        if (
          (m[f][q].getType() === TYPE_STAR &&
            _aStarPosition.push({ row: f, col: q }),
          m[f][q].getType() === n &&
            q === P - 1 &&
            0 <= m[f][q].getType() &&
            m[f][q].getType() < TYPE_STAR)
        ) {
          if ((c++, 3 <= c)) {
            for (var J = 0; J < c; J++)
              m[f][q - J].setToDelete(!0),
                p.push({ row: f, col: q - J, dir: "horizontal" });
            x.push({ num: c, row: f, col: q });
          }
        } else if (
          m[f][q].getType() === n &&
          q !== P - 1 &&
          0 <= m[f][q].getType() &&
          m[f][q].getType() < TYPE_STAR
        )
          c++;
        else {
          if (3 <= c) {
            for (J = 0; J < c; J++)
              m[f][q - 1 - J].setToDelete(!0),
                p.push({ row: f, col: q - 1 - J, dir: "horizontal" });
            x.push({ num: c, row: f, col: q });
          }
          c = 1;
          n = m[f][q].getType();
        }
    }
  };
  this._matchVertical = function () {
    var c;
    w = [];
    for (var f = 0; f < P; f++) {
      var n = m[0][f].getType();
      for (var q = (c = 0); q < Q; q++)
        if (
          m[q][f].getType() === n &&
          q === Q - 1 &&
          0 <= m[q][f].getType() &&
          m[q][f].getType() < TYPE_STAR
        ) {
          if ((c++, 3 <= c)) {
            for (var J = 0; J < c; J++)
              m[q - J][f].getToDelete() ||
                (m[q - J][f].setToDelete(!0),
                p.push({ row: q - J, col: f, dir: "vertical" }));
            w.push({ num: c, row: q, col: f });
          }
        } else if (
          m[q][f].getType() === n &&
          q !== Q - 1 &&
          0 <= m[q][f].getType() &&
          m[q][f].getType() < TYPE_STAR
        )
          c++;
        else {
          if (3 <= c) {
            for (J = 0; J < c; J++)
              m[q - 1 - J][f].getToDelete() ||
                (m[q - 1 - J][f].setToDelete(!0),
                p.push({ row: q - 1 - J, col: f, dir: "vertical" }));
            w.push({ num: c, row: q, col: f });
          }
          c = 1;
          n = m[q][f].getType();
        }
    }
  };
  this.callTremble = function () {
    l ||
      ((l = !0),
      (F = setInterval(function () {
        la.tremble();
      }, 10)));
  };
  this.tremble = function () {
    if ((r = !r)) {
      var c = 0.5 > Math.random() ? -10 : 10;
      var f = 0.5 > Math.random() ? -10 : 10;
      s_oStage.x = c;
      s_oStage.y = f;
    } else (s_oStage.x = 0), (s_oStage.y = 0);
    ja++;
    50 === ja && ((ja = 0), (l = !1), clearInterval(F));
  };
  this._refreshMatrix = function () {
    for (var c = 0; c < p.length; c++) m[p[c].row][p[c].col].setToDelete(!1);
  };
  this._swapItems = function () {
    null !== T &&
      (m[T.element0row][T.element0col].stopAnimHint(),
      m[T.element1row][T.element1col].stopAnimHint(),
      (y = !0),
      (ba = TIMER_HINT - 2e3));
    m[E.row][E.col].disableSwipeAction();
    playSound("swoosh", 1, !1);
    var c = m[E.row][E.col].getPos().x,
      f = m[E.row][E.col].getPos().y,
      n = m[L.row][L.col].getPos().x,
      q = m[L.row][L.col].getPos().y;
    N = m[E.row][E.col].getType();
    S = m[L.row][L.col].getType();
    E.cell = new CMovingCell(c, f, N, W);
    L.cell = new CMovingCell(n, q, S, W);
    E.cell.move(n, q);
    L.cell.move(c, f);
    m[E.row][E.col].setType(CELL_STATE_INVISIBLE);
    m[L.row][L.col].setType(CELL_STATE_INVISIBLE);
  };
  this._checkBombArea = function (c, f) {
    b = !0;
    m[c][f].setToDelete(!0);
    p = [];
    Y++;
    for (var n = c - 1; n < c + 2; n++)
      for (var q = f - 1; q < f + 2; q++)
        0 <= n &&
          n < Q &&
          0 <= q &&
          q < P &&
          m[n][q].getType() !== CELL_STATE_DISABLE &&
          (m[n][q].getType() !== TYPE_BOMB ||
            m[n][q].getToDelete() ||
            la._checkBombArea(n, q),
          m[n][q].getType() !== TYPE_BOMB &&
            m[n][q].getType() !== TYPE_CHANGING &&
            m[n][q].setToDelete(!0));
  };
  this._detonateBomb = function (c, f) {
    playSound("bomb_explosion", 1, !1);
    this.callTremble();
    this._checkBombArea(c, f);
    for (var n = 0, q = 0; q < Q; q++)
      for (var J = 0; J < P; J++)
        m[q][J].getToDelete() &&
          (p.push({ row: q, col: J, dir: "random" }), n++);
    this._updateScore((p.length - Y) * SCORES_FOR_SINGLE + Y * SCORES_FOR_BOMB);
    Y = 0;
    this._explosion();
  };
  this._checkSameItems = function (c, f, n) {
    for (var q = 0, J = 0; J < Q; J++)
      for (var ha = 0; ha < P; ha++)
        m[J][ha].getType() === c &&
          (p.push({ row: J, col: ha, dir: "random" }), q++);
    this._addNewTime(0, f, n, 1e3 * q, "changing");
  };
  this.checkCellClicked = function (c, f, n, q) {
    if (!b)
      if ((s_oSoundMatching.reset(), n === TYPE_BOMB))
        null !== T &&
          (m[T.element0row][T.element0col].stopAnimHint(),
          m[T.element1row][T.element1col].stopAnimHint()),
          this._detonateBomb(c, f),
          (X.visible = !1);
      else if (n === TYPE_CLOCK)
        playSound("hourglass_explosion", 1, !1),
          null !== T &&
            (m[T.element0row][T.element0col].stopAnimHint(),
            m[T.element1row][T.element1col].stopAnimHint()),
          (b = !0),
          this._addNewTime(0, c, f, TIME_TO_ADD, "changing"),
          p.push({ row: c, col: f }),
          (X.visible = !1),
          this._explosion();
      else if (m[c][f].getType() === TYPE_CHANGING)
        null !== T &&
          (m[T.element0row][T.element0col].stopAnimHint(),
          m[T.element1row][T.element1col].stopAnimHint()),
          (b = !0),
          p.push({ row: c, col: f }),
          (X.visible = !1),
          this._checkSameItems(n, c, f),
          this._updateScore(p.length * SCORES_FOR_SINGLE),
          playSound("break_changing", 1, !1),
          this._explosion();
      else if (null === E)
        (E = { row: c, col: f, cell: null }),
          (X.visible = !0),
          (X.x = m[c][f].getPos().x),
          (X.y = m[c][f].getPos().y),
          ea.onMouseDownAction(q),
          m[c][f].enableSwipeAction();
      else if (E.row !== c || E.col !== f)
        (2 > Math.abs(c - E.row) && 0 === f - E.col) ||
        (0 === c - E.row && 2 > Math.abs(f - E.col))
          ? ((L = { row: c, col: f, cell: null }), (b = !0), this._swapItems())
          : ((E = { row: c, col: f, cell: null }),
            (X.x = m[c][f].getPos().x),
            (X.y = m[c][f].getPos().y),
            ea.onMouseDownAction(q),
            m[c][f].enableSwipeAction());
  };
  this.checkMatch = function () {
    aa++;
    if (2 === aa) {
      p = [];
      m[E.row][E.col].setType(S);
      m[L.row][L.col].setType(N);
      this._matchHorizontal();
      this._matchVertical();
      if (0 < p.length) (Y += p.length), this._explosion();
      else {
        playSound("swoosh", 1, !1);
        var c = m[E.row][E.col].getPos().x,
          f = m[E.row][E.col].getPos().y,
          n = m[L.row][L.col].getPos().x,
          q = m[L.row][L.col].getPos().y;
        m[E.row][E.col].setType(N);
        m[L.row][L.col].setType(S);
        E.cell.moveBack(c, f);
        L.cell.moveBack(n, q);
        m[E.row][E.col].setType(CELL_STATE_INVISIBLE);
        m[L.row][L.col].setType(CELL_STATE_INVISIBLE);
      }
      aa = 0;
    }
  };
  this._explosion = function () {
    ba = 0;
    s_oSoundMatching.triggerComboSound();
    A = [];
    for (var c = 0; c < P; c++) A[c] = 0;
    for (c = 0; c < p.length; c++) {
      var f = p[c].row;
      var n = p[c].col;
      A[n]++;
      m[f][n].setType(CELL_STATE_MATCHED, p[c].dir);
    }
    X.visible = !1;
    this._updateMatchScore();
    f = createjs.Tween.get().call(s_oGame._fallItems);
    f.paused = !0;
    fa.push(f);
  };
  this._fallItems = function () {
    for (var c = [], f = 0; f < A.length; f++)
      for (var n = 0; n < A[f]; n++) c.push(la._createRandomItem());
    shuffle(c);
    C = [];
    for (f = 0; f < P; f++)
      if (0 < A[f]) {
        var q = !1;
        for (var J = Q - 1; 0 <= J; J--)
          m[J][f].getType() === CELL_STATE_MATCHED && (q = !0),
            0 <= m[J][f].getType() &&
              q &&
              C.push({
                jump: 0,
                startrow: J,
                endrow: null,
                col: f,
                cell: new CMovingCell(
                  m[J][f].getPos().x,
                  m[J][f].getPos().y,
                  m[J][f].getType(),
                  W
                ),
              });
        for (n = 0; n < A[f]; n++)
          (q = c.pop()),
            C.push({
              jump: 0,
              startrow: -(n + 1),
              endrow: null,
              col: f,
              cell: new CMovingCell(
                m[0][f].getPos().x,
                m[0][f].getPos().y - I * (n + 1),
                q,
                W
              ),
            });
      }
    for (f = c = 0; f < P; f++)
      if (0 < A[f]) {
        var ha = [];
        for (n = 0; n < Q; n++) ha[n] = m[n][f].getType();
        q = !1;
        for (J = Q - 1; 0 <= J; J--)
          m[J][f].getType() === CELL_STATE_MATCHED && (q = !0),
            0 <= m[J][f].getType() &&
              q &&
              m[J][f].setType(CELL_STATE_INVISIBLE);
        for (n = Q - 1; 0 <= n; n--)
          if (ha[n] === CELL_STATE_MATCHED) {
            C[c].endrow = n;
            C[c].jump = n - C[c].startrow;
            q = !1;
            for (J = Q - 1; 0 <= J; J--)
              if ((ha[J] === CELL_STATE_MATCHED && (q = !0), 0 <= ha[J] && q)) {
                ha[J] = CELL_STATE_MATCHED;
                break;
              }
            c++;
          }
      }
    for (f = 0; f < C.length; f++)
      (n = m[C[f].endrow][C[f].col].getPos().x),
        (q = m[C[f].endrow][C[f].col].getPos().y),
        C[f].cell.fall(n, q, C[f].jump);
  };
  this.onFinishFall = function () {
    Z++;
    if (Z === C.length) {
      for (var c = (Z = 0); c < C.length; c++) {
        C[c].cell.unload();
        var f = C[c].endrow,
          n = C[c].col,
          q = C[c].cell.getType();
        m[f][n].setType(q);
      }
      if (!1 !== g)
        if (
          (this._refreshMatrix(),
          (p = []),
          this._matchHorizontal(),
          this._matchVertical(),
          0 < p.length)
        )
          this._explosion();
        else {
          null !== E && null !== E.cell && (E.cell.unload(), L.cell.unload());
          E = L = null;
          b = !1;
          z = !0;
          h = !1;
          for (c = 0; c < Q; c++)
            for (f = 0; f < Q; f++)
              m[c][f].getType() === TYPE_CHANGING && (h = !0);
          this._hintCheckMovesAvailable();
        }
    }
  };
  this._hintCheckMovesAvailable = function () {
    G = [];
    T = null;
    var c = !1;
    v = [];
    for (var f = 0; f < Q; f++) {
      v[f] = [];
      for (var n = 0; n < P; n++)
        if (
          ((v[f][n] = {
            type: m[f][n].getType(),
            check_up: !1,
            check_down: !1,
            check_left: !1,
            check_right: !1,
          }),
          9 === v[f][n].type || 10 === v[f][n].type || 11 === v[f][n].type)
        )
          c = !0;
    }
    for (f = 0; f < Q; f++)
      for (n = 0; n < P; n++)
        0 <= m[f][n].getType() &&
          m[f][n].getType() < TYPE_STAR &&
          this._hintMoveAndCheck(f, n);
    if (0 < G.length) (y = !0), (T = G[Math.floor(Math.random() * G.length)]);
    else if (((y = !1), (T = null), !c)) {
      var q = new CTLText(
        s_oStage,
        -300,
        CANVAS_HEIGHT / 2 - 30,
        400,
        60,
        30,
        "center",
        "#ffffff",
        PRIMARY_FONT,
        1,
        0,
        0,
        TEXT_SHUFFLE,
        !0,
        !0,
        !0,
        !1
      );
      q.setShadow("#000", 2, 2, 2);
      createjs.Tween.get(q.getText())
        .to({ x: CANVAS_WIDTH / 2 }, 500, createjs.Ease.quintOut)
        .wait(1e3)
        .call(function () {
          la._shuffleLevel();
          la.callTremble();
          createjs.Tween.get(q.getText())
            .to({ x: CANVAS_WIDTH + 300 }, 500, createjs.Ease.backIn)
            .call(function () {
              s_oStage.removeChild(q);
            });
        });
    }
  };
  this._hintMoveAndCheck = function (c, f) {
    if (
      0 < c &&
      !v[c][f].check_up &&
      0 <= v[c - 1][f].type &&
      v[c - 1][f].type < TYPE_STAR
    ) {
      v[c][f].type = m[c - 1][f].getType();
      v[c - 1][f].type = m[c][f].getType();
      var n = this._hintCheckColumn(v, f),
        q = this._hintCheckRow(v, c),
        J = this._hintCheckRow(v, c - 1);
      v[c][f].type = m[c][f].getType();
      v[c - 1][f].type = m[c - 1][f].getType();
      v[c][f].check_up = !0;
      v[c - 1][f].check_down = !0;
      (n || q || J) &&
        G.push({
          element0row: c,
          element0col: f,
          element1row: c - 1,
          element1col: f,
        });
    }
    c < Q - 1 &&
      !v[c][f].check_down &&
      0 <= v[c + 1][f].type &&
      v[c + 1][f].type < TYPE_STAR &&
      ((v[c][f].type = m[c + 1][f].getType()),
      (v[c + 1][f].type = m[c][f].getType()),
      (n = this._hintCheckColumn(v, f)),
      (q = this._hintCheckRow(v, c)),
      (J = this._hintCheckRow(v, c + 1)),
      (v[c][f].type = m[c][f].getType()),
      (v[c + 1][f].type = m[c + 1][f].getType()),
      (v[c][f].check_down = !0),
      (v[c + 1][f].check_up = !0),
      (n || q || J) &&
        G.push({
          element0row: c,
          element0col: f,
          element1row: c + 1,
          element1col: f,
        }));
    0 < f &&
      !v[c][f].check_left &&
      0 <= v[c][f - 1].type &&
      v[c][f - 1].type &&
      ((v[c][f].type = m[c][f - 1].getType()),
      (v[c][f - 1].type = m[c][f].getType()),
      (q = this._hintCheckRow(v, c)),
      (n = this._hintCheckColumn(v, f)),
      (J = this._hintCheckColumn(v, f - 1)),
      (v[c][f].type = m[c][f].getType()),
      (v[c][f - 1].type = m[c][f - 1].getType()),
      (v[c][f].check_left = !0),
      (v[c][f - 1].check_right = !0),
      (q || n || J) &&
        G.push({
          element0row: c,
          element0col: f,
          element1row: c,
          element1col: f - 1,
        }));
    f < P - 1 &&
      !v[c][f].check_right &&
      0 <= v[c][f + 1].type &&
      v[c][f + 1].type &&
      ((v[c][f].type = m[c][f + 1].getType()),
      (v[c][f + 1].type = m[c][f].getType()),
      (q = this._hintCheckRow(v, c)),
      (n = this._hintCheckColumn(v, f)),
      (J = this._hintCheckColumn(v, f + 1)),
      (v[c][f].type = m[c][f].getType()),
      (v[c][f + 1].type = m[c][f + 1].getType()),
      (v[c][f].check_right = !0),
      (v[c][f + 1].check_left = !0),
      (q || n || J) &&
        G.push({
          element0row: c,
          element0col: f,
          element1row: c,
          element1col: f + 1,
        }));
  };
  this._hintCheckColumn = function (c, f) {
    for (var n = c[0][f], q = 0, J = 0; J < Q; J++)
      if (
        (c[J][f].type === n && 0 <= c[J][f].type && c[J][f].type < TYPE_STAR
          ? q++
          : ((q = 1), (n = c[J][f].type)),
        3 <= q)
      )
        return !0;
    return !1;
  };
  this._hintCheckRow = function (c, f) {
    for (var n = c[f][0], q = 0, J = 0; J < P; J++)
      if (
        (c[f][J].type === n && 0 <= c[f][J].type && c[f][J].type < TYPE_STAR
          ? q++
          : ((q = 1), (n = c[f][J].type)),
        3 <= q)
      )
        return !0;
    return !1;
  };
  this._revealHint = function () {
    m[T.element0row][T.element0col].animHint();
    m[T.element1row][T.element1col].animHint();
  };
  this.printMatrix = function (c) {
    for (var f = "", n = 0; n < Q; n++) {
      for (var q = 0; q < P; q++) f += c[n][q].type + "|";
      f += "\n";
    }
    trace(f);
  };
  this.returnInPosition = function () {
    aa++;
    2 === aa &&
      (m[E.row][E.col].setType(N),
      m[L.row][L.col].setType(S),
      E.cell.unload(),
      L.cell.unload(),
      (E = L = null),
      (X.visible = !1),
      (aa = 0),
      (b = !1));
  };
  this._updateMatchScore = function () {
    for (var c = 0, f = 0; f < x.length; f++) {
      for (var n = 0; n < x[f].num; n++)
        c =
          2 < n ? Math.round(c * EXTRA_ITEM_MULTIPLIER) : c + SCORES_FOR_SINGLE;
      4 === x[f].num
        ? (this._addNewTime(
            x[f].num,
            x[f].row,
            x[f].col,
            TIME_FOR_QUAD,
            "horizontal"
          ),
          (t = !0))
        : 5 <= x[f].num &&
          (this._addNewTime(
            x[f].num,
            x[f].row,
            x[f].col,
            TIME_FOR_QUINT,
            "horizontal"
          ),
          (D = !0));
    }
    for (f = 0; f < w.length; f++) {
      for (n = 0; n < w[f].num; n++)
        c =
          2 < n ? Math.round(c * EXTRA_ITEM_MULTIPLIER) : c + SCORES_FOR_SINGLE;
      4 === w[f].num
        ? (this._addNewTime(
            w[f].num,
            w[f].row,
            w[f].col,
            TIME_FOR_QUAD,
            "vertical"
          ),
          (t = !0))
        : 5 <= w[f].num &&
          (this._addNewTime(
            w[f].num,
            w[f].row,
            w[f].col,
            TIME_FOR_QUINT,
            "vertical"
          ),
          (D = !0));
    }
    this._updateScore(c);
  };
  this._addNewTime = function (c, f, n, q, J) {
    var ha = m[f][n].getPos().x;
    f = m[f][n].getPos().y;
    c =
      "horizontal" === J
        ? W.localToGlobal(ha - (I * c) / 2, f)
        : "vertical" === J
        ? W.localToGlobal(ha, f - (I * c) / 2)
        : W.localToGlobal(ha, f);
    new CScoreText(
      "+" + q / 1e3 + " s",
      c.x / s_iScaleFactor,
      c.y / s_iScaleFactor
    );
    R += q;
    16e3 < R &&
      ((k = !1), stopSound("tictac"), U.setTimerColor("#ffffff", "#ff0000"));
    R > M && (M = R);
  };
  this._updateScore = function (c) {
    V += c;
    U.refreshScore(V);
    O = V;
    O >= STEP_1_INCREASE_FRUITS && O < STEP_2_INCREASE_FRUITS && !K[0]
      ? ((B = 4),
        (K[0] = !0),
        ka.changingNum(B - 1),
        this._levelUpMessage(),
        this._updateSpritesheetToGrid())
      : O >= STEP_2_INCREASE_FRUITS && O < STEP_3_INCREASE_FRUITS && !K[1]
      ? ((B = 5),
        (K[1] = !0),
        ka.changingNum(B - 1),
        this._levelUpMessage(),
        this._updateSpritesheetToGrid())
      : O >= STEP_3_INCREASE_FRUITS && O < STEP_4_INCREASE_FRUITS && !K[2]
      ? ((B = 6),
        (K[2] = !0),
        ka.changingNum(B - 1),
        this._levelUpMessage(),
        this._updateSpritesheetToGrid())
      : O >= STEP_4_INCREASE_FRUITS &&
        !K[3] &&
        ((B = 7),
        (K[3] = !0),
        ka.changingNum(B - 1),
        this._levelUpMessage(),
        this._updateSpritesheetToGrid());
  };
  this._levelUpMessage = function () {
    var c = s_oSpriteLibrary.getSprite("level_up"),
      f = createBitmap(c);
    f.regX = c.width / 2;
    f.regY = c.height / 2;
    f.x = -f.regX;
    f.y = CANVAS_HEIGHT / 2;
    s_oStage.addChild(f);
    playSound("level_up", 0.9, !1);
    createjs.Tween.get(f)
      .to({ x: CANVAS_WIDTH / 2 }, 500, createjs.Ease.quintOut)
      .wait(500)
      .to({ x: CANVAS_WIDTH + f.regX }, 500, createjs.Ease.backIn)
      .call(function () {
        s_oStage.removeChild(f);
      });
  };
  this._updateSpritesheetToGrid = function () {
    for (var c = 0; c < Q; c++)
      for (var f = 0; f < P; f++) m[c][f].setNewSpritesheet();
  };
  this._timeIsUpMessage = function () {
    stopSound("tictac");
    fadeSound("soundtrack", 1, 0, 500);
    playSound("game_over", 0.75, !1).once("end", function () {
      fadeSound("soundtrack", 0, SOUNDTRACK_VOLUME_IN_GAME, 500);
    });
    var c = s_oSpriteLibrary.getSprite("time_is_up"),
      f = createBitmap(c);
    f.regX = c.width / 2;
    f.regY = c.height / 2;
    f.y = CANVAS_HEIGHT / 2;
    s_oStage.addChild(f);
    createjs.Tween.get(f)
      .to({ x: CANVAS_WIDTH / 2 }, 500, createjs.Ease.quintOut)
      .wait(500)
      .to({ x: CANVAS_WIDTH + 300 }, 500, createjs.Ease.backIn)
      .call(function () {
        s_oStage.removeChild(f);
        s_oGame.gameOver();
      });
  };
  this.createParticle = function (c, f, n, q) {
    H.push(new CParticle(c, f, n, ca));
  };
  this.unload = function () {
    stopSound("tictac");
    g = !1;
    U.unload();
    null !== da && (da.unload(), (da = null));
    E = null;
    for (var c = 0; c < m.length; c++)
      for (var f = 0; f < m[c].length; f++) m[c][f].unload();
    createjs.Tween.removeAllTweens();
    s_oStage.removeAllChildren();
  };
  this.setBlock = function (c) {
    b = c;
  };
  this.getBlock = function () {
    return b;
  };
  this.getTweensGroup = function () {
    return fa;
  };
  this._pauseTweenFace = function (c) {
    for (var f = 0; f < fa.length; f++) fa[f].paused = c;
  };
  this.restartGame = function () {
    b || (s_oGame.unload(), (s_oGame = null), s_oMain.gotoGameTimeAttack());
  };
  this.pauseGame = function () {
    g = !1;
    u = !0;
    s_oGame._pauseTweenFace(!0);
  };
  this.resumeGame = function () {
    g = !0;
    u = !1;
    0 < H.length && s_oGame._pauseTweenFace(!1);
  };
  this.stopUpdate = function () {
    g = !1;
  };
  this.resumeUpdate = function () {
    g = !0;
  };
  this.onExit = function () {
    $(s_oMain).trigger("show_interlevel_ad");
    s_oGame.unload();
    s_oMain.gotoMenu();
  };
  this.onExitHelp = function () {
    this._hintCheckMovesAvailable();
    g = !0;
    $(s_oMain).trigger("start_level", s_iCurLevel);
  };
  this.gameOver = function () {
    g = !1;
    s_oLocalStorage.saveDataTimeAttack(V);
    da = new CNextLevelPanel(!1, V, void 0, s_iBestScore, TEXT_TIME_IS_UP);
  };
  this._timeTimer = function () {
    ia -= s_iTimeElaps;
    0 > ia && ((ia = TIMER_CLOCK_SPAWN[e]), (d = !0));
  };
  this.update = function () {
    if (g) {
      !d && CONFIG[e].clockallowed && 5 <= B && this._timeTimer();
      R -= s_iTimeElaps;
      y &&
        ((ba += s_iTimeElaps),
        ba > TIMER_HINT && ((y = !1), (ba = 0), this._revealHint()));
      16e3 > R &&
        !k &&
        ((k = !0),
        playSound("tictac", 1, !0),
        U.setTimerColor("#ff0000", "#000000"));
      if (0 > R && null === da) {
        R = 0;
        this._timeIsUpMessage();
        g = !1;
        return;
      }
      U.refreshTime(R, R / (M + 1e3));
      for (var c = fa.length - 1; 0 <= c; c--)
        1 === fa[c].position / fa[c].duration && fa.splice(c, 1);
    }
    if (!u)
      if (0 < H.length) {
        for (c = 0; c < H.length; c++) H[c].update();
        for (c = H.length - 1; 0 <= c; c--) H[c].isGone() && H.splice(c, 1);
      } else s_oGame._pauseTweenFace(!1);
  };
  s_oGame = this;
  SCORES_FOR_SINGLE = a.scores_for_single;
  SCORES_FOR_BOMB = a.scores_for_bomb;
  EXTRA_ITEM_MULTIPLIER = a.extra_item_multiplier;
  TIMER_HINT = a.hint_timer;
  TIME_TO_ADD = a.hourglass_add_time;
  TIME_FOR_QUAD = a.quad_combo_time;
  TIME_FOR_QUINT = a.quint_combo_time;
  STEP_1_INCREASE_FRUITS = a.increase_to_4_fruits_goal_score;
  STEP_2_INCREASE_FRUITS = a.increase_to_5_fruits_goal_score;
  STEP_3_INCREASE_FRUITS = a.increase_to_6_fruits_goal_score;
  STEP_4_INCREASE_FRUITS = a.increase_to_7_fruits_goal_score;
  STARTING_TIME = a.starting_time;
  var la = this;
  this._init();
}
function CInterface(a) {
  var e,
    b,
    g,
    d,
    h,
    k,
    l,
    r,
    y,
    t,
    z,
    D,
    u,
    m,
    p,
    A,
    C,
    x,
    w,
    H = null,
    v,
    G,
    K,
    B,
    Y,
    V,
    aa,
    P = null,
    Q = null;
  this._init = function (N) {
    m = new createjs.Container();
    m.x = 47;
    m.y = 380;
    s_oStage.addChild(m);
    var S = createBitmap(s_oSpriteLibrary.getSprite("score_panel"));
    S.x = 60;
    S.y = 10;
    m.addChild(S);
    var Z = s_oSpriteLibrary.getSprite("score_icon");
    Z = createBitmap(Z);
    Z.x = S.x + 26;
    Z.y = S.y + 26;
    Z.regX = Z.width / 2;
    Z.regY = Z.height / 2;
    m.addChild(Z);
    p = new CFormatText(
      423,
      92,
      "0",
      PRIMARY_FONT_COLOR,
      m,
      STROKE_COLOR,
      50,
      "right"
    );
    G = new CLevelButton(530, 75, N, m);
    G.setForInfo();
    v = new createjs.Container();
    v.y = 20;
    s_oStage.addChild(v);
    N = s_oSpriteLibrary.getSprite("bottom_panel");
    S = createBitmap(N);
    S.regX = N.width / 2;
    S.x = CANVAS_WIDTH / 2;
    S.y = 1420;
    v.addChild(S);
    this._setGoals();
    K = new createjs.Container();
    s_oStage.addChild(K);
    N = s_oSpriteLibrary.getSprite("time_bar_fill");
    K.x = CANVAS_WIDTH / 2 - N.width / 2;
    K.y = 1340;
    S = createBitmap(N);
    S.x = 10;
    S.y = 7;
    K.addChild(S);
    N = s_oSpriteLibrary.getSprite("time_bar");
    N = createBitmap(N);
    N.x = 0;
    N.y = 0;
    K.addChild(N);
    N = s_oSpriteLibrary.getSprite("time_bar_fill");
    aa = new createjs.Shape();
    aa.graphics
      .beginFill("rgba(255,0,0,0.01)")
      .drawRect(0, 0, N.width, N.height);
    aa.x = S.x;
    aa.y = S.y;
    K.addChild(aa);
    S.mask = aa;
    w = new CFormatText(
      N.width / 2,
      60,
      "0:00",
      PRIMARY_FONT_COLOR,
      K,
      STROKE_COLOR,
      50,
      "center"
    );
    Y = new createjs.Container();
    s_oStage.addChild(Y);
    N = s_oSpriteLibrary.getSprite("but_exit");
    y = CANVAS_WIDTH - N.width / 2 - 10;
    t = N.height / 2 + 10;
    S = s_oSpriteLibrary.getSprite("but_settings");
    B = new CGUIExpandible(y, t, S, Y);
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((u = new CGfxButton(y, t, N, Y)),
        u.addEventListener(ON_MOUSE_UP, this._onExit, this),
        (S = y - 10 - N.width),
        B.addButton(u),
        (N = s_oSpriteLibrary.getSprite("audio_icon")),
        (l = S),
        (r = N.height / 2 + 10),
        (D = new CToggle(l, r, N, s_bAudioActive, Y)),
        D.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        B.addButton(D),
        (S = l - 10 - N.width / 2),
        (N = s_oSpriteLibrary.getSprite("but_pause")),
        (h = S),
        (k = N.height / 2 + 10),
        (C = new CGfxButton(h, k, N, Y)),
        C.addEventListener(ON_MOUSE_UP, this._onButPauseRelease),
        B.addButton(C),
        (S = h - 10 - N.width))
      : ((N = s_oSpriteLibrary.getSprite("but_exit")),
        (u = new CGfxButton(y, t, N, Y)),
        u.addEventListener(ON_MOUSE_UP, this._onExit, this),
        B.addButton(u),
        (S = CANVAS_WIDTH - N.width / 2 - 150),
        (N = s_oSpriteLibrary.getSprite("but_pause")),
        (h = S),
        (k = N.height / 2 + 10),
        (C = new CGfxButton(h, k, N, Y)),
        C.addEventListener(ON_MOUSE_UP, this._onButPauseRelease),
        B.addButton(C),
        (S = CANVAS_WIDTH - N.width / 2 - 270));
    N = s_oSpriteLibrary.getSprite("but_restart");
    g = S;
    d = N.height / 2 + 10;
    A = new CGfxButton(g, d, N, Y);
    A.addEventListener(ON_MOUSE_UP, this._onButRestartRelease);
    B.addButton(A);
    N = window.document;
    S = N.documentElement;
    P =
      S.requestFullscreen ||
      S.mozRequestFullScreen ||
      S.webkitRequestFullScreen ||
      S.msRequestFullscreen;
    Q =
      N.exitFullscreen ||
      N.mozCancelFullScreen ||
      N.webkitExitFullscreen ||
      N.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (P = !1);
    P &&
      screenfull.isEnabled &&
      ((N = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (e = g - N.width / 2),
      (b = d),
      (x = new CToggle(e, b, N, s_bFullscreen, Y)),
      x.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this),
      B.addButton(x));
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    p.unload();
    p = null;
    A.unload();
    A = null;
    C.unload();
    C = null;
    w.unload();
    w = null;
    G.unload();
    G = null;
    for (var N = 0; N < z.length; N++) s_oStage.removeChild(z[N].image);
    u.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) D.unload(), (D = null);
    s_oInterface = null;
  };
  this.refreshButtonPos = function (N, S) {
    Y.x = -N;
    Y.y = S;
  };
  this.getPanelContainer = function () {
    return v;
  };
  this.refreshScore = function (N) {
    p.setText(N);
  };
  this.refreshTime = function (N, S) {
    var Z = formatTime(N);
    w.setText(Z);
    aa.scaleX = S;
  };
  this.setTimerColor = function (N) {
    w.setColor(N, STROKE_COLOR);
  };
  this._setGoals = function () {
    z = [];
    0 < GOALS[a].type0 &&
      z.push({ type: 0, num: GOALS[a].type0, image: null, text: null });
    0 < GOALS[a].type1 &&
      z.push({ type: 1, num: GOALS[a].type1, image: null, text: null });
    0 < GOALS[a].type2 &&
      z.push({ type: 2, num: GOALS[a].type2, image: null, text: null });
    0 < GOALS[a].type3 &&
      z.push({ type: 3, num: GOALS[a].type3, image: null, text: null });
    0 < GOALS[a].type4 &&
      z.push({ type: 4, num: GOALS[a].type4, image: null, text: null });
    0 < GOALS[a].type5 &&
      z.push({ type: 5, num: GOALS[a].type5, image: null, text: null });
    0 < GOALS[a].type6 &&
      z.push({ type: 6, num: GOALS[a].type6, image: null, text: null });
    0 < GOALS[a].type7 &&
      z.push({ type: 7, num: GOALS[a].type7, image: null, text: null });
    0 < GOALS[a].star &&
      z.push({ type: TYPE_STAR, num: GOALS[a].star, image: null, text: null });
    0 < GOALS[a].block &&
      z.push({
        type: TYPE_BLOCK,
        num: GOALS[a].block,
        image: null,
        text: null,
      });
    for (
      var N = s_oSpriteLibrary.getSprite("jelly"),
        S = CELL_SIZE + 130,
        Z = new createjs.SpriteSheet({
          images: [N],
          frames: {
            width: CELL_SIZE,
            height: CELL_SIZE,
            regX: CELL_SIZE / 2,
            regY: CELL_SIZE / 2,
          },
          animations: {
            type_0: [0],
            type_1: [1],
            type_2: [2],
            type_3: [3],
            type_4: [4],
            type_5: [5],
            type_6: [6],
            type_7: [7],
            star: [8],
          },
        }),
        R = 0;
      R < z.length;
      R++
    )
      z[R].type === TYPE_BLOCK
        ? ((N = s_oSpriteLibrary.getSprite("block")),
          (z[R].image = createBitmap(N)),
          (z[R].image.x = 250 + R * S),
          (z[R].image.y = 1464 + CELL_SIZE / 4),
          (z[R].image.regX = N.width / 2),
          (z[R].image.regY = N.height / 2))
        : ((z[R].image = createSprite(
            Z,
            z[R].type,
            CELL_SIZE / 2,
            CELL_SIZE / 2,
            CELL_SIZE,
            CELL_SIZE
          )),
          z[R].image.gotoAndStop(z[R].type),
          (z[R].image.x = 250 + R * S),
          (z[R].image.y = 1464 + CELL_SIZE / 4)),
        (z[R].image.scaleX = 0.75),
        (z[R].image.scaleY = 0.75),
        v.addChild(z[R].image),
        (z[R].text = new CFormatText(
          250 + CELL_SIZE / 2 + R * S,
          1464,
          "0 / " + z[R].num,
          "#ffffff",
          v,
          STROKE_COLOR,
          35
        )),
        z[R].text.setOutline(3);
  };
  this.timeAttackMode = function () {
    K.y = 1400;
    v.visible = !1;
    G.setVisible(!1);
    V = new createjs.Container();
    V.x = 520;
    V.y = 380;
    s_oStage.addChildAt(V, s_oStage.getChildIndex(Y));
    var N = createBitmap(s_oSpriteLibrary.getSprite("score_panel"));
    N.x = 60;
    N.y = 10;
    V.addChild(N);
    var S = s_oSpriteLibrary.getSprite("best_score_icon");
    S = createBitmap(S);
    S.x = N.x + 26;
    S.y = N.y + 24;
    S.regX = S.width / 2;
    S.regY = S.height / 2;
    V.addChild(S);
    new CFormatText(
      423,
      92,
      s_iBestScore,
      PRIMARY_FONT_COLOR,
      V,
      STROKE_COLOR,
      50,
      "right"
    );
  };
  this.refreshGoals = function (N, S) {
    for (var Z = 0; Z < z.length; Z++)
      z[Z].type === N &&
        (z[Z].text.setText(S + " / " + z[Z].num),
        S >= z[Z].num && z[Z].text.setColor("#f974af", STROKE_COLOR));
  };
  this._onButHelpRelease = function () {
    H = new CHelpPanel();
  };
  this._onButRestartRelease = function () {
    s_oGame.pauseGame();
    new CAreYouSurePanel(s_oGame.restartGame, s_oGame.resumeGame);
  };
  this._onButPauseRelease = function () {
    new CPausePanel();
    s_oGame.pauseGame();
  };
  this._onButLevelMenuRelease = function () {
    s_oGame.unload();
    s_oMain.goToModeMenu();
  };
  this.onExitFromHelp = function () {
    H.unload();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onExit = function () {
    s_oGame.pauseGame();
    new CAreYouSurePanel(s_oGame.onExit, s_oGame.resumeGame);
  };
  this.resetFullscreenBut = function () {
    P && screenfull.isEnabled && x.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? Q.call(window.document)
      : P.call(window.document.documentElement);
    sizeHandler();
  };
  s_oInterface = this;
  this._init(a);
  return this;
}
var s_oInterface = null;
function CHelpPanelStoryMode() {
  var a = null,
    e = null,
    b,
    g;
  this._init = function () {
    if (s_aHelpPanelEnabled[s_iCurLevel]) {
      g = new createjs.Container();
      s_oStage.addChild(g);
      var h = new createjs.Graphics()
        .beginFill("rgba(0,0,0,0.7)")
        .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      b = new createjs.Shape(h);
      b.alpha = 0;
      b.on("click", function () {
        d._onExitHelp();
      });
      g.addChild(b);
      h = CONFIG[s_iCurLevel].numfaces - 1;
      h = {
        images: [s_oSpriteLibrary.getSprite("jelly")],
        frames: {
          width: CELL_SIZE,
          height: CELL_SIZE,
          regX: CELL_SIZE / 2,
          regY: CELL_SIZE / 2,
        },
        animations: {
          type_0: [0],
          type_1: [1],
          type_2: [2],
          type_3: [3],
          type_4: [4],
          type_5: [5],
          type_6: [6],
          type_7: [7],
          star: [8],
          bomb: [9],
          clock: [10],
          changing: [0, h, "changing", JELLY_CHANGING_SPEED],
        },
      };
      var k = new createjs.SpriteSheet(h);
      switch (s_iCurLevel) {
        case 1:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              a = createSprite(
                k,
                "type_1",
                CELL_SIZE / 2,
                CELL_SIZE / 2,
                CELL_SIZE,
                CELL_SIZE
              );
              a.x = 250;
              a.y = 1509;
              a.scaleX = a.scaleY = 0.75;
              g.addChild(a);
              var l = d.createHand();
              l.x = 260;
              l.y = 1380;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(540, 1370, g, TEXT_HELP1);
            });
          break;
        case 3:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              a = createSprite(
                k,
                "bomb",
                CELL_SIZE / 2,
                CELL_SIZE / 2,
                CELL_SIZE,
                CELL_SIZE
              );
              a.x = 490;
              a.y = 1071;
              g.addChild(a);
              var l = d.createHand();
              l.x = 500;
              l.y = 980;
              g.addChild(l);
              e = new CComic(450, 700, g, TEXT_HELP3);
            });
          break;
        case 5:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              a = createSprite(
                k,
                "type_3",
                CELL_SIZE / 2,
                CELL_SIZE / 2,
                CELL_SIZE,
                CELL_SIZE
              );
              a.x = 250;
              a.y = 1509;
              a.scaleX = a.scaleY = 0.75;
              g.addChild(a);
              var l = d.createHand();
              l.x = 260;
              l.y = 1380;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(540, 1370, g, TEXT_HELP5);
              g.addChild(a);
            });
          break;
        case 8:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              var l = s_oSpriteLibrary.getSprite("block");
              a = createBitmap(l);
              a.regX = l.width / 2;
              a.regY = l.height / 2;
              a.x = 480;
              a.y = 1509;
              a.scaleX = a.scaleY = 0.75;
              g.addChild(a);
              l = d.createHand();
              l.x = 490;
              l.y = 1400;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(450, 1170, g, TEXT_HELP8);
              g.addChild(a);
            });
          break;
        case 11:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              a = createSprite(
                k,
                "clock",
                CELL_SIZE / 2,
                CELL_SIZE / 2,
                CELL_SIZE,
                CELL_SIZE
              );
              a.x = 540;
              a.y = 920;
              g.addChild(a);
              var l = d.createHand();
              l.x = a.x + 20;
              l.y = a.y - 140;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(320, 1200, g, TEXT_HELP11);
              g.addChild(a);
            });
          break;
        case 13:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              a = createSprite(
                k,
                "type_4",
                CELL_SIZE / 2,
                CELL_SIZE / 2,
                CELL_SIZE,
                CELL_SIZE
              );
              a.x = 250;
              a.y = 1509;
              a.scaleX = a.scaleY = 0.75;
              g.addChild(a);
              var l = d.createHand();
              l.x = 260;
              l.y = 1380;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(540, 1370, g, TEXT_HELP13);
              g.addChild(a);
            });
          break;
        case 15:
          a = createSprite(
            k,
            "changing",
            CELL_SIZE / 2,
            CELL_SIZE / 2,
            CELL_SIZE,
            CELL_SIZE
          );
          a.x = CANVAS_WIDTH / 2 + (3 * CELL_SIZE) / 2;
          a.y = CANVAS_HEIGHT / 2 - (5 * CELL_SIZE) / 2 - 40;
          g.addChild(a);
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              var l = d.createHand();
              l.x = a.x + 10;
              l.y = a.y - 130;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(300, a.y - 140, g, TEXT_HELP15);
            });
          break;
        case 17:
          a = createSprite(
            k,
            "star",
            CELL_SIZE / 2,
            CELL_SIZE / 2,
            CELL_SIZE,
            CELL_SIZE
          );
          a.x = 590;
          a.y = 570;
          a.scaleX = a.scaleY = 1;
          g.addChild(a);
          h = createSprite(
            s_oJellySpriteSheet,
            "type_7",
            CELL_SIZE / 2,
            CELL_SIZE / 2,
            CELL_SIZE,
            CELL_SIZE
          );
          h.x = a.x;
          h.y = a.y;
          h.gotoAndStop("type_7");
          g.addChild(h);
          createjs.Tween.get(h, { loop: !0 })
            .to({ alpha: 0 }, 1e3)
            .to({ alpha: 1 }, 1e3);
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              var l = d.createHand();
              l.x = a.x + 10;
              l.y = a.y - 130;
              g.addChild(l);
              e = new CComic(680, 800, g, TEXT_HELP17);
            });
          break;
        case 19:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              var l = s_oSpriteLibrary.getSprite("trap");
              a = createBitmap(l);
              a.regX = l.width / 2;
              a.regY = l.height / 2;
              a.x = CANVAS_WIDTH / 2 + (3 * CELL_SIZE) / 2;
              a.y = CANVAS_HEIGHT / 2 - 40;
              l = d.createHand();
              l.x = a.x + 10;
              l.y = a.y - 140;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(280, a.y - 150, g, TEXT_HELP19);
              e.flip();
              g.addChild(a);
            });
          break;
        case 22:
          createjs.Tween.get(b)
            .to({ alpha: 1 }, 300)
            .call(function () {
              a = createSprite(
                k,
                "type_5",
                CELL_SIZE / 2,
                CELL_SIZE / 2,
                CELL_SIZE,
                CELL_SIZE
              );
              a.x = 250;
              a.y = 1509;
              a.scaleX = a.scaleY = 0.75;
              g.addChild(a);
              var l = d.createHand();
              l.x = 260;
              l.y = 1390;
              g.addChild(l);
            })
            .wait(500)
            .call(function () {
              e = new CComic(540, 1370, g, TEXT_HELP22);
              g.addChild(a);
            });
          break;
        default:
          s_oGame.onExitHelp(), s_oStage.removeChild(g);
      }
    } else s_oGame.onExitHelp();
  };
  this.createHand = function () {
    for (var h = [], k = 0; k < HAND_ANIM_NUM_FRAMES; k++)
      h.push(s_oSpriteLibrary.getSprite("hand_anim_" + k));
    k = s_oSpriteLibrary.getSprite("hand_anim_0");
    h = new createjs.SpriteSheet({
      images: h,
      frames: {
        width: k.width,
        height: k.height,
        regX: k.width / 2,
        regY: k.height / 2,
      },
      animations: { loop: [0, 19, "loop"] },
      framerate: 30,
    });
    return createSprite(
      h,
      "loop",
      k.width / 2,
      k.height / 2,
      k.width,
      k.height
    );
  };
  this.unload = function () {
    b.removeAllEventListeners();
    s_oStage.removeChild(g);
  };
  this._onExitHelp = function () {
    d.unload();
    s_oGame.onExitHelp();
  };
  this._onButContinueRelease = function () {
    this.unload();
    s_oGame.onExitHelp();
  };
  var d = this;
  this._init();
}
function CHelpPanelTimeAttack() {
  var a = !0,
    e,
    b,
    g,
    d,
    h,
    k,
    l,
    r,
    y,
    t,
    z,
    D,
    u,
    m;
  this._init = function () {
    if (s_bHelpTimeAttack) {
      var A = s_oSpriteLibrary.getSprite("msg_box");
      e = createBitmap(A);
      D = e.on("click", function () {
        p._onExitHelp();
      });
      s_oStage.addChild(e);
      var C = CONFIG[s_iCurLevel].numfaces - 1;
      A = s_oSpriteLibrary.getSprite("jelly");
      A = new createjs.SpriteSheet({
        images: [A],
        frames: {
          width: CELL_SIZE,
          height: CELL_SIZE,
          regX: CELL_SIZE / 2,
          regY: CELL_SIZE / 2,
        },
        animations: {
          type_0: [0],
          type_1: [1],
          type_2: [2],
          type_3: [3],
          type_4: [4],
          type_5: [5],
          type_6: [6],
          type_7: [7],
          star: [8],
          bomb: [9],
          clock: [10],
          changing: [0, C, "changing", JELLY_CHANGING_SPEED],
        },
      });
      r = createSprite(
        A,
        "bomb",
        CELL_SIZE / 2,
        CELL_SIZE / 2,
        CELL_SIZE,
        CELL_SIZE
      );
      r.x = 250;
      r.y = 290;
      y = createSprite(
        A,
        "clock",
        CELL_SIZE / 2,
        CELL_SIZE / 2,
        CELL_SIZE,
        CELL_SIZE
      );
      y.x = 250;
      y.y = 485;
      t = createSprite(
        A,
        "changing",
        CELL_SIZE / 2,
        CELL_SIZE / 2,
        CELL_SIZE,
        CELL_SIZE
      );
      t.x = 250;
      t.y = 690;
      b = new createjs.Container();
      b.y = CANVAS_HEIGHT / 4;
      s_oStage.addChild(b);
      u = [];
      for (C = 0; 3 > C; C++)
        (u[C] = createSprite(
          A,
          "type_0",
          CELL_SIZE / 2,
          CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        )),
          (u[C].x = CANVAS_WIDTH / 2 + C * (CELL_SIZE + 10) - CELL_SIZE - 10),
          (u[C].y = 180);
      m = [];
      for (C = 0; 4 > C; C++)
        (m[C] = createSprite(
          A,
          "type_4",
          CELL_SIZE / 2,
          CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        )),
          (m[C].x =
            CANVAS_WIDTH / 2 +
            C * (CELL_SIZE + 10) -
            (3 * (CELL_SIZE + 10)) / 2),
          (m[C].y = 560);
      this._buildPage1();
      s_bHelpTimeAttack = !1;
    } else s_oGame.onExitHelp();
  };
  this.unload = function () {
    a ? h.unload() : z.unload();
    e.off("click", D);
    s_oStage.removeChild(e, b);
  };
  this._buildPage1 = function () {
    a = !0;
    for (var A = 0; 3 > A; A++) b.addChild(u[A]);
    for (A = 0; 4 > A; A++) b.addChild(m[A]);
    A = CANVAS_WIDTH / 2;
    var C = 340,
      x = 670,
      w = 400;
    g = new CTLText(
      b,
      A - x / 2,
      C - w / 2,
      x,
      w,
      46,
      "center",
      STROKE_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP,
      !0,
      !0,
      !0,
      !1
    );
    g.setOutline(4);
    new CTLText(
      b,
      A - x / 2,
      C - w / 2,
      x,
      w,
      46,
      "center",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP,
      !0,
      !0,
      !0,
      !1
    );
    A = CANVAS_WIDTH / 2;
    C = 690;
    x = 650;
    w = 400;
    d = new CTLText(
      b,
      A - x / 2,
      C - w / 2,
      x,
      w,
      46,
      "center",
      STROKE_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP2,
      !0,
      !0,
      !0,
      !1
    );
    d.setOutline(4);
    new CTLText(
      b,
      A - x / 2,
      C - w / 2,
      x,
      w,
      46,
      "center",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP2,
      !0,
      !0,
      !0,
      !1
    );
    A = s_oSpriteLibrary.getSprite("arrow");
    h = new CGfxButton(CANVAS_WIDTH / 2 + 435, 490, A, b);
    h.addEventListener(ON_MOUSE_UP, this._onButRightRelease, this);
    h.pulseAnimation();
  };
  this._buildPage2 = function () {
    a = !1;
    var A = CANVAS_WIDTH / 2,
      C = 150,
      x = 650,
      w = 130;
    g = new CTLText(
      b,
      A - x / 2,
      C - w / 2,
      x,
      w,
      80,
      "center",
      STROKE_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_ITEM,
      !0,
      !0,
      !1,
      !0
    );
    g.setOutline(4);
    new CTLText(
      b,
      A - x / 2,
      C - w / 2,
      x,
      w,
      80,
      "center",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_ITEM,
      !0,
      !0,
      !0,
      !1
    );
    b.addChild(r);
    A = CANVAS_WIDTH / 2 - 200;
    C = 230;
    x = 540;
    w = 120;
    d = new CTLText(
      b,
      A,
      C,
      x,
      w,
      50,
      "left",
      STROKE_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_BOMB,
      !0,
      !0,
      !0,
      !1
    );
    d.setOutline(4);
    new CTLText(
      b,
      A,
      C,
      x,
      w,
      50,
      "left",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_BOMB,
      !0,
      !0,
      !0,
      !1
    );
    b.addChild(y);
    C = 400;
    x = 540;
    w = 150;
    k = new CTLText(
      b,
      A,
      C,
      x,
      w,
      50,
      "left",
      STROKE_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_CLOCK,
      !0,
      !0,
      !0,
      !1
    );
    k.setOutline(4);
    new CTLText(
      b,
      A,
      C,
      x,
      w,
      50,
      "left",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_CLOCK,
      !0,
      !0,
      !0,
      !1
    );
    b.addChild(y);
    C = 600;
    x = 540;
    w = 200;
    l = new CTLText(
      b,
      A,
      C,
      x,
      w,
      50,
      "left",
      STROKE_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_CHANGING,
      !0,
      !0,
      !0,
      !1
    );
    l.setOutline(4);
    new CTLText(
      b,
      A,
      C,
      x,
      w,
      50,
      "left",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_HELP_CHANGING,
      !0,
      !0,
      !0,
      !1
    );
    b.addChild(t);
    A = s_oSpriteLibrary.getSprite("arrow");
    z = new CGfxButton(CANVAS_WIDTH / 2 - 435, 490, A, b);
    z.addEventListener(ON_MOUSE_UP, this._onButLeftRelease, this);
    z.pulseAnimation();
    z.reverseSprite();
  };
  this._onButRightRelease = function () {
    b.removeAllChildren();
    h.unload();
    this._buildPage2();
  };
  this._onButLeftRelease = function () {
    a || (z.unload(), b.removeAllChildren());
    this._buildPage1();
  };
  this._onExitHelp = function () {
    p.unload();
    s_oGame.onExitHelp();
  };
  this._onButContinueRelease = function () {
    this.unload();
    s_oGame.onExitHelp();
  };
  var p = this;
  this._init();
}
function CNextLevelPanel(a, e, b, g, d) {
  d = void 0 === d ? TEXT_GAMEOVER : d;
  var h, k, l, r, y, t, z, D, u, m, p;
  this._init = function (C, x, w, H, v) {
    var G = new createjs.Graphics()
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    k = new createjs.Shape(G);
    k.alpha = 0;
    s_oStage.addChild(k);
    r = new createjs.Container();
    G = s_oSpriteLibrary.getSprite("end_panel");
    r.y = 1.5 * -G.height;
    l = createBitmap(G);
    l.regX = G.width / 2;
    l.regY = G.height / 2;
    l.x = CANVAS_WIDTH / 2;
    l.y = CANVAS_HEIGHT / 2;
    r.addChild(l);
    C && r.addChild(void 0);
    createjs.Tween.get(k).to({ alpha: 1 }, 750, createjs.Ease.linear);
    k.on("mousedown", function () {});
    s_oStage.addChild(r);
    C &&
      ((s_aLevelEnabled[s_iCurLevel + 1] = !0),
      x + w > s_aLevelScore[s_iCurLevel] &&
        (s_aLevelScore[s_iCurLevel] = x + w),
      s_oMain.updateTotalScore(),
      (m = new CGfxButton(
        CANVAS_WIDTH / 2 - 260,
        CANVAS_HEIGHT / 2 + 260,
        s_oSpriteLibrary.getSprite("but_restart_big"),
        r
      )),
      m.addEventListener(ON_MOUSE_UP, this._onButRetryRelease, this),
      (u = new CGfxButton(
        CANVAS_WIDTH / 2 + 260,
        CANVAS_HEIGHT / 2 + 260,
        s_oSpriteLibrary.getSprite("but_continue_small"),
        r
      )),
      u.addEventListener(ON_MOUSE_UP, this._onButNextRelease, this),
      u.setVisible(!1),
      m.setVisible(!1),
      $(s_oMain).trigger("save_score", [
        s_iTotalScore,
        CTL_MODE_NAME[s_iGameMode],
      ]),
      $(s_oMain).trigger("share_event", s_iTotalScore));
    setTimeout(function () {
      A._addElements(H, v);
    }, 750);
  };
  this._addElements = function (C, x) {
    a
      ? ((y = new CFormatText(
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 - 370 + 50,
          TEXT_WIN,
          PRIMARY_FONT_COLOR,
          r,
          STROKE_COLOR,
          70,
          "center"
        )),
        y.setOutline(10),
        (t = new CFormatText(
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 - 60 + 50,
          sprintf(TEXT_SCORES, e),
          PRIMARY_FONT_COLOR,
          r,
          STROKE_COLOR,
          54,
          "center"
        )),
        (z = new CFormatText(
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 + 70,
          sprintf(TEXT_TIMEBONUS, b),
          PRIMARY_FONT_COLOR,
          r,
          STROKE_COLOR,
          54,
          "center"
        )),
        (h = e + b),
        (D = new CFormatText(
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 + 150,
          sprintf(TEXT_TOTAL, h),
          PRIMARY_FONT_COLOR,
          r,
          STROKE_COLOR,
          54,
          "center"
        )),
        this.setStars(e + b, 50))
      : ((m = new CGfxButton(
          CANVAS_WIDTH / 2 + 260,
          CANVAS_HEIGHT / 2 + 260,
          s_oSpriteLibrary.getSprite("but_restart_big"),
          r
        )),
        m.addEventListener(ON_MOUSE_UP, this._onButRetryRelease, this),
        m.popShowAnimation(m.pulseAnimation, m),
        (p = new CGfxButton(
          CANVAS_WIDTH / 2 - 260,
          CANVAS_HEIGHT / 2 + 260,
          s_oSpriteLibrary.getSprite("but_home"),
          r
        )),
        p.addEventListener(ON_MOUSE_UP, this._onButHomeRelease, this),
        p.popShowAnimation(),
        (t = new CFormatText(
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 - 150,
          sprintf(TEXT_SCORE, e),
          PRIMARY_FONT_COLOR,
          r,
          STROKE_COLOR,
          70,
          "center",
          PRIMARY_FONT,
          200
        )),
        null !== C &&
          ($(s_oMain).trigger("save_score", [
            s_iBestScore,
            CTL_MODE_NAME[s_iGameMode],
          ]),
          $(s_oMain).trigger("share_event", s_iBestScore),
          new CFormatText(
            CANVAS_WIDTH / 2,
            CANVAS_HEIGHT / 2 + 50,
            sprintf(TEXT_BEST_SCORE, C),
            PRIMARY_FONT_COLOR,
            r,
            STROKE_COLOR,
            70,
            "center",
            PRIMARY_FONT,
            200
          )),
        (y = new CFormatText(
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 - 300,
          x,
          PRIMARY_FONT_COLOR,
          r,
          STROKE_COLOR,
          80,
          "center"
        )));
    createjs.Tween.get(r).to({ y: 0 }, 1e3, createjs.Ease.bounceOut);
  };
  this.unload = function () {
    y.unload();
    y = null;
    a &&
      (t.unload(),
      (t = null),
      z.unload(),
      (z = null),
      D.unload(),
      (D = null),
      u.unload(),
      (u = null));
    m.unload();
    m = null;
    s_oStage.removeChild(k);
    s_oStage.removeChild(r);
  };
  this.setStars = function (C, x) {
    var w = s_oSpriteLibrary.getSprite("star_empty"),
      H = createBitmap(w);
    H.regX = w.width / 2;
    H.regY = w.height / 2;
    H.x = CANVAS_WIDTH / 2 - 200;
    H.y = 780 + x;
    H.rotation = 30;
    r.addChild(H);
    var v = createBitmap(w);
    v.regX = w.width / 2;
    v.regY = w.height / 2;
    v.x = CANVAS_WIDTH / 2;
    v.y = 720 + x;
    r.addChild(v);
    var G = createBitmap(w);
    G.regX = w.width / 2;
    G.regY = w.height / 2;
    G.x = CANVAS_WIDTH / 2 + 190;
    G.y = 780 + x;
    G.rotation = -30;
    r.addChild(G);
    w = s_oSpriteLibrary.getSprite("star_filled");
    H = createBitmap(w);
    H.regX = w.width / 2;
    H.regY = w.height / 2;
    H.x = CANVAS_WIDTH / 2 - 200;
    H.y = 780 + x;
    H.rotation = 30;
    H.scaleX = H.scaleY = 0.01;
    r.addChild(H);
    v = createBitmap(w);
    v.regX = w.width / 2;
    v.regY = w.height / 2;
    v.x = CANVAS_WIDTH / 2;
    v.y = 720 + x;
    v.scaleX = v.scaleY = 0.01;
    r.addChild(v);
    G = createBitmap(w);
    G.regX = w.width / 2;
    G.regY = w.height / 2;
    G.x = CANVAS_WIDTH / 2 + 190;
    G.y = 780 + x;
    G.rotation = -30;
    G.scaleX = G.scaleY = 0.01;
    r.addChild(G);
    C >= BEST_SCORE_LIMIT[s_iCurLevel]
      ? (createjs.Tween.get(H)
          .wait(700)
          .call(function () {
            playSound("chime", 1, !1);
          })
          .to({ scaleX: 1, scaleY: 1 }, 1500, createjs.Ease.elasticOut),
        createjs.Tween.get(v)
          .wait(1400)
          .call(function () {
            playSound("chime", 1, !1);
          })
          .to({ scaleX: 1, scaleY: 1 }, 1500, createjs.Ease.elasticOut),
        createjs.Tween.get(G)
          .wait(2100)
          .call(function () {
            playSound("chime", 1, !1);
          })
          .to({ scaleX: 1, scaleY: 1 }, 1500, createjs.Ease.elasticOut)
          .call(function () {
            A.callLevelCompletePing();
          }))
      : C > 0.7 * BEST_SCORE_LIMIT[s_iCurLevel] &&
        C < BEST_SCORE_LIMIT[s_iCurLevel]
      ? (createjs.Tween.get(H)
          .wait(700)
          .call(function () {
            playSound("chime", 1, !1);
          })
          .to({ scaleX: 1, scaleY: 1 }, 1500, createjs.Ease.elasticOut),
        createjs.Tween.get(v)
          .wait(1400)
          .call(function () {
            playSound("chime", 1, !1);
          })
          .to({ scaleX: 1, scaleY: 1 }, 1500, createjs.Ease.elasticOut)
          .call(function () {
            A.callLevelCompletePing();
          }))
      : createjs.Tween.get(H)
          .wait(700)
          .call(function () {
            playSound("chime", 1, !1);
          })
          .to({ scaleX: 1, scaleY: 1 }, 1500, createjs.Ease.elasticOut)
          .call(function () {
            A.callLevelCompletePing();
          });
  };
  this.callLevelCompletePing = function () {
    u.popShowAnimation(u.pulseAnimation, u);
    m.popShowAnimation();
    u.setVisible(!0);
    m.setVisible(!0);
  };
  this.show = function () {
    createjs.Tween.get(r).to({ y: 0 }, 500, createjs.Ease.backOut);
  };
  this._onButHomeRelease = function () {
    createjs.Tween.get(r)
      .to({ y: 480 }, 500, createjs.Ease.backIn)
      .call(function () {
        s_oGame.setBlock(!1);
        s_oGame.onExit();
      });
  };
  this._onButRetryRelease = function () {
	  gradle.event('btn_retry');
    $(s_oMain).trigger("show_interlevel_ad");
    createjs.Tween.get(r)
      .to({ y: 480 }, 500, createjs.Ease.backIn)
      .call(function () {
        s_oGame.setBlock(!1);
        s_oGame.restartGame();
      });
  };
  this._onButNextRelease = function () {
	  gradle.event('btn_next_level');
    $(s_oMain).trigger("show_interlevel_ad");
    createjs.Tween.get(r)
      .to({ y: 480 }, 500, createjs.Ease.backIn)
      .call(function () {
        s_oGame.onNextLevel(h);
      });
  };
  var A = this;
  this._init(a, e, b, void 0 === g ? null : g, d);
  return this;
}
function CEndPanel(a, e) {
  var b, g, d, h, k, l;
  this._init = function (r, y) {
    stopSound("soundtrack");
    playSound("soundtrack", 1, !0);
    h = createBitmap(s_oSpriteLibrary.getSprite("rays_0"));
    s_oStage.addChild(h);
    this._animBackGround(0);
    var t = s_oSpriteLibrary.getSprite("end_panel");
    l = createBitmap(t);
    l.regX = t.width / 2;
    l.regY = t.height / 2;
    l.x = CANVAS_WIDTH / 2;
    l.y = CANVAS_HEIGHT / 2;
    s_oStage.addChild(l);
    b = new CFormatText(
      CANVAS_WIDTH / 2,
      400,
      TEXT_CONGRATULATIONS,
      PRIMARY_FONT_COLOR,
      s_oStage,
      "#63e0fa",
      86,
      "center",
      PRIMARY_FONT,
      200,
      1e3
    );
    b.setOutline(10);
    g = new CFormatText(
      CANVAS_WIDTH / 2,
      660,
      TEXT_END_2,
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      60,
      "center",
      PRIMARY_FONT,
      120,
      900,
      !0
    );
    d = new CFormatText(
      CANVAS_WIDTH / 2,
      825,
      TEXT_END_4,
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      56,
      "center",
      PRIMARY_FONT,
      100,
      830,
      !0
    );
    new CFormatText(
      CANVAS_WIDTH / 2,
      1e3,
      sprintf(TEXT_TOTALSCORE, s_iTotalScore),
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      60,
      "center",
      PRIMARY_FONT,
      120,
      900
    );
    k = new CGfxButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 260,
      s_oSpriteLibrary.getSprite("but_home"),
      s_oStage
    );
    k.addEventListener(ON_MOUSE_UP, this._onButMenuRelease, this);
    k.pulseAnimation();
    $(s_oMain).trigger("save_score", s_iTotalScore);
    $(s_oMain).trigger("share_event", s_iTotalScore);
  };
  this.unload = function () {
    b.unload();
    g.unload();
    d.unload();
    k.unload();
    createjs.Tween.removeAllTweens();
    s_oStage.removeAllChildren();
  };
  this._animBackGround = function (r) {
    var y = this;
    h.image = s_oSpriteLibrary.getSprite("rays_" + r);
    setTimeout(function () {
      3 === r && (r = -1);
      y._animBackGround(r + 1);
    }, FPS);
  };
  this._onButMenuRelease = function () {
    this.unload();
    playSound("chef_well_done", 1, !1);
    playSound("click", 1, !1);
    $(s_oMain).trigger("show_interlevel_ad");
    s_oMain.gotoMenu();
    $(s_oMain).trigger("end_session");
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._init(a, e);
}
function CCreditsPanel() {
  var a, e, b, g, d, h, k;
  this._init = function () {
    e = new createjs.Container();
    s_oStage.addChild(e);
    b = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    s_oStage.addChild(b);
    b.on("click", function () {});
    var l = s_oSpriteLibrary.getSprite("but_exit");
    a = CANVAS_WIDTH - l.height / 2 - 190;
    d = new CGfxButton(a, 640, l, s_oStage);
    d.addEventListener(ON_MOUSE_UP, this.unload, this);
    h = new CFormatText(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 190 + 60,
      "Developed by",
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      80,
      "center"
    );
    l = s_oSpriteLibrary.getSprite("logo_ctl");
    g = new CGfxButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 75 + 260,
      l,
      s_oStage
    );
    g.addEventListener(ON_MOUSE_UP, this._onLogoButRelease, this);
    k = new CFormatText(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 80 - 80,
      gradle.developer,
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      70,
      "center"
    );
  };
  this.unload = function () {
    b.removeAllEventListeners();
    d.unload();
    d = null;
    g.unload();
    h.unload();
    k.unload();
    s_oStage.removeChild(b);
  };
  this._onLogoButRelease = function () {
    gradle.event('moreGames');
  };
  this._init();
}
function CWarningPanel() {
  var a, e, b, g, d, h, k;
  this._init = function () {
    e = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    s_oStage.addChild(e);
    e.on("mousedown", function () {});
    var l = s_oSpriteLibrary.getSprite("but_exit_big");
    a = CANVAS_WIDTH / 2 - 150;
    b = new CGfxButton(a, 1200, l, s_oStage);
    b.addEventListener(ON_MOUSE_UP, this.unload, this);
    b.pulseAnimation();
    g = new CFormatText(
      CANVAS_WIDTH / 2,
      630,
      TEXT_GAMERESTART,
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      80,
      "center"
    );
    g.setOutline(8);
    d = new CFormatText(
      CANVAS_WIDTH / 2,
      800,
      TEXT_WARNING,
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      60,
      "center",
      PRIMARY_FONT,
      250,
      800
    );
    h = new CFormatText(
      CANVAS_WIDTH / 2,
      950,
      TEXT_SURE,
      "#ffe468",
      s_oStage,
      STROKE_COLOR,
      50,
      "center"
    );
    l = s_oSpriteLibrary.getSprite("but_check");
    k = new CGfxButton(CANVAS_WIDTH / 2 + 150, 1200, l, s_oStage);
    k.addEventListener(ON_MOUSE_UP, this._onButConfirmRelease, this);
  };
  this.unload = function () {
    e.off("mousedown", function () {});
    b.unload();
    b = null;
    k.unload();
    k = null;
    g.unload();
    d.unload();
    h.unload();
    s_oStage.removeChild(e);
  };
  this._onButConfirmRelease = function () {
    this.unload();
    s_oMenu.unload();
    s_oLocalStorage.resetData();
    s_oLocalStorage.saveDataStoryMode();
    s_oLocalStorage.saveDataTimeAttack(s_iBestScore);
    s_oMain.goToModeMenu();
  };
  this._init();
}
function CPausePanel() {
  var a, e, b, g;
  this._init = function () {
    var h = s_oSpriteLibrary.getSprite("msg_box");
    a = createBitmap(h);
    g = a.on("mousedown", function () {});
    s_oStage.addChild(a);
    e = new CFormatText(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 - 250,
      TEXT_ISPAUSED,
      PRIMARY_FONT_COLOR,
      s_oStage,
      STROKE_COLOR,
      90,
      "center"
    );
    b = new CGfxButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 150,
      s_oSpriteLibrary.getSprite("but_continue"),
      s_oStage
    );
    b.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
    b.pulseAnimation();
  };
  this.unload = function () {
    e.unload();
    e = null;
    b.unload();
    b = null;
    a.off("mousedown", g);
    s_oStage.removeChild(a);
  };
  this._onButContinueRelease = function () {
    d.unload();
    s_oGame.resumeGame();
  };
  var d = this;
  this._init();
}
function CCell(a, e, b, g, d, h, k, l) {
  var r,
    y,
    t,
    z,
    D,
    u,
    m,
    p = null,
    A,
    C,
    x,
    w;
  this._init = function (H, v, G, K, B, Y, V, aa) {
    r = !1;
    y = V;
    t = aa;
    z = Y;
    w = {};
    D = new createjs.Container();
    D.x = H;
    D.y = v;
    0 <= z && B.addChild(D);
    G = s_oSpriteLibrary.getSprite("cell");
    K = createBitmap(G);
    K.regX = G.width / 2;
    K.regY = G.height / 2;
    D.addChild(K);
    G = s_oSpriteLibrary.getSprite("bg_symbol");
    G = new createjs.SpriteSheet({
      images: [G],
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: { type_0: [0] },
    });
    u = createSprite(G, 0, CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE, CELL_SIZE);
    u.gotoAndPlay(0);
    u.visible = !1;
    D.addChild(u);
    y &&
      ((G = s_oSpriteLibrary.getSprite("block")),
      (A = createBitmap(G)),
      (A.regX = G.width / 2),
      (A.regY = G.height / 2),
      D.addChild(A));
    p = createSprite(
      s_oJellySpriteSheet,
      "type_7",
      CELL_SIZE / 2,
      CELL_SIZE / 2,
      CELL_SIZE,
      CELL_SIZE
    );
    p.gotoAndStop("type_7");
    z === TYPE_CHANGING
      ? ((u.visible = !0),
        (m = createSprite(
          s_oJellySpriteSheet,
          "changing",
          CELL_SIZE / 2,
          CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        )),
        m.gotoAndPlay("changing"),
        D.addChild(m))
      : z === TYPE_STAR
      ? ((m = createSprite(
          s_oJellySpriteSheet,
          z,
          CELL_SIZE / 2,
          CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        )),
        m.gotoAndStop(z),
        this._glowFace(p),
        D.addChild(m, p))
      : ((m = createSprite(
          s_oJellySpriteSheet,
          z,
          CELL_SIZE / 2,
          CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        )),
        m.gotoAndStop(z),
        D.addChild(m));
    aa
      ? ((G = s_oSpriteLibrary.getSprite("trap")),
        (C = createBitmap(G)),
        (C.regX = G.width / 2),
        (C.regY = G.height / 2),
        (H = B.localToGlobal(H, v)),
        (C.x = H.x),
        (C.y = H.y),
        s_oStage.addChild(C))
      : ((H = new createjs.Graphics()
          .beginFill("rgba(158,158,158,0.01)")
          .drawRect(-CELL_SIZE / 2, -CELL_SIZE / 2, CELL_SIZE, CELL_SIZE)),
        (x = new createjs.Shape(H)),
        (w.mousedown = x.on("mousedown", this._onCellClick)),
        D.addChild(x));
  };
  this.unload = function () {
    0 <= z &&
      (d.removeChild(D),
      l || (x.off("mousedown", w.mousedown), x.removeAllEventListeners()));
    l && s_oStage.removeChild(C);
  };
  this.getType = function () {
    return z;
  };
  this.setType = function (H) {
    u.visible = !1;
    z === TYPE_STAR && D.removeChild(p);
    var v = z;
    z = H;
    switch (z) {
      case CELL_STATE_MATCHED:
        v === TYPE_CHANGING
          ? s_oGame.createParticle(a, e, m.currentFrame)
          : s_oGame.createParticle(a, e, v);
        y &&
          (playSound("wood", 1, !1),
          s_oGame.createParticle(a, e, TYPE_BLOCK),
          (y = A.visible = !1),
          s_oGame.updateGoalsForBlock());
        m.gotoAndStop(z);
        break;
      case CELL_STATE_INVISIBLE:
        m.gotoAndStop(z);
        break;
      case TYPE_CHANGING:
        u.visible = !0;
        m.gotoAndPlay("changing");
        break;
      case TYPE_STAR:
        m.gotoAndStop(z);
        D.addChildAt(p, 3);
        this._glowFace();
        break;
      default:
        m.gotoAndStop(z);
    }
  };
  this.animHint = function () {
    var H = this;
    createjs.Tween.get(m)
      .to({ rotation: -18 }, 55)
      .to({ rotation: 0 }, 55)
      .to({ rotation: 18 }, 55)
      .to({ rotation: 0 }, 55)
      .to({ rotation: -18 }, 55)
      .to({ rotation: 0 }, 55)
      .to({ rotation: 18 }, 55)
      .to({ rotation: 0 }, 55)
      .wait(800)
      .call(function () {
        H.animHint();
      });
  };
  this.stopAnimHint = function () {
    m.rotation = 0;
    createjs.Tween.removeTweens(m);
  };
  this.getToDelete = function () {
    return r;
  };
  this.setToDelete = function (H) {
    r = H;
  };
  this.getTrap = function () {
    return t;
  };
  this.getPos = function () {
    return { x: a, y: e };
  };
  this._glowFace = function () {
    createjs.Tween.get(p, { loop: !0 })
      .to({ alpha: 0 }, 1e3)
      .to({ alpha: 1 }, 1e3);
  };
  this.setNewSpritesheet = function () {
    m.spriteSheet = s_oJellySpriteSheet;
  };
  this._onCellClick = function (H) {
    z === TYPE_CHANGING
      ? s_oGame.checkCellClicked(b, g, m.currentFrame, H)
      : s_oGame.checkCellClicked(b, g, z, H);
  };
  this.disableSwipeAction = function () {
    x.off("pressmove", w.pressmove);
    x.off("pressup", w.pressup);
  };
  this.enableSwipeAction = function () {
    w.pressmove = x.on("pressmove", s_oGame.onPressMoveCell, this);
    w.pressup = x.on("pressup", s_oGame.onPressUpCell, this, !1, {
      row: b,
      col: g,
    });
  };
  this._init(a, e, b, g, d, h, k, l);
}
function CMovingCell(a, e, b, g) {
  var d, h;
  this._init = function (k, l, r, y) {
    d = r;
    r = CONFIG[s_iCurLevel].numfaces - 1;
    r = {
      images: [s_oSpriteLibrary.getSprite("jelly")],
      frames: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        regX: CELL_SIZE / 2,
        regY: CELL_SIZE / 2,
      },
      animations: {
        type_0: [0],
        type_1: [1],
        type_2: [2],
        type_3: [3],
        type_4: [4],
        type_5: [5],
        type_6: [6],
        type_7: [7],
        star: [8],
        bomb: [9],
        clock: [10],
        changing: [0, r, "changing", JELLY_CHANGING_SPEED],
      },
    };
    r = new createjs.SpriteSheet(r);
    d === TYPE_CHANGING
      ? ((h = createSprite(
          r,
          "changing",
          CELL_SIZE / 2,
          CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        )),
        h.gotoAndPlay("changing"))
      : ((h = createSprite(
          r,
          d,
          CELL_SIZE / 2,
          CELL_SIZE / 2,
          CELL_SIZE,
          CELL_SIZE
        )),
        h.gotoAndStop(d));
    h.x = k;
    h.y = l;
    y.addChild(h);
  };
  this.unload = function () {
    g.removeChild(h);
  };
  this.move = function (k, l) {
    var r = createjs.Tween.get(h)
      .to({ x: k, y: l }, 250, createjs.Ease.cubicIn)
      .call(function () {
        h.visible = !1;
        s_oGame.checkMatch();
      });
    s_oGame.getTweensGroup().push(r);
  };
  this.moveBack = function () {
    h.visible = !0;
    var k = createjs.Tween.get(h)
      .to({ x: a, y: e }, 250, createjs.Ease.cubicIn)
      .call(function () {
        s_oGame.returnInPosition();
      });
    s_oGame.getTweensGroup().push(k);
  };
  this.fall = function (k, l, r) {
    r *= TIME_FALL;
    createjs.Tween.get(h)
      .wait(r - 100)
      .call(function () {
        s_oSoundMatching.fallPieces();
      });
    k = createjs.Tween.get(h)
      .to({ x: k, y: l }, r, createjs.Ease.backOut)
      .call(s_oGame.onFinishFall, null, s_oGame);
    s_oGame.getTweensGroup().push(k);
  };
  this.fallStar = function (k, l) {
    var r = createjs.Tween.get(h).to(
      { x: k, y: l },
      1200,
      createjs.Ease.cubicIn
    );
    s_oGame.getTweensGroup().push(r);
  };
  this.setVisible = function (k) {
    h.visible = k;
  };
  this.getType = function () {
    return d;
  };
  this._init(a, e, b, g);
}
function CParticle(a, e, b, g) {
  var d,
    h,
    k = null;
  this._init = function (r, y, t, z) {
    d = !1;
    h = 1;
    r > CANVAS_WIDTH / 2
      ? randomFloatBetween(-25, -10, 2)
      : randomFloatBetween(10, 25, 2);
    randomFloatBetween(-MAX_SYMBOL_ROT_SPEED, MAX_SYMBOL_ROT_SPEED, 2);
    if (t === TYPE_BLOCK) {
      var D = s_oSpriteLibrary.getSprite("explosion_" + t);
      D = {
        framerate: 20,
        images: [D],
        frames: { width: 408, height: 474, regX: 204, regY: 150 },
        animations: { idle: [0, 9, "stop"], stop: [10] },
      };
      D = new createjs.SpriteSheet(D);
      k = createSprite(D, "idle", 204, 237, 408, 474);
      k.on("animationend", this._onParticleEnd);
      k.gotoAndPlay("idle");
      k.x = r + PARTICLE_OFFSET[t].x;
      k.y = y + PARTICLE_OFFSET[t].y;
      z.addChild(k);
    } else if (t === TYPE_STAR) d = !0;
    else
      switch (
        ((D = s_oSpriteLibrary.getSprite("explosion_" + t)),
        (D = {
          images: [D],
          frames: EXPLOSION_ANIMATION_SET[t].frames,
          animations: EXPLOSION_ANIMATION_SET[t].animations,
          framerate: EXPLOSION_ANIMATION_SET[t].framerate,
        }),
        (D = new createjs.SpriteSheet(D)),
        (k = createSprite(
          D,
          "idle",
          EXPLOSION_ANIMATION_SET[t].frames.width / 2,
          EXPLOSION_ANIMATION_SET[t].frames.height / 2,
          EXPLOSION_ANIMATION_SET[t].frames.width,
          EXPLOSION_ANIMATION_SET[t].frames.height
        )),
        (k.x = r),
        (k.y = y),
        t)
      ) {
        case TYPE_BOMB:
        case TYPE_CLOCK:
          k.on("animationend", this._onParticleEnd);
          z.addChild(k);
          break;
        default:
          k.gotoAndStop("idle"),
            (r = 400 * Math.random()),
            createjs.Tween.get(k)
              .wait(r)
              .to({ scaleX: 0, scaleY: 0 }, 400, createjs.Ease.backIn)
              .call(this._onAnimationEnd, null, this),
            createjs.Tween.get(k)
              .wait(r)
              .to({ alpha: 0 }, 400, createjs.Ease.cubicIn),
            z.addChildAt(k, 0);
      }
  };
  this.unload = function () {
    null !== k &&
      ((k.visible = !1),
      k.off("animationend", this._onParticleEnd),
      s_oStage.removeChild(k));
    d = !0;
  };
  this.sliceVertical = function () {
    _iRunTimeSlice1 = -(2 * h);
    _iRunTimeSlice2 = -(2 * h);
  };
  this.update = function () {};
  this.isGone = function () {
    return d;
  };
  this._onAnimationEnd = function () {
    l.unload();
  };
  this._onParticleEnd = function () {
    "idle" === k.currentAnimation && l.unload();
  };
  var l = this;
  this._init(a, e, b, g);
}
function CComic(a, e, b, g) {
  var d, h;
  this._init = function (k, l, r, y) {
    var t = s_oSpriteLibrary.getSprite("balloon_1");
    k += (t.width - 455) / 2;
    d = createBitmap(t);
    d.regX = t.width / 2;
    d.regY = t.height / 2;
    d.x = k;
    d.y = l;
    r.addChild(d);
    h = new CFormatText(
      k - 5,
      l - 13,
      y,
      "#000",
      r,
      STROKE_COLOR,
      50,
      "center",
      PRIMARY_FONT,
      t.height - 40,
      t.width - 120
    );
    h.playText();
  };
  this.unload = function () {
    b.removeChild(d);
    h.unload();
  };
  this.flip = function () {
    d.scaleX = d.scaleY = -1;
    h.setPosition(a + 45, e + 5);
  };
  this._init(a, e, b, g);
}
function CAreYouSurePanel(a, e) {
  var b, g, d, h, k;
  this._init = function (r, y) {
    h = new createjs.Container();
    s_oStage.addChild(h);
    var t = s_oSpriteLibrary.getSprite("msg_box"),
      z = createBitmap(t);
    z.regX = t.width / 2;
    z.regY = t.height / 2;
    k = h.on("mousedown", function () {});
    h.addChild(z);
    h.x = CANVAS_WIDTH / 2;
    h.y = CANVAS_HEIGHT / 2;
    b = new CTLText(
      h,
      -350,
      -350,
      700,
      300,
      90,
      "center",
      PRIMARY_FONT_COLOR,
      PRIMARY_FONT,
      1.1,
      0,
      0,
      TEXT_SURE,
      !0,
      !0,
      !0,
      !1
    );
    g = new CGfxButton(150, 80, s_oSpriteLibrary.getSprite("but_check"), h);
    g.addEventListener(ON_MOUSE_UP, this._onButYes, this);
    d = new CGfxButton(-150, 80, s_oSpriteLibrary.getSprite("but_exit_big"), h);
    d.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    d.pulseAnimation();
  };
  this._onButYes = function () {
    l.unload();
    a && a();
  };
  this._onButNo = function () {
    l.unload();
    e && e();
  };
  this.changeMessage = function (r, y) {
    b.refreshText(r);
    b.setY(y);
  };
  this.setOneButton = function () {
    d.setVisible(!1);
    g.setPosition(-40, 250);
    g.pulseAnimation();
  };
  this.unload = function () {
    d.unload();
    g.unload();
    s_oStage.removeChild(h);
    h.off("mousedown", k);
    h.removeAllEventListeners();
  };
  var l = this;
  this._init(a, e);
}
var LOCALSTORAGE_SCORE = "score",
  LOCALSTORAGE_ENABLED = "enabled",
  LOCALSTORAGE_TOTALSCORE = "totalscore",
  LOCALSTORAGE_BESTSCORE = "bestscore_timeattack",
  s_aLevelScore = [],
  s_aLevelEnabled = [],
  s_iTotalScore,
  s_iBestScore,
  s_aHelpPanelEnabled = [];
function CLocalStorage(a) {
  var e = !0;
  this._init = function (b) {
    try {
      var g = window.localStorage.getItem(b);
      this.resetData();
      null !== g && void 0 !== g && this.loadData();
    } catch (d) {
      this.resetData();
    }
  };
  this.isDirty = function () {
    return 0 < s_iTotalScore ? !0 : !1;
  };
  this.isUsed = function () {
    try {
      window.localStorage.setItem("ls_available", "ok");
    } catch (b) {
      e = !1;
    }
    return e;
  };
  this.saveDataStoryMode = function () {
    var b = {};
    b[LOCALSTORAGE_SCORE] = s_aLevelScore;
    b[LOCALSTORAGE_ENABLED] = s_aLevelEnabled;
    b[LOCALSTORAGE_TOTALSCORE] = s_iTotalScore;
    window.localStorage.setItem(a, JSON.stringify(b));
  };
  this.saveDataTimeAttack = function (b) {
    var g = parseInt(window.localStorage.getItem(LOCALSTORAGE_BESTSCORE));
    b > g &&
      ((s_iBestScore = b),
      window.localStorage.setItem(LOCALSTORAGE_BESTSCORE, b));
  };
  this.loadData = function () {
    var b = JSON.parse(window.localStorage.getItem(a)),
      g = b[LOCALSTORAGE_SCORE];
    s_aLevelScore = [];
    for (var d = 1; 26 > d; d++)
      (s_aLevelScore[d] = parseInt(g[d])),
        (s_aHelpPanelEnabled[d] = 0 < s_aLevelScore[d] ? !1 : !0);
    s_iTotalScore = parseInt(b[LOCALSTORAGE_TOTALSCORE]);
    d = window.localStorage.getItem(LOCALSTORAGE_BESTSCORE);
    null === d &&
      ((d = 0), window.localStorage.setItem(LOCALSTORAGE_BESTSCORE, 0));
    s_iBestScore = parseInt(d);
    b = b[LOCALSTORAGE_ENABLED];
    s_aLevelEnabled = [];
    for (d = 1; 26 > d; d++) s_aLevelEnabled[d] = b[d];
  };
  this.resetData = function () {
    s_iBestScore = s_iTotalScore = 0;
    for (var b = 1; 26 > b; b++)
      (s_aLevelScore[b] = 0),
        (s_aLevelEnabled[b] = !1),
        (s_aHelpPanelEnabled[b] = !0);
    s_aLevelEnabled[1] = !0;
  };
  this._init(a);
}
function CGUIExpandible(a, e, b, g) {
  var d, h, k, l, r, y, t, z;
  this._init = function (u, m, p, A) {
    l = [];
    y = new createjs.Container();
    y.x = u;
    y.y = m;
    A.addChild(y);
    t = new createjs.Container();
    y.addChild(t);
    z = new createjs.Container();
    y.addChild(z);
    k = !1;
    r = new CGfxButton(0, 0, p, z);
    r.addEventListener(ON_MOUSE_UP, this._onMenu, this);
    h = d = 107;
  };
  this.unload = function () {
    r.unload();
    g.removeChild(y);
  };
  this.refreshPos = function () {
    y.x = a - s_iOffsetX;
    y.y = e + s_iOffsetY;
  };
  this.addButton = function (u) {
    u = u.getButtonImage();
    u.x = 0;
    u.y = 0;
    u.visible = 0;
    t.addChildAt(u, 0);
    l.push(u);
  };
  this._onMenu = function () {
    (k = !k) ? D._expand() : D._collapse();
  };
  this._expand = function () {
    for (var u = 0; u < l.length; u++)
      (l[u].visible = !0),
        createjs.Tween.get(l[u], { override: !0 })
          .wait((300 * u) / 2)
          .to({ y: d + u * h }, 300, createjs.Ease.cubicOut);
  };
  this._collapse = function () {
    for (var u = 0; u < l.length; u++) {
      var m = l[l.length - 1 - u];
      createjs.Tween.get(m, { override: !0 })
        .wait((300 * u) / 2)
        .to({ y: 0 }, 300, createjs.Ease.cubicOut)
        .call(
          function (p) {
            p.visible = !1;
          },
          [m]
        );
    }
  };
  var D = this;
  this._init(a, e, b, g);
}
function CButLang(a, e, b, g, d, h) {
  var k = g,
    l,
    r,
    y,
    t,
    z,
    D;
  this._init = function (u, m, p, A) {
    l = [];
    r = [];
    D = new createjs.Container();
    D.x = u;
    D.y = m;
    t = D.on("mousedown", this._onPress, this);
    y = D.on("click", this._onChangeLang, this);
    h.addChild(D);
    u = {};
    for (m = 0; m < p; m++) u["lang_" + m] = m;
    u = new createjs.SpriteSheet({
      images: [A],
      frames: { width: A.width / p, height: A.height },
      animations: u,
    });
    z = createSprite(u, "lang_" + k, 0, 0, A.width / p, A.height);
    D.addChild(z);
    D.regX = A.width / p / 2;
    D.regY = A.height / 2;
  };
  this.unload = function () {
    D.off("mousedown", t);
    D.off("click", y);
  };
  this.addEventListener = function (u, m, p) {
    l[u] = m;
    r[u] = p;
  };
  this.setPosition = function (u, m) {
    D.x = u;
    D.y = m;
  };
  this._onPress = function () {
    D.scale = 0.9;
  };
  this._onChangeLang = function () {
    D.scale = 1;
    k++;
    k === b && (k = 0);
    z.gotoAndStop("lang_" + k);
    l[ON_SELECT_LANG] && l[ON_SELECT_LANG].call(r[ON_SELECT_LANG], k);
  };
  this.getButtonImage = function () {
    return D;
  };
  this._init(a, e, b, d);
}
var DELAY_COMBO_MATCHING_SOUND = 150,
  RESET_TIMER = 1e3,
  NUM_BREAK_SOUNDS = 5,
  BREAK_VOLUME_SOUND = [0.6, 0.6, 0.6, 0.6, 1];
function CSoundMatching() {
  var a;
  this._init = function () {
    this.reset();
  };
  this.fallPieces = function () {
    soundPlaying("fall_0") || playSound("fall_0", 1, !1);
  };
  this.reset = function () {
    a = 0;
  };
  this.triggerComboSound = function () {
    playSound("break_" + a, BREAK_VOLUME_SOUND[a], !1);
    a >= NUM_BREAK_SOUNDS - 1 ? (a = NUM_BREAK_SOUNDS - 1) : a++;
  };
  this._init();
}
function extractHostname(a) {
  a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
  a = a.split(":")[0];
  return (a = a.split("?")[0]);
}
function extractRootDomain(a) {
  a = extractHostname(a);
  var e = a.split("."),
    b = e.length;
  2 < b && (a = e[b - 2] + "." + e[b - 1]);
  return a;
}
var getClosestTop = function () {
    var a = window,
      e = !1;
    try {
      for (; a.parent.document !== a.document; )
        if (a.parent.document) a = a.parent;
        else {
          e = !0;
          break;
        }
    } catch (b) {
      e = !0;
    }
    return { topFrame: a, err: e };
  },
  getBestPageUrl = function (a) {
    var e = a.topFrame,
      b = "";
    if (a.err)
      try {
        try {
          b = window.top.location.href;
        } catch (d) {
          var g = window.location.ancestorOrigins;
          b = g[g.length - 1];
        }
      } catch (d) {
        b = e.document.referrer;
      }
    else b = e.location.href;
    return b;
  },
  TOPFRAMEOBJ = getClosestTop(),
  PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
  return true;
}
