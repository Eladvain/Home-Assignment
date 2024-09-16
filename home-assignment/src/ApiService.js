export const allUrl = async () => {
  try{
        
    const response = await fetch('http://localhost:5001/api/messages');
    const all_urls = await response.json();
    // console.log("response = "+JSON.stringify(all_urls));
    return all_urls;
    
  }catch (err) {
      console.error("error = "+err);
      throw err
    }
}

export const allData = async (all_url)=>{
  try{

    const response = await fetch('http://localhost:5001/api/data');
    const all_data = await response.json();
    return all_data;
    
    }catch(err){
      console.error("error = "+err)
    }
}