/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }
  
  /**
   * Utility function to update the button text and aria-label.
   */
  function updateButton({ buttonEl, isDark }) {
    const currentIcon = buttonEl.querySelector("i");
    const iconClass = isDark ? "fas fa-moon" : "fas fa-sun";
    const newIcon = document.createElement("i");
    newIcon.className = iconClass;
    newIcon.style.animationName = "move-in-left";
    
    const logoImage = document.querySelector(".logo-image");
    logoImage.src = `${isDark ? "assets/images/logo-light.png" : "assets/images/logo-dark.png" }`
  
    const handleAnimationEnd = () => {
      buttonEl.innerHTML = "";
      buttonEl.appendChild(newIcon);
      buttonEl.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
      currentIcon.removeEventListener("animationend", handleAnimationEnd);
    };
  
    if (currentIcon) {
      currentIcon.style.animationName = "move-out-right";
      currentIcon.addEventListener("animationend", handleAnimationEnd);
    } else {
      buttonEl.innerHTML = "";
      buttonEl.appendChild(newIcon);
      buttonEl.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    }
  }
  /**
  * Utility function to update the theme setting on the html tag
  */
  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
  
  
  /**
  * On page load:
  */
  
  /**
  * 1. Grab what we need from the DOM and system settings on page load
  */
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  /**
  * 2. Work out the current site settings
  */
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
  /**
  * 3. Update the theme setting and button text according to current settings
  */
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
  /**
  * 4. Add an event listener to toggle the theme
  */
  button.addEventListener("click", (event) => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 