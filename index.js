var net=require('net');

var server=net.createServer();

var sockets=[];

server.on("connection", function(socket){
    console.log('Got a new connection');
    sockets.push(socket);
    socket.on('data',(data)=>{
        console.log(`Got data from socket connection ${sockets.indexOf(socket)}`, data.toString());

        sockets.forEach((otherSocket)=>{
            if(otherSocket!==socket){
                otherSocket.write(data.toString());
            }
        });
    });

})

server.on('error', (err)=>{
    console.log("Server error:",err.message);
});
server.on('close', ()=>{
    console.log("Server closed");
    var index=sockets.indexOf(socket);
    sockets.splice(index,1);
})


server.listen(4001);
