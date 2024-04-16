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
    });

    closeModalBtn.addEventListener('click', function () {
        console.log('asd');
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

                shadowRoot.querySelectorAll('.beverage select, .beverage input, .beverage textarea').forEach(element => {
                    element.addEventListener('input', () => {
                        handleChangeSelect(element);
                    });
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
    ;
})();

function handleRemove(button) {
    const fieldset = button.closest('.beverage');
    fieldset.remove();
}

function handleChangeSelect(select) {
    const fieldset = select.closest('.beverage');
    const jsonData = {
        beverage: select.value,
        milk: fieldset.querySelector('input[name="milk"]:checked').value,
        options: Array.from(fieldset.querySelectorAll('input[name="options"]:checked')).map(option => option.value),
        additional: textValue(fieldset.querySelector('#user-input').textContent)
    };
    console.log(jsonData);
}

function textValue(s) {
    const keywords = ['срочно', 'быстрее', 'побыстрее', 'скорее', 'поскорее', 'очень нужно'];
    return s.replace(new RegExp(keywords.join("|"), "g"), match => `<b>${match}</b>`);
}