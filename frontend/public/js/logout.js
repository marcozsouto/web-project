document.getElementById("button-logout").onclick = function () {
    apiService.clearToken();
    window.location = '/';
}

window.onload = function () {
    if(!apiService.validToken()) {
        window.location = `/`;
    }
}