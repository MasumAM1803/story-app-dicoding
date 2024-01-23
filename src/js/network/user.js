const { default: axios } = require("axios")
const { default: Api } = require("../config/api")
const { default: Utils } = require("../utils/utils")
const { default: Config } = require("../config/config")

const User = {
    async getById(id) {
        return await axios.get(Api.GET_BY_ID_USER(id), {
            headers: {
                Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        })
    },
}

export default User