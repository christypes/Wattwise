const { login } = require("tplink-cloud-api");
const uuidV4 = require("uuid/v4");

const TPLINK_USER = process.env.TPLINK_USER;
const TPLINK_PASS = process.env.TPLINK_PASS;
const TPLINK_TERM = process.env.TPLINK_TERM || uuidV4();

async function main() {
  // log in to cloud, return a connected tplink object
  const tplink = await login("msg.shkim@gmail.com", "ck951753");
  console.log("current auth token is", tplink.getToken());

  // get a list of raw json objects (must be invoked before .get* works)
  const dl = await tplink.getDeviceList();
  console.log(dl);

  // find a device by alias:
  let myPlug = tplink.getHS100("My Smart Plug");
  // or find by deviceId:
  // let myPlug = tplink.getHS100("558185B7EC793602FB8802A0F002BA80CB96F401");
  console.log("myPlug:", myPlug);

  //let response = await myPlug.powerOn();
  //console.log("response=" + response );

  let response = await myPlug.toggle();
  console.log("response=" + response);

  response = await myPlug.getSysInfo();
  console.log("relay_state=" + response.relay_state);

  console.log(await myPlug.getRelayState());
}

main();