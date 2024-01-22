import CheckUserAuth from "../../utils/check-user-auth";

const Profile = {
  async init() {
    CheckUserAuth.checkLoginState();
    
    await this._initialData();
  },

  async _initialData() {
    const userId = this._getUserId();

    if (!userId) {
      alert('Data dengan name yang dicari tidak ditemukan');
      return;
    }

    const fetchRecords = await fetch('/data/DATA.json');
    const responseRecords = await fetchRecords.json();
    const userProfile = responseRecords.listStory;

    const dataRecord = userProfile.find((item) => item.name.replace(/\s/g, '') === userId);

    this._populateStoriesData(dataRecord);
  },

  _getUserId() {
    const searchParamDetail = new URLSearchParams(window.location.search);
    return searchParamDetail.has('name') ? searchParamDetail.get('name') : null;
  },

  _populateStoriesData(userProfile = null) {
    if (!(typeof userProfile === 'object')) {
      throw new Error(
        `Parameter userProfile should be an object. The value is ${userProfile}`,
      );
    }

    const userImg = document.querySelector('#userImg');
    const userName = document.querySelector('#userName');

    userImg.setAttribute('src', '/img/profile-dummy.png');
    userImg.setAttribute('alt', userProfile.name);
    userName.textContent = userProfile.name || 'Username Empty';

  },

  _templateEmptyProfile() {
    return `
      <p>User Tidak ditemukan</p>
    `;
  },
};

export default Profile;
