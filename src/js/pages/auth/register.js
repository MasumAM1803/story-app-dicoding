import Alert from "../../components/Alert";
import Auth from "../../network/auth";
import CheckUserAuth from "../../utils/check-user-auth";

const Register = {
    async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
    },
   
    _initialListener() {
      const registerForm = document.querySelector('#registerForm');
      registerForm.addEventListener(
        'submit',
        async (event) => {
          event.preventDefault();
          event.stopPropagation();
   
   
          registerForm.classList.add('was-validated');
          await this._getRegistered();
        },
        false,
      );
    },
   
    async _getRegistered() {
      const formData = this._getFormData();
   
      if (this._validateFormData({ ...formData })) {
        console.log('formData');
        console.log(formData);
        try {
            const response = await Auth.register({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            });
            console.log(response)
            Alert("alert-success", 'Registered a new user');
            setInterval(() => this._goToLoginPage(), 2000);
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
      const name = document.querySelector('#validationCustomRecordName');
      const email = document.querySelector('#validationCustomEmail');
      const password = document.querySelector('#validationCustomPassword');
   
      return {
        name: name.value,
        email: email.value,
        password: password.value,
      };
    },
   
    _validateFormData(formData) {
      const formDataFiltered = Object.values(formData).filter((item) => item === '');
   
      return formDataFiltered.length === 0;
    },
   
    _goToLoginPage() {
      window.location.href = '/auth/login.html'
    }
  };
   
  export default Register;