export let date=new Date()
export function time()
{
  let hour=Number(date.toTimeString().slice(0,date.toTimeString().indexOf(":")));
  if(hour>12)
  {
    hour=hour-12;
  }
  let min=date.toTimeString().slice(date.toTimeString().indexOf(":"),date.toTimeString().indexOf(" "));
  // console.log(date.toTimeString())
  return `${String(hour).padStart(2,"0")}${String(min)}`
}


export function dateFormatter(date)
{

  let weekDay={
    Mon:"Monday",
    Tue:"Tuesday",
    Wed:"Wednesday",
    Thu:"Thrusday",
    Fri:"Friday",
    Sat:"Saturday",
    Sun:"Sunday"
  }
  date=date.split(' ');
  date.length=date.length-1;
  for(let day in weekDay)
  {
    if(day===date[0])
    {
      date[0]=weekDay[day]+",";break;
    }
  }
  date=date.join(" ");
  return date;
}
