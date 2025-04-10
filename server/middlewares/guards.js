function hasUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: "Please log in" });
    }
  };
}


function isOwner() {
  return (req, res, next) => {

    if (!req.item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const ownerId = req.item.ownerId;

    if (ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
}

const checkUserRole = (allowedRole) => (req, res, next) => {
  if (req.user.role !== allowedRole) {
      return res.status(403).json({ message: "Access denied" });
  }
  req.userRole = req.user.role;
  next();
};

module.exports = {
  hasUser,
  isOwner,
  checkUserRole
};
