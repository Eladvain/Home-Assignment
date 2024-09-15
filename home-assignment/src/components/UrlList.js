import React, { useEffect, useState } from 'react'

const UrlList = () => {

  const [urlResult, setUrlResult] = useState([]);

  useEffect(()=>{

    const getList = async()=>{
      try{
        const response = await fetch(`https://homeassignment-62de.restdb.io/rest/messages`,{
          headers : {
            "x-apikey" : "66d059205842652f38576cb5" 
          }
        })
        const url_list = await response.json();
        console.log("url_list = "+JSON.stringify(url_list));
        const message = url_list[0]._source.message;
        let spec_url;
        const urls = url_list.map((item)=>{
          let url = item._source.message[0].link;
          console.log("url = "+JSON.stringify(url));
          if(url.url !== null){
             spec_url = url.url.match(/redirect=([^&]+)/);
             if(spec_url === null){
              console.log("there is no match");
             }
             if(spec_url !== null){
              console.log("url after match = "+spec_url[1]);
              return spec_url[1];
            }
          }
        })
        console.log("urls = " + JSON.stringify(urls));
      }
      catch(error){
        console.error("error = "+error)
      }
    }
  
    getList();
  }, [])
  return (
    <div>
      <h1>hellp</h1>
    </div>
  )
}

export default UrlList
