// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var _try = 0;
var isProcess = false;
chrome.tabs.onUpdated.addListener(callback);

function try_log(some, tabId, changeInfo, tab) {
  console.log('Login Process');
  localStorage.setItem('logFrmEx', 'false');
  if (!isProcess) {
    isProcess = true;
    chrome.tabs.executeScript(tabId, {
      code: '(' + function () {
        let txtSecurityCodeValue = document.getElementById("txtSecurityCodeValue");
        if (txtSecurityCodeValue) {
          return txtSecurityCodeValue.value;
        } else {
          return null;
        }
      } + ')();'
    }, function (results) {
      console.log(results[0]);
      loginbg(results[0], cb);

      function cb(rs) {
        let v = "";
        if (rs.status) {
          v = rs.value;
        } else
          isProcess = false;
        if (v === "" && _try < 5) {
          chrome.tabs.executeScript(tabId, {
            code: '(' +
              function () {
                document.getElementById("imgRefresh").click();
              } + ')();'
          }, function (results) {
            console.log('try Login Again');
            isProcess = false;
            _try++;
            try_log(some);
          });
        } else {
          _try = 0;
          chrome.tabs.executeScript(tabId, {
            code: 'var id="' + rs.data.id + '";var passwd="' + rs.data.passwd + '";var val="' + v + '";' +
              '(' +
              function () {
                document.getElementById('ctl00_ucRight1_txtMaSV').value = id;
                document.getElementById('ctl00_ucRight1_txtMatKhau').value = passwd;
                document.getElementById('ctl00_ucRight1_txtSercurityCode').value = val;
                val !== "" ? document.getElementById('ctl00_ucRight1_btnLogin').click() : document.getElementById("full").remove() && document.getElementById("loader").remove() && alert("Mọi nổ lực đã thất bại hoàn hảo, nhập tay đi bạn :) !");
              } + ')();'
          }, function (results) {
            console.log('Login Step 2');
            isProcess = false;
          });
        }
      }
    });
  }
}

function callback(tabId, changeInfo, tab) {
  data.Update();
  var logFrmEx = localStorage.getItem('logFrmEx');
  const regex = /(sv\.ut\.edu\.vn)/gim;
  // Check Còn đăng nhập hay không ctl00_ucRight1_btnLogin
  if (changeInfo.status === 'complete' && (tab.url === 'https://sv.ut.edu.vn/Default.aspx' || tab.url === 'https://sv.ut.edu.vn/' || tab.url === 'https://sv.ut.edu.vn')) {

    chrome.tabs.executeScript(tabId, {
      code: '(' + function () {
        console.log("run script checklogin");
        let ctl00_ucRight1_btnLogin = document.getElementById("ctl00_ucRight1_btnLogin");
        if (ctl00_ucRight1_btnLogin) {
          return true;
        } else {
          return false;
        }
      } + ')();'
    }, function (results) {
      console.log(results[0]);
      if (results[0]) {
        // AutoLogin
        console.log(logFrmEx);
        if (data.id !== null && (data.loginbg === 'true' || logFrmEx === 'true')) {
          chrome.tabs.executeScript(tabId, {
            code: '(' + function () {
              console.log("run script Login");
              let script = document.createElement('script');
              script.innerHTML = 'function Check(){var t=$("#ctl00_ucRight1_txtSercurityCode").val(),c=$("#txtSecurityCodeValue").val(),e=document.getElementById("ctl00_ucRight1_txtMaSV").value,u=document.getElementById("ctl00_ucRight1_txtMatKhau").value;return 0==trim(e).length?(alert("Mã sinh viên không được trống."),$("#ctl00_ucRight1_txtMaSV").focus(),!1):0==trim(u).length?(alert("Mật khẩu không được trống."),$("#ctl00_ucRight1_txtMatKhau").focus(),!1):(document.getElementById("ctl00_ucRight1_txtEncodeMatKhau").value=MD5(u),""==t?(alert("Mã bảo vệ chưa nhập."),$("#ctl00_ucRight1_txtSercurityCode").focus(),!1):MD5(t)!=c?(alert("Mã bảo vệ không đúng."),$("#ctl00_ucRight1_txtSercurityCode").focus(),LoadConfirmImage(),!1):(EncryptData(),!0))}';
              let style = document.createElement('style');
              style.innerHTML = ('*,:after,:before{box-sizing:border-box;margin:0;padding:0}#full{position:fixed;width:100%;height:100%;z-index:999;right:0;bottom:0;background:#09ab0985}#loader{position:fixed;width:160px;height:100px;z-index:1000;right:0;bottom:0;background:0 0}#outline{stroke-dasharray:2.43px,242.78px;stroke-dashoffset:0;-webkit-animation:anim 1.6s linear infinite;animation:anim 1.6s linear infinite}@-webkit-keyframes anim{12.5%{stroke-dasharray:33.99px,242.78px;stroke-dashoffset:-26.71px}43.75%{stroke-dasharray:84.97px,242.78px;stroke-dashoffset:-84.97px}100%{stroke-dasharray:2.43px,242.78px;stroke-dashoffset:-240.35px}}@keyframes anim{12.5%{stroke-dasharray:33.99px,242.78px;stroke-dashoffset:-26.71px}43.75%{stroke-dasharray:84.97px,242.78px;stroke-dashoffset:-84.97px}100%{stroke-dasharray:2.43px,242.78px;stroke-dashoffset:-240.35px}}');
              let div = document.createElement('div');
              div.setAttribute('id', 'loader');
              div.innerHTML = ('<svg width="100%" height="100%" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet" style="left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0);"> <path stroke="#fb0000" id="outline" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/> <path id="outline-bg" opacity="0.05" fill="none" stroke="#ededed" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/> </svg>');
              let divf = document.createElement('div');
              divf.setAttribute('id', 'full');
              divf.append(div);
              document.body.append(style);
              document.body.append(divf);
              document.body.append(script);
            } + ')();'
          }, function (results) {
            try_log(results, tabId, changeInfo, tab);
          });
        }
      }
    });
  }

  // Gở Popup
  if (localStorage.getItem('removepopup') === 'true' && changeInfo.status === 'loading' && (tab.url.match(regex) != null)) {
    console.log("Remove Popup");
    console.log(tabId);
    chrome.tabs.executeScript(tabId, {
      code: '(' + function () {
        console.log("run script");
        let DivDialog = document.getElementsByClassName("DivDialog");
        if (DivDialog !== undefined) {
          for (let index = 0; index < DivDialog.length; index++) {
            DivDialog[index].remove();
          }
        }
        let DivLockScreen = document.getElementsByClassName("DivLockScreen");
        if (DivLockScreen !== undefined) {
          for (let index = 0; index < DivLockScreen.length; index++) {
            DivLockScreen[index].remove();
          }
        }
      } + ')();'
    }, function (results) {
      console.log('Remove Completed');
    });
  }
}