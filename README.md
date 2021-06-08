# mosaic-img
图片打码

var mosaicImg = new MosaicImg('https://t7.baidu.com/it/u=993577982,1027868784&fm=193&f=GIF', {x: 200, y: 600, width: 300, height: 300});
mosaicImg.getMosaicImg().then(res => {
    console.log(res);
    document.getElementById('img').src = res;
}).catch(err => {
    console.log(err);
});
