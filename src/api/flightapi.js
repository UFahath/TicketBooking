 export async function flightData() {
      try {
        let response = await fetch("/TicketBooking/db.json");
        let data = await response.json();
        // console.log(data);
        return data.ticket_booking;
     
      } catch (error) {
        console.log(error);
      }
    }
 
