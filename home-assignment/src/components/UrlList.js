import React, { useEffect, useState, useRef } from 'react'
import { getAllUrl, getAllData } from '../ApiService';
import UrlItem from './UrlItem';

const UrlList = () => {

  const [urlResult, setUrlResult] = useState({});
  const [sortCountries, setSortCountries] = useState ([]);
  
  const isFirstRender = useRef(true);

  useEffect(()=>{

    const getList = async()=>{
      try{
        console.log("hereee");
           //get all urls from messages.json url
           const all_urls = await getAllUrl();

           //get all data from data.json url
           const data = await getAllData(all_urls);
        
           //get all data that has match between urls in data and urls in all_urls.
           let match_urls = await all_urls.map((url) =>{
             return data.find(item => item.url === url )
           });

           //eliminate null 
           let all_matchUrl_no_null = await match_urls.filter((url_item) => typeof url_item !== 'undefined' && url_item !== null);
           
           //arrange all data in an object of {"country",[item1, item2...]} - group by country
           const groupedByCountry = await all_matchUrl_no_null.reduce((country_map, item) => {
            
             let {country} = item;
            
             //if country is not exist in keys
             if(!country_map[country]){
               country_map[country] = []; 
             }

             country_map[country].push(item);
             return country_map;

           },{});
            
           //sort every country and group it by estimated number of employees.
           for(const country in groupedByCountry){
             await groupedByCountry[country].sort((a,b) => b.est_emp - a.est_emp); 
           }

           //sort countries by alphabetical order.
           const country_array_by_alpha_asc =  Object.keys(groupedByCountry).sort();
           console.log("countries = "+country_array_by_alpha_asc)
           setSortCountries(country_array_by_alpha_asc);
           setUrlResult(groupedByCountry);

         } catch (error) {
            console.error('Error loading data:', error);
         }  

    }
    // I execute interval because if data changed, I want to see this changes in web page.

    //In first render I want to see the data
  if(isFirstRender.current){
    console.log("inside");
     getList();
    isFirstRender.current = false;
  }  

  //after I want each minute to get again all data, because maybe data is changed in server.
  else{
    //reder getList every one minute
    const interval = setInterval(() =>{
      getList();
    }, 60000);
    return () => clearInterval(interval);  
  
  }
  },[])

  useEffect(()=>{
    return;
  },[urlResult])

  useEffect(()=>{
    return;
  },[sortCountries])

  
  return (
    <div className='url-list'>
      {sortCountries.map((country, index) => (
        <div key = {index} >
          <h1>{country}</h1>
          <p>---------------------------------------------</p>
          {urlResult[country].map((item, i) => (
              <UrlItem country = {country} urlItem = {item} key = {i} />
      ))}
        </div>
        
      ))}
    </div>
  )
}

export default UrlList
