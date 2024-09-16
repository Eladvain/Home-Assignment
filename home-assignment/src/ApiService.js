
//here I execute a fetch to my server and get from him all urls from my first database. 
export const getAllUrl = async () => {
  try{

       // fetch request from my server with endpoint /api/messages
    const response = await fetch('http://localhost:5001/api/messages');
    const all_urls = await response.json();
    
    return all_urls;
    
  }catch (err) {
      throw err;
    }
}

//here I execute a fetch to my server and get from him all data from my second database.
export const getAllData = async (all_url)=>{
  try{

    // fetch request from my server with endpoint /api/data
    const response = await fetch('http://localhost:5001/api/data');
    const all_data = await response.json();

    return all_data;
    
    }catch(err){
      throw err;
    }
}