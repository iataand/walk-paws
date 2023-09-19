export const getBreeds = async () => {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const breeds = await res.json();

  return breeds;
};
