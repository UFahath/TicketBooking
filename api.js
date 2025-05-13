function geoCoordinates() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve([lat, lon]);
        },
        (error) => {
          alert(`Error Occurred: ${error.message}`);
          reject(error);
        }
      );
    } else {
      alert("Geolocation not supported by this browser.");
      reject("Geolocation not supported.");
    }
  });
}






async function geoReverseCoding() {
  try {
    const [lat, lon] = await geoCoordinates();
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=67e420c8dd000190053334mhob49ad2`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("Reverse geocode result:", data);
    return data.address.state; 
  } catch (error) {
    console.error("Error in geoReverseCoding:", error);
    return null;
  }
}



export default geoReverseCoding;