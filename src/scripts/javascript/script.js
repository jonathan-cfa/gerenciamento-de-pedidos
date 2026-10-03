const clientName = document.querySelector('#inp-name');
const product = document.querySelector('#inp-product');
const category = document.querySelector('#inp-category');
const quantity = document.querySelector('#inp-qnt')
const priceUnit = document.querySelector('#inp-price');
const status = document.querySelector('#inp-status');
const date = document.querySelector('#inp-date');
const orderNumber = document.querySelector('.order-number');
const orderList = document.querySelector('.orders-list')
const msg = document.querySelector('.msg');

const filter = document.querySelector('#filter');
const filterArea = document.querySelector('.filter-area')

let ordersID = 1;
let ordersData = [];


const btnRegister = document.querySelector('.btn-register').addEventListener('click', function (e) {
    e.preventDefault();
    if (verification()) return;
    registerObject();
    displayOrders();
    clearForm();
    totalOrders();
    msgStatus('msg-sucess', 'Pedido registrado com sucesso!');
});

function registerObject() {
    ordersData.push({
        id: ordersID,
        name: clientName.value,
        product: product.value,
        categ: category.value,
        quantity: quantity.value,
        price: priceUnit.value,
        status: status.value,
        total: calculationOrder(),
        date: getDate()
    });

    ordersID++
    ruleID();
}
function msgStatus(status, msgs) {
    msg.setAttribute('class', status);
    msg.innerText = msgs
    setInterval(() => {
        msg.classList.remove(status)
        msg.innerText = ''
    }, 3000)
}

function verification() {
    if (!clientName.value || !product.value || !category.value || !quantity.value || !priceUnit.value) {
        msgStatus('msg-fail', 'Preencha todos os campos!');
        return true;
    }

    if (Number.isNaN(Number(priceUnit.value)) || Number.isNaN(Number(quantity.value))) {
        msgStatus('msg-fail', 'Não é um número válido!');
        return true
    }
}

function ruleID() {
    if (ordersID >= 1000) {
        orderNumber.innerHTML = `<strong>Pedido:</strong> #${ordersID}`;
    } else if (ordersID >= 100) {
        orderNumber.innerHTML = `<strong>Pedido:</strong> #0${ordersID}`;
    } else if (ordersID >= 10) {
        orderNumber.innerHTML = `<strong>Pedido:</strong> #00${ordersID}`;
    } else {
        orderNumber.innerHTML = `<strong>Pedido:</strong> #000${ordersID}`;
    }
}

function getDate() {
    const atualDate = new Date();
    const day = atualDate.getDate();
    const month = atualDate.getMonth() + 1;
    const year = atualDate.getFullYear();

    return `${leadingZero(day)}/${leadingZero(month)}/${year}`
}

function leadingZero(p) {
    return p >= 10 ? p : `0${p}`;
}

function clearForm() {
    clientName.value = '';
    product.value = '';
    category.value = '';
    quantity.value = '';
    priceUnit.value = '';
    clientName.focus();

}

function displayOrders() {
    const list = createElements();
    for (let i = 0; i < ordersData.length; i++) {
        list.innerHTML = `
        <strong>ID:</strong> ${ordersData[i].id}
        <strong>Nome do Cliente:</strong> ${ordersData[i].name} 
        <strong>Produto:</strong> ${ordersData[i].product} 
        <strong>Categoria:</strong> ${ordersData[i].categ}
        <strong>Quantidade:</strong> ${ordersData[i].quantity}
        <strong>Preço Unit:</strong> ${Number(ordersData[i].price).toFixed(2).replace('.', ',')}
        <strong>Status</strong>: ${ordersData[i].status}
        <strong>Total do Pedido R$</strong> ${Number(ordersData[i].total).toFixed(2).replace('.', ',')}
        <strong>Data:</strong> ${ordersData[i].date}
        `;

        list.setAttribute('class', 'list');
        orderList.appendChild(list);
    }

}

function createElements() {
    const paragraph = document.createElement('p');
    return paragraph;
}

const calculationOrder = () => priceUnit.value * quantity.value

function totalOrders() {
    const tOrders = document.querySelector('.total-orders');
    let subOrders = ordersID - 1;

    tOrders.innerHTML = `
    Total de pedidos:${subOrders} <br>
    Valor total dos Pedidos R$${sumOrders()}
    `
} totalOrders();

function sumOrders() {
    let sum = 0;
    for (let i = 0; i < ordersData.length; i++) {
        sum += ordersData[i].total;
    }
    return sum;
}


filter.addEventListener('change', (e) => {
    if (filter.value === 'all') {
        orderList.style.display = 'block';
        filterArea.style.display = 'none';
    }

    if (filter.value === 'pending') {
        filterAction('Pendente');
    }

    if (filter.value === 'paid'){
        filterAction('Pago');
    }
    
    if (filter.value === 'sent'){
        filterAction('Enviado');
    }

    if (filter.value === 'canceled'){
        filterAction('Cancelado');
    }
});

function filterAction(status) {
    const filterList = createElements();
        filterArea.style.display = 'block'
        filterArea.innerHTML = ''
        orderList.style.display = 'none';

        for (let i = 0; i < ordersData.length; i++) {
            if (ordersData[i].status === status) {
                msgStatusAndFilter(filterArea,i);
            }
            filterList.setAttribute('class', 'filter-list');
            filterArea.appendChild(filterList);
        }
}

function msgStatusAndFilter(area, i) {
    area.innerHTML += `
                    <strong>ID:</strong> ${ordersData[i].id}
                    <strong>Nome do Cliente:</strong> ${ordersData[i].name} 
                    <strong>Produto:</strong> ${ordersData[i].product} 
                    <strong>Categoria:</strong> ${ordersData[i].categ}
                    <strong>Quantidade:</strong> ${ordersData[i].quantity}
                    <strong>Preço Unit:</strong> ${Number(ordersData[i].price).toFixed(2).replace('.', ',')}
                    <strong>Status</strong>: ${ordersData[i].status}
                    <strong>Total do Pedido R$</strong> ${Number(ordersData[i].total).toFixed(2).replace('.', ',')}
                    <strong>Data:</strong> ${ordersData[i].date}
                `;
}