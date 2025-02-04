function errorParser(err) {
  
  if (Array.isArray(err)) {
    return err.map((e) => e.msg).join(", ");
  }
  
  if (err.name === "ValidationError") {
    return Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
  }
  

  if (err.kind === "ObjectId") {
    return "Resource not found";
  }
  
 
  if (err.code === 11000) {
    return "Duplicate field value entered";
  }
  

  if (err.name === "ReferenceError") {
    return "You have no permission to access this resource";
  }
  
 
  if (err.name === "Error") {
    return err.message;
  }
  

  return "Internal Server Error";

  
}

module.exports = {
  errorParser,
};
