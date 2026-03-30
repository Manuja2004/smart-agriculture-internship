// frontend/js/signup.js
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('signupForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (name && email && password) {
      window.location.href = 'login.html';
    }
  });
});
