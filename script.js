const menu = {
    "🥣🥣SOUP ITEMS🥣🥣": {
        "SoupIndo Chinese Manchow soup": 159,
        "Hot & sour soup": 169,
        "Sweetcorn soup": 189,
        "La cream de tomato": 199,
        "Clear soup": 209
    },
    "🍗STARTERS🍗": {
        "Subj Harabhara kebab": 299,
        "potato and peas tikki": 199,
        "Sunehari kebab": 319,
        "Masala popad": 259
    },
    "🍖INDIAN_NON_VEG_ITEMS🍖": {
        "Bhatti de murgh tikka": 249,
        "Murgh pahadi tikka": 199,
        "Murgh Malai tikka": 259,
        "Murghu tandoori": 259,
        "Prawns Koliwada": 299
    },
    "🥬🥬INDUAN_VEG_ITEMS🥬🥬": {
        "Diwani Hundi": 149,
        "Veg Tawa Masala": 169,
        "Paneer Makhanawala": 159,
        "Dingari Mashroom Masala": 259,
        "Dal Thadka": 199
    },
    "🍜🍜CHINESE_ITEMS🍜🍜": {
        "Kuh-chai Hakka Chilly": 159,
        "Holysmoke BBQ": 249,
        "Manchurian dry": 249,
        "Nachose Chicos": 249,
        "French fries": 229
    },
    "🍷🍷BEVERAGE_ITEMS🍷🍷": {
        "Thumsup 300ml": 70,
        "Sprite 300ml": 70,
        "Coke 300ml": 70,
        "Redbull 250ml": 125,
        "Monster 250ml": 125
    },
    "🍨🍨DESSERT_ITEMS🍨🍨": {
        "Buttur scotch Ice cream 200ml": 199,
        "Vanila Ice cream 200ml": 149,
        "Gulab Jamun": 100,
        "Double ka meeta": 100,
        "Chocolate Cake": 149
    }
};

let order = {};

document.addEventListener('DOMContentLoaded', (event) => {
    displayMenu();

    document.getElementById('viewOrder').addEventListener('click', () => {
        updateOrder();
        document.getElementById('orderSummary').style.display = 'block';
    });

    document.getElementById('payBill').addEventListener('click', () => {
        alert('Thank you for your order!');
        order = {};
        document.getElementById('orderSummary').style.display = 'none';
        document.getElementById('menu').innerHTML = '';
        displayMenu();
    });
});

function displayMenu() {
    const menuDiv = document.getElementById('menu');
    for (let category in menu) {
        let categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        let categoryTitle = document.createElement('h2');
        categoryTitle.innerText = category;
        categoryDiv.appendChild(categoryTitle);

        let itemList = document.createElement('ul');
        for (let item in menu[category]) {
            let listItem = document.createElement('li');
            listItem.innerHTML = `${item} - ₹${menu[category][item].toFixed(2)} <input type="number" min="0" placeholder="Quantity" data-item="${item}" data-price="${menu[category][item]}" />`;
            itemList.appendChild(listItem);
        }

        categoryDiv.appendChild(itemList);
        menuDiv.appendChild(categoryDiv);
    }
}

function updateOrder() {
    order = {};
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const item = input.getAttribute('data-item');
            const price = parseFloat(input.getAttribute('data-price'));
            if (!order[item]) {
                order[item] = { quantity: 0, price: price };
            }
            order[item].quantity += quantity;
        }
    });
    displayOrder();
}

function displayOrder() {
    const orderTableBody = document.getElementById('orderTable').querySelector('tbody');
    orderTableBody.innerHTML = '';
    let grandTotal = 0;

    for (let item in order) {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${item}</td><td>${order[item].quantity}</td><td>₹${order[item].price.toFixed(2)}</td><td>₹${(order[item].quantity * order[item].price).toFixed(2)}</td>`;
        orderTableBody.appendChild(row);
        grandTotal += order[item].quantity * order[item].price;
    }

    document.getElementById('grandTotal').innerText = grandTotal.toFixed(2);
}
