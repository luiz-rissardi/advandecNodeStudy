


export class User{

    id;
    dataChannel;
    peerConnection;
    player
    constructor(id) {
        this.id = id;
    }

    selfDestroy(){
        if(this.player){
            this.player.remove();
        }

        if(this.peerConnection){
            this.peerConnection.close();
            this.peerConnection.onicecandidate = null
            this.peerConnection.ontrack = null
            this.peerConnection = null
        }
    }

    sendMessage(message){
        this.dataChannel.send(message)
    }


}