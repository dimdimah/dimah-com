/**
 * Mengompres dan mengonversi gambar (JPG/PNG/dll) ke format WebP di sisi klien (browser)
 * menggunakan Canvas API bawaan browser.
 *
 * @param {File} file - Berkas gambar asli dari <input type="file">
 * @param {Object} options - Pengaturan kompresi
 * @param {number} [options.maxWidth=1200] - Lebar maksimal gambar
 * @param {number} [options.maxHeight=1200] - Tinggi maksimal gambar
 * @param {number} [options.quality=0.85] - Kualitas WebP (0.1 - 1.0)
 * @returns {Promise<{ file: File, originalSize: number, compressedSize: number, width: number, height: number }>}
 */
export async function compressImageToWebp(file, options = {}) {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.85 } = options;

  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Berkas yang dipilih bukan gambar yang valid.");
  }

  // Jika SVG, tidak perlu dikompresi ke WebP karena SVG sudah berbasis vektor
  if (file.type === "image/svg+xml") {
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
      width: null,
      height: null,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Hitung skala rasio agar tidak melebihi maxWidth/maxHeight
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Gagal mengompres gambar ke format WebP."));
              return;
            }

            const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
            const webpFileName = `${baseName}.webp`;

            const webpFile = new File([blob], webpFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve({
              file: webpFile,
              originalSize: file.size,
              compressedSize: webpFile.size,
              width,
              height,
            });
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => {
        reject(new Error("Gagal memuat gambar untuk proses kompresi."));
      };
    };

    reader.onerror = () => {
      reject(new Error("Gagal membaca berkas gambar."));
    };
  });
}
