var cards = document.getElementById("cards");

var buttonStatus = document.querySelectorAll(".orders-filters-button");

var query = {
    status: ''
};

async function setStatus(button) {
    var order = Number(button.getAttribute('order-id'));
    var status = button.getAttribute('change-status');
    var value = this.value;

    button.disabled = true;
    button.value = 'Wait...';

    let response = await apiService.post(`orders/${order}/${status}`, {}, true);
    if (response?.sucess) {
        await getOrders();
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }

    button.disabled = false;
    button.value = value;
}

buttonStatus.forEach((button) => {
    button.onclick = () => {
        buttonStatus.forEach(element => {
            element.classList.remove("active");
        });
        button.classList.add("active");

        query.status = button.value != 'all' ? button.value : "";

        getOrders();
    };
});

async function getOrders() {
    let response = await apiService.get(`orders?filter[status]=${query.status}`, true);
    if (response?.sucess) {
        cards.innerHTML = '';
        this.setOrders(response.data);
    } else {
        callAlert(response?.error ?? response?.errors[0] ?? 'Internal Error sorry :(');
    }
}

function setOrders(orders) {
    orders.forEach(order => {
        cards.innerHTML += this.setOrder(order);
    });
}

function setOrder(order) {
    var nextStatus = getNextStatus(order.status.toLocaleLowerCase());
    return `
        <div id="card">
            <section>
                <h3 id="card-title">#${order.id} - ${order.table.name}</h3>
                <span id="card-tag" class="${order.status.toLocaleLowerCase()}">${capitalize(order.status)}</span>
                <p id="card-time">${formatDate(order.createdAt)}</p>
            </section>
            <section>
                <h4 id="card-title-details">Details</h4>
                <ul id="card-details">
                    ${order.orderItems.map(orderItem => {
                        return `<li>${orderItem.quantity}x ${orderItem.name} | ${orderItem.description}</li>`;  
                    }).join('')}
                </ul>
            </section>
            <section>
                <button onclick="setStatus(this)" id="card-button" change-status="${nextStatus}" order-id="${order.id}" ${order.status == 'FINISHED' || order.status == 'CANCELLED' ? 'disabled' : ''}>
                    ${capitalize(nextStatus)}
                </button>
            </section>
        </div>
    `;
}

function formatDate(input) {
    date = new Date(input);

    return `${checkZero(date.getMonth())}/${checkZero(date.getDay())} - ${checkZero(date.getHours())}h${checkZero(date.getMinutes())}`;
}

function checkZero(data){
    if(data.length == 1 || data <= 9){
      data = "0" + data;
    }
    return data;
}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function getNextStatus(status) {
    let val = '';
    switch (status) {
        case 'new':
            val = 'read';
            break;
        case 'read':
            val = 'ready';
            break;
        case 'ready':
            val = 'finish';
            break;
        case 'cancelled':
            val = 'cancelled';
            break;
        case 'finished':
            val = 'finished';
            break;
    }

    return val;
}
 

getOrders();

setInterval(async function () {await getOrders()}, 60000);