export interface Image {
  url: string;
  width?: number;
  height?: number;
}

export function findBestMatchingImage(width: number, images: Image[]): string | null {
  if (images.length === 0) {
    return null;
  }

  let currentBestImage = images[0];

  for (let i = 1; i < images.length; i++) {
    const currentWidth = currentBestImage.width ?? 300;
    const newWidth = images[i].width ?? 300;
    if (currentWidth < width && newWidth >= width) {
      currentBestImage = images[i];
    } else if (currentWidth >= width && newWidth >= width && currentWidth > newWidth) {
      currentBestImage = images[i];
    }
  }

  return currentBestImage.url ?? null;
}
