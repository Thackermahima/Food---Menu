const JSONdata =
{
    "menu": {
        "slice of pizza": "2.00",
        "toppings": {
            "pepperoni": ".25",
            "meatballs": ".35",
            "mushrooms": ".40",
            "olives": ".20"
        },
        "sides": {
            "potato salad": "1.25",
            "hummus": "2.50",
            "caesar salad": "3.50",
            "garden salad": "2.25"
        },
        "drinks": {
            "soda": {
                "small": "1.95",
                "medium": "2.20",
                "large": "2.50"
            },
            "juice": "2.00",
            "water": "1.25"
        }
    }
}

fetch('menu.json')
    .then((response) => {
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch((err) => {
        console.log('rejected', err);
    });

const ul = document.createElement('ul');
function foodMenu() {
    let displayData = document.querySelector('.displayMenu');
    for (let i in JSONdata['menu']) {
        if (typeof (JSONdata)['menu'][i] == "object") {
            const li = document.createElement('li');
            li.innerHTML = i;
            ul.appendChild(li);
            const child = document.createElement('ul');
            for (let j in JSONdata['menu'][i]) {
                if (typeof JSONdata['menu'][i][j] == "object") {
                    const li = document.createElement('li');
                    li.innerHTML = j;
                    child.appendChild(li);
                    const grandChild = document.createElement('ul');
                    for (let k in JSONdata['menu'][i][j]) {
                        const li = document.createElement('li');
                        li.innerHTML = k;
                        grandChild.appendChild(li);
                    }
                    li.appendChild(grandChild);
                } else {
                    const li = document.createElement('li');
                    li.innerHTML = j;
                    child.appendChild(li);
                }
            }
            li.appendChild(child);
        }
        else {
            const li = document.createElement('li');
            li.innerHTML = i;
            ul.appendChild(li);
        }

    }

    displayData.appendChild(ul);
}
foodMenu();
const btn = document.createElement('button');
btn.textContent = "Your Order";
const Order = document.createElement('div');

ul.addEventListener("click", function (e) {
    btn.addEventListener("click", function () {
        function itemList() {
            let storeOrder = new Array();
            storeOrder = JSON.parse(localStorage.getItem("Items")) ? JSON.parse(localStorage.getItem("Items")) : []
            let find = storeOrder.includes(e.target.innerHTML);
            if (find) {
                storeOrder.push(e.target.innerHTML)

            } else {
                storeOrder.push(e.target.innerHTML);
                localStorage.setItem("Items", JSON.stringify(storeOrder));
            }
            Order.innerHTML = JSON.parse(localStorage.getItem("Items"));
        };
        Order.style.border = "1px dotted black";
        Order.style.display = "inline-block";
        Order.style.backgroundColor = "grey";
        Order.style.fontSize = "110%";
        Order.style.padding = "8px";
        document.body.appendChild(Order);
        itemList();
    });
});
document.body.appendChild(btn);




