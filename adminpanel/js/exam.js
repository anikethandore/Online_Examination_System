// console.log("Hello Pallavi")

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let typeofuser = params.page;
// console.log(typeofuser)


let dataFromUser = (name) => {
    name=this.name;
}

// console.log(this.name);



    

    



const APP_ID = "ddf440dca6204b80b11453fef40841b3"
const TOKEN = "007eJxTYDj8RitvwvyHwrpxws0lsUVbbA7dnhwzX/+ItnG3T6NBEZcCQ0pKmomJQUpyopmRgUmShUGSoaGJqXFaapqJgYWJYZIxwyHn1IZARoYu4RusjAwQCOJzMeRklqXqlmWmpOYzMAAAm4wftA=="
const CHANNEL = "live-video"


const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)
    if(!(typeofuser === "live-exam")){
    
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 

        let player = `
                    <div class="card" style="width: 20rem;">
                        <div class="video-container" id="user-container-${UID}">
                                <div class="video-player" id="user-${UID}"></div>
                        </div>
                    </div>
                    
                    `



        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        localTracks[1].play(`user-${UID}`)
        
        await client.publish([localTracks[0], localTracks[1]])
    }
    
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    // document.getElementById('join-btn').style.display = 'none'
    // document.getElementById('stream-controls').style.display = 'flex'
}

let handleUserJoined = async (user, mediaType) => {
    document.getElementById('no-data').style.display = 'none'

    if(typeofuser === "live-exam"){
        remoteUsers[user.uid] = user 
        await client.subscribe(user, mediaType)

        if (mediaType === 'video'){
            let player = document.getElementById(`user-container-${user.uid}`)
            if (player != null){
                player.remove()
            }

            player = `<div class="col p-2" id="user-container-${user.uid}">
                        <div class="video-container" >
                            <div class="card" style="width: 20rem;">
                                <div class="card-body">
                                    <div class="video-player" id="user-${user.uid}"></div>
                                    <div class="name text-center">${user.uid}</div> 
                                </div>
                            </div>
                        </div>
                      </div>
            
            
                `
            document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

            user.videoTrack.play(`user-${user.uid}`)
        }

        if (mediaType === 'audio'){
            //user.audioTrack.play()
        }
    }
    
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }
    
    await client.leave()
    // document.getElementById('join-btn').style.display = 'block'
    // document.getElementById('stream-controls').style.display = 'none'
    // document.getElementById('video-streams').innerHTML = ''
}

let toggleMic = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}


if(!(typeofuser === "live-exam")){
    console.log("Please select")
    var full = document.getElementById('full-screen');
    
        document.getElementById('full-screen').onclick = function() {
            document.documentElement.requestFullscreen().then(() =>{
                console.log("LOG:full screen")
              })
              .catch((e)=>{
                console.log(e)
              });
        }
    
}


joinStream()

//document.getElementById('join-btn').addEventListener('click', joinStream)
// document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
// document.getElementById('mic-btn').addEventListener('click', toggleMic)
// document.getElementById('camera-btn').addEventListener('click', toggleCamera)