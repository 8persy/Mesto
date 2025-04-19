export const createCard = (cardData, userId, handleCardClick, handleDeleteClick, handleLikeClick) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    // Показываем кнопку удаления только для своих карточек
    if (cardData.owner._id !== userId) {
        deleteButton.remove();
    }

    // Проверяем, есть ли наш лайк на карточке
    const isLiked = cardData.likes.some(like => like._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardImage.addEventListener('click', () => handleCardClick(cardData));
    deleteButton.addEventListener('click', handleDeleteClick);
    likeButton.addEventListener('click', handleLikeClick);

    return cardElement;
};