document.addEventListener("DOMContentLoaded", ReadUserInfo);
document.getElementById("login").addEventListener("click", function () {
    console.log("Clicked");
    login();
});
document.addEventListener("keyup", function (event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        login();
    }
});
document.getElementById("logbackground").addEventListener('change', function () {
    const checked = document.getElementById("logbackground").checked;
    if (checked == false) {
        localStorage.setItem('logbackground','false');
        data.Update();
        console.log("Off background");
    }
    else
    {
        localStorage.setItem('logbackground','true');
        data.Update();
        console.log("On background");
    }
});
document.getElementById("removepopup").addEventListener('change', function () {
    const checked = document.getElementById("removepopup").checked;
    if (checked == false) {
        localStorage.setItem('removepopup','false');
        console.log("Off removePopup");
    }
    else
    {
        localStorage.setItem('removepopup','true');
        console.log("On removePopup");
    }
})