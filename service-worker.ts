import * as OfflinePluginRuntime from "offline-plugin/runtime";

export default function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then((registration) => {
                    console.log("ServiceWorker registration successful with scope: ", registration.scope);
                })
                .catch((err) => {
                    console.log("ServiceWorker registration failed: ", err);
                });
        });
    } else {
        console.log("ServiceWorker is not supported in this browser");
    }

    OfflinePluginRuntime.install({
        onUpdateReady: () => {
            OfflinePluginRuntime.applyUpdate();
        },
        onUpdated: () => {
            console.log("Content has been updated. Please refresh the page.");
        },
    });
}
