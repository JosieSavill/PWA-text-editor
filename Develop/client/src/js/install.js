const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Implemented a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        const choiceResult = await deferredPrompt.userChoice;
        console.log(choiceResult.outcome);
        deferredPrompt = null;
    }
});

//  Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Jate has been installed.');
});
