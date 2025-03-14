export const createPageURLParams = (currentPageNumber, searchParams) => {
  const urlParameters = new URLSearchParams(searchParams);

  if (currentPageNumber === 1) {
    urlParameters.delete("page");
  } else {
    urlParameters.set("page", currentPageNumber);
  }

  return urlParameters;
};