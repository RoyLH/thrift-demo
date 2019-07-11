'use strict';

const thrift = require('thrift');

const ThriftTest = require('./gen-nodejs/ThriftTest');
const ttypes = require('./gen-nodejs/test_types');

const transport = thrift.TBufferedTransport();
const protocol = thrift.TBinaryProtocol();

const connection = thrift.createConnection('127.0.0.1', 7410, {
  transport,
  protocol
});
const client = thrift.createClient(ThriftTest, connection);


connection.on('error', err => {
  console.log('connection_error', err);
});

client.plus(1, 1, (err, result) => {
  //connection.end(); //如果不关闭连接，那么强制断开连接，将会导致后端出现error
  if(err){
    console.log('method_err', err);
    return;
  }
  console.log(result);
});