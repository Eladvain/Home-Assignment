const express = require('express');
const cors = require('cors')
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());


app.get('/api/messages', async (req, res) => {

  try{
        console.log("inside messages");
    const url_response = await fetch(`https://cdn.taboola.com/mobile-config/home-assignment/messages.json`);
    const url_list = await url_response.json();
    // console.log("response = "+ JSON.stringify(url_list));
    let spec_url;
    const all_url = url_list.map((item)=>{
      let link = item._source.message[0].link;
      // console.log("link = "+link)
      if(link.url !== null){
        spec_url = link.url.match(/redirect=([^&]+)/);
        return spec_url ? decodeURIComponent(spec_url[1]) : null;
      } 
    })

    let all_url_no_null = await all_url.filter((url_item) => typeof url_item !== 'undefined' && url_item !== null);
    // console.log("urls = " + JSON.stringify(all_url_no_null));
    res.json(all_url_no_null);
  }catch (err) {
      res.status(500).json({ 
        error : err.message 
     });
    }
  
})

app.get('/api/data', async (req, res) => {

  try{
    const data_response = await fetch('https://cdn.taboola.com/mobile-config/home-assignment/data.json')

    let data = await data_response.json();
    
    res.json(data);
    }catch(error){
      res.status(500).json({ 
        error : err.message 
     });
    }

})




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});