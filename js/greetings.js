const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASS_NAME = "hidden";
const USERNAME_KEY = "username";
const SET_TITLE_CLASS_NAME = "hello-title";

const onLoginSubmit = event => {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASS_NAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
};

const paintGreetings = username => {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASS_NAME);
    greeting.classList.add(SET_TITLE_CLASS_NAME);
};

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASS_NAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}
