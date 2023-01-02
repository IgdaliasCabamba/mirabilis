const checkboxCardChangeEvent = new Event('wOnChange');

function emitCheckEvents(element){
    element.inputElement.dispatchEvent(checkboxCardChangeEvent);
    element.mainElement.dispatchEvent(checkboxCardChangeEvent);
};

function checkBoxCard(element) {
    element.inputElement.checked = true;
    element.mainElement.setAttribute("checked", true);
    emitCheckEvents(element);
};
function uncheckBoxCard(element) {
    element.inputElement.checked = false;
    element.mainElement.setAttribute("checked", false);
    emitCheckEvents(element);
};

function handleCheckCardState(element) {
    if (element.inputElement.checked) {
        uncheckBoxCard(element);
    }
    else {
        checkBoxCard(element);
    };
};

function listenCheckEvents(cards) {
    cards.forEach(function listening(card) {
        const element = card;
        card.inputElement.addEventListener('change', () => { handleCheckCardState(element); });
        card.mainElement.addEventListener('click', () => { handleCheckCardState(element); });
    });
};

function initCheckableCard(card) {card.inputElement.checked ? checkBoxCard(card) : uncheckBoxCard(card)};

function bindCheckableCards() {
    let cards = document.querySelectorAll('[MCheckableCard][w-type="checkbox"]');
    let checkableCards = [];

    Array.from(cards).forEach(function (element) {

        if (element.querySelector("[w-binder]") === null) {
            return;
        };
        const card = {
            mainElement: element,
            inputElement: element.querySelector("[w-binder]"),
        };

        checkableCards.push(card);
        initCheckableCard(card);
    });
    listenCheckEvents(checkableCards);
};

bindCheckableCards();