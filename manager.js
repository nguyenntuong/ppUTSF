// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var data = {
  id: localStorage.getItem('id'),
  passwd: localStorage.getItem('passwd'),
  loginbg: localStorage.getItem('logbackground'),
  Update: function() {
    this.id = localStorage.getItem('id');
    this.passwd = localStorage.getItem('passwd');
    this.loginbg = localStorage.getItem('logbackground');
  },
  SaveLocal: function() {
    localStorage.setItem('id', this.id);
    localStorage.setItem('passwd', this.passwd);
    localStorage.setItem('loginbg', this.loginbg.toString());
  },
  Save: function(id, passwd, loginbg) {
    localStorage.setItem('id', id);
    localStorage.setItem('passwd', passwd);
    localStorage.setItem('loginbg', loginbg.toString());
  }
};

function loadDoc(hash, cb) {
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://md5api.000webhostapp.com/api/emd5/' + hash,
    method: 'GET',
    timeout: 20000
  };
  var time = Date.now();
  $.ajax(settings)
    .done(function(data) {
      console.log(Date.now() - time);
      console.log(data);
      cb({
        status: data.hash_text === '' ? false : true,
        value: data.hash_text
      });
    })
    .fail(function(error) {
      cb({
        status: false,
        value: ''
      });
      console.log('Error', error);
    });
}

function login() {
  document.getElementById('login').innerHTML = 'Đang xữ lý !';
  document.getElementById('login').disabled = true;
  if (
    document.getElementById('username').value == '' ||
    document.getElementById('username').value.length != 10
  ) {
    alert('Đánh sai tài khoản kìa !');
    document.getElementById('login').innerHTML = 'LOGIN';
    document.getElementById('login').disabled = false;
    return false;
  }
  if (document.getElementById('password').value == '') {
    alert('Hình như quên mật khẩu !');
    document.getElementById('login').innerHTML = 'LOGIN';
    document.getElementById('login').disabled = false;
    return false;
  }
  data.id = document.getElementById('username').value;
  data.passwd = document.getElementById('password').value;
  data.loginbg = document.getElementById('logbackground').checked;

  console.log(data);
  data.SaveLocal();
  GetCurrentTab(function(tab) {
    console.log('Inject script!');
    chrome.tabs.executeScript(
      tab.id,
      {
        code:
          '(' +
          function() {
            console.log('Redirect to UTS');
            window.location = 'https://sv.ut.edu.vn/';
          } +
          ')();'
      },
      function(results) {
        console.log('Login Process');
        document.getElementById('login').innerHTML = 'LOGIN';
        document.getElementById('login').disabled = false;
        localStorage.setItem('logFrmEx', 'true');
      }
    );
  });
}

function loginbg(hash, cb) {
  data.Update();
  loadDoc(hash, function(rs) {
    rs.data = data;
    cb(rs);
  });
}

function onload() {
  data.Update();
  document.getElementById('username').value = data.id;
  document.getElementById('password').value = data.passwd;
  document.getElementById('logbackground').checked = data.loginbg == 'true';
  document.getElementById('removepopup').checked =
    localStorage.getItem('removepopup') == 'true';
}

function ReadUserInfo() {
  onload();
}
