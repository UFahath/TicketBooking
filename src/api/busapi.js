export const fetchBusData=async(url)=> {
  try {
    const response = await fetch(url);
    const data = await response.json();
     return data;
  } catch (error) {
    console.log(error);
  }
}