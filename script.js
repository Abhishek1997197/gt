document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("startBtn").addEventListener("click", function () {
        const url = document.getElementById("urlInput").value;
        if (!url) return;

        let openedTabs = [];

        for (let i = 0; i < 4; i++) {
            const newTab = window.open(url, "_blank");
            if (newTab) {
                openedTabs.push(newTab);
                setTimeout(() => newTab.postMessage("automateClicks", "*"), 5000);
            }
        }
    });
});

window.addEventListener("message", function (event) {
    if (event.data === "automateClicks") {
        automateClicks(document);
    }
});

function automateClicks(doc) {
    try {
        const keywords = ["Login", "login", "Sign in", "Sign up"];
        
        for (const word of keywords) {
            const elements = Array.from(doc.querySelectorAll("a, button, input[type=submit]"));
            const target = elements.find(el => el.textContent.includes(word));
            if (target) {
                target.click();
                setTimeout(() => clickLogo(doc), 3000);
                return;
            }
        }
    } catch (error) {
        console.error("Cross-origin restriction prevents access.");
    }
}

function clickLogo(doc) {
    const possibleLogos = ["img", "a", "div"];
    for (const tag of possibleLogos) {
        const elements = Array.from(doc.querySelectorAll(tag));
        const logo = elements.find(el => el.src?.includes("favicon") || el.className.includes("logo"));
        if (logo) {
            logo.click();
            return;
        }
    }
}