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
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');

const cardFormElement = cardPopup.querySelector('.popup__form');

const titleInput = cardPopup.querySelector('.popup__input_type_card-name');
const urlInput = cardPopup.querySelector('.popup__input_type_url');


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

const popups = [profilePopup, imagePopup, cardPopup]

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
    const title = profileSection.querySelector('.profile__title').textContent;
    const description = profileSection.querySelector('.profile__description').textContent;
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

    const job = jobInput.value;
    const name = nameInput.value;

    const namePlace = profileSection.querySelector('.profile__title');
    const jobPlace = profileSection.querySelector('.profile__description');

    namePlace.textContent = name;
    jobPlace.textContent = job;

    closeModal(profilePopup)
}


// listener for submit button of profile button
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


cardAddButton.addEventListener('click', function () {
    const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
    const cardUrlInput = cardPopup.querySelector('.popup__input_type_url');
    cardNameInput.value = '';
    cardUrlInput.value = '';

    openModal(cardPopup);
});

cardCloseButton.addEventListener('click', function () {
    closeModal(cardPopup);
});


// Функция удаления карточки
function deleteCard(button) {
    const card = button.closest('.card');
    card.remove()
}


function toggleLike(like) {
    like.classList.toggle('card__like-button_is-active');
}


// function for card create
function createCard(title, link, alt_info) {
    const cardElement = cardTemplate.cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    cardTitle.textContent = title;

    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = link;
    cardImg.alt = alt_info;

    const like = cardElement.querySelector('.card__like-button');
    like.addEventListener('click', function () {
        toggleLike(like)
    });

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteCard(deleteButton)
    });

    const img = cardElement.querySelector('.card__image');
    img.addEventListener('click', function () {
        const card = img.closest('.card')

        const popupImg = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');
        const caption = card.querySelector('.card__title').textContent;

        popupImg.src = img.src;
        popupImg.alt = img.alt;
        popupCaption.textContent = caption;

        const closeImgPopup = imagePopup.querySelector('.popup__close');
        closeImgPopup.addEventListener('click', function () {
            closeModal(imagePopup)
        });

        openModal(imagePopup)
    });

    return cardElement
}


function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const title = titleInput.value;
    const url = urlInput.value;

    const card = createCard(title, url, title)
    placesList.prepend(card)

    closeModal(cardPopup)
}


cardFormElement.addEventListener('submit', handleCardFormSubmit);


// Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
    let element = createCard(initialCards[i].name, initialCards[i].link, initialCards[i].name)
    placesList.append(element)
}

for (let i=0; i<popups.length; i++) {
    popups[i].classList.add('popup_is-animated')
}