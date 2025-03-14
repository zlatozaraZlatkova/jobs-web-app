function getInitials(name) {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function capitalizeName(name) {
  if (!name) {
    return "";
  }

  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export { getInitials, capitalizeName };
