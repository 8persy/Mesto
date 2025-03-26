const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');


// Функция создания карточки
function createCard(title, link, alt_info) {
    let cardElement = cardTemplate.cloneNode(true)
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = alt_info;

    return cardElement
}


// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
for (let i=0; i<initialCards.length; i++) {
    let element = createCard(initialCards[i].name, initialCards[i].link, initialCards[i].name)
    placesList.append(element)
}
