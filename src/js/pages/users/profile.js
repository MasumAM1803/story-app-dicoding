import User from "../../network/user";
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

    try {
      const response = await User.getById(userId);
      const responseRecords = response.data;

      const userProfile = responseRecords.story;
      this._populateStoriesData(userProfile);

    } catch (error) {
      console.log(error)
    }
  },

  _getUserId() {
    const searchParamDetail = new URLSearchParams(window.location.search);
    return searchParamDetail.has('id') ? searchParamDetail.get('id') : null;
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
