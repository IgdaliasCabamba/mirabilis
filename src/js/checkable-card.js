function _get_cards_by_id(checkbox_id) {
    return document.querySelectorAll("[checkable-for=" + checkbox_id + "]")
}


function _get_checkboxes_by_id(checkbox_id) {
    return document.querySelectorAll("#" + checkbox_id)
}

function _get_checkmarks_by_id(checkbox_id) {
    return document.querySelectorAll("[checkmark-for=" + checkbox_id + "]")
}


function _click_checkbox(checkbox_id) {
    let checkboxes = _get_checkboxes_by_id(checkbox_id)
    let checkmarks = _get_checkmarks_by_id(checkbox_id)

    checkboxes.forEach((checkbox) => {
        checkbox.checked = true
    })
    checkmarks.forEach((checkmark) => {
        checkmark.setAttribute("checked", true)
    })
}


function _unclick_checkbox(checkbox_id) {
    let checkboxes = _get_checkboxes_by_id(checkbox_id)
    let checkmarks = _get_checkmarks_by_id(checkbox_id)

    checkboxes.forEach((checkbox) => {
        checkbox.checked = false
    })

    checkmarks.forEach((checkmark) => {
        checkmark.setAttribute("checked", false)
    })
}


function _select_card(checkbox_id) {
    let cards = _get_cards_by_id(checkbox_id)

    for (let card of cards) {
        card.classList.add('app-checkable-card-checked')
    }
}


function _un_select_card(checkbox_id) {
    let cards = _get_cards_by_id(checkbox_id)

    for (let card of cards) {
        card.classList.remove('app-checkable-card-checked')
    }
}

function _update_card_checkbox(element) {
    let checkbox_id = element.getAttribute("id")

    if (element.checked) {
        _select_card(checkbox_id)
    }
    else {
        _un_select_card(checkbox_id)
    }
}

function _update_checkable_card(element) {
    let checkbox_id = element.getAttribute("checkable-for")

    if (checkbox_id == undefined) {
        return
    }

    let checkbox_for_this_card = document.getElementById(checkbox_id)

    if (checkbox_for_this_card.checked) {
        _un_select_card(checkbox_id)
        _unclick_checkbox(checkbox_id)
    }
    else {
        _select_card(checkbox_id)
        _click_checkbox(checkbox_id)
    }
}


function on_checkable_card_checkbox_changed() { _update_card_checkbox(this) }

function on_checkable_card_clicked() { _update_checkable_card(this) }


function update_doom() {

    let checkboxes = document.querySelectorAll('.app-checkable-card-input');

    Array.from(checkboxes).forEach(function (element) {
        _update_card_checkbox(element)
        element.addEventListener('change', on_checkable_card_checkbox_changed);
    });

    let clickcable_cards = document.querySelectorAll('.app-checkable-card');

    Array.from(clickcable_cards).forEach(function (element) {

        let checkbox_id = element.getAttribute("checkable-for")

        if (checkbox_id != undefined) {

            let checkbox_for_this_card = document.getElementById(checkbox_id)

            if (checkbox_for_this_card.checked) {
                _select_card(checkbox_id)
                _click_checkbox(checkbox_id)
            }
            else {
                _un_select_card(checkbox_id)
                _unclick_checkbox(checkbox_id)

            }
        }

        element.addEventListener('click', on_checkable_card_clicked);
    });

}

function observe_new_checkable_in_dom() {
    let target_node = document.body
    let observe_config = { attributes: true, childList: true }

    let update_callback = function (mutations_list) {
        update_doom()
    }

    let observer = new MutationObserver(update_callback)

    observer.observe(target_node, observe_config)

    //observer.disconnect()
}

window.updateCheckableCards = () => {
    update_doom()
    observe_new_checkable_in_dom()
}

updateCheckableCards()