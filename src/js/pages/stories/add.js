import Alert from "../../components/Alert";
import Story from "../../network/story";
import CheckUserAuth from "../../utils/check-user-auth";

const Add = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();
    const loadingSpinner = document.getElementById('loadingSpinner');
    const bgBlur = document.getElementById('bgBlur');

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        bgBlur.style.display = "flex";
        loadingSpinner.style.display = "flex";

        const response = await Story.store(formData);
        Alert("alert-success", 'New story added successfully');
        setInterval(() => this._goToDashboardPage(), 1000);
      } catch (error) {
        if (error.response) {
          Alert("alert-danger", error.response.data.message);
        } else if (error.request) {
          Alert("alert-danger", error.request.statusText);
        } else {
          Alert("alert-danger", error.message);
        }
      } finally {
        bgBlur.style.display = "none";
        loadingSpinner.style.display = "none";
      }
    }
  },

  _getFormData() {
    const photosInput = document.querySelector('#validationCustomFileInput');
    const descriptionInput = document.querySelector('#validationCustomDescription');

    return {
      photo: photosInput.files[0],
      description: descriptionInput.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
