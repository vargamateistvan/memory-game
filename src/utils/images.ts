type Image = {
  height: number;
  id: string;
  url: string;
  width: number;
};

export const getCardImages = async (imageNumber = 10) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${imageNumber}`
  );
  const images = await response.json();
  return images.map((image: Image) => ({ url: image.url }));
};
