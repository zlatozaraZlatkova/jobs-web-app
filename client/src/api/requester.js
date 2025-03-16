async function requester(method, url, data, fetchOptions = {}) {
  const options = {
    ...fetchOptions  
  };

  if (method !== "GET") {
    options.method = method;
  }

  if (data) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    
    if (response.status === 204) {
      return { success: true };
    }

    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}


export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const del = requester.bind(null, "DELETE");
