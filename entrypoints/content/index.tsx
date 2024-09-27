import "../../assets/tailwind.css";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    // Function to create and mount the UI
    const createAndMountUI = async (targetDiv: HTMLElement) => {
      if (getComputedStyle(targetDiv).position === "static") {
        targetDiv.style.position = "relative";
      }

      const ui = await createShadowRootUi(ctx, {
        name: "content-script",
        position: "inline",
        onMount: (container) => {
          const root = ReactDOM.createRoot(container);
          root.render(<App />);
          return root;
        },
        onRemove: (root) => {
          root?.unmount();
        },
      });

      const showUI = () => {
        if (!targetDiv.contains(ui.shadowHost)) {
          ui.mount();
          targetDiv.appendChild(ui.shadowHost);
        }
      };
      showUI();
    };

    // This function checks if target div or we can say the linkedin message box is present or loaded into the dom
    const findTargetDiv = () => {
      return document.querySelector(
        'div.msg-form__contenteditable[role="textbox"]',
      ) as HTMLElement | null;
    };

    // Initial check for target div
    let targetDiv = findTargetDiv();
    if (targetDiv) {
      await createAndMountUI(targetDiv);
      targetDiv.style.position = "relative";
    } else {
      console.log("Target div not found initially, setting up observer");
    }

    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === "childList") {
          targetDiv = findTargetDiv();
          if (targetDiv) {
            observer.disconnect();
            createAndMountUI(targetDiv);
            break;
          }
        }
      }
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  },
});
