import React, { useEffect, useState } from 'react'

const UrlList = () => {

  const [urlResult, setUrlResult] = useState([]);

  useEffect(()=>{

    const getList = async()=>{
      try{
        const url_response = await fetch(`https://homeassignment-62de.restdb.io/rest/messages`,{
          headers : {
            "x-apikey" : "66d059205842652f38576cb5" 
          }
        })
        const url_list = await url_response.json();
        let spec_url;
        const all_url = url_list.map((item)=>{
          let link = item._source.message[0].link;
          
          if(link.url !== null){
            spec_url = link.url.match(/redirect=([^&]+)/);
            return spec_url ? decodeURIComponent(spec_url[1]) : null;
          } 
        })

        let all_url_no_null = await all_url.filter((url_item) => typeof url_item !== 'undefined' && url_item !== null);
        console.log("urls = " + JSON.stringify(all_url_no_null));
      
      const data_response = await fetch('https://domaindata-e2bd.restdb.io/rest/data', {
        headers : {
          "x-apikey" : "66d7141f48fc47b023308bb3"
        }
      })
      let data = await data_response.json();
      
      let match_urls = await all_url_no_null.map((url) =>{
        return data.find(item => item.url === url );
      })
      
      let match_urls_no_null = await match_urls.filter((item) => typeof item !== 'undefined');
      console.log("match_urls = "+JSON.stringify(match_urls_no_null));
      
      }catch(error){
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
