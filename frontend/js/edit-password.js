// frontend/js/edit-password.js
document.addEventListener('DOMContentLoaded', function () {
  var t = Lang.t, getText = Lang.getText;
  document.getElementById('pageTitle').textContent = t('changePassword');
  document.getElementById('saveBtn').textContent = t('saveChanges');
  document.getElementById('lbl1').textContent = getText('Current Password', 'सध्याचा पासवर्ड', 'वर्तमान पासवर्ड');
  document.getElementById('lbl2').textContent = getText('New Password', 'नवीन पासवर्ड', 'नया पासवर्ड');
  document.getElementById('lbl3').textContent = getText('Confirm New Password', 'नवीन पासवर्डची पुष्टी करा', 'नये पासवर्ड की पुष्टि करें');

  var form = document.getElementById('passwordForm');
  var errorBox = document.getElementById('errorBox');
  var successView = document.getElementById('successView');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var cur = document.getElementById('currentPassword').value;
    var np = document.getElementById('newPassword').value;
    var cp = document.getElementById('confirmPassword').value;
    errorBox.classList.add('hidden');

    if (!cur || !np || !cp) {
      errorBox.textContent = getText('Please fill all fields', 'सर्व फील्ड भरा', 'सभी फ़ील्ड भरें');
      errorBox.classList.remove('hidden'); return;
    }
    if (np !== cp) {
      errorBox.textContent = getText('New passwords do not match', 'नवीन पासवर्ड जुळत नाहीत', 'नये पासवर्ड मेल नहीं खाते');
      errorBox.classList.remove('hidden'); return;
    }
    if (np.length < 6) {
      errorBox.textContent = getText('Password must be at least 6 characters long', 'पासवर्ड कमीतकमी 6 अक्षरांचा असावा', 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए');
      errorBox.classList.remove('hidden'); return;
    }
    form.classList.add('hidden');
    successView.classList.remove('hidden');
    document.getElementById('successTitle').textContent = getText('Password Updated!', 'यशस्वीरित्या बदलले!', 'सफलतापूर्ण बदला गया!');
    document.getElementById('successMsg').textContent = getText('Redirecting to profile...', 'प्रोफाइलवर परत नेत आहे...', 'प्रोफ़ाइल पर वापस ले जाया जा रहा है...');
    setTimeout(function () { window.location.href = 'profile.html'; }, 2000);
  });
});
