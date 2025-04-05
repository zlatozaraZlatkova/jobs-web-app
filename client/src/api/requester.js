async function requester(method, url, data, fetchOptions = {}) {
  const options = {
    ...fetchOptions,
    headers: {
      ...(fetchOptions.headers || {}),
      ...(data ? { "Content-Type": "application/json" } : {})
    }
  };

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      try {
        const responseData = await response.json();
        
        if (response.status === 401) {
          return {};
        }

        return {
          isError: true,
          message: responseData.message || `HTTP error: ${response.status}`,
          status: response.status
        };

      } catch (jsonError) {
        if (response.status === 401) {
          return {};
        }

        return {
          isError: true,
          message: `HTTP error: ${response.status} ${response.statusText}`,
          status: response.status
        };
      }
    }

    if (response.status === 204) {
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    return {
      isError: true,
      message: `Network error: ${error.message}`,
      status: 0
    };
  }
}


export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");