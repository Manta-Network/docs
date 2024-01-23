/**
 * Tracks user metrics and sends them to a specified endpoint.
 *
 * This function captures a variety of metrics from the user's browser and device, such as the browser type,
 * device type, platform, UTM parameters, user groups, homepage tests, referer, UUID, dark mode preference,
 * Web3 provider, and other user-provided data. After collecting this information, it sends the data
 * to a `/track/` endpoint using a POST request.
 *
 *
 * @function
 * @param {string} metric - The main metric or event being tracked.
 * @param {Object} data - Additional data to be sent along with the default tracked metrics.
 * @param {Object} user - User-specific information to be included with the tracking data.
 */

const track = (baseUrl: string, metric: string, data: any, user = {}) => {
  let params = new URLSearchParams(window.location.search);
  let utm = params.get("utm");
  import("device-uuid").then((module) => {
    let du = new module.DeviceUUID().parse();
    let dua = [
      du.platform,
      du.resolution,
      du.os,
      du.pixelDepth,
      du.language,
      du.isMac,
      du.isDesktop,
      du.isMobile,
      du.isTablet,
      du.isWindows,
      du.isLinux,
      du.isLinux64,
      du.isiPad,
      du.isiPhone,
      du.isTouchScreen,
      du.cpuCores,
      du.colorDepth,
    ];
    const uuid = du.hashMD5(dua.join(":"));
    let expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    fetch(`${baseUrl}/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        metric,
        data: {
          browser: getBrowserType(),
          deviceType: getDeviceType(),
          platform: navigator?.platform,
          utm,
          uuid,
          ...data,
          ...user,
        },
      }),
    });
  });
};

/**
 * Determines and returns the type of device currently being used based on the userAgent.
 *
 * This function inspects the userAgent string provided by the browser to identify whether the device is
 * a desktop, tablet, or mobile device. It uses regular expressions to detect common patterns found in userAgents
 * for different device types.
 *
 * @function
 * @returns {string} - The device type. Possible values are: "tablet", "mobile", and "desktop". If the `window` object is not available, the function will return `undefined`.
 */

const getDeviceType = () => {
  if (!window) return;
  const ua = window.navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};

/**
 * Detects and returns the type of browser currently being used by analyzing the userAgent.
 *
 * This function checks the userAgent string provided by the browser and matches it with known patterns to
 * identify the browser type. If the browser type isn't identified, it returns "unknown".
 *
 * @function
 * @returns {string} - The browser type. Possible values are: "Opera", "Chrome", "Safari", "Firefox", "IE", and "unknown".
 */
const getBrowserType = () => {
  let browserType = "unknown";
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) !== -1
  ) {
    browserType = "Opera";
  } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
    browserType = "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") !== -1) {
    browserType = "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
    browserType = "Firefox";
  } else if (
    navigator.userAgent.indexOf("MSIE") !== -1 ||
    !!document.DOCUMENT_NODE
  ) {
    //IF IE > 10
    browserType = "IE";
  }
  return browserType;
};

export default track;
