const {DeviceInfo} = require('../models/models')

class DeviceInfoController {

    async getAll(req, res) {
        const device_info = DeviceInfo.findOne()
        return res.json(device_info)
    }

}

module.exports = new DeviceInfoController()