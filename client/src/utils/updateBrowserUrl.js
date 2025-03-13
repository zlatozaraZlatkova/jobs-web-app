export const updateBrowserURL = (currentPageNumber, searchParams, setSearchParams) => {
  const urlParameters = new URLSearchParams(searchParams);

  if (currentPageNumber === 1) {
    urlParameters.delete("page");
  } else {
    urlParameters.set("page", currentPageNumber);
  }

  setSearchParams(urlParameters);
};
