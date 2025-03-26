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
// consts for cards
const placesList = document.querySelector('.places__list');
const cardPopup = document.querySelector('.popup_type_new-card');

// consts for image
const imagePopup = document.querySelector('.popup_type_image');

// consts for profile
const profileOpenButton = document.querySelector('.profile__edit-button');
const profileSection = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profilePopup.querySelector('.popup__close');

const profileFormElement = profilePopup.querySelector('.popup__form');

const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');


// Функция открытия popup
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}


// Функция закрытия popup
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


// лисенер на кнопку редактирования профиля
profileOpenButton.addEventListener('click', function () {
    let title = profileSection.querySelector('.profile__title').textContent;
    let description = profileSection.querySelector('.profile__description').textContent;
    profilePopup.querySelector('.popup__input_type_name').value = title;
    profilePopup.querySelector('.popup__input_type_description').value = description;

    openModal(profilePopup)
});

// лисенер на кнопку закрытия редактирования профиля
profileCloseButton.addEventListener('click', function () {
    closeModal(profilePopup)
});


// function for submit profile changes
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let job = jobInput.value;
    let name = nameInput.value;

    let namePlace = profileSection.querySelector('.profile__title');
    let jobPlace = profileSection.querySelector('.profile__description');

    namePlace.textContent = name;
    jobPlace.textContent = job;

    closeModal(profilePopup)
}


// listener for submit button of profile button
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// function for card create
function createCard(title, link, alt_info) {
    let cardElement = cardTemplate.cloneNode(true)
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = alt_info;

    return cardElement
}


// @todo: Функция удаления карточки


// Вывести карточки на страницу
for (let i=0; i<initialCards.length; i++) {
    let element = createCard(initialCards[i].name, initialCards[i].link, initialCards[i].name)
    placesList.append(element)
}
