function checkBoxCard(element) {
    element.inputElement.checked = true
    element.mainElement.setAttribute("checked", true)
}
function uncheckBoxCard(element) {
    element.inputElement.checked = false
    element.mainElement.setAttribute("checked", false)
}

function handleCardState(element) {
    if (element.inputElement.checked) {
        uncheckBoxCard(element)
    }
    else {
        checkBoxCard(element)
    }
}

function listenEvents(cards) {
    cards.forEach(function listening(card) {
        const element = card
        card.inputElement.addEventListener('change', () => { handleCardState(element) })
        card.mainElement.addEventListener('click', () => { handleCardState(element) })
    })
}

function initCheckableCard(card) {card.inputElement.checked ? checkBoxCard(card) : uncheckBoxCard(card)}

function bindCheckableCards() {
    let cards = document.querySelectorAll('[MCheckableCard]');
    let checkableCards = []

    Array.from(cards).forEach(function (element) {

        if (element.querySelector("[w-binder]") === null) {
            return
        }
        const card = {
            mainElement: element,
            inputElement: element.querySelector("[w-binder]"),
        }

        checkableCards.push(card)
        initCheckableCard(card)
    })
    listenEvents(checkableCards)
}

bindCheckableCards()