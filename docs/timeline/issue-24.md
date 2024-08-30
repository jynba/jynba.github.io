> 在上传图片时限制图片大小往往会影响用户体验，因此我们可以对上传的图片进行压缩，一方面时减少服务器资源占用，另一方面是前端渲染图片时也会更快

  :::tip 原文地址
  [图片压缩系列 | GitHub](https://github.com/jynba/jynba.github.io/issues/24)
  :::
  ### Canvas压缩
* canvas压缩
```js
const compressImage = (file, maxWidth, maxHeight, quality) => {
  return new Promise((resolve, reject) => {
   //创建图片，用于绘制canvas
    const image = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

   //使得image.src指向file文件
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      let newWidth = image.width;
      let newHeight = image.height;

   //按宽/高中最大的一边按比例缩放
      if (image.width > maxWidth || image.height > maxHeight) {
        if (image.width / image.height > maxWidth / maxHeight) {
          newWidth = maxWidth;
          newHeight = (image.height / image.width) * maxWidth;
        } else {
          newWidth = (image.width / image.height) * maxHeight;
          newHeight = maxHeight;
        }
      }

    //按照图片，绘制canvas
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

    //将canvas转为blob类型，传入图片质量(在 0 与 1 之间)
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        file.type,
        quality,
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};
```
* 使用如下
```js
        // 压缩图片
        const compressedBlob = await compressImage(file.raw, 1600, 1600, 0.8);
        console.log({
          raw: new File([compressedBlob], file.raw.name, {
            type: file.raw.type,
          }),
        })
```
### 其他方式
* 微信小程序中有一些写好的api可以用
1. chooseMedia['compressed']
2. wx.compressImage()
压缩效果均不错，且显示清晰