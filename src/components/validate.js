const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${settings.errorClass}_type_${inputElement.id}`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${settings.errorClass}_action_active`);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${settings.errorClass}_type_${inputElement.id}`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(`${settings.errorClass}_action_active`);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    const hasError = inputList.some(input => !input.validity.valid);

    if (hasError) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    // Инициализация состояния кнопки
    toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);

    // Обновление состояния кнопки при изменении полей
    inputList.forEach(input => {
        input.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        });
    });
};

export const enableValidation = (settings) => {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form => {
        setEventListeners(form, settings);
    });
};