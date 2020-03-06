module.exports = {
  toggle: document.querySelector("[aria-pressed]"),

  initTheme: function() {
    this.toggle.addEventListener("click", e => {
      let pressed = e.target.getAttribute("aria-pressed") === "true";
      e.target.setAttribute("aria-pressed", String(!pressed));
      this.resetTheme(pressed);
    });
    let mediaQueryList = window.matchMedia("(prefers-dark-theme)");
    let darkThemeSelected =
      (localStorage.getItem("themeSwitch") !== null &&
        localStorage.getItem("themeSwitch") === "dark") ||
      mediaQueryList.matches;

    let colorThemeSelected = localStorage.getItem("colorSwitch");
    if (colorThemeSelected) {
      this.setColor(colorThemeSelected);
    }
    console.log(colorThemeSelected);

    this.toggle.setAttribute("aria-pressed", darkThemeSelected);

    darkThemeSelected
      ? document.body.setAttribute("data-theme", "dark")
      : document.body.removeAttribute("data-theme");
  },

  resetTheme: function(pressed) {
    if (!pressed) {
      document.documentElement.classList.add("color-in-transition");
      document.body.setAttribute("data-theme", "dark");
      window.setTimeout(function() {
        document.documentElement.classList.remove("color-in-transition");
      }, 1000);
      localStorage.setItem("themeSwitch", "dark");
    } else {
      document.documentElement.classList.add("color-in-transition");
      document.body.removeAttribute("data-theme");
      window.setTimeout(function() {
        document.documentElement.classList.remove("color-in-transition");
      }, 1000);
      localStorage.removeItem("themeSwitch");
    }
  },

  setColor: function(colorThemeSelected) {
    localStorage.setItem("colorSwitch", colorThemeSelected);
    document.documentElement.style.setProperty("--main-hue", [
      "var(--" + colorThemeSelected + ")"
    ]);
  },

  colorSwitch: function() {
    document.querySelector("#colorSwitch");

    if (colorSwitch) {
      colorSwitch.addEventListener("click", e => {
        let target = e.target.nextElementSibling;

        document.querySelector(".close").addEventListener("click", () => {
          target.setAttribute("hidden", "");
          colorSwitch.setAttribute("aria-expanded", "false");
        });

        if (target.hasAttribute("hidden")) {
          target.removeAttribute("hidden");
          e.target.setAttribute("aria-expanded", "true");
          target.addEventListener("click", e => {
            this.changeColor(e);
          });
        } else {
          target.setAttribute("hidden", "");
          e.target.setAttribute("aria-expanded", "false");
        }
      });
    }
  },

  close: function(e, target) {
    if (e.target.classList.contains("close")) {
    }
  },

  changeColor: function(e) {
    document.documentElement.classList.add("color-in-transition");
    if (e.target.classList.contains("orange-hue")) {
      colorThemeSelected = "orange-hue";
      this.setColor(colorThemeSelected);
    } else if (e.target.classList.contains("blue-hue")) {
      colorThemeSelected = "blue-hue";
      this.setColor(colorThemeSelected);
    } else if (e.target.classList.contains("pink-hue")) {
      colorThemeSelected = "pink-hue";
      this.setColor(colorThemeSelected);
    }
    window.setTimeout(function() {
      document.documentElement.classList.remove("color-in-transition");
    }, 1000);
  }
};
