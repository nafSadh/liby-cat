const request = require('request');
module.exports = {
  /**
   * Checks if a string is a valid Idx
   * */
  validIdx: function (str) {
    return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(str);
  },
  
  verifyReCaptcha: function (gReCaptchaResponse, secret, successFn, failedFn, errFn) {
    request.post(
      {
        url: 'https://www.google.com/recaptcha/api/siteverify',
        form: {
          secret: secret,
          response: gReCaptchaResponse
        }
      },
      function (err, httpResponse, body) {
        if (err) {
          console.log(err);
          errFn(err);
        } else {
          let res = JSON.parse(body);
          if (res.success) {
            successFn();
          } else {
            failedFn();
          }
        }
      });
  }
};

