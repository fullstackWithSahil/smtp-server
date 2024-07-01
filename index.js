const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    onConnect(session, cb) {
        console.log(session.toString());
        cb();
    },
    onMailFrom(address, session, cb) {
        console.log(session.toString());
        console.log("mail from: " + address.address);
        cb();
    },
    onRcptTo(address, session, cb) {
        console.log("rcpt to: " + address.address);
        console.log(session.toString());
        cb();
    },
    onData(stream, session, cb) {
        stream.on("data", (data) => console.log(data));
        stream.on("end", () => {
            console.log("stream ended");
            cb();
        });
    }
});

server.listen(25, () => console.log("server running..."));