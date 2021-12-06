const { User, Room, UserRoom } = require("../models/models");

const users = [];

const addUser = async ({ id, email, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    email = email.trim().toLowerCase();

        const user1 = await User.findOne( { where: { email } } );
    console.log("*** user1 = ", user1);
    if ( !user1 ) return { error: 'User with this email not found' };



    let room1 = await Room.findOne( { where: { name: room } } );
    if ( !room1 ) {
         room1 = await Room.create( { name: room } )
    }

    console.log('*** UserRoom = ', UserRoom);
    const existingUser1 = await UserRoom.findOne( { where: { userId: user1.id, roomId: room1.id } } );

    if(!email || !name || !room) return { error: 'Username, email and room are required.' };
    if(existingUser1) return { error: 'Username is taken.' };

    UserRoom.create( {userId: user1.id, roomId: room1.id} );

//    const room1 = await Room.create( name: room)*/

    const existingUser = users.find((user) => user.room === room && user.name === name);

//    const user_room = await UserRoom.create({userId, roomId})


    if(!name || !room) return { error: 'Username and room are required.' };
    if(existingUser) return { error: 'Username is taken.' };

    const user = { id, name, email, room };

    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };