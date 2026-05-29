/**
 * Convert an image File/Blob to WebP format using the browser Canvas API.
 * Returns a new Blob in image/webp format.
 *
 * @param {File|Blob} file  – the source image
 * @param {number}    quality – 0‑1, default 0.92 (visually lossless)
 * @returns {Promise<Blob>}
 */
export const convertToWebp = (file, quality = 0.92) => {
  return new Promise((resolve, reject) => {
    // If the browser doesn't support WebP encoding, fall back to the original file
    const testCanvas = document.createElement('canvas');
    testCanvas.width = 1;
    testCanvas.height = 1;
    if (!testCanvas.toDataURL('image/webp').startsWith('data:image/webp')) {
      console.warn('Browser does not support WebP encoding — uploading original file.');
      resolve(file);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      let scale = 1.0;
      let currentQuality = quality;

      const attemptCompress = () => {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.naturalWidth * scale);
        canvas.height = Math.round(img.naturalHeight * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              URL.revokeObjectURL(objectUrl);
              reject(new Error('WebP conversion failed — canvas.toBlob returned null'));
              return;
            }

            const sizeLimit = 300 * 1024; // 300 KB
            if (blob.size > sizeLimit) {
              // Dynamic multi-pass: decrease quality first, then scale resolution if needed
              if (currentQuality > 0.3) {
                currentQuality = Math.max(0.3, currentQuality - 0.15);
                attemptCompress();
              } else if (scale > 0.4) {
                scale = Math.max(0.4, scale - 0.15);
                currentQuality = quality; // Reset quality for the new resolution scale
                attemptCompress();
              } else {
                // If min limit is reached, resolve with the best efforts blob
                URL.revokeObjectURL(objectUrl);
                resolve(blob);
              }
            } else {
              URL.revokeObjectURL(objectUrl);
              resolve(blob);
            }
          },
          'image/webp',
          currentQuality
        );
      };

      attemptCompress();
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for WebP conversion'));
    };

    img.src = objectUrl;
  });
};
