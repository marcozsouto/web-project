var button = document.getElementById("container-form-footer-buton");

window.onload = function () {
    if(apiService.validToken()) {
        window.location = `/orders`;
    }
}

var info = {
    email: document.getElementById("email"),    
    password: document.getElementById("password"),
};

button.disable = function () {
    this.disabled = true;
    this.value = 'Wait...';
}

button.enable = function () {
    this.disabled = false;
    this.value = 'Login';
}

button.onclick = async function () {
    const body = {
        username: info.email.value,
        password: info.password.value,
    }
    
    button.disable();
    let response = await apiService.post("token", body);
    if (response?.sucess) {
        apiService.setToken(response.data);
        window.location = `/orders`;
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
    button.enable();
};