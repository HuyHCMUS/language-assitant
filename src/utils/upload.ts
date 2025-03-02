export const resizeAndConvertToBase64 = (file: File, maxWidth = 700, maxHeight = 300, quality = 0.9): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          // Tạo canvas để vẽ ảnh
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          let width = img.width;
          let height = img.height;
  
          // Resize ảnh giữ nguyên tỉ lệ
          if (width > maxWidth || height > maxHeight) {
            const scale = Math.min(maxWidth / width, maxHeight / height);
            width = width * scale;
            height = height * scale;
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
  
          // Chuyển ảnh thành base64 với chất lượng nén
          resolve(canvas.toDataURL("image/jpeg", quality)); // Ảnh nén xuống JPEG với quality = 0.7
        };
        img.onerror = (error) => reject(error);
      };
  
      reader.onerror = (error) => reject(error);
    });
  };