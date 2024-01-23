/**
 * This Web Worker powers the contract chat feature.
 * It must remain in the public folder to function.
 */
let source;

/**
 * Sets up an EventSource which listens to server-sent events from a given URL.
 *
 * @param {string} url - The URL to open an EventSource with.
 */
function setupEventSource(url) {
  source = new EventSource(url);

  /**
   * Event handler for message events from the server.
   * It sends the event data back to the main script.
   *
   * @param {MessageEvent} event - The message event data.
   */
  source.onmessage = function (event) {
    // Send the event data back to the main script
    self.postMessage(event.data);
  };

  /**
   * Event handler for errors on the EventSource.
   *
   * @param {ErrorEvent} err - The error event data.
   */
  source.onerror = function (err) {
    console.error("EventSource failed:", err);
    source.close();
  };
}

/**
 * Event listener for messages sent to the Web Worker from the main script.
 * It checks the command and acts accordingly.
 *
 * @param {MessageEvent} event - The message event data.
 */
self.addEventListener("message", (event) => {
  // Set up a new EventSource with the provided URL
  if (event.data.command === "start") {
    // console.log(event.data)
    setupEventSource(event.data.url);
  }

  if (event.data.command === "close") {
    if (source) source.close();
  }
});
