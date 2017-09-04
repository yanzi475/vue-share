/**
 * Created by haiyanSong on 2017/8/25.
 */
'use strict';

Vue.component('hj-loading', {
  template: '<div class="pop-bg"><div class="pop-load"><ul class="pop-ball"><li><span></span></li><li><span></span></li><li><span></span></li><li><span></span></li></ul></div></div></div>'
});

Vue.component('hj-warning', {
  template: '<div class="popup" style="display: none;" v-show="show"><div :class="{\'popup-wrap-a\':type===\'info\', \'popup-wrap-b\':type===\'warning\', \'popup-wrap-c\':type===\'error\'}"><div class="close" v-show="close" @click="show = false"></div><div class="text"><div v-for="msg in msgs" v-text="msg"></div><button v-show="btnText" v-text="btnText" @click="on_warning_btn"></button></div></div></div>',
  props: ['show', 'type', 'msgs', 'close', 'btnText', 'btnExtra', 'btnExtraParam'],
  methods: {
    on_warning_btn: function () {
      if (this.btnExtra) {
        switch (this.btnExtra) {
          case 'close':
            this.show = false;
            break;
          case 'app':
            this.$parent.open_or_download_app(this.btnExtraParam);
            break;
          case 'inapp':
            window.location.href = this.$parent.in_app_schema_url(this.btnExtraParam);
            break;
          case 'share':
            this.show = false;
            this.$parent.share.is_show_guide = true;
            break;
          case 'outapp':
            window.location.href = this.btnExtraParam;
            break;
        }
      }
    }
  }
});

Vue.component('hj-share-guide', {
  template: '<div class="con_wrap share_wrap" v-show="show" @click="show=false"><div class="share_guide_wrap current" id="shareFriend"><div class="share_penguin_wrap"><div class="share_penguin_body"></div><div class="share_penguin_left_hand"></div><div class="share_penguin_right_hand"></div><div class="share_penguin_left_foot"></div><div class="share_penguin_right_foot"></div></div><div class="share_penguin_shadow"></div><p class="share_penguin_dialog">点这里，告诉好友</p></div></div>',
  props: ['show']
});

Vue.component('hj-dialog', {
  template: '<div class="popup" v-show="show"><div class="popup-wrap-qr"><h2 class="title" v-text="title"></h2><p class="con" v-text="desc"></p><img class="qr-code" v-show="img" v-bind:src="img" /><div class="pop-btn px-b" v-show="btnText" v-text="btnText" @click="on_dialog_btn"></div></div></div>',
  props: ['show', 'title', 'desc', 'img', 'btnText', 'btnExtra', 'btnExtraParam'],
  methods: {
    on_dialog_btn: function () {
      this.show = false;
      if (this.btnExtra) {
        switch (this.btnExtra) {
          case 'app':
            this.$parent.open_or_download_app(this.btnExtraParam);
            break;
          case 'share':
            this.$parent.share.is_show_guide = true;
            break;
        }
      }
    }
  }
});

Vue.filter('number', function(value, precision) {
  // if can be transformered to number
  if (value && /\d*(\.\d*)?/.test(value)) {
    return parseFloat(value).toFixed(precision || 0);
  } else {
    return value;
  }
});




/* eslint-disable no-new */
// new Vue({
//   el: '#vue-share',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: '#vue-share',
  router,
  template: require('/student.html')

})

window.vm = new Vue({
  el: '#vue-share',
  data: {

    school_id :'',
    student_id: "",
    trans_token : "",
    studentInfo :[{
      school :'某某某',
      student: "计算机学院",
    }

    ]
  },
  computed: {
    // 获取学生信息
    getStudentInfo: function () {
      var obj = {};
      if(query_args === undefined || !query_args ){
        obj.school_id =  school_id;
        obj.student_id = student_id;
        obj.trans_token = trans_token;

      }else{
        obj.school_id = this.school_id;
        obj.student_id = this.student_id;
        obj.trans_token = this.trans_token;

      }



      $.ajax({
        async : false,
        type: 'POST',
        url: util.addHttpParam(config.BANK_CGI_PREFIX + constants.CGI.query_student),
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        headers : {
          // params : JSON.stringify(device_info)
        },
        success: function (data) {
          if (data.ret_code == constants.CGI_RET_CODE.CGI_SUCCESS
            || data.ret_code == constants.CGI_RET_CODE.CGI_SUCCESS_2) {
            studentInfo =data.ret_data;
            if(studentInfo && studentInfo !== {}){
              sessionStorage.setItem("studentInfo",  JSON.stringify(studentInfo));

              callback(studentInfo);

            }

          }else {
            util.redirectFailPage("网络不给力，请稍后重试");
          }
        },
        error: function (err) {
          util.redirectFailPage(err.ret_msg);
        }
      });
    }
  },
  methods: {



    /**
     * 拉取学生缴费信息
     * @param callback
     */
    getStudentInfo : function (callback) {


      var obj = {};
      if(query_args === undefined || !query_args ){
        obj.school_id =  school_id;
        obj.student_id = student_id;
        obj.trans_token = trans_token;

      }else{
        obj.school_id = query_args['school_id'] || school_id;
        obj.student_id = query_args['student_id'] || student_id;
        obj.trans_token = query_args['trans_token'] || trans_token;

      }



      $.ajax({
        async : false,
        type: 'POST',
        url: util.addHttpParam(config.BANK_CGI_PREFIX + constants.CGI.query_student, params),
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType : 'application/json;charset=UTF-8',
        headers : {
          params : JSON.stringify(device_info)
        },
        success: function (data) {
          if (data.ret_code == constants.CGI_RET_CODE.CGI_SUCCESS
            || data.ret_code == constants.CGI_RET_CODE.CGI_SUCCESS_2) {
            studentInfo =data.ret_data;
            if(studentInfo && studentInfo !== {}){
              sessionStorage.setItem("studentInfo",  JSON.stringify(studentInfo));

              callback(studentInfo);

            }

          }else {
            util.redirectFailPage("网络不给力，请稍后重试");
          }
        },
        error: function (err) {
          util.redirectFailPage(err.ret_msg);
        }
      });
    },


    /**
     * 展示学生缴费信息
     * @param callback
     */
     showPayInfo : function (studentInfo) {

      var studentName = studentInfo.student_name;
      $(".name").html(studentName +"的学费");
      var totalPay = util.formatNumToMoney(studentInfo.tuition_fee.toString());
      $(".num").html("&yen; " + totalPay);


      var payDetail = function (index,item) {
        var dec = item.fee_name;
        var money = util.formatNumToMoney(item.original_fee.toString());
        var li = ' <li>' +
          '<p class="form-left">'+ dec +'</p>' +
          '<p class="form-right">'+ money +'</p>' +
          '</li>';

        $(".tui-list").append(li);

      };

      // studentInfo.detail 要为数组
      $.each(studentInfo.tuition_list, payDetail);


    }


  },
});





