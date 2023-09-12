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
      const { data } = await axios.get('https://cloud.hakka.gov.tw/Pub/Opendata/DTST20230500051.json')
      console.log('123')

      for (const n1 of data.data) {
        console.log('456')
        if (n1.SEQNO === event.message.text) {
          console.log('789')


          event.reply([
            n1.route,
            n1.description,
            {
              type: 'image',
              originalContentUrl: 'https://images.goodsmile.info/cgm/images/product/20221028/13471/106542/large/b68d75a06227910b9107c57ab0fa98cc.jpg',
              previewImageUrl: 'https://images.goodsmile.info/cgm/images/product/20221028/13471/106542/large/b68d75a06227910b9107c57ab0fa98cc.jpg',
            }
          ])
          // event.reply([
          //   info.Description,
          //   {
          //     type: 'location',
          //     title: info.Name,
          //     address: info.Add,
          //     latitude: info.Py,
          //     longitude: info.Px
          //   }
          // ])
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
