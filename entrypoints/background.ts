import { systemMessage } from "@/assets/constant";

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getSystemMessage") {
      sendResponse(systemMessage);
      return true;
    }
  });
});
