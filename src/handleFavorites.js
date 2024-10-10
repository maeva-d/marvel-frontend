const handleFavorites = (addToFav, display, setDisplay) => {
  // Je veux récupérer une clé
  const itemToFind = JSON.parse(localStorage.getItem(addToFav._id));
  if (itemToFind === null) {
    // console.log("ajouté dans mon local storage ", itemToFind);
    localStorage.setItem(addToFav._id, JSON.stringify(addToFav));
    if (display) setDisplay("flex");
  } else {
    // console.log("supprimé du local storage ", addToFav._id);
    localStorage.removeItem(addToFav._id);
    if (display) setDisplay("none");
  }
};

export default handleFavorites;
