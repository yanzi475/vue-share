/**
 * Created by haiyanSong on 2017/9/1.
 */


define(function(require, exports ,module) {
  var constants = require('constants');
  var util = require('util');

  // var  Vue = require('util');

  var config = JSON.parse(sessionStorage.getItem('config'));
  var device_info = JSON.parse(sessionStorage.getItem('device_info'));

  var query_args = util.getQueryStringArgs();


  var service = new Vue({

    data:{
      // async : false,
      // type: 'POST',
      // url: util.addHttpParam(config.BANK_CGI_PREFIX + constants.CGI.query_student, params),
      // data: JSON.stringify(obj),
      // dataType: 'json',
      // contentType : 'application/json;charset=UTF-8',
      // headers : {
      //     params : JSON.stringify(device_info)
      // },
      params:{
        // url	string	请求的URL
        // method	string	请求的HTTP方法，例如：'GET', 'POST'或其他HTTP方法
        // body	Object, FormData string	request body
        // params	Object	请求的URL参数对象
        headers: ""


      }

    },
    computed:{
      getHeasers : function(){
        return  JSON.parse(sessionStorage.getItem('device_info'));
      }

    },
    method:{
      test:function(url,param,callback){
        this.$http.get(config.BANK_CGI_PREFIX + constants.CGI.query_cookie,this.computed,param).then(function(response){
          // get body data
          callback();
        }, function(response ) {
          // error callback
          util.redirectFailPage("网络不给力，请稍后重试");

        });
      }
    }


  });



  exports.querycookie = function(url,param,successCallback) {

    // service.test(url,param,callback);

    // 基于全局Vue对象使用http
    Vue.http.get(config.BANK_CGI_PREFIX + constants.CGI.query_cookie, device_info,param).then(
      successCallback(),
      function(response ) {
        // error callback
        util.redirectFailPage("网络不给力，请稍后重试");

      });


  }




  // //test
  // var testService = function(){
  //     demoService.querycookie('','',getStudentInfo);
  //
  // }



});


