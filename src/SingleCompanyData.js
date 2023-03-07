import React,{useState} from 'react';
import './SingleCompanyData.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Tables from './Tables';


const SingleCompanyData = (props) => {
    let [deptName , setDeptName] = useState("")
    let [minDate, setMinDate] = useState(new Date("9/2/2021"));
    let [maxDate, setMaxDate] = useState(new Date());
    let [displayCalender1 , setDisplayCalender1] = useState(false)
    let [displayCalender2 , setDisplayCalender2] = useState(false)

    const onChangeMinDate = (date) => {
        setMinDate(date)
        setDisplayCalender1(false)
   }
   const onChangeMaxDate = (date) => {
     setMaxDate(date)
     setDisplayCalender2(false)
}

console.log(minDate)  
console.log(maxDate)

    let data = props.data
    console.log(data)
    let departmets = props.department
    console.log(departmets)
    departmets[0].map((item) => {
        console.log(item)
    })
    
    console.log(deptName)

    let num = []
    
    for (let i = 0 ; i < data.length ; i++){
        let deparrs = data[i].Department
        let GrossCost = data[i].GrossCost.substr(1)
        let fuelCost = data[i].fuelCost.substr(1)
        let nonFuelCost = data[i].nonFuelCost.substr(1)
        let date = new Date(data[i].postDate)
        let netCost = data[i].netCost.substr(1)
        if(date >= minDate && date <= maxDate){
            num = num.concat({deptName : deparrs , grossCost : parseInt(GrossCost) , fuelCost : parseInt(fuelCost) , nonFuelCost : parseInt(nonFuelCost) , netCost : parseInt(netCost)})
        }
        
        
    }

    let nums = []

    const x = new Date('11/3/2021');
    const y = new Date('11/3/2021');
    const datee1 = new Date('11/3/2021');
    const datee2 = new Date('11/1/2021');

    // less than, greater than is fine:
    console.log('x < y', x < y); // false
    console.log('x > y', x > y); // false
    console.log('x <= y', x <= y); // true
    console.log('x >= y', x >= y); // true
    console.log('x == y', x === y);
    console.log(datee1 >= datee2) 
    
    for (let i = 0 ; i < data.length ; i++){
        let deparrs = data[i].Department
        let cardNumber = data[i].CardNumber
        let driverId = data[i].DriverID
        let compareDate = new Date("11/3/2021")
        let date = new Date(data[i].postDate)
        if(date >= compareDate){
            nums = nums.concat({deptName : deparrs , cardNumber : cardNumber , driverId : driverId })
        }

    }
    console.log(nums)

    let anomaliesArr = []

    for(let i = 0 ; i < nums.length ; i ++){
        if(nums[i].deptName == deptName){
            anomaliesArr = anomaliesArr.concat(nums[i])
        }
    }
    console.log(anomaliesArr)

    const newObjs = num.reduce((acc, prev) => {
        if (acc.length === 0) {
          return [prev]
        }
        const current = acc.findIndex(item => item.deptName === prev.deptName)
        const alreadyPresent = current !== -1
        if (alreadyPresent) {
          acc[current].grossCost = acc[current].grossCost + prev.grossCost
          acc[current].fuelCost = acc[current].fuelCost + prev.fuelCost
          acc[current].nonFuelCost = acc[current].nonFuelCost + prev.nonFuelCost
          acc[current].netCost = acc[current].netCost + prev.netCost
          return acc
        }
        return acc.concat(prev)
      }, [])


    console.log(data)
    console.log(num)
    console.log(newObjs)

    const selectDeptName = (e) =>{
        //console.log(e.target.value)
        //console.log(e.target.name)
        setDeptName(e.target.value)
    }

    let singleDepData = {
        grossCost : 0,
        fuelCost : 0,
        nonFuelCost : 0,
        avgCost : 0
    };

    for(let i = 0 ; i < newObjs.length ; i++){
        if(newObjs[i].deptName == deptName){
            console.log(newObjs[i])
            singleDepData = {
                grossCost : newObjs[i].grossCost,
                fuelCost : newObjs[i].fuelCost,
                nonFuelCost : newObjs[i].nonFuelCost,
                avgCost : parseInt(newObjs[i].netCost/newObjs[i].grossCost)
            }
      
        }
    }
    console.log(singleDepData)

    let date = minDate.getDate()
              let month = minDate.getMonth()
              let monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
              month = monthArr[month]
              let year = minDate.getFullYear()
              let minDateDisplay = `${date}-${month}-${year}`
              console.log(minDateDisplay)

              let date1 = maxDate.getDate()
              let month1 = maxDate.getMonth()
              month1 = monthArr[month1]
              let year1 = maxDate.getFullYear()
              let maxDateDisplay = `${date1}-${month1}-${year1}`
              console.log(maxDateDisplay)

    
    return(
        <>
        <div className='formMainDiv'>
        <h1>Department Information</h1>
        <div className='dateCalender'>
              <div className='singleDiv'>
                  <div className='buttonsDiv'>
                    <button className="Button" onClick={() => {setDisplayCalender1(true)}}>Select Start Date</button>  
                    <div style={{"backgroundColor" : "white"}}>{minDateDisplay}</div>
                  </div>
                  {displayCalender1 && <Calendar onChange={onChangeMinDate}  defaultActiveStartDate={new Date("10/4/2021")} minDate={new Date("10/4/2021")} maxDate={new Date("11/3/2021")} />}
              </div>
              <div className='singleDiv'>
                    <div className='buttonsDiv'>
                    <button className="Button" onClick={() => {setDisplayCalender2(true)}}>Select End Date</button>  
                    <div style={{"backgroundColor" : "white"}}>{maxDateDisplay}</div>
                  </div>
                  {displayCalender2 && <Calendar onChange={onChangeMaxDate}  defaultActiveStartDate={new Date("10/4/2021")}  minDate={new Date("10/4/2021")} maxDate={new Date("11/3/2021")} />}
              </div>
            </div>
            <form className='handleForm'>
                <label>Select Department : </label>
                <select name="departments" onChange={selectDeptName}>
                {departmets[0].map((item) => {
                    return(
                        <option value={item}>{item}</option>
                    )
                })}
                </select>
            </form>
            <p className='info'>Total Gallons : <span>{singleDepData.grossCost}</span></p>
            <p className='info'>Total Fuel spend : <span>{singleDepData.fuelCost}</span></p>
            <p className='info'>Total Non Fuel spend : <span>{singleDepData.nonFuelCost}</span></p>
            <p className='info'>Average Cost per gallons : <span>{singleDepData.avgCost}</span></p>
            <h3>Anomalies Test Last 24 Hrs </h3>
            <table>
            <tr style={{"backgroundColor" : "blue" , "color" : "white"}}>
                        <th>Driver ID</th>
                        <th>Pin</th>
                        </tr>
                        {anomaliesArr.map((item) => {
                            return(
                                <tr style={{"backgroundColor" : "white"}}>
                                <td>{item.driverId}</td>
                                <td>{item.cardNumber}</td>
                                </tr>
                            )
                        })}
            </table>
        </div>

        </>
    )
}

export default SingleCompanyData;