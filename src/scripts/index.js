import {enableValidation} from '../components/validate.js';
import {openModal, closeModal, handleOverlayClick} from '../components/modal.js';
import {createCard, deleteCard, toggleLike} from '../components/card.js';

// Импорт изображений
import addIconImg from '../images/add-icon.svg';
import avatarImg from '../images/avatar.jpg';
import card1Img from '../images/card_1.jpg';
import card2Img from '../images/card_2.jpg';
import card3Img from '../images/card_3.jpg';
import closeImg from '../images/close.svg';
import deleteIconImg from '../images/delete-icon.svg';
import editIconImg from '../images/edit-icon.svg';
import likeActiveImg from '../images/like-active.svg';
import likeInactiveImg from '../images/like-inactive.svg';
import logoImg from '../images/logo.svg';

import '../pages/index.css';

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

// DOM узлы
const placesList = document.querySelector('.places__list');
const cardPopup = document.querySelector('.popup_type_new-card');
const cardAddButton = document.querySelector('.profile__add-button');
const cardFormElement = cardPopup.querySelector('.popup__form');
const titleInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlInput = cardPopup.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('.popup_type_image');

const profileOpenButton = document.querySelector('.profile__edit-button');
const profileSection = document.querySelector('.profile');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');

const popups = [profilePopup, imagePopup, cardPopup];

// Настройки валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error'
};

// Включение валидации
enableValidation(validationSettings);

// Функции обработчики
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileSection.querySelector('.profile__title').textContent = name;
    profileSection.querySelector('.profile__description').textContent = job;

    closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: titleInput.value,
        link: urlInput.value
    };

    const newCard = createCard(
        cardData,
        deleteCard,
        toggleLike,
        (data) => {
            const popupImg = imagePopup.querySelector('.popup__image');
            const popupCaption = imagePopup.querySelector('.popup__caption');
            popupImg.src = data.link;
            popupImg.alt = data.name;
            popupCaption.textContent = data.name;
            openModal(imagePopup);
        }
    );

    placesList.prepend(newCard);
    cardFormElement.reset();
    closeModal(cardPopup);
}

// Инициализация карточек
initialCards.forEach((cardData) => {
    const card = createCard(
        cardData,
        deleteCard,
        toggleLike,
        (data) => {
            const popupImg = imagePopup.querySelector('.popup__image');
            const popupCaption = imagePopup.querySelector('.popup__caption');
            popupImg.src = data.link;
            popupImg.alt = data.name;
            popupCaption.textContent = data.name;
            openModal(imagePopup);
        }
    );
    placesList.append(card);
});

// Слушатели событий
profileOpenButton.addEventListener('click', () => {
    nameInput.value = profileSection.querySelector('.profile__title').textContent;
    jobInput.value = profileSection.querySelector('.profile__description').textContent;
    openModal(profilePopup);
});

cardAddButton.addEventListener('click', () => {
    openModal(cardPopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Инициализация попапов
popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', handleOverlayClick);

    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
});