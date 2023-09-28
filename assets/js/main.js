function toggleMenu() {
  var nav = document.getElementsByClassName('site-header-nav')[0];
  if (nav.style.display == 'inline-flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'inline-flex';
  }
}

jQuery(function () {
  // 回到顶部
  function toTop() {
    var $toTop = $('.gotop');

    $(window).on('scroll', function () {
      if ($(window).scrollTop() >= $(window).height()) {
        $toTop.css('display', 'block').fadeIn();
      } else {
        $toTop.fadeOut();
      }
    });

    $toTop.on('click', function (evt) {
      var $obj = $('body,html');
      $obj.animate(
        {
          scrollTop: 0,
        },
        240
      );

      evt.preventDefault();
    });
  }

  toTop();
});

function imageLazyLoad() {
  console.log('images lazyload~');
  const images = document.querySelectorAll('img.lazyload');

  const imgObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const { target } = entry;
        // 如果图片已经在视图中 root
        if (entry.isIntersecting) {
          target.src = target.dataset.src;
          // 图片已经开始加载，所以可以停止监听这个 target 了
          observer.unobserve(target);
        }
      });
    },
    {
      rootMargin: '0px 0px 400px 0px', // 这里是调整视图的边距，底部是400px，意味着将视图向下扩张了400px。
    }
  );

  images.forEach((img) => imgObserver.observe(img));
}

class ImageModal {
  constructor() {
    var style = document.createElement('style');
    style.innerHTML = `
        .image-modal{
            position: fixed;
            display: none;
            z-index: 999;
            height: 100vh;
            width: 100vw;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,0.7);
        }
        .image-modal img {    
            max-width: 90%;
            max-height: 90%;
            margin: 0 auto;
            display: block;
            margin-top: 50vh;
            cursor: zoom-out;
            transform: translateY(-50%);
        }
        `;
    document.head.appendChild(style);
    this.modalEle = document.createElement('div');
    this.modalEle.classList.add('image-modal');
    this.imgEle = document.createElement('img');
    this.modalEle.addEventListener('click', () => {
      this.close();
    });

    this.modalEle.appendChild(this.imgEle);
    document.body.appendChild(this.modalEle);
  }
  show(imgUrl) {
    this.imgEle.src = imgUrl;
    this.modalEle.style.display = 'block';
  }
  close() {
    this.modalEle.style.display = 'none';
  }
}

function viewLargerImage() {
  var imageModal = new ImageModal();
  document.querySelectorAll('img.lazyload').forEach((img) => {
    img.addEventListener('click', (e) => {
      // console.log(e);
      imageModal.show(e.target.src);
    });
  });
}

(function () {
  // 图片懒加载功能
  imageLazyLoad();

  // 查看图片大图功能
  viewLargerImage();

  // 代码块全屏功能
  // codeFullScroll()
})();
