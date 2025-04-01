import DateObject from 'react-date-object'


let dateObj=new DateObject();
let dateArr=[];
// console.log(date.format("ddd DD MMM"))

for(let i=0;i<7;i++)
{
  dateObj.day+=i;
  dateArr.push(dateObj);
}

console.log(dateArr)