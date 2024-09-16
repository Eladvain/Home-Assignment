const express = require('express');
const cors = require('cors')
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// get http call from my frontend - first to messages
app.get('/api/messages', async (req, res) => {

  try{
    console.log("inside");
    // fetch to this address acordding to assignement instrucstions
    const url_response = await fetch(`https://cdn.taboola.com/mobile-config/home-assignment/messages.json`);
    const url_list = await url_response.json();
  
    let spec_url;

    //all_url is a variable with all valid url and null when url is not valid
    const all_url = url_list.map((item)=>{

      let link = item._source.message[0].link;

      if(link.url !== null){
        // search where url start with redirect=
        spec_url = link.url.match(/redirect=([^&]+)/);
        return spec_url ? decodeURIComponent(spec_url[1]) : null;
      } 
    })

    //Here I remove all null in all_url variable and get only valid urls without null
    let all_url_no_null = await all_url.filter((url_item) => typeof url_item !== 'undefined' && url_item !== null);
    console.log("all url = "+JSON.stringify(all_url_no_null))
    res.json(all_url_no_null);

  }catch (err) {
      res.status(500).json({ 
        error : err.message 
     });
    }
  
})

// get http call from my frontend - second to data
app.get('/api/data', async (req, res) => {

  try{

    // fetch to this address acordding to assignement instrucstions
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