// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
// const tencentcloud = require("tencentcloud-sdk-nodejs");
// const SmsClient = tencentcloud.sms.v20190711.Client;
const SMSClient = require('@alicloud/sms-sdk');
const clientConfig = {
  accessKeyId: "LTAI5tBPiTLpiawTe5QkseXa",
  // secretAccessKey: "60M9cCDlfhMxu594Snrl7D5plB1DgW"
    secretAccessKey: "x3CtJpiNMagmUkY5WLZybLU1iKhcpu"
};
function RndNum(n) {
    let rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

const client = new SMSClient(clientConfig);
const sendMessage = (phoneNum, VerificationCode) => {
    const params = {
      PhoneNumbers: phoneNum,

      // SignName: '贝思优选',
      // TemplateCode: 'SMS_204105225',
      // TemplateParam: `{\"code\":\"${codes}\"}`
      SignName: '夜猫',
      TemplateCode: 'SMS_275000160',
      TemplateParam: `{"code":'${VerificationCode}'}`
    };
    console.log(params)
    return client.sendSMS(params).then(
        (data) => {
          console.log(data)
            return VerificationCode
        },
        (err) => {
            return err
        }
    )
}
// 倒计时 没有写
// sendMessage("1111111111", "123123")
module.exports = { sendMessage, RndNum }