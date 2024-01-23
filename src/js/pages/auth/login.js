import Alert from "../../components/Alert";
import Config from "../../config/config";
import Auth from "../../network/auth";
import CheckUserAuth from "../../utils/check-user-auth";
import Utils from "../../utils/utils";

const Login = {
    async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
    },
   
    _initialListener() {
      const loginForm = document.querySelector('#loginForm');
      loginForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();
          event.stopPropagation();
   
          loginForm.classList.add('was-validated');
          await this._getLogged();
        },
        false,
      );
    },
   
    async _getLogged() {
      const formData = this._getFormData();
   
      if (this._validateFormData({ ...formData })) {
        console.log('formData');
        console.log(formData);
        try {
            const response = await Auth.login({
              email: formData.email,
              password: formData.password,
            });
            Utils.setUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
            Alert("alert-success", 'Signed in successfully');
            setInterval(() => this._goToDashboardPage(), 2000);
          } catch (error) {
            if (error.response) {
              Alert("alert-danger", error.response.data.message);
            } else if (error.request) {
              Alert("alert-danger", error.request.statusText);
            } else {
              Alert("alert-danger", error.message);
            }
          }
      }
    },
   
    _getFormData() {
      const email = document.querySelector('#validationCustomRecordEmail');
      const password = document.querySelector('#validationCustomPassword');
   
      return {
        email: email.value,
        password: password.value,
      };
    },
   
    _validateFormData(formData) {
      const formDataFiltered = Object.values(formData).filter((item) => item === '');
      
      return formDataFiltered.length === 0;
    },

    _validateInputEmail(email) {
        const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!email.match(validEmail)) {
            return false;
        }
      },
   
    _goToDashboardPage() {
      window.location.href = '/';
    },
  };
   
  export default Login;