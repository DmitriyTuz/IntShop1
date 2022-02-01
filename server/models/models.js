const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    socketId: {type:  DataTypes.STRING},   // (***1***);

    name: {type:  DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const UserRoom = sequelize.define('user_room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})




const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, unique: true, allowNull: false}
})



User.hasOne(Basket, { onDelete: "cascade" })
Basket.belongsTo(User)

User.hasMany(Rating, { onDelete: "cascade" })
Rating.belongsTo(User)

Basket.hasMany(BasketDevice, { onDelete: "cascade" })
BasketDevice.belongsTo(Basket)

Type.hasMany(Device, { onDelete: "cascade" })
Device.belongsTo(Type)

Brand.hasMany(Device, { onDelete: "cascade" })
Device.belongsTo(Brand)

Device.hasMany(Rating, { onDelete: "cascade" })
Rating.belongsTo(Device)

Device.hasMany(BasketDevice, { onDelete: "cascade" })
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo,{as: 'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })



User.hasMany(Message, { onDelete: "cascade" })
Message.belongsTo(User)

//db.food.hasMany(db.meal, {as : 'Food', foreignKey : 'idFood'});

//Room.hasMany(Message, { onDelete: "cascade" })

Room.hasMany(Message, { onDelete: "cascade" }, {foreignKey : 'nameRoom'});
Message.belongsTo(Room)

User.belongsToMany(Room, { through: UserRoom })
Room.belongsToMany(User, { through: UserRoom })

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo,

    Room,
    Message,
    UserRoom
}