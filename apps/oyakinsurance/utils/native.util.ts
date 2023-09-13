export const messageToNative = (message: "close" | "redirect" | "success") => {
  window?.ReactNativeWebView.postMessage(message);
};

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}
