class MosaicImg {
  /**
  * @param url 图片链接
  * @param point 打码区域 {x, y, width, height}
  * @param size 马赛克大小
  */
  constructor (url, point, size) {
   this.url = url;
   this.point = point;
   this.size = size;
  }

  // 计算马赛克的大小，超过300的部分，每200，就增加5
  calculateSize (imgWidth, imgHeight) {
   let size = 13; // 默认马赛克大小
   const imgSize = 300; // 默认图片大小
   const value = imgWidth > imgHeight ? imgWidth : imgHeight;

   // 图片大小每增加 200，马赛克大小就增加 5
   if (value > imgSize) {
    size = (value - imgSize) / 200 * 5 + size;
    size = Math.round(size);
   }

   return size;
  }

  drawMosaic (context, point, imgWidth, imgHeight, size) {
   const imgData = context.getImageData(0, 0, imgWidth, imgHeight);

   for (let y = Math.round(point.y), maxY = y + Math.round(point.height); y < maxY; y += size) {
    for (let x = Math.round(point.x), maxX = x + Math.round(point.width); x < maxX; x += size) {
     const index = (y * imgWidth + x) * 4;
     const R = imgData.data[index];
     const G = imgData.data[index + 1];
     const B = imgData.data[index + 2];
     const A = imgData.data[index + 3]

     context.fillStyle = `rgba(${R}, ${G}, ${B}, ${A})`;
     context.fillRect(x, y, maxX - x, maxY - y);
    }
   }
  }

  getMosaicImg () {
   return new Promise((resolve, reject) => {
    const $img = new Image();
    $img.src = this.url;
    $img.setAttribute('crossOrigin', 'anonymous')

    

    $img.onerror = (e) => {
     reject(e);
    };

    $img.onload = (e) => {
     const $canvas = document.createElement('canvas');
     const context = $canvas.getContext('2d');

     $canvas.width = $img.width;
     $canvas.height = $img.height;

     context.drawImage($img, 0, 0);

     const size = Number(this.size) || this.calculateSize($img.width, $img.height);

     this.drawMosaic(context, {
      x: Number(this.point.x) || 0,
      y: Number(this.point.y) || 0,
      width: Number(this.point.width) || $canvas.width,
      height: Number(this.point.height) || $canvas.height
     }, $canvas.width, $canvas.height, size);

     const url = $canvas.toDataURL();
     resolve(url);
    };
   });
  }
 }
