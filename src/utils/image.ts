export type RgbTypes = {
  r: number;
  b: number;
  g: number;
  swatches: Array<Number[]>;
};

export const loadImage = (imageSrc: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject;
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
  });
};

export const grabDominantColor = async (
  imageSrc: string
): Promise<RgbTypes> => {
  const rgb: RgbTypes = { r: 0, b: 0, g: 0, swatches: [] };
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
  const quality: number = 5;

  if (!context) return rgb;
  try {
    const img: HTMLImageElement = await loadImage(imageSrc);
    const width: number = img.width;
    const height: number = img.height;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0);
    const imageData = context.getImageData(0, 0, width, height);
    const totalPixels: number = width * height;
    const pixels: Uint8ClampedArray = imageData.data;

    let count: number = 0;
    for (let i = 0; i < totalPixels; i += quality) {
      count++;
      const offset: number = i * 4;
      const red: number = pixels[offset];
      const green: number = pixels[offset + 1];
      const blue: number = pixels[offset + 2];

      rgb.r += red;
      rgb.g += green;
      rgb.b += blue;
    }

    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
  } catch (_error) {
    return rgb;
  }
};
