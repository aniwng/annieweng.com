(function () {
  var root = document.documentElement;
  var themeSwitch = document.getElementById('themeSwitch');
  var knob = document.getElementById('knob');
  var sunIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5.2"></circle><g stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="1.5" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22.5"></line><line x1="1.5" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22.5" y2="12"></line><line x1="4.6" y1="4.6" x2="6.3" y2="6.3"></line><line x1="17.7" y1="17.7" x2="19.4" y2="19.4"></line><line x1="4.6" y1="19.4" x2="6.3" y2="17.7"></line><line x1="17.7" y1="6.3" x2="19.4" y2="4.6"></line></g></svg>';
  var moonIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.8A8.5 8.5 0 1 1 9.2 4a6.7 6.7 0 0 0 10.8 10.8z"></path></svg>';
  var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme() {
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeSwitch.classList.toggle('on', dark);
    themeSwitch.setAttribute('aria-checked', String(dark));
    knob.innerHTML = dark ? moonIcon : sunIcon;
  }
  applyTheme();

  themeSwitch.addEventListener('click', function () {
    dark = !dark;
    applyTheme();
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var sparkleLayer = document.getElementById('sparkleLayer');
  var starPath = 'M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z';
  var colors = ['ink', 'accent', 'rust', 'mustard'];

  document.addEventListener('click', function (e) {
    var count = 6;
    for (var i = 0; i < count; i++) {
      var particle = document.createElement('span');
      particle.className = 'particle';
      var angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      var distance = 40 + Math.random() * 40;
      particle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      var colorVar = colors[i % colors.length];
      if (colorVar !== 'ink') {
        particle.style.color = 'var(--' + (colorVar === 'rust' ? 'accent-2' : colorVar) + ')';
      }
      particle.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="' + starPath + '"></path></svg>';
      sparkleLayer.appendChild(particle);
      particle.addEventListener('animationend', function () {
        this.remove();
      });
    }
  });
})();
