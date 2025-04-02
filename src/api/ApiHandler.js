import axios from "axios";

const routes = {
  caliberate: "/caliberate",
  showMessage: "/showMessage",
  startGazeTracking: "/start_gaze_tracking",
  stopGazeTracking: "/stop_gaze_tracking",
};

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const ApiHandler = async ({ requestConfig }) => {
  let response,
    resultData = {};

  if (requestConfig === undefined) {
    console.log("Error requestConfig not given");
    return { status: "error", errorMsg: "requestConfig is not provided" };
  }

  let { method, data, endPoint } = requestConfig;

  console.log(method, data, endPoint);
  if (endPoint === undefined) {
    console.log("Error endpoint not given");
    return { status: "error", errorMsg: "endpoint is not provided" };
  }

  if (!Object.keys(routes).includes(endPoint)) {
    console.log("Error endpoint absent");
    return { status: "error", errorMsg: `Invalid endpoint ${endPoint}` };
  }

  if (method === undefined) {
    console.log("Error method not given");
    return { status: "error", errorMsg: "method is not provided" };
  }

  if (!["get", "post", "put"].includes(method)) {
    console.log("Error invalid method");
    return { status: "error", errorMsg: "Invalid method" };
  }

  try {
    if (method === "get") {
      response = await axios.get(routes[endPoint], {
        params: data,
      });
    } else if (method === "post") {
      console.log("first");
      response = await axios.post(routes[endPoint], data, {});
    }
  } catch (err) {
    console.log("Some error while API call ", err);
    response = err.response;
  }
  console.log(response);
  if (response === undefined) {
    return { status: "error", errorMsg: "No response received" };
  }
  const { status, data: resData, statusText } = response;

  if (status === 200) {
    resultData = { status: "success", data: resData };
  } else if (status >= 400 && status < 500) {
    if (status === 400) {
      resultData = { status: "error", errorMsg: `Error ${status}` };
    } else if (status === 404) {
      resultData = {
        status: "error",
        errorMsg: "Page not found",
      };
    }
  } else if (status >= 500) {
    resultData = { status: "error", errorMsg: `Error ${status}` };
  } else if (status === 0) {
    resultData = { status: "error", errorMsg: "Network timed out" };
  }

  console.log(response, resultData);
  console.log("Gone through everything");
  return resultData;
};
