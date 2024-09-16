import React, { useEffect, useState } from 'react'
import { allUrl, allData } from '../ApiService';
import UrlItem from './UrlItem';

const UrlList = () => {

  const [urlResult, setUrlResult] = useState({});
  const [sortCountries, setSortCountries] = useState ([]);

  useEffect(()=>{

    const getList = async()=>{
      try{
           const all_urls = await allUrl();
          //  console.log("all_urls = "+JSON.stringify(all_urls))
           const data = await allData(all_urls);
          //  console.log("data = "+JSON.stringify(data))

           let match_urls = await all_urls.map((url) =>{
             return data.find(item => item.url === url )
           });
           let all_matchUrl_no_null = await match_urls.filter((url_item) => typeof url_item !== 'undefined' && url_item !== null);
           console.log("match_urls = "+JSON.stringify(all_matchUrl_no_null))

           const groupedByCountry = await all_matchUrl_no_null.reduce((country_map, item) => {
            // console.log("item = "+JSON.stringify(item));
             let {country} = item;
            //  console.log("country = "+country);
             if(!country_map[country]){
               country_map[country] = []; 
             }
             country_map[country].push(item);
             return country_map;
           },{});
            
           for(const country in groupedByCountry){
             await groupedByCountry[country].sort((a,b) => b.est_emp - a.est_emp); 
           }

          //  console.log("groupCountry = "+JSON.stringify(groupedByCountry));

           const country_array_by_alpha_asc =  Object.keys(groupedByCountry).sort();
          //  console.log("type = "+typeof country_array_by_alpha_asc);
            
          //  console.log("country_list_by_asc = "+ country_array_by_alpha_asc);

           setSortCountries(country_array_by_alpha_asc);
           setUrlResult(groupedByCountry);
         } catch (error) {
            console.error('Error loading data:', error);
         }  

    }
  
    getList();
  },[])

  useEffect(()=>{
    console.log("urlResult = "+JSON.stringify(urlResult));
  },[urlResult])

  useEffect(()=>{
    console.log("sort countries = "+JSON.stringify(sortCountries));
  },[sortCountries])

  
  return (
    <div className='url-list'>
      {sortCountries.map(country => (
        <div className='country-name' key = {country}>
          <h1>{country}</h1>
          <p>---------------------------------------------</p>
          {urlResult[country].map((item) => (
              <UrlItem country = {country} urlItem = {item} key = {country}/>
      ))}
        </div>
        
      ))}
    </div>
  )
}

export default UrlList

// try{
        
      //   const url_response = await fetch('https://homeassignment-62de.restdb.io/rest/messages',{
      //     headers : {
      //       "x-apikey" : '66d059205842652f38576cb5',
      //       "Access-Control-Allow-Origin": "*" 
      //     }
      //   })
      //   const url_list = await url_response.json();
      //   let spec_url;
      //   const all_url = url_list.map((item)=>{
      //     let link = item._source.message[0].link;
          
      //     if(link.url !== null){
      //       spec_url = link.url.match(/redirect=([^&]+)/);
      //       return spec_url ? decodeURIComponent(spec_url[1]) : null;
      //     } 
      //   })

      //   let all_url_no_null = await all_url.filter((url_item) => typeof url_item !== 'undefined' && url_item !== null);
      //   console.log("urls = " + JSON.stringify(all_url_no_null));



      // try{
      // const data_response = await fetch('https://domaindata-e2bd.restdb.io/rest/data', {
      //   headers : {
      //     "x-apikey" : "66d7141f48fc47b023308bb3"
      //   }
      // })
      // let data = await data_response.json();
      
      // let match_urls = await all_url_no_null.map((url) =>{
      //   return data.find(item => item.url === url );
      // })
      
      // let match_urls_no_null = await match_urls.filter((item) => typeof item !== 'undefined');
      // console.log("match_urls = "+JSON.stringify(match_urls_no_null));
      // setUrlResult(match_urls_no_null);

      // }catch(error){
      //   console.error("error = "+error)
      // }