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
    }
}

export default Story