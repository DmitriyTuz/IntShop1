const { User, Room, Message, Basket, BasketDevice, Device} = require('../models/models')
const {addUser, getUsersInRoom, getUser, removeUser} = require('../Chat/users_functions');
const ApiError = require("../error/ApiError");

class ChatController {

    async getChat(req, res, next) {
        const { email } = req.body
        if (!email) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        let chat = await User.findAll({attributes: [],
            include: [{
                model: Room, attributes:[],
                required: false,
                include: [{
                    model: Message, attributes:["id","text"],
                    required: false
                }]
            }]
        })
        return res.json(chat)
    };

    connectSocket(io)  {
        io.on('connect', (socket) => {

            console.log('Подключились !');

            socket.on('join', ({ name, room }, callback) => {

                console.log('Принимаем на сервере имя и комнату из события join созданного на клиенте  !', name, room);

                const { error, user } = addUser({ id: socket.id, name, room });

                if(error) return callback(error);

                socket.join(user.room);

                socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}.`});
                socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

                callback();
            });

            socket.on('sendMessage', (message, callback) => {
                const user = getUser(socket.id);

                io.to(user.room).emit('message', { user: user.name, text: message });

                callback();
            });

            socket.on('disconnect', () => {

                console.log('Отключились !');

                const user = removeUser(socket.id);

                if(user) {
                    io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
                    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
                }
            })
        });
    }

}

module.exports = new ChatController()