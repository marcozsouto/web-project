var btn = document.getElementById("container-form-footer-buton");

function getInput(className) {
    input = {};
    document.querySelectorAll(`.${className}`).forEach(element => {
        input[element.getAttribute("name")] = element.value; 
    });

    return input;
}

function clearInput(input) {
    document.querySelectorAll(`.${input}`).forEach(element => {
        element.value = '';
    });
}

btn.disable = function () {
    this.disabled = true;
    this.value = 'Wait...';
}

btn.enable = function () {
    this.disabled = false;
    this.value = 'Sign Up';
}

btn.onclick = async function () {
    await signup();
}

async function signup () {
    btn.disable();
    let body = getInput("container-input");

    body.birthDate = body.birthDate ? new Date(body.birthDate).toISOString() : null;
    
    response = await apiService.post(`signup`, body);
    if (!response?.sucess) {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
        btn.enable();
        return;   
    }
    response = await apiService.post("token", {username: body.email, password: body.password});
    if (response?.sucess) {
        apiService.setToken(response.data);
        btn.enable();
        window.location = `/orders`;
    }
    btn.enable();
}