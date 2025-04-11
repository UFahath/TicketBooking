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