const { default: axios } = require("axios")
const { default: Api } = require("../config/api")
const { default: Utils } = require("../utils/utils")
const { default: Config } = require("../config/config")

const Story = {
    async getAll() {
        return await axios.get(Api.GET_ALL_STORY, {
            headers: {
                Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        })
    },

    async getById(id) {
        return await axios.get(Api.GET_BY_ID_STORY(id), {
            headers: {
                Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`
            }
        })
    },

    async store({ photo, description }) {
        
        const data = { description, photo };

        return await axios.post(Api.STORE_STORY, data, {
            headers: {
                Authorization: `Bearer ${Utils.getUserToken(Config.USER_TOKEN_KEY)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
    },
}

export default Story