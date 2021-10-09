class Namespace {
    constructor(id, nstitle, img, endpoint){
        this.id = id;
        this.nstitle = nstitle;
        this.img = img;
        this.endpoint = endpoint;
        this.rooms = [];
    }

    addRoom(roomobj){
        this.rooms.push(roomobj);
    }
}

module.exports = Namespace;