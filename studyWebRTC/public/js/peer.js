import { socket, myStream } from "./index.js"

export function createPeer(user) {
    const rtcConfiguration = {
        iceServers: [{
            urls: 'stun:stun.l.google.com:19302'
        }]
    }
    const pc = new RTCPeerConnection(rtcConfiguration);

    for (const track of myStream.getTracks()) {
        pc.addTrack(track, myStream);
    }

    pc.ontrack = (ev) => {
        // if (user.player) {
        //     return
        // }
        user.player = addVideoPlayer(event.streams[0])
    }

    pc.onicecandidate = function (event) {
        if (!event.candidate) {
            return
        }

        socket.emit('candidate', {
            id: user.id,
            candidate: event.candidate
        })
    }



    pc.ondatachannel = function (event) {
        user.dc = event.channel
        setupDataChannel(user.dc)
    }

    return pc
}

function addVideoPlayer(stream) {
    var template = new DOMParser().parseFromString('<div class="col"><div class="videoWrapper card"><video class="responsive-video" width="300" height="300" autoplay></video></div></div>', 'text/html')
    template.getElementsByTagName('video')[0].srcObject = stream
    var  divPlayer = template.body.childNodes[0]
    document.getElementById('players').appendChild(divPlayer)
    return divPlayer
}

export async function createOffer(user) {
    user.dataChannel = user.peerConnection.createDataChannel("chat");
    const offer = await user.peerConnection.createOffer();
    await user.peerConnection.setLocalDescription(offer);

    socket.emit("offer", {
        id: user.id,
        offer: offer
    })
}

export async function answerPeer(user, offer) {
    user.dataChannel = user.peerConnection.createDataChannel("chat")
    await user.peerConnection.setRemoteDescription(offer);
    const answer = await user.peerConnection.createAnswer(offer);
    await user.peerConnection.setLocalDescription(answer);
    socket.emit("answer", {
        id: user.id,
        answer: answer
    })
}


function setupDataChannel(dataChannel) {
    dataChannel.onmessage = function (e) {
        console.log(e.data)
    }
}



