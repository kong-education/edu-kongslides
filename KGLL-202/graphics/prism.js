/* PrismJS 1.24.1
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+bash+git+graphql+http+json+json5+shell-session+yaml&plugins=line-highlight+line-numbers+command-line+normalize-whitespace */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function t(e, r) {
            var a, n;
            switch (((r = r || {}), M.util.type(e))) {
              case "Object":
                if (((n = M.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className); ) e = e.parentElement;
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none";
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = "no-" + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e)
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            var s = r[t];
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l],
                  s = M.util.type(o);
                "Object" !== s || a[i(o)]
                  ? "Array" !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
                  : ((a[i(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            M.hooks.run("before-all-elements-highlight", r);
          for (var a, i = 0; (a = r.elements[i++]); )
            M.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r];
          e.className =
            e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
          var i = e.parentElement;
          i &&
            "pre" === i.nodeName.toLowerCase() &&
            (i.className =
              i.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" +
              r);
          var l = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (l.highlightedCode = e),
              M.hooks.run("before-insert", l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run("after-highlight", l),
              M.hooks.run("complete", l),
              t && t.call(l.element);
          }
          if (
            (M.hooks.run("before-sanity-check", l),
            (i = l.element.parentElement) &&
              "pre" === i.nodeName.toLowerCase() &&
              !i.hasAttribute("tabindex") &&
              i.setAttribute("tabindex", "0"),
            !l.code)
          )
            return M.hooks.run("complete", l), void (t && t.call(l.element));
          if ((M.hooks.run("before-highlight", l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: l.language,
                    code: l.code,
                    immediateClose: !0,
                  })
                );
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            M.hooks.run("before-tokenize", r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run("after-tokenize", r),
            W.stringify(M.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + "," + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, p + "g");
                    }
                    for (
                      var v = c.pattern || c, m = a.next, y = i;
                      m !== t.tail && !(l && y >= l.reach);
                      y += m.value.length, m = m.next
                    ) {
                      var b = m.value;
                      if (t.length > n.length) return;
                      if (!(b instanceof W)) {
                        var k,
                          x = 1;
                        if (h) {
                          if (!(k = z(v, y, n, f))) break;
                          var w = k.index,
                            A = k.index + k[0].length,
                            P = y;
                          for (P += m.value.length; P <= w; )
                            (m = m.next), (P += m.value.length);
                          if (
                            ((P -= m.value.length),
                            (y = P),
                            m.value instanceof W)
                          )
                            continue;
                          for (
                            var E = m;
                            E !== t.tail &&
                            (P < A || "string" == typeof E.value);
                            E = E.next
                          )
                            x++, (P += E.value.length);
                          x--, (b = n.slice(y, P)), (k.index -= y);
                        } else if (!(k = z(v, 0, b, f))) continue;
                        var w = k.index,
                          S = k[0],
                          O = b.slice(0, w),
                          L = b.slice(w + S.length),
                          N = y + b.length;
                        l && N > l.reach && (l.reach = N);
                        var j = m.prev;
                        O && ((j = I(t, j, O)), (y += O.length)), q(t, j, x);
                        var C = new W(o, g ? M.tokenize(S, g) : S, d, S);
                        if (((m = I(t, j, C)), L && I(t, m, L), 1 < x)) {
                          var _ = { cause: o + "," + u, reach: N };
                          e(n, t, r, m.prev, y, _),
                            l && _.reach > l.reach && (l.reach = _.reach);
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length);
    }
    function z(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function i() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function I(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          i = e.alias;
        i &&
          (Array.isArray(i)
            ? Array.prototype.push.apply(a.classes, i)
            : a.classes.push(i)),
          M.hooks.run("wrap", a);
        var l = "";
        for (var o in a.attributes)
          l +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          l +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        M
      );
    var t = M.util.currentScript();
    function r() {
      M.manual || M.highlightAll();
    }
    if (
      (t &&
        ((M.filename = t.src),
        t.hasAttribute("data-manual") && (M.manual = !0)),
      !M.manual)
    ) {
      var a = document.readyState;
      "loading" === a || ("interactive" === a && t && t.defer)
        ? document.addEventListener("DOMContentLoaded", r)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(r)
        : window.setTimeout(r, 16);
    }
    return M;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: /<!\[CDATA\[[\s\S]*?\]\]>/i,
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
    /&#x?[\da-f]{1,8};/i,
  ],
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var n = {};
      (n[a] = {
        pattern: RegExp(
          "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore("markup", "cdata", n);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (a, e) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          "(^|[\"'\\s])(?:" +
            a +
            ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, "language-" + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e =
    /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern:
            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0,
        },
      },
    },
    url: {
      pattern: RegExp(
        "\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
        "i"
      ),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp("^" + e.source + "$"), alias: "url" },
      },
    },
    selector: {
      pattern: RegExp(
        "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
          e.source +
          ")*(?=\\s*\\{)"
      ),
      lookbehind: !0,
    },
    string: { pattern: e, greedy: !0 },
    property: {
      pattern:
        /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0,
    },
    important: /!important\b/i,
    function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function:
    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number:
    /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  operator:
    /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: Prism.languages.regex,
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/,
      },
    },
    "function-variable": {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern:
            /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined("script", "javascript"),
    Prism.languages.markup.tag.addAttribute(
      "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
      "javascript"
    )),
  (Prism.languages.js = Prism.languages.javascript);
!(function (e) {
  var t =
      "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
    n = {
      pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
      lookbehind: !0,
      alias: "punctuation",
      inside: null,
    },
    a = {
      bash: n,
      environment: { pattern: RegExp("\\$" + t), alias: "constant" },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: !0,
          inside: {
            variable: [
              { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
              /^\$\(\(/,
            ],
            number:
              /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator:
              /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
            punctuation: /\(\(?|\)\)?|,|;/,
          },
        },
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: !0,
          inside: { variable: /^\$\(|^`|\)$|`$/ },
        },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: !0,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp("(\\{)" + t),
              lookbehind: !0,
              alias: "constant",
            },
          },
        },
        /\$(?:\w+|[#?*!@$])/,
      ],
      entity:
        /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
    };
  (e.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: "important" },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    "function-name": [
      {
        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: "function",
      },
      { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: "function" },
    ],
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: !0,
    },
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        environment: {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
          lookbehind: !0,
          alias: "constant",
        },
      },
      alias: "variable",
      lookbehind: !0,
    },
    string: [
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: a,
      },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
        inside: { bash: n },
      },
      {
        pattern:
          /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
        lookbehind: !0,
        greedy: !0,
        inside: a,
      },
      { pattern: /(^|[^$\\])'[^']*'/, lookbehind: !0, greedy: !0 },
      {
        pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
        greedy: !0,
        inside: { entity: a.entity },
      },
    ],
    environment: { pattern: RegExp("\\$?" + t), alias: "constant" },
    variable: a.variable,
    function: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    builtin: {
      pattern:
        /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: !0,
      alias: "class-name",
    },
    boolean: {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    "file-descriptor": { pattern: /\B&\d\b/, alias: "important" },
    operator: {
      pattern:
        /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } },
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
  }),
    (n.inside = e.languages.bash);
  for (
    var s = [
        "comment",
        "function-name",
        "for-or-select",
        "assign-left",
        "string",
        "environment",
        "function",
        "keyword",
        "builtin",
        "boolean",
        "file-descriptor",
        "operator",
        "punctuation",
        "number",
      ],
      i = a.variable[1].inside,
      o = 0;
    o < s.length;
    o++
  )
    i[s[o]] = e.languages.bash[s[o]];
  e.languages.shell = e.languages.bash;
})(Prism);
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-Ã¢â‚¬â€œ].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
  command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
  coord: /^@@.*@@$/m,
  "commit-sha1": /^commit \w{40}$/m,
};
(Prism.languages.graphql = {
  comment: /#.*/,
  description: {
    pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
    greedy: !0,
    alias: "string",
    inside: {
      "language-markdown": {
        pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
        lookbehind: !0,
        inside: Prism.languages.markdown,
      },
    },
  },
  string: {
    pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
    greedy: !0,
  },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  boolean: /\b(?:true|false)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
  "attr-name": {
    pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: !0,
  },
  "atom-input": { pattern: /[A-Z]\w*Input(?=!?.*$)/m, alias: "class-name" },
  scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
  constant: /\b[A-Z][A-Z_\d]*\b/,
  "class-name": {
    pattern:
      /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
    lookbehind: !0,
  },
  fragment: {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: "function",
  },
  "definition-mutation": {
    pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: "function",
  },
  "definition-query": {
    pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: "function",
  },
  keyword:
    /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
  operator: /[!=|&]|\.{3}/,
  "property-query": /\w+(?=\s*\()/,
  object: /\w+(?=\s*\{)/,
  punctuation: /[!(){}\[\]:=,]/,
  property: /\w+/,
}),
  Prism.hooks.add("after-tokenize", function (n) {
    if ("graphql" === n.language)
      for (
        var o = n.tokens.filter(function (n) {
            return (
              "string" != typeof n &&
              "comment" !== n.type &&
              "scalar" !== n.type
            );
          }),
          s = 0;
        s < o.length;

      ) {
        var t = o[s++];
        if ("keyword" === t.type && "mutation" === t.content) {
          var e = [];
          if (
            c(["definition-mutation", "punctuation"]) &&
            "(" === l(1).content
          ) {
            s += 2;
            var a = f(/^\($/, /^\)$/);
            if (-1 === a) continue;
            for (; s < a; s++) {
              var r = l(0);
              "variable" === r.type &&
                (m(r, "variable-input"), e.push(r.content));
            }
            s = a + 1;
          }
          if (
            c(["punctuation", "property-query"]) &&
            "{" === l(0).content &&
            (s++, m(l(0), "property-mutation"), 0 < e.length)
          ) {
            var i = f(/^\{$/, /^\}$/);
            if (-1 === i) continue;
            for (var u = s; u < i; u++) {
              var p = o[u];
              "variable" === p.type &&
                0 <= e.indexOf(p.content) &&
                m(p, "variable-input");
            }
          }
        }
      }
    function l(n) {
      return o[s + n];
    }
    function c(n, t) {
      t = t || 0;
      for (var e = 0; e < n.length; e++) {
        var a = l(e + t);
        if (!a || a.type !== n[e]) return !1;
      }
      return !0;
    }
    function f(n, t) {
      for (var e = 1, a = s; a < o.length; a++) {
        var r = o[a],
          i = r.content;
        if ("punctuation" === r.type && "string" == typeof i)
          if (n.test(i)) e++;
          else if (t.test(i) && 0 === --e) return a;
      }
      return -1;
    }
    function m(n, t) {
      var e = n.alias;
      e ? Array.isArray(e) || (n.alias = e = [e]) : (n.alias = e = []),
        e.push(t);
    }
  });
!(function (t) {
  t.languages.http = {
    "request-line": {
      pattern:
        /^(?:GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\s(?:https?:\/\/|\/)\S*\sHTTP\/[0-9.]+/m,
      inside: {
        method: { pattern: /^[A-Z]+\b/, alias: "property" },
        "request-target": {
          pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
          lookbehind: !0,
          alias: "url",
          inside: t.languages.uri,
        },
        "http-version": {
          pattern: /^(\s)HTTP\/[0-9.]+/,
          lookbehind: !0,
          alias: "property",
        },
      },
    },
    "response-status": {
      pattern: /^HTTP\/[0-9.]+ \d+ .+/m,
      inside: {
        "http-version": { pattern: /^HTTP\/[0-9.]+/, alias: "property" },
        "status-code": {
          pattern: /^(\s)\d+(?=\s)/,
          lookbehind: !0,
          alias: "number",
        },
        "reason-phrase": {
          pattern: /^(\s).+/,
          lookbehind: !0,
          alias: "string",
        },
      },
    },
    "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
  };
  var a,
    e,
    s,
    n = t.languages,
    r = {
      "application/javascript": n.javascript,
      "application/json": n.json || n.javascript,
      "application/xml": n.xml,
      "text/xml": n.xml,
      "text/html": n.html,
      "text/css": n.css,
    },
    i = { "application/json": !0, "application/xml": !0 };
  for (var p in r)
    if (r[p]) {
      a = a || {};
      var o = i[p]
        ? (void 0,
          (s = (e = p).replace(/^[a-z]+\//, "")),
          "(?:" + e + "|\\w+/(?:[\\w.-]+\\+)+" + s + "(?![+\\w.-]))")
        : p;
      a[p.replace(/\//g, "-")] = {
        pattern: RegExp(
          "(content-type:\\s*" +
            o +
            "(?:(?:\\r\\n?|\\n).+)*)(?:\\r?\\n|\\r){2}[\\s\\S]*",
          "i"
        ),
        lookbehind: !0,
        inside: r[p],
      };
    }
  a && t.languages.insertBefore("http", "header-name", a);
})(Prism);
(Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0,
  },
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword" },
}),
  (Prism.languages.webmanifest = Prism.languages.json);
!(function (n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
  n.languages.json5 = n.languages.extend("json", {
    property: [
      { pattern: RegExp(e.source + "(?=\\s*:)"), greedy: !0 },
      {
        pattern:
          /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
        alias: "unquoted",
      },
    ],
    string: { pattern: e, greedy: !0 },
    number:
      /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
  });
})(Prism);
!(function (s) {
  var n = [
    '"(?:\\\\[^]|\\$\\([^)]+\\)|\\$(?!\\()|`[^`]+`|[^"\\\\`$])*"',
    "'[^']*'",
    "\\$'(?:[^'\\\\]|\\\\[^])*'",
    "<<-?\\s*([\"']?)(\\w+)\\1\\s[^]*?[\r\n]\\2",
  ].join("|");
  (s.languages["shell-session"] = {
    command: {
      pattern: RegExp(
        '^(?:[^\\s@:$#*!/\\\\]+@[^\r\n@:$#*!/\\\\]+(?::[^\0-\\x1F$#*?"<>:;|]+)?|[^\0-\\x1F$#*?"<>@:;|]+)?[$#]' +
          "(?:[^\\\\\r\n'\"<$]|\\\\(?:[^\r]|\r\n?)|\\$(?!')|<<str>>)+".replace(
            /<<str>>/g,
            function () {
              return n;
            }
          ),
        "m"
      ),
      greedy: !0,
      inside: {
        info: {
          pattern: /^[^#$]+/,
          alias: "punctuation",
          inside: {
            user: /^[^\s@:$#*!/\\]+@[^\r\n@:$#*!/\\]+/,
            punctuation: /:/,
            path: /[\s\S]+/,
          },
        },
        bash: {
          pattern: /(^[$#]\s*)\S[\s\S]*/,
          lookbehind: !0,
          alias: "language-bash",
          inside: s.languages.bash,
        },
        "shell-symbol": { pattern: /^[$#]/, alias: "important" },
      },
    },
    output: /.(?:.*(?:[\r\n]|.$))*/,
  }),
    (s.languages["sh-session"] = s.languages.shellsession =
      s.languages["shell-session"]);
})(Prism);
!(function (e) {
  var n = /[*&][^\s[\]{},]+/,
    r =
      /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
    t =
      "(?:" +
      r.source +
      "(?:[ \t]+" +
      n.source +
      ")?|" +
      n.source +
      "(?:[ \t]+" +
      r.source +
      ")?)",
    a =
      "(?:[^\\s\\x00-\\x08\\x0e-\\x1f!\"#%&'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*".replace(
        /<PLAIN>/g,
        function () {
          return "[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]";
        }
      ),
    d = "\"(?:[^\"\\\\\r\n]|\\\\.)*\"|'(?:[^'\\\\\r\n]|\\\\.)*'";
  function o(e, n) {
    n = (n || "").replace(/m/g, "") + "m";
    var r =
      "([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\\]|\\}|(?:[\r\n]\\s*)?#))"
        .replace(/<<prop>>/g, function () {
          return t;
        })
        .replace(/<<value>>/g, function () {
          return e;
        });
    return RegExp(r, n);
  }
  (e.languages.yaml = {
    scalar: {
      pattern: RegExp(
        "([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)".replace(
          /<<prop>>/g,
          function () {
            return t;
          }
        )
      ),
      lookbehind: !0,
      alias: "string",
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(
        "((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)"
          .replace(/<<prop>>/g, function () {
            return t;
          })
          .replace(/<<key>>/g, function () {
            return "(?:" + a + "|" + d + ")";
          })
      ),
      lookbehind: !0,
      greedy: !0,
      alias: "atrule",
    },
    directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important" },
    datetime: {
      pattern: o(
        "\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"
      ),
      lookbehind: !0,
      alias: "number",
    },
    boolean: {
      pattern: o("true|false", "i"),
      lookbehind: !0,
      alias: "important",
    },
    null: { pattern: o("null|~", "i"), lookbehind: !0, alias: "important" },
    string: { pattern: o(d), lookbehind: !0, greedy: !0 },
    number: {
      pattern: o(
        "[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)",
        "i"
      ),
      lookbehind: !0,
    },
    tag: r,
    important: n,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
  }),
    (e.languages.yml = e.languages.yaml);
})(Prism);
!(function () {
  if (
    "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    document.querySelector
  ) {
    var t,
      o = "line-numbers",
      s = "linkable-line-numbers",
      a = function () {
        if (void 0 === t) {
          var e = document.createElement("div");
          (e.style.fontSize = "13px"),
            (e.style.lineHeight = "1.5"),
            (e.style.padding = "0"),
            (e.style.border = "0"),
            (e.innerHTML = "&nbsp;<br />&nbsp;"),
            document.body.appendChild(e),
            (t = 38 === e.offsetHeight),
            document.body.removeChild(e);
        }
        return t;
      },
      l = !0,
      u = 0;
    Prism.hooks.add("before-sanity-check", function (e) {
      var t = e.element.parentElement;
      if (c(t)) {
        var n = 0;
        v(".line-highlight", t).forEach(function (e) {
          (n += e.textContent.length), e.parentNode.removeChild(e);
        }),
          n &&
            /^(?: \n)+$/.test(e.code.slice(-n)) &&
            (e.code = e.code.slice(0, -n));
      }
    }),
      Prism.hooks.add("complete", function e(t) {
        var n = t.element.parentElement;
        if (c(n)) {
          clearTimeout(u);
          var i = Prism.plugins.lineNumbers,
            r = t.plugins && t.plugins.lineNumbers;
          if (b(n, o) && i && !r) Prism.hooks.add("line-numbers", e);
          else d(n)(), (u = setTimeout(f, 1));
        }
      }),
      window.addEventListener("hashchange", f),
      window.addEventListener("resize", function () {
        v("pre")
          .filter(c)
          .map(function (e) {
            return d(e);
          })
          .forEach(y);
      });
  }
  function v(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function b(e, t) {
    return e.classList.contains(t);
  }
  function y(e) {
    e();
  }
  function c(e) {
    return (
      !(!e || !/pre/i.test(e.nodeName)) &&
      (!!e.hasAttribute("data-line") || !(!e.id || !Prism.util.isActive(e, s)))
    );
  }
  function d(u, e, c) {
    var t = (e = "string" == typeof e ? e : u.getAttribute("data-line") || "")
        .replace(/\s+/g, "")
        .split(",")
        .filter(Boolean),
      d = +u.getAttribute("data-line-offset") || 0,
      f = (a() ? parseInt : parseFloat)(getComputedStyle(u).lineHeight),
      p = Prism.util.isActive(u, o),
      n = u.querySelector("code"),
      h = p ? u : n || u,
      m = [],
      g =
        n && h != n
          ? (function (e, t) {
              var n = getComputedStyle(e),
                i = getComputedStyle(t);
              function r(e) {
                return +e.substr(0, e.length - 2);
              }
              return (
                t.offsetTop +
                r(i.borderTopWidth) +
                r(i.paddingTop) -
                r(n.paddingTop)
              );
            })(u, n)
          : 0;
    t.forEach(function (e) {
      var t = e.split("-"),
        n = +t[0],
        i = +t[1] || n,
        r =
          u.querySelector('.line-highlight[data-range="' + e + '"]') ||
          document.createElement("div");
      if (
        (m.push(function () {
          r.setAttribute("aria-hidden", "true"),
            r.setAttribute("data-range", e),
            (r.className = (c || "") + " line-highlight");
        }),
        p && Prism.plugins.lineNumbers)
      ) {
        var o = Prism.plugins.lineNumbers.getLine(u, n),
          s = Prism.plugins.lineNumbers.getLine(u, i);
        if (o) {
          var a = o.offsetTop + g + "px";
          m.push(function () {
            r.style.top = a;
          });
        }
        if (s) {
          var l = s.offsetTop - o.offsetTop + s.offsetHeight + "px";
          m.push(function () {
            r.style.height = l;
          });
        }
      } else
        m.push(function () {
          r.setAttribute("data-start", String(n)),
            n < i && r.setAttribute("data-end", String(i)),
            (r.style.top = (n - d - 1) * f + g + "px"),
            (r.textContent = new Array(i - n + 2).join(" \n"));
        });
      m.push(function () {
        h.appendChild(r);
      });
    });
    var i = u.id;
    if (p && Prism.util.isActive(u, s) && i) {
      b(u, s) ||
        m.push(function () {
          u.classList.add(s);
        });
      var r = parseInt(u.getAttribute("data-start") || "1");
      v(".line-numbers-rows > span", u).forEach(function (e, t) {
        var n = t + r;
        e.onclick = function () {
          var e = i + "." + n;
          (l = !1),
            (location.hash = e),
            setTimeout(function () {
              l = !0;
            }, 1);
        };
      });
    }
    return function () {
      m.forEach(y);
    };
  }
  function f() {
    var e = location.hash.slice(1);
    v(".temporary.line-highlight").forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    var t = (e.match(/\.([\d,-]+)$/) || [, ""])[1];
    if (t && !document.getElementById(e)) {
      var n = e.slice(0, e.lastIndexOf(".")),
        i = document.getElementById(n);
      if (i)
        i.hasAttribute("data-line") || i.setAttribute("data-line", ""),
          d(i, t, "temporary ")(),
          l &&
            document
              .querySelector(".temporary.line-highlight")
              .scrollIntoView();
    }
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var o = "line-numbers",
      a = /\n(?!$)/g,
      e = (Prism.plugins.lineNumbers = {
        getLine: function (e, n) {
          if ("PRE" === e.tagName && e.classList.contains(o)) {
            var t = e.querySelector(".line-numbers-rows");
            if (t) {
              var i = parseInt(e.getAttribute("data-start"), 10) || 1,
                r = i + (t.children.length - 1);
              n < i && (n = i), r < n && (n = r);
              var s = n - i;
              return t.children[s];
            }
          }
        },
        resize: function (e) {
          u([e]);
        },
        assumeViewportIndependence: !0,
      }),
      n = void 0;
    window.addEventListener("resize", function () {
      (e.assumeViewportIndependence && n === window.innerWidth) ||
        ((n = window.innerWidth),
        u(Array.prototype.slice.call(document.querySelectorAll("pre." + o))));
    }),
      Prism.hooks.add("complete", function (e) {
        if (e.code) {
          var n = e.element,
            t = n.parentNode;
          if (
            t &&
            /pre/i.test(t.nodeName) &&
            !n.querySelector(".line-numbers-rows") &&
            Prism.util.isActive(n, o)
          ) {
            n.classList.remove(o), t.classList.add(o);
            var i,
              r = e.code.match(a),
              s = r ? r.length + 1 : 1,
              l = new Array(s + 1).join("<span></span>");
            (i = document.createElement("span")).setAttribute(
              "aria-hidden",
              "true"
            ),
              (i.className = "line-numbers-rows"),
              (i.innerHTML = l),
              t.hasAttribute("data-start") &&
                (t.style.counterReset =
                  "linenumber " +
                  (parseInt(t.getAttribute("data-start"), 10) - 1)),
              e.element.appendChild(i),
              u([t]),
              Prism.hooks.run("line-numbers", e);
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      });
  }
  function u(e) {
    if (
      0 !=
      (e = e.filter(function (e) {
        var n = (function (e) {
          return e
            ? window.getComputedStyle
              ? getComputedStyle(e)
              : e.currentStyle || null
            : null;
        })(e)["white-space"];
        return "pre-wrap" === n || "pre-line" === n;
      })).length
    ) {
      var n = e
        .map(function (e) {
          var n = e.querySelector("code"),
            t = e.querySelector(".line-numbers-rows");
          if (n && t) {
            var i = e.querySelector(".line-numbers-sizer"),
              r = n.textContent.split(a);
            i ||
              (((i = document.createElement("span")).className =
                "line-numbers-sizer"),
              n.appendChild(i)),
              (i.innerHTML = "0"),
              (i.style.display = "block");
            var s = i.getBoundingClientRect().height;
            return (
              (i.innerHTML = ""),
              {
                element: e,
                lines: r,
                lineHeights: [],
                oneLinerHeight: s,
                sizer: i,
              }
            );
          }
        })
        .filter(Boolean);
      n.forEach(function (e) {
        var i = e.sizer,
          n = e.lines,
          r = e.lineHeights,
          s = e.oneLinerHeight;
        (r[n.length - 1] = void 0),
          n.forEach(function (e, n) {
            if (e && 1 < e.length) {
              var t = i.appendChild(document.createElement("span"));
              (t.style.display = "block"), (t.textContent = e);
            } else r[n] = s;
          });
      }),
        n.forEach(function (e) {
          for (
            var n = e.sizer, t = e.lineHeights, i = 0, r = 0;
            r < t.length;
            r++
          )
            void 0 === t[r] &&
              (t[r] = n.children[i++].getBoundingClientRect().height);
        }),
        n.forEach(function (e) {
          var n = e.sizer,
            t = e.element.querySelector(".line-numbers-rows");
          (n.style.display = "none"),
            (n.innerHTML = ""),
            e.lineHeights.forEach(function (e, n) {
              t.children[n].style.height = e + "px";
            });
        });
    }
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var d = /(?:^|\s)command-line(?:\s|$)/,
      f = "command-line-prompt",
      m = "".startsWith
        ? function (e, t) {
            return e.startsWith(t);
          }
        : function (e, t) {
            return 0 === e.indexOf(t);
          };
    Prism.hooks.add("before-highlight", function (e) {
      var t = h(e);
      if (!t.complete && e.code) {
        var n = e.element.parentElement;
        if (
          n &&
          /pre/i.test(n.nodeName) &&
          (d.test(n.className) || d.test(e.element.className))
        ) {
          var a = e.element.querySelector("." + f);
          a && a.remove();
          var s = e.code.split("\n");
          t.numberOfLines = s.length;
          var o = (t.outputLines = []),
            r = n.getAttribute("data-output"),
            i = n.getAttribute("data-filter-output");
          if (null !== r)
            r.split(",").forEach(function (e) {
              var t = e.split("-"),
                n = parseInt(t[0], 10),
                a = 2 === t.length ? parseInt(t[1], 10) : n;
              if (!isNaN(n) && !isNaN(a)) {
                n < 1 && (n = 1), a > s.length && (a = s.length), a--;
                for (var r = --n; r <= a; r++) (o[r] = s[r]), (s[r] = "");
              }
            });
          else if (i)
            for (var l = 0; l < s.length; l++)
              m(s[l], i) && ((o[l] = s[l].slice(i.length)), (s[l] = ""));
          e.code = s.join("\n");
        } else t.complete = !0;
      } else t.complete = !0;
    }),
      Prism.hooks.add("before-insert", function (e) {
        var t = h(e);
        if (!t.complete) {
          for (
            var n = e.highlightedCode.split("\n"),
              a = t.outputLines || [],
              r = 0,
              s = a.length;
            r < s;
            r++
          )
            a.hasOwnProperty(r) && (n[r] = a[r]);
          e.highlightedCode = n.join("\n");
        }
      }),
      Prism.hooks.add("complete", function (e) {
        if (
          (function (e) {
            return "command-line" in (e.vars = e.vars || {});
          })(e)
        ) {
          var t = h(e);
          if (!t.complete) {
            var n,
              a = e.element.parentElement;
            d.test(e.element.className) &&
              (e.element.className = e.element.className.replace(d, " ")),
              d.test(a.className) || (a.className += " command-line");
            var r = t.numberOfLines || 0,
              s = c("data-prompt", "");
            if ("" !== s) n = p('<span data-prompt="' + s + '"></span>', r);
            else
              n = p(
                '<span data-user="' +
                  c("data-user", "user") +
                  '" data-host="' +
                  c("data-host", "localhost") +
                  '"></span>',
                r
              );
            var o = document.createElement("span");
            (o.className = f), (o.innerHTML = n);
            for (var i = t.outputLines || [], l = 0, m = i.length; l < m; l++)
              if (i.hasOwnProperty(l)) {
                var u = o.children[l];
                u.removeAttribute("data-user"),
                  u.removeAttribute("data-host"),
                  u.removeAttribute("data-prompt");
              }
            e.element.insertBefore(o, e.element.firstChild), (t.complete = !0);
          }
        }
        function c(e, t) {
          return (a.getAttribute(e) || t).replace(/"/g, "&quot");
        }
      });
  }
  function p(e, t) {
    for (var n = "", a = 0; a < t; a++) n += e;
    return n;
  }
  function h(e) {
    var t = (e.vars = e.vars || {});
    return (t["command-line"] = t["command-line"] || {});
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var i =
      Object.assign ||
      function (e, n) {
        for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
        return e;
      };
    (e.prototype = {
      setDefaults: function (e) {
        this.defaults = i(this.defaults, e);
      },
      normalize: function (e, n) {
        for (var t in (n = i(this.defaults, n))) {
          var r = t.replace(/-(\w)/g, function (e, n) {
            return n.toUpperCase();
          });
          "normalize" !== t &&
            "setDefaults" !== r &&
            n[t] &&
            this[r] &&
            (e = this[r].call(this, e, n[t]));
        }
        return e;
      },
      leftTrim: function (e) {
        return e.replace(/^\s+/, "");
      },
      rightTrim: function (e) {
        return e.replace(/\s+$/, "");
      },
      tabsToSpaces: function (e, n) {
        return (n = 0 | n || 4), e.replace(/\t/g, new Array(++n).join(" "));
      },
      spacesToTabs: function (e, n) {
        return (n = 0 | n || 4), e.replace(RegExp(" {" + n + "}", "g"), "\t");
      },
      removeTrailing: function (e) {
        return e.replace(/\s*?$/gm, "");
      },
      removeInitialLineFeed: function (e) {
        return e.replace(/^(?:\r?\n|\r)/, "");
      },
      removeIndent: function (e) {
        var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
        return n && n[0].length
          ? (n.sort(function (e, n) {
              return e.length - n.length;
            }),
            n[0].length ? e.replace(RegExp("^" + n[0], "gm"), "") : e)
          : e;
      },
      indent: function (e, n) {
        return e.replace(
          /^[^\S\n\r]*(?=\S)/gm,
          new Array(++n).join("\t") + "$&"
        );
      },
      breakLines: function (e, n) {
        n = !0 === n ? 80 : 0 | n || 80;
        for (var t = e.split("\n"), r = 0; r < t.length; ++r)
          if (!(s(t[r]) <= n)) {
            for (
              var i = t[r].split(/(\s+)/g), o = 0, a = 0;
              a < i.length;
              ++a
            ) {
              var l = s(i[a]);
              n < (o += l) && ((i[a] = "\n" + i[a]), (o = l));
            }
            t[r] = i.join("");
          }
        return t.join("\n");
      },
    }),
      "undefined" != typeof module && module.exports && (module.exports = e),
      "undefined" != typeof Prism &&
        ((Prism.plugins.NormalizeWhitespace = new e({
          "remove-trailing": !0,
          "remove-indent": !0,
          "left-trim": !0,
          "right-trim": !0,
        })),
        Prism.hooks.add("before-sanity-check", function (e) {
          var n = Prism.plugins.NormalizeWhitespace;
          if (
            (!e.settings || !1 !== e.settings["whitespace-normalization"]) &&
            Prism.util.isActive(e.element, "whitespace-normalization", !0)
          )
            if ((e.element && e.element.parentNode) || !e.code) {
              var t = e.element.parentNode;
              if (e.code && t && "pre" === t.nodeName.toLowerCase()) {
                for (
                  var r = t.childNodes, i = "", o = "", a = !1, l = 0;
                  l < r.length;
                  ++l
                ) {
                  var s = r[l];
                  s == e.element
                    ? (a = !0)
                    : "#text" === s.nodeName &&
                      (a ? (o += s.nodeValue) : (i += s.nodeValue),
                      t.removeChild(s),
                      --l);
                }
                if (e.element.children.length && Prism.plugins.KeepMarkup) {
                  var c = i + e.element.innerHTML + o;
                  (e.element.innerHTML = n.normalize(c, e.settings)),
                    (e.code = e.element.textContent);
                } else
                  (e.code = i + e.code + o),
                    (e.code = n.normalize(e.code, e.settings));
              }
            } else e.code = n.normalize(e.code, e.settings);
        }));
  }
  function e(e) {
    this.defaults = i({}, e);
  }
  function s(e) {
    for (var n = 0, t = 0; t < e.length; ++t)
      e.charCodeAt(t) == "\t".charCodeAt(0) && (n += 3);
    return e.length + n;
  }
})();
