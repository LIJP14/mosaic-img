# mosaic-img
图片打码

#实例化
var mosaicImg = new MosaicImg('https://t7.baidu.com/it/u=993577982,1027868784&fm=193&f=GIF', {x: 200, y: 600, width: 300, height: 300});

#调用打码方法，返回 promise 对象，拿到打码后的 base64 图片链接，放到<img>中
mosaicImg.getMosaicImg().then(res => {
    console.log(res);
    document.getElementById('img').src = res;
}).catch(err => {
    console.log(err);
});
