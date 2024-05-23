function popupBlock() {
    const searchPopup = document.querySelector(".search-none")
    searchPopup.style.display = "block"
}

function popupNone() {
    const searchPopup = document.querySelector(".search-none")
    searchPopup.style.display = "none"
}


// cookies

document.addEventListener("DOMContentLoaded", function () {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');

    if (!getCookie('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
    }

    acceptCookies.addEventListener('click', function () {
        setCookie('cookiesAccepted', 'true', 365);
        cookieConsent.style.display = 'none';
    });

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
});
