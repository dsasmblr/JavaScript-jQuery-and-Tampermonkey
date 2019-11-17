// Instagram Signup/Login and Image Re-Linker via the MutationObserver API
// Video Tutorial URL: https://youtu.be/KWWGC2TbT70

// FUNCTION: Checks for presence of signup footer and modal, then removes them if they're on the page.
function loginCheck() {
	const body = document.querySelector('body');
    const isHidden = body.style.overflow === 'hidden';
    const hasModal = body.lastElementChild.getAttribute('role') === 'presentation' ? true : false;
    const footer = [...document.querySelectorAll('nav > div')].pop().firstElementChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild;

    if (footer) {
    	footer.remove();
    }

    if (isHidden && hasModal) {
        body.lastElementChild.remove();
    	body.style.overflow = 'visible';

    	loginObserver.disconnect();
    }
}

// FUNCTION: Adds full-sized image link to each thumbnail's hyperlink.
function reLink() {
    const linkList = document.querySelectorAll('a');

    linkList.forEach((link) => {
        const linkAttribute = link.getAttribute('href');

        if (linkAttribute.startsWith('/p/')) {
            const linkFormatted = 'https://instagram.com' + linkAttribute + 'media/?size=l'

            link.setAttribute('href', linkFormatted);

            // Log to the console the thumbnail and respective link for hover/click.
			console.log('-=-=-=-=-=-=-');
        	console.log('Image: ', link.firstElementChild);
        	console.log('Direct Link: ', linkFormatted);
        };
    });
}

// FUNCTION: Callback function for MutationObserver which runs when changes are observed.
// Note: Beware of lexical scope with arrow functions, like in the forEach below.
// For example, if you need 'this' to reference the local scope of the loop, then use
// a traditional 'for', 'for...of', or 'for...in' loop.
function mutationsCallback(mutations) {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            reLink();
        } else if (mutation.type === 'attributes') {
            loginCheck();
        }
    });
}

// Node(s)/element(s) to be observed.
const imgNode = [...document.querySelectorAll('main > div > div')].pop().lastElementChild.firstElementChild.firstElementChild;
const body = document.querySelector('body');

// Create a new MutationObserver instance and pass the callback function to it.
// Then call the observe() method and pass it the node to be observed, as well as
// the type(s) of mutation(s) to watch for.
const imgObserver = new MutationObserver(mutationsCallback);
imgObserver.observe(imgNode, { childList: true });

// Same stuff as above, but for our login observer.
const loginObserver = new MutationObserver(mutationsCallback);
loginObserver.observe(body, { attributes: true });