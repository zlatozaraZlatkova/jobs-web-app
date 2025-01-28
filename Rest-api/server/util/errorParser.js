function errorParser(err) {
    
  if (Array.isArray(err)) {
    return err.map((e) => e.msg).join(", ");
  }

  if (err.name === "ValidatorError") {
    return Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
  }


  return (err.message = "Internal Server Error");
}

module.exports = {
  errorParser,
};
