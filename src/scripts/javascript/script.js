const clientName = document.querySelector('#inp-name');
const product = document.querySelector('#inp-product');
const category = document.querySelector('#inp-category');
const quantity = document.querySelector('#inp-qnt')
const priceUnit = document.querySelector('#inp-price');
const status = document.querySelector('#inp-status');
const date = document.querySelector('#inp-date');
const orderNumber = document.querySelector('.order-number');
const orderList = document.querySelector('.orders-list')

let ordersID = 1;
let ordersData = [];

const btnRegister = document.querySelector('.btn-register').addEventListener('click', function (e) {
    e.preventDefault();
    if (verification()) return;
    registerObject();
    displayOrders();
    clearForm()
    console.log('Enviado');
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
        date: getDate()
    });

    ordersID++
    ruleID();
}

function verification() {
    if (!clientName.value || !product.value || !category.value || !quantity.value || !priceUnit.value) {
        console.log('preencha todos os campos')
        return true;
    }

    if (Number.isNaN(Number(priceUnit.value)) || Number.isNaN(Number(quantity.value))) {
        console.log('Não é numero!');
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
        <strong>Preço Unit:</strong> ${ordersData[i].price}
        <strong>Status</strong>: ${ordersData[i].status}
        <strong>Data:</strong> ${ordersData[i].date}
        `;
        
        list.setAttribute('class','list');
        orderList.appendChild(list);
    }

}

function createElements() {
    const paragraph = document.createElement('p');
    return paragraph;
}
