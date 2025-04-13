export const createCard = (cardData, deleteCallback, likeCallback, openImageCallback) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  const cardImg = cardElement.querySelector('.card__image');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCallback(likeButton));

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCallback(cardElement));

  cardImg.addEventListener('click', () => openImageCallback(cardData));

  return cardElement;
};

export const deleteCard = (cardElement) => {
  cardElement.remove();
};

export const toggleLike = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};