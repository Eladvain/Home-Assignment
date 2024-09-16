export const allUrl = async () => {
  try{
        
    const response = await fetch('http://localhost:5001/api/messages');
    return response;
    
  }catch (err) {
      console.error("error = "+err);
      throw err
    }
}

export const allData = async (all_url)=>{
  try{

    const response = await fetch('http://localhost:5001/api/data');
    return response.data;
    
    }catch(err){
      console.error("error = "+err)
    }
}