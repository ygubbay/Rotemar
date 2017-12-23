	
//Minimalistic and full featured ES6 approach:


exports.saveToken = (token) => {
  localStorage.setItem("token", token);
}

exports.getToken = () => {
  return localStorage.getItem("token");
}

exports.setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

exports.getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

exports.deleteCookie = (name, path) => {
  setCookie(name, '', -1, path)
}

exports.yyyymmdd = (date) => {
  
  var mm = date.getMonth() + 1; // getMonth() is zero-based
  var dd = date.getDate();

  return [date.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
}