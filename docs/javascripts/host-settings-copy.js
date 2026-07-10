(function () {
  const selector = ".host-settings-table td:first-child";
  const copyLabel = "Copy to Clipboard";
  const copiedLabel = "Copied";
  const timers = new WeakMap();

  function convarText(element) {
    const code = element.querySelector("code");

    return code ? (code.textContent || "").trim() : "";
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    let copied = false;

    try {
      copied = document.execCommand("copy");
    } finally {
      textarea.remove();
    }

    return copied
      ? Promise.resolve()
      : Promise.reject(new Error("Copy command failed"));
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }

    return fallbackCopy(text);
  }

  function updateLabel(element, label) {
    const text = convarText(element);
    element.setAttribute("title", label);
    element.setAttribute("aria-label", label + ": " + text);
  }

  function showCopied(element) {
    const existingTimer = timers.get(element);

    if (existingTimer) {
      window.clearTimeout(existingTimer);
    }

    element.dataset.copied = "true";
    updateLabel(element, copiedLabel);

    timers.set(
      element,
      window.setTimeout(function () {
        delete element.dataset.copied;
        updateLabel(element, copyLabel);
        timers.delete(element);
      }, 1400)
    );
  }

  function showCopyFailed(element) {
    updateLabel(element, "Copy failed");

    window.setTimeout(function () {
      updateLabel(element, copyLabel);
    }, 1400);
  }

  function copyConVar(element) {
    const text = convarText(element);

    if (!text) {
      return;
    }

    copyText(text)
      .then(function () {
        showCopied(element);
      })
      .catch(function () {
        showCopyFailed(element);
      });
  }

  function enhance(root) {
    root.querySelectorAll(selector).forEach(function (element) {
      if (element.dataset.hostConvarCopyReady === "true") {
        return;
      }

      if (!convarText(element)) {
        return;
      }

      element.dataset.hostConvarCopyReady = "true";
      element.classList.add("host-convar-copy-target");
      element.setAttribute("role", "button");
      element.setAttribute("tabindex", "0");
      updateLabel(element, copyLabel);

      element.addEventListener("click", function (event) {
        event.preventDefault();
        copyConVar(element);
      });

      element.addEventListener("keydown", function (event) {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();
        copyConVar(element);
      });
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      enhance(document);
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      enhance(document);
    });
  } else {
    enhance(document);
  }
})();
