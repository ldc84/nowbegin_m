var body = $('body');
var layer = $('.layer');
var layerWrap = layer.find('.layer-wrap');

// layer open func
function layerOpen(page, size){
  body.addClass('over-hidden');
  layerWrap.load(page);
  if(size) layerWrap.addClass(size);
  layer.addClass('show');
  setTimeout(function(){
    layerWrap.addClass('move');
  },30);
}

(function ($) {

  // header
  $(function(){
    var header = $('#header');
    var menuBtn = header.find('.top-menu > a');
    var searchBtn = header.find('.top-search > button');
    var gnbMenu = $('.gnb-menu');
    var topLoginBtn = gnbMenu.find('.top-login a');
    var alrimBtn = gnbMenu.find('.alert a');
    var gnbMenu = $('.gnb-menu');
    var searchBox = $('.top-search-in');
    var searchBoxBack = searchBox.find('.back');
    var dim = $('#wrap > .dim');

    // top menu
    menuBtn.on('click', function(){
      body.addClass('over-hidden');
      gnbMenu.addClass('active');
      return false;
    });

    dim.on('click', function(){
      body.removeClass('over-hidden');
      gnbMenu.removeClass('active');
      return false;
    });

    // search
    searchBtn.on('click', function(){
      body.addClass('over-hidden');
      searchBox.addClass('active');
      return false;
    });

    searchBoxBack.on('click', function(){
      body.removeClass('over-hidden');
      searchBox.removeClass('active');
      return false;
    });

    // 로그인 팝업 오픈
    topLoginBtn.on('click', function(){
      layerOpen('../html/pop_login.html');
      return false;
    });

    // 로그인 _ 회원가입 / 아이디찾기/ 비번찾기
    $(document).on('click', '.login-utill a', function(){
      var $this = $(this);
      var $url = $this.data('html-url');

      $('.layer .close').trigger('click');
      layerOpen($url);
    });

    // tab
    $(document).on('click', '.tab-type-1 a', function(){
      var $this = $(this);
      var $parent = $this.parent('li');
      var $href = $this.attr('href');
      $parent.addClass('active');
      $parent.siblings().removeClass('active');
      $($href).show();
      $($href).siblings().hide();
      return false;
    });

    // 회원가입 _ 약관
    // 전체 선택/해제
    $(document).on("click", "#pu-total", function () {
      var checked = $(this).is(":checked");
      var checkboxs = $(this).parents(".join-agree").find('input[type=checkbox]');
      checked ? checkboxs.prop("checked", true) : checkboxs.prop("checked", false) ;
    });
    // 일부 선택 해제
    $(document).on("click", ".normal input", function () {
      var is_checked = true;
      $(".join-agree .normal input").each(function(){
        is_checked = is_checked && $(this).is(":checked");
      });    
      $("#pu-total").prop("checked", is_checked);
    });

    // 알림 오픈
    alrimBtn.on("click", function(){
      layerOpen('../html/pop_alrim_list.html', 'layer-alrim');
      return false;
    });

    // layer close
    $(document).on('click', '.layer .close, .layer-close', function(){
      layerWrap.removeClass('move');
      layerWrap.on('transitionend', function(){
        if(!layerWrap.hasClass('move')){
          layer.removeClass('show');
          layerWrap.empty();
          layerWrap.attr('class', 'layer-wrap')
        }
      });
      return false;
    });
  });

  // tab
  $(function(){

    $(document).on('click', '.tab-type-2 a, .tab-type-4 a', function(){
      var $this = $(this);
      var $href = $this.attr('href');
      var $parent = $this.parent('li');

      $parent.siblings('li').find('a').removeClass('active');
      $this.addClass('active');

      $($href).show();
      $($href).siblings().hide();
      
      return false;
    });

    $(document).on('click', '.tab-type-3 a', function(){
      var $this = $(this);
      var $href = $this.attr('href');
      var $parent = $this.parent('li');

      $parent.siblings('li').removeClass('active');
      $parent.addClass('active');

      $($href).fadeIn(250);
      $($href).siblings().hide();
      
      return false;
    });
    
  });

  // faq
  $(function(){

    $(document).on('click', '.faq-list a, .faq-list-2 a', function(){
      var $this = $(this);
      var $parent = $this.parent('li');
      var spd = 250;

      $parent.siblings('li').removeClass('active');
      $parent.toggleClass('active');

      $this.siblings('.answer').stop().slideToggle(spd);
      $parent.siblings('li').find('.answer').stop().slideUp(spd);
      
      return false;
    });
    
  });
  
  // main
  $(function(){
      
    if($('#wrap').hasClass('main')){
      // main visual
      $('.main-visual').slick({
        arrows: false,
        dots: true,
        appendDots: $('.dots-box'),
      });
      
      // live list
      $('.live-list').slick({
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        centerPadding: '6px',
      });

      // main class
      $('.main-class .main-slide-box').each(function(){
        var $this = $(this);
        $this.find('.class-list').slick({
          infinite: false,
          arrows: false,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '6px',
        });
      });
    }
  });

  // lecture
  $(function(){
      
    if($('#wrap').hasClass('lecture')){
      var watching = $('.watching');
      var btnChat = $('.btn-chat');

      btnChat.on('click', function(){
        watching.toggleClass('with-chat');
        return false;
      });
    }
  });

  // mypage
  $(function(){
      
    var btnLeave = $('.btn-leave');

    btnLeave.on('click', function(){
      layerOpen('../html/pop_join_leave.html');
      return false;
    });
  });
  

})(jQuery);