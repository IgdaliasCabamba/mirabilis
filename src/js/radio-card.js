function checkRadioCard(element) {
    element.inputElement.checked = true;
    element.mainElement.setAttribute("checked", true);
};
function uncheckRadioCard(element) {
    element.inputElement.checked = false;
    element.mainElement.setAttribute("checked", false);
};

function uncheckRadioGroup(element) {
    let radio_cards = document.querySelectorAll('[MCheckableCard][w-type="radio"]');
    let radioName = element.mainElement.querySelector("[w-binder]").getAttribute("name");

    Array.from(radio_cards).forEach(function (radio_card) {
        if (radio_card.querySelector(`input[name="${radioName}"]`) == null) {
            return;
        }
        radio_card.setAttribute("checked", false);
    });
};

function handleRadioCardState(element) {
    uncheckRadioGroup(element);
    checkRadioCard(element);
};

function listenRadioEvents(cards) {
    cards.forEach(function listening(card) {
        const element = card;
        card.inputElement.addEventListener('change', () => { handleRadioCardState(element); });
        card.mainElement.addEventListener('click', () => { handleRadioCardState(element); });
    });
};

function initRadioCard(card) { card.inputElement.checked ? checkRadioCard(card) : uncheckRadioCard(card); };

function bindRadioCards() {
    let cards = document.querySelectorAll('[MCheckableCard][w-type="radio"]');
    let checkableCards = [];

    Array.from(cards).forEach(function (element) {

        if (element.querySelector("[w-binder]") === null || element.querySelector("[w-binder]") === null) {
            return;
        };
        const card = {
            mainElement: element,
            inputElement: element.querySelector("[w-binder]"),
        };

        checkableCards.push(card);
        initRadioCard(card);
    });
    listenRadioEvents(checkableCards);
};

bindRadioCards();