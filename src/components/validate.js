const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${settings.errorClass}_type_${inputElement.id}`);
    if (errorElement && inputElement) {
        inputElement.classList.add(settings.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${settings.errorClass}_action_active`);
    }
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${settings.errorClass}_type_${inputElement.id}`);
    if (errorElement && inputElement) {
        inputElement.classList.remove(settings.inputErrorClass);
        errorElement.classList.remove(`${settings.errorClass}_action_active`);
        errorElement.textContent = '';
    }
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
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

    toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
        });
    });
};

export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};