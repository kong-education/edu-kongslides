import reveal from "reveal.js/dist/reveal.js";
import revealPluginNotes from "reveal.js/plugin/notes/notes.js";
import revealPluginZoom from "reveal.js/plugin/zoom/zoom.js";
import revealPluginMathJax from "reveal.js/plugin/math/math.js";
import RevealMermaid from "reveal.js-mermaid-plugin/plugin/mermaid/mermaid.js";
import CopyCode from "reveal.js-copycode";

import 'reveal.js-copycode/plugin/copycode/copycode.css';
import "reveal.js/dist/reveal.css";
import "prismjs/themes/prism.css";
import "./slides.css";
import "training-material/Slides/resources/custom.css";
import "./kong.css"; // must load after reveal.css and the other theme css

// custom code to disable copy-to-clipboard functionality
document.querySelectorAll('pre code.language-shell').forEach((block) => {
  const sibling = block.closest('pre')
  if (sibling) {
    sibling.dataset.cc = "false";
  }
});

// Convert ```mermaid fences (rendered as <pre><code class="language-mermaid">)
// into <div class="mermaid"> so reveal.js-mermaid-plugin can pick them up.
document.querySelectorAll('pre code.language-mermaid').forEach((block) => {
  const pre = block.closest('pre');
  if (!pre) return;
  const div = document.createElement('div');
  div.className = 'mermaid';
  div.textContent = block.textContent;
  pre.replaceWith(div);
});

// Kong brand chrome: default theme class, logo and registration marks on every slide.
// Must run before reveal.initialize. Add class="no-chrome" to a slide to skip the logo.
(function addKongChrome() {
  const W = 1920, H = 1080, m = 40;
  const c = (x, y) => `M${x - 14} ${y}H${x + 14}M${x} ${y - 14}V${y + 14}`;
  const tSide = (x, y, d) => `M${x} ${y - 14}V${y + 14}M${x} ${y}H${x + d * 24}`;
  const marks = [
    c(m, m), c(W - m, m), c(m, H - m), c(W - m, H - m),
    `M${W / 2 - 14} ${m}H${W / 2 + 14}M${W / 2} ${m}V${m + 24}`,
    `M${W / 2 - 14} ${H - m}H${W / 2 + 14}M${W / 2} ${H - m}V${H - m - 24}`,
    tSide(m, H / 2, 1), tSide(W - m, H / 2, -1),
  ].join("");
  const chrome =
    '<div class="kong-chrome" aria-hidden="true">' +
    '<svg class="kong-logo"><use href="#kong-logo"/></svg>' +
    `<svg class="kong-marks" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${marks}"/></svg>` +
    "</div>";

  document.querySelectorAll(".reveal .slides section").forEach((s) => {
    if (s.querySelector("section")) return; // vertical stack parent
    let theme = (s.className.match(/theme-(dark|electric|bay|white)/) || [])[0];
    if (!theme) {
      theme = "theme-dark";
      s.classList.add(theme);
    }
    if (!s.hasAttribute("data-state")) s.setAttribute("data-state", theme);
    if (!s.classList.contains("no-chrome")) s.insertAdjacentHTML("afterbegin", chrome);
  });
})();

reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: false,
  transition: "fade", // default/cube/page/concave/zoom/linear/fade/none
  backgroundTransition: "fade",
  slideNumber: false,
  mouseWheel: true,
  keyboard: {
    37: function leftArrow() {
      if (isRemoteMode()) Reveal.prev();
      else Reveal.left();
    },
    38: function upArrow() {
      if (isRemoteMode()) Reveal.prev();
      else Reveal.up();
    },
    39: function rightArrow() {
      if (isRemoteMode()) Reveal.next();
      else Reveal.right();
    },
    40: function downArrow() {
      if (isRemoteMode()) Reveal.next();
      else Reveal.down();
    },
    82: function rKey() {
      toggleRemoteMode();
    },
  },
  margin: 0,
  width: SLIDE_WIDTH,
  height: SLIDE_HEIGHT,
  // plugins: [revealPluginMathJax, revealPluginNotes, revealPluginZoom],
  plugins: [
    revealPluginMathJax,
    revealPluginNotes,
    revealPluginZoom,
    RevealMermaid,
    // CopyCode
  ],
  math: {
    tex2jax: { inlineMath: [["\\(", "\\)"]] },
  },
});

function hasRemoteQueryParameter() {
  return window.location.search.match(/[?&]remote[&]?/i);
}

function isRemoteMode() {
  return Reveal.isOverview() ? false : hasRemoteQueryParameter();
}

function enableRemoteMode() {
  window.location.search += window.location.search.match(/[?]/)
    ? "&remote"
    : "?remote";
}

function disableRemoteMode() {
  window.location.search = window.location.search
    .replace(/[?]remote[&]/i, "?")
    .replace(/[?]remote/i, "")
    .replace(/[&]remote[&]/i, "&")
    .replace(/[&]remote$/i, "");
}

function toggleRemoteMode() {
  if (hasRemoteQueryParameter()) disableRemoteMode();
  else enableRemoteMode();
}
