// 引用 dotenv 讀取 .env
import 'dotenv/config'
// 引用 linebot
import linebot from 'linebot'
import axios from 'axios'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async event => {
  if (event.message.type === 'text') {
    try {
      const { data } = await axios.get('https://data.moa.gov.tw/Service/OpenData/FaRss/FaRSS170.aspx?IsTransData=1&UnitId=H53')
      for (const info of data) {
        console.log(info);
        if (info.field005 === event.message.text) {
          event.reply([
            info.field001,
            info.field002,
            info.field003,
            info.field004,

          ])
          return
        }
      }
      event.reply('找不到')
    } catch (error) {
      console.log(error)
      event.reply('發生錯誤')
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
