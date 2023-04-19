type Image = {
  height: number;
  id: string;
  url: string;
  width: number;
};

export const getCardImages = async (imageNumber = 12) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${imageNumber}&api_key=live_iB6c6Lp0YvN3JATtCXSGWhikMNbttTlgmJ6qLFTfULVkx5Yc4tiLMvEHl9UU1X6H`
  );
  const images = await response.json();
  return images.map((image: Image) => ({ url: image.url }));
};
