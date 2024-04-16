const beverages = document.querySelector("#beverages");

let created = 1;
let count = 1;

function newBeverageForm() {
    created += 1;
    count += 1;
    let comp = document.createElement('beverage-component');
    comp.setAttribute("beverage-number", created)
    beverages.appendChild(comp);
}

(function () {
    const openModalBtn = document.getElementById('submit');
    const modal = document.querySelector('.modal');
    const closeModalBtn = document.querySelector('.close');

    openModalBtn.addEventListener('click', function (event) {
        event.preventDefault()
        modal.style.display = 'block';
        let drinks = " напитков"
        if (Math.floor(count / 10) != 1)
        {
            if (count % 10 === 1) drinks = " напиток";
            if (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) drinks = " напитка";
        }

        let orderedDrinks = "Вы заказали " + count + drinks;
        let ordered = document.getElementById("ordered");
        ordered.innerHTML = orderedDrinks;

        let tbody = modal.querySelector("tbody");
        const ru = {"usual": "обычное", "no-fat": "обезжиренное", "soy": "соевое", "coconut": "кокосовое"};
        for (let bc of document.querySelectorAll("beverage-component")) {
            let fieldset = bc.shadowRoot.querySelector("fieldset");
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            td1.innerText = fieldset.getElementsByTagName("select")[0].selectedOptions[0].textContent;
            let td2 = document.createElement("td");
            fieldset.querySelectorAll('input[type="radio"]').forEach((x) => {
                if (x.checked) {
                    td2.innerText = ru[x.value];
                }
            });
            let td3 = document.createElement("td");
            fieldset.querySelectorAll('input[type="checkbox"]').forEach((x) => {
                if (x.checked) {
                    if (td3.innerText.length !== 0) {
                        td3.innerText += ", ";
                    }
                    td3.innerText += x.parentElement.querySelector('span').textContent;
                }
            });

            let td4 = document.createElement("td");
            td4.innerText = fieldset.querySelector("#user-input").textContent;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);
        }
    });

    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });
})();

(function () {
    customElements.define('beverage-component', class extends HTMLElement {
            constructor() {
                super();
                const template = document.getElementById('beverage-template').content;
                const shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.appendChild(template.cloneNode(true));

                const beverageCount = shadowRoot.querySelector('.beverage-count');
                beverageCount.textContent = `Напиток №${this.getAttribute('beverage-number') || ''}`;

                const removeButton = shadowRoot.querySelector('.remove-button');
                removeButton.addEventListener('click', () => {
                    if (count <= 1)
                        return;

                    count--;
                    this.remove();
                });
            }

            static
            get observedAttributes() {
                return ['beverage-number'];
            }

            attributeChangedCallback(name, oldValue, newValue) {
                if (name === 'beverage-number') {
                    const beverageCount = this.shadowRoot.querySelector('.beverage-count');
                    beverageCount.textContent = `Напиток №${newValue}`;
                }
            }
        }
    )
})();

function handleRemove(button) {
    const fieldset = button.closest('.beverage');
    fieldset.remove();
}
