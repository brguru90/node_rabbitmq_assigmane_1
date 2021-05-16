
// var amqp = require('amqplib/callback_api');
// var channel=null

// ge_channel=(disconnect)=>{

//     amqp.connect('amqp://localhost', function(error0, connection) {
//     if (error0) {
//         throw error0;
//     }
//     connection.createChannel(function(error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var queue = 'api_data';
//         // var msg = 'Hello World!';

//         channel.assertQueue(queue, {
//             durable: false
//         });
//         // channel.sendToQueue(queue, Buffer.from(msg));
//         channel.sendData=(msg)=>{
//             channel.sendToQueue(queue, Buffer.from(msg));
//             console.log(" [x] Sent %s", msg);
//         }

//         // console.log(" [x] Sent %s", msg);
//     });
// });

// disconnect=()=>{

// }

// }


// const amqplib = require('amqplib');
// var amqp_url = process.env.CLOUDAMQP_URL || 'amqp://localhost';
// var conn = await amqplib.connect(amqp_url, "heartbeat=60");
// var ch = await conn.createChannel()
// var exch = 'test_exchange';
// var q = 'api_data';
// var rkey = 'test_route';
// var msg = 'Hello World!';
// await ch.assertExchange(exch, 'direct', {durable: true}).catch(console.error);
// await ch.assertQueue(q, {durable: true});
// await ch.bindQueue(q, exch, rkey);

const amqplib = require('amqplib');
 var amqp_url = process.env.CLOUDAMQP_URL || 'amqp://localhost';

// var rabbit={
//     conn:null,
//     ch:null,
//     exch: 'test_exchange',
//     q:'api_data',
//     rkey:'test_route',
//     connect:async ()=>{
//         let conn=await amqplib.connect(amqp_url, "heartbeat=60")
//         this.conn=conn
//     },
//     init:()=>{
//         this.connect().then(async ()=>{
//             this.ch=await conn.createChannel()
//             await ch.assertQueue(q, {durable: false});
//         })
//     },
//     send:async (msg)=>await ch.sendToQueue(q, Buffer.from(msg)),
//     disconnect:()=>ch.close()
// }


const somefun= function () {
    this.conn=null;
    this.ch=null;
    const exch= 'test_exchange'
    const q='api_data'
    const rkey='test_route'

    this.connect=async ()=>{
        this.conn=await amqplib.connect(amqp_url, "heartbeat=60")
    }
    this.init=()=>{
        this.connect().then(async ()=>{
            this.ch=await this.conn.createChannel()
            await this.ch.assertQueue(q, {durable: false});
        })
    }
    this.send=async (msg)=>await this.ch.sendToQueue(q, Buffer.from(msg))
    this.disconnect=()=>this.ch.close()
}

module.exports=somefun
