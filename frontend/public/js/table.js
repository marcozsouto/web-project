var saveBtn = document.getElementById("input-button");

var tableContent = document.getElementById("table-content");

var modal = document.getElementById("modal-hover");

var editBtn = document.getElementById("input-button-edit");

var timeout;

var query = {
    name: ''
};

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
        if (element.getAttribute("type") != 'file') {
            element.value = data[element.getAttribute("name")] ?? '';
        }
    });
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
    let body = getInput("input-form.edit");
    let response = await apiService.put(`tables/${id}`, body, true);
    if (response?.sucess) {
        await get();
        modal.hide();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

async function get() {
    let response = await apiService.get(`tables?filter[name]=${query.name}`, true);
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

    let response = await apiService.get(`tables/${id}`, true);
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

    let response = await apiService.delete(`tables/${id}`, true);
    if (response?.sucess) {
        await get();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

async function create () {
    let body = getInput("input-form.create");
    let response = await apiService.post(`tables`, body, true);
    if (response?.sucess) {
        await get();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

document.getElementById("search").onkeyup = function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        query.name = this.value;
        get();
    }, 800);
}

get();