// frontend/js/profile.js
document.addEventListener('DOMContentLoaded', function () {
  var t = Lang.t, lang = Lang.getLanguage();
  var isEditing = false;
  var userData = { name: '', mobile: '', email: '', location: '', farmSize: '', memberSince: '' };

  // Translate labels
  document.getElementById('navBrand').textContent = t('agriSmart');
  document.getElementById('navHome').innerHTML = '<i class="fas fa-home"></i> ' + t('home');
  document.getElementById('navPlanting').innerHTML = '<i class="fas fa-seedling"></i> ' + t('plantingInsights');
  document.getElementById('navIrrigation').innerHTML = '<i class="fas fa-water"></i> ' + t('irrigationControl');
  document.getElementById('navHarvest').innerHTML = '<i class="fas fa-shopping-cart"></i> ' + t('harvestingUpdates');
  document.getElementById('piTitle').textContent = t('personalInformation');
  document.getElementById('fdTitle').textContent = t('farmDetails');
  document.getElementById('asTitle').textContent = t('accountSettings');
  document.getElementById('lFullName').textContent = t('fullName');
  document.getElementById('lMobile').textContent = t('mobileNumber');
  document.getElementById('lEmail').textContent = t('emailAddress');
  document.getElementById('lLocation').textContent = t('location');
  document.getElementById('lLang').textContent = t('preferredLanguage');
  document.getElementById('lFarmSize').textContent = t('farmSize');
  document.getElementById('asCpTitle').textContent = t('changePassword');
  document.getElementById('asCpDesc').textContent = t('updatePassword');
  document.getElementById('asLogout').textContent = t('logout');
  document.getElementById('asLogoutDesc').textContent = t('signOut');
  document.getElementById('editBtnText').textContent = t('editProfile');
  document.getElementById('cancelBtn').textContent = t('cancel');
  document.getElementById('saveBtn').innerHTML = '<i class="fas fa-edit"></i> ' + t('saveChanges');

  // Set display language text
  function getDisplayLang() {
    if (lang === 'en') return 'English (EN)';
    if (lang === 'hi') return 'हिन्दी (HI)';
    if (lang === 'mr') return 'मराठी (MR)';
    return 'English (EN)';
  }

  function populateFields() {
    document.getElementById('profileName').textContent = userData.name || '-';
    document.getElementById('memberSince').textContent = t('memberSince') + ' ' + (userData.memberSince || '');
    document.getElementById('valName').textContent = userData.name || '-';
    document.getElementById('valMobile').textContent = userData.mobile || '-';
    document.getElementById('valEmail').textContent = userData.email || '-';
    document.getElementById('valLocation').textContent = userData.location || '-';
    document.getElementById('valLang').textContent = getDisplayLang();
    document.getElementById('valFarmSize').textContent = userData.farmSize || '-';
    // Fill inputs
    document.getElementById('inputName').value = userData.name || '';
    document.getElementById('inputMobile').value = userData.mobile || '';
    document.getElementById('inputEmail').value = userData.email || '';
    document.getElementById('inputLocation').value = userData.location || '';
    document.getElementById('inputFarmSize').value = userData.farmSize || '';
    document.getElementById('inputLang').value = getDisplayLang();
  }

  // Load profile
  api.profile.getProfile().then(function (data) {
    if (data) { Object.assign(userData, data); }
    populateFields();
  });

  // Toggle edit
  function toggleEdit() {
    isEditing = !isEditing;
    var fields = ['Name', 'Mobile', 'Email', 'Location', 'FarmSize', 'Lang'];
    fields.forEach(function (f) {
      var val = document.getElementById('val' + f);
      var inp = document.getElementById('input' + f);
      if (isEditing) { val.classList.add('hidden'); inp.classList.remove('hidden'); }
      else { val.classList.remove('hidden'); inp.classList.add('hidden'); }
    });
    document.getElementById('editActions')[isEditing ? 'classList' : 'classList'].remove('hidden');
    if (isEditing) {
      document.getElementById('editActions').classList.remove('hidden');
      document.getElementById('editBtnText').textContent = t('saveChanges');
    } else {
      document.getElementById('editActions').classList.add('hidden');
      document.getElementById('editBtnText').textContent = t('editProfile');
    }
  }

  document.getElementById('editBtn').addEventListener('click', function () {
    if (isEditing) { saveProfile(); }
    toggleEdit();
  });
  document.getElementById('cancelBtn').addEventListener('click', function () {
    populateFields();
    toggleEdit();
  });
  document.getElementById('saveBtn').addEventListener('click', function () {
    saveProfile();
    toggleEdit();
  });

  function saveProfile() {
    userData.name = document.getElementById('inputName').value;
    userData.mobile = document.getElementById('inputMobile').value;
    userData.email = document.getElementById('inputEmail').value;
    userData.location = document.getElementById('inputLocation').value;
    userData.farmSize = document.getElementById('inputFarmSize').value;
    // Language
    var selLang = document.getElementById('inputLang').value;
    if (selLang === 'English (EN)') Lang.setLanguage('en');
    else if (selLang === 'हिन्दी (HI)') Lang.setLanguage('hi');
    else if (selLang === 'मराठी (MR)') Lang.setLanguage('mr');
    lang = Lang.getLanguage();
    populateFields();
    api.profile.updateProfile(userData);
    // Reload to apply language change
    if (selLang !== getDisplayLang()) {
      window.location.reload();
    }
  }

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', function () {
    window.location.href = 'login.html';
  });
});
