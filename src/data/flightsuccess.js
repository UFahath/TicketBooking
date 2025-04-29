const cityShortCode = {
  "Mumbai": "BOM",
  "Delhi": "DEL",
  "Bangalore": "BLR",
  "Chennai": "MAA",
  "Kochi": "COK",
  
  "New York": "NYC",
  "Los Angeles": "LAX",
  "London": "LON",
  "Dubai": "DXB",
  "Sydney": "SYD",
  "Melbourne": "MEL",
  "Berlin": "BER",
  "Frankfurt": "FRA",
  "Seoul": "ICN",
  "Toronto": "YYZ",
  "Singapore": "SIN",
  "Cape Town": "CPT",
  "Hong Kong": "HKG",
  "Paris": "PAR",
  "Tokyo": "TYO",
  "Madrid": "MAD",
  "Athens": "ATH",
  "Bangkok": "BKK",
  "Bali": "DPS",
  "Auckland": "AKL",
  "Beijing": "PEK",
  "Shanghai": "PVG",
  "Mexico City": "MEX",
  "Lima": "LIM",
  "Nairobi": "NBO",
  "Rome": "ROM",
  "Doha": "DOH"
};



const countryFullForm = {
  "IND": "India",
  "USA": "USA",
  "GBR": "UK",
  "ARE": "UAE",
  "AUS": "Australia",
  "DEU": "Germany",
  "KOR": "South Korea",
  "CAN": "Canada",
  "SGP": "Singapore",
  "ZAF": "South Africa",
  "CHN": "China",
  "FRA": "France",
  "JPN": "Japan",
  "ESP": "Spain",
  "GRC": "Greece",
  "THA": "Thailand",
  "IDN": "Indonesia",
  "NZL": "New Zealand",
  "MEX": "Mexico",
  "PER": "Peru",
  "KEN": "Kenya",
  "ITA": "Italy",
  "QAT": "Qatar"
};

export function cityMapper(city)
{
    return cityShortCode[city]||"No such Country Exists";
}

export function meridiemFixer(time)
{
  if(time.charAt(0)==="0"||Number(time.substring(0,time.indexOf(':')))<12)
  {
    return time+" AM";
  }
  else
  {
    return time+" PM"
  }
}
