const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    // show install btn
    butInstall.style.display = 'block';
});

// Implemented a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // show install prompt
        deferredPrompt.prompt();
        // wait for user respond to prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User resonse to the install prompt: ${ outcome } `);
        deferredPrompt = null
        // hide install btn
        butInstall.style.display = 'none';
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
