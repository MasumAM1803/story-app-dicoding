import formatDate from '../formattedDate.js'
import CheckUserAuth from '../utils/check-user-auth.js';
import Story from '../network/story.js'
import Alert from '../components/Alert.js';

const Dashboard = {
  async init() {
    CheckUserAuth.checkLoginState();

    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    try {
      loadingSpinner.style.display = "flex";
      const response = await Story.getAll();
      const responseRecords = response.data;

      this._userListStory = responseRecords.listStory;
      this._populateStoriesDataToCard(this._userListStory);

    } catch (error) {
      if (error.response) {
        Alert("alert-danger", error.response.data.message);
      } else if (error.request) {
        Alert("alert-danger", error.request.statusText);
      } else {
        Alert("alert-danger", error.message);
      }
    } finally {
      loadingSpinner.style.display = "none";
    }
  },

  _initialListener() {
    const recordDetailModal = document.getElementById('recordDetailModal');
    recordDetailModal.addEventListener('show.bs.modal', (event) => {
      const modalTitle = recordDetailModal.querySelector('.modal-title');
      modalTitle.focus();

      const button = event.relatedTarget;
      const dataRecord = this._userListStory.find((item) => {
        return item.id == button.dataset.recordId;
      });

      this._populateDetailStoryToModal(dataRecord);
    });
  },

  _populateStoriesDataToCard(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(
        `Parameter listStory should be an object. The value is ${listStory}`,
      );
    }

    if (!Array.isArray(listStory)) {
      throw new Error(
        `Parameter listStory should be an array. The value is ${listStory}`,
      );
    }

    const recordCard = document.querySelector('#recordsCard');

    recordCard.innerHTML = '';
    if (listStory.length <= 0) {
      recordCard.innerHTML = this._templateEmptyCard();
      return;
    }

    listStory.forEach((item, idx) => {
      recordCard.innerHTML += this._templateCard(idx, listStory[idx]);
    });
  },

  _populateDetailStoryToModal(storyRecord) {
    if (!(typeof storyRecord === 'object')) {
      throw new Error(
        `Parameter storyRecord should be an object. The value is ${storyRecord}`,
      );
    }

    const imgDetailRecord = document.querySelector('#recordDetailModal #imgDetailRecord');
    const nameDetailRecord = document.querySelector('#recordDetailModal #nameDetailRecord');
    const dateDetailRecord = document.querySelector('#recordDetailModal #dateDetailRecord');
    const descriptionDetailRecord = document.querySelector('#recordDetailModal #descriptionDetailRecord');

    imgDetailRecord.setAttribute('src', storyRecord.photoUrl);
    imgDetailRecord.setAttribute('alt', storyRecord.name);
    nameDetailRecord.textContent = storyRecord.name;
    dateDetailRecord.textContent = formatDate(storyRecord.createdAt);
    descriptionDetailRecord.textContent = storyRecord.description || '-';
  },

  _templateCard(index, storyRecord, photo_url = "") {
    if (storyRecord.photoUrl == null) {
      photo_url = 'https://dummyimage.com/500x750/cccccc/000000&text=No+Poster'
    } else {
      photo_url = storyRecord.photoUrl
    }
    return `
      <div class="col-12 col-md-6 mt-3">
        <div class="card">
          <div class="card__header m-2">
            <a class="" href="/users/profile.html?id=${storyRecord.id}">
              <h1 class="card__header-title">${storyRecord.name}</h4>
            </a>
          </div>
          <a href="#"
            data-bs-toggle="modal" data-bs-target="#recordDetailModal" 
            data-record-id="${storyRecord.id}">
            <div class="card__body">
              <img class="card__body-image w-100 h-50" src="${photo_url}" alt="${storyRecord.name}-images">
              <p class="card__body-description m-2 text-start">${storyRecord.description.slice(0, 100)} ...</p>
              <p class="card__body-date m-2">${formatDate(storyRecord.createdAt)}</p>
            </div>
          </a>
        </div>
      </div>
    `;
  },

  _templateEmptyCard() {
    return `
      <div class="card__header">
        <p>Tidak ada story</p>
      </div>
    `;
  },
};

export default Dashboard;
