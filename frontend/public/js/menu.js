var saveBtn = document.getElementById("input-button");

var tableContent = document.getElementById("table-content");

var modal = document.getElementById("modal-hover");

var editBtn = document.getElementById("input-button-edit");

var timeout;

var query = {
    name: ''
};

async function getInput(className) {
    input = {};

    let elements = document.querySelectorAll(`.${className}`);

    for (const element of elements) {
        if (element.getAttribute("type") == 'file') {
            input[element.getAttribute("name")] = await getBase64(element.files[0]);
        } else {
            input[element.getAttribute("name")] = element.value; 
        }
    }

    return input;
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve('');
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
 }

function clearInput(input) {

    const type= input.split(".")[1];

    const imageElement = document.querySelector(`.file-uploader-image[data-type=${type}]`);
    const imageInput = document.querySelector(`.file-uploader[data-type=${type}]`);

    imageInput.style.opacity = '1';
    imageInput.value = null;
    imageElement.removeAttribute("src");
    document.querySelectorAll(`.${input}`).forEach(element => {
        element.value = '';
    });
}

modal.show = function () {
    modal.classList.remove("disabled");
};

modal.hide = function () {
    modal.classList.add("disabled");
    clearInput("input-form.edit");
    editBtn.removeAttribute("data-id");
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.hide();
    }
}

editBtn.onclick = async function () {
    saveBtn.disable();
    await editCall(Number(editBtn.getAttribute("data-id")));
    saveBtn.enable();
}

editBtn.disable = function () {
    this.disabled = true;
    this.value = 'Wait...';
}

editBtn.enable = function () {
    this.disabled = false;
    this.value = 'Save';
}

function setInput(input, data) {
    document.querySelectorAll(`.${input}`).forEach(element => {
        if (element.getAttribute("type") == 'file') {
            element.value = setImage(element, data[element.getAttribute("name")]);
        } else {
            element.value = data[element.getAttribute("name")] ?? '';
        }
    });
}

function setImage(element, url) {
    if (!url) {
        return '';
    }

    url = `${config.apiUrl}images/${url}`

    const dataType = element.getAttribute('data-type');

    const imageElement = document.querySelector(`.file-uploader-image[data-type=${dataType}]`);

    imageElement.src = url;
    element.style.opacity = '0';
    return '';
}

saveBtn.disable = function () {
    this.disabled = true;
    this.value = 'Wait...';
}

saveBtn.enable = function () {
    this.disabled = false;
    this.value = 'Save';
}

saveBtn.onclick = async function () {
    saveBtn.disable();
    await create();
    saveBtn.enable();
    modal.hide();
};

async function editCall (id) {
    let body = await getInput("input-form.edit");
    let response = await apiService.put(`itens/${id}`, body, true);
    if (response?.sucess) {
        await get();
        modal.hide();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

async function get() {
    let response = await apiService.get(`itens?filter[name]=${query.name}`, true);
    if (response?.sucess) {
        clearInput("input-form.create");
        tableContent.innerHTML = '';
        setTables(response.data);
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}


function setTables(tables) {
    tables.forEach(table => {
        tableContent.innerHTML += setTable(table);
    });
}

function setTable(table) {
    return `
        <tr>
            <td>${table.name}</td>
            <td>
                <section class="button-group">
                    <button data-id="${table.id}" onclick="edit(this)" class="button edit">
                        <img src="/img/edit.svg">
                    </button>
                    <button data-id="${table.id}" onclick="destroy(this)" class="button delete">
                        <img src="/img/delete.svg">
                    </button>
                </section>
            </td>
        </tr>
    `;
}

async function edit(btn) {
    var id = Number(btn.getAttribute('data-id'));

    let response = await apiService.get(`itens/${id}`, true);
    if (response?.sucess) {
        setInput("input-form.edit", response.data);
        editBtn.setAttribute('data-id', response.data.id);
        modal.show();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

async function destroy(btn) {
    var id = Number(btn.getAttribute('data-id'));

    let response = await apiService.delete(`itens/${id}`, true);
    if (response?.sucess) {
        await get();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

async function create () {
    let body = await getInput("input-form.create");
    let response = await apiService.post(`itens`, body, true);
    if (response?.sucess) {
        await get();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

document.querySelectorAll(".file-uploader").forEach(element => {
    element.onchange = function () {
        const dataType = this.getAttribute('data-type');

        const imageElement = document.querySelector(`.file-uploader-image[data-type=${dataType}]`);
        const image = this.files[0];
    
        this.style.opacity = '0';
        imageElement.src = URL.createObjectURL(image);
    };
});

document.querySelectorAll(".file-close").forEach(element => {
    element.onclick = function () {
        const dataType = this.getAttribute('data-type');

        const imageElement = document.querySelector(`.file-uploader-image[data-type=${dataType}]`);
        const imageInput = document.querySelector(`.file-uploader[data-type=${dataType}]`);
    
        imageInput.style.opacity = '1';
        imageInput.value = null;
        imageElement.removeAttribute("src");
    };
});

document.getElementById("search").onkeyup = function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        query.name = this.value;
        get();
    }, 800);
}

get();