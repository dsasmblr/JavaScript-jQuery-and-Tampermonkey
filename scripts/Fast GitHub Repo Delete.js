/*--
    Set up global variables ------
--*/

//-- Used for button creation.
let repoNames = document.querySelectorAll("[itemprop='name codeRepository']");
let starBtns = document.querySelectorAll("[aria-label='Star this repository']");

//-- Used for multiple user/repo references throughout.
let userName = document.querySelector(".user-profile-link strong").innerText;

//-- Used to keep track of loop iterations, and for index referencing.
let arrayCount = 0;

//-- Keeps track of total consecutive mouse clicks needed on repo delete buttons.
let clickObj = {
    "repoName": "",
    "clicks": 0
};

/*--
    Set up functions ------
--*/

//-- FUNC: Deletes the repo.
function deleteRepo(text) {
    //-- Build form from settings page
    let formStart = text.indexOf(`<form class="js-normalize-submit" action="/${userName}/${clickObj.repoName}/settings/delete"`);
    let formEnd = text.lastIndexOf(`</form>`);
    let formFinal = text.slice(formStart, formEnd + 7);
    formFinal = formFinal.replace("form class", "form hidden class");
    
    //-- Quietly add the form to the bottom of the body
    let docBody = document.querySelector("body");
    docBody.insertAdjacentHTML('beforeend', formFinal);
    
    //-- Automate steps necessary to delete a repo
    let button = document.querySelectorAll(".btn.btn-block.btn-danger")[0];
    document.querySelectorAll("[name='verify']")[0].value = clickObj.repoName;
    button.removeAttribute("disabled");
    button.click();
}

//-- FUNC: Fetches the page needed to automate deletion of repo, then passes to deleteRepo().
function repoFormFetch() {
    fetch(`https://github.com/${userName}/${clickObj.repoName}/settings?_pjax=%23js-repo-pjax-container`,
        {
            "credentials": "include",
            "headers": {
                "accept": "text/html",
                "accept-language": "en-US,en;q=0.9",
                "if-none-match": "W/\"9e3c2df456d87563d30ee986769b2259\"",
                "x-pjax": "true",
                "x-pjax-container": "#js-repo-pjax-container",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": `https://github.com/${userName}/${clickObj.repoName}`,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
        })
    .then(res => res.text())
    .then(text => deleteRepo(text));
}

//-- FUNC: Checks clicks to follow through with repo deletion.
function clickCheck(ctx) {
    //-- Get repo name from button
    let btnName = ctx.target.getAttribute("repo-name");

    //-- If the button's repo name is the same as the clickObj "repoName" value,
    //-- increment clicks. Otherwise, set clicks to 0 and set the click object
    //-- name to the button that was just clicked.

    if (clickObj.repoName === btnName) {
        clickObj.clicks++;
    } else {
        clickObj.clicks = 0;
        clickObj.repoName = btnName;
    }

    //-- If clickObj.clicks contains 5 consecutive clicks from the same button,
    //-- then delete the repo and reset clickObj.
    if (clickObj.clicks + 1 === 5) {
        clickObj.clicks = 0;
        repoFormFetch();
    }
}

//-- FUNC: Creates delete buttons, click events, etc. and renders the buttons onto the page.
function createDeleteButtons() {
    for (starBtn of starBtns) {
        //-- Create delete button
        let delBtn = `<button repo-name="${repoNames[arrayCount].innerText}" class="btn btn-danger btn-sm">Delete</button>`;

        //-- Add delete button to the page before each Star button
        starBtn.parentNode.parentNode.parentNode.insertAdjacentHTML('afterbegin', delBtn);

        arrayCount++;
    }

    //-- Add event listener to each delete button
    allDelBtns = document.querySelectorAll("[repo-name]");
    for (btn of allDelBtns) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            clickCheck(e);
        });
    }

    arrayCount = 0;
}

//-- FUNC: Shows delete buttons only on logged-in user's repositories tab page; otherwise, does nothing.
function pageCheck() {
    let urlCheck1 = document.URL.includes(userName);
    let urlCheck2 = document.URL.includes("tab=repositories");

    if (urlCheck1 && urlCheck2) createDeleteButtons();
}

//-- Script begins here.
pageCheck();

//-- TODO: Prevent the redirect and instead animate-out a deleted repo. Use preventDefault() and...?
//-- TODO: Make delete buttons "persist" across filter results. Maybe use MutationObserver() and...?
//-- TODO: Error handling.
