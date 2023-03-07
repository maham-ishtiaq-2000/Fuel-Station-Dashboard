import React,{useState,useEffect} from 'react';
import Papa, { parse } from 'papaparse';
import Barchart from './Barchart';
import Tables from './Tables';
import './Main.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SingleCompanyData from './SingleCompanyData';
import Header from './Header';
import Loading from './Loading';

const Main = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => setLoading(false), 3500)
    }, [])

    let [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    let [tableRows, setTableRows] = useState([]);
  
    //State to store the values
    let [values, setValues] = useState([]);

    let [department , setDepartment] = useState([]);
    let [barGraph , setBarGraph] = useState(false);
    let [minDate, setMinDate] = useState(new Date("9/2/2021"));
    let [maxDate, setMaxDate] = useState(new Date());
    let [displayCalender1 , setDisplayCalender1] = useState(false)
    let [displayCalender2 , setDisplayCalender2] = useState(false)
    
    const handlerCal1Dis = (e) => {
      e.preventDefault()
      console.log("hanlde cal diplay")
    }
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
    //let minDate = new Date("10/19/2021")
    //let maxDate = new Date("11/2/2021")
    //console.log(minDate)
    //console.log(maxDate)

    
    
    const changeHandler = (event) => {
      // Passing file data (event.target.files[0]) to parse using Papa.parse
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];
  
          // Iterating data to get column name and their values
          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
  
          // Parsed Data Response in array format
          setParsedData(results.data);
  
          // Filtered Column Names
          setTableRows(rowsArray[0]);
  
          // Filtered Values
          setValues(valuesArray);
          //console.log(parsedData)
            
     
             
        },
      });
    };

    console.log(parsedData)

          let datesArray = []
          for(let i = 0 ; i < parsedData.length ; i++){
            datesArray = datesArray.concat(new Date(parsedData[i].postDate))
          }

        
          var maximumDate=new Date(Math.max.apply(null, datesArray));
            var minimumDate=new Date(Math.min.apply(null, datesArray));
             
             console.log(minimumDate)
             console.log(maximumDate)
 

            let deparr = []
            for(let i = 0 ; i <parsedData.length ; i++){
                deparr.push(parsedData[i].Department)
            }
            
            
        
            let unique = [...new Set(deparr)];
            deparr = new Array(unique)
            //console.log(unique)
            

            let num = []
            let unitCost = []
            let fuelCost = []
            let driverGrossCost = []
            let driverUnitCost = []
            let driverFuelCost = []
           
            for (let i = 0 ; i < parsedData.length ; i++){
                let deparrs = parsedData[i].Department
                let GrossCost = 67
                let date = new Date(parsedData[i].postDate)
                if(date >= minDate && date <= maxDate){
                    num = num.concat({deptName : deparrs , grossCost : parseInt(GrossCost)})
                }
            }

            for (let i = 0 ; i < parsedData.length ; i++){
              let deparrs = parsedData[i].Department
              let fuelCosts = parsedData[i].fuelCost.substr(1)
              let date = new Date(parsedData[i].postDate)
              if(date >= minDate && date <= maxDate){
                  fuelCost = fuelCost.concat({deptName : deparrs , fuelCost : parseInt(fuelCosts)})
              }
          }
          console.log(fuelCost)

           
            
            for (let i = 0 ; i < parsedData.length ; i++){
                let deparrs = parsedData[i].Department
                let unitCosts = parsedData[i].UnitCost.substr(1)
                let date = new Date(parsedData[i].postDate)
                if(date >= minDate && date <= maxDate){
                    unitCost = unitCost.concat({deptName : deparrs , unitCost : parseInt(unitCosts)})
                }
          }
          console.log(unitCost)

            
            console.log(parsedData)
            for (let i = 0 ; i < parsedData.length ; i++){
                let deparrs = parsedData[i].Department
                let GrossCost = parsedData[i].GrossCost.substr(1)
                let driverId = parsedData[i].DriverID
                let date = new Date(parsedData[i].postDate)
                if(date >= minDate && date <= maxDate){
                    driverGrossCost = driverGrossCost.concat({deptName : deparrs , cost : parseInt(GrossCost) ,  driverId : driverId})
                }
            }
            console.log(driverGrossCost)


            for (let i = 0 ; i < parsedData.length ; i++){
              let deparrs = parsedData[i].Department
              let GrossCost = parsedData[i].fuelCost.substr(1)
              let driverId = parsedData[i].DriverID
              let date = new Date(parsedData[i].postDate)
              if(date >= minDate && date <= maxDate){
                  driverFuelCost = driverFuelCost.concat({deptName : deparrs , cost : parseInt(GrossCost) ,  driverId : driverId})
              }
          }
          console.log(driverFuelCost)


            for (let i = 0 ; i < parsedData.length ; i++){
              let deparrs = parsedData[i].Department
              let UnitCost = parsedData[i].UnitCost.substr(1)
              let driverId = parsedData[i].DriverID
              let date = new Date(parsedData[i].postDate)
              if(date >= minDate && date <= maxDate){
                  driverUnitCost = driverUnitCost.concat({deptName : deparrs , cost : parseInt(UnitCost) ,  driverId : driverId})
              }
          }
          console.log(driverUnitCost)

            
            
            
              
              const newObjs = num.reduce((acc, prev) => {
                if (acc.length === 0) {
                  return [prev]
                }
                const current = acc.findIndex(item => item.deptName === prev.deptName)
                const alreadyPresent = current !== -1
                if (alreadyPresent) {
                  acc[current].grossCost = acc[current].grossCost + prev.grossCost
                  return acc
                }
                return acc.concat(prev)
              }, [])

              const newObjs4 = fuelCost.reduce((acc, prev) => {
                if (acc.length === 0) {
                  return [prev]
                }
                const current = acc.findIndex(item => item.deptName === prev.deptName)
                const alreadyPresent = current !== -1
                if (alreadyPresent) {
                  acc[current].fuelCost = acc[current].fuelCost + prev.fuelCost
                  return acc
                }
                return acc.concat(prev)
              }, [])

              console.log(newObjs4)

              const newObjs2 = unitCost.reduce((acc, prev) => {
                if (acc.length === 0) {
                  return [prev]
                }
                const current = acc.findIndex(item => item.deptName === prev.deptName)
                const alreadyPresent = current !== -1
                if (alreadyPresent) {
                  acc[current].unitCost = acc[current].unitCost + prev.unitCost
                  return acc
                }
                return acc.concat(prev)
              }, [])

              console.log(newObjs2)

              const newObjs1 = driverGrossCost.reduce((acc, prev) => {
                if (acc.length === 0) {
                  return [prev]
                }
                const current = acc.findIndex(item => (item.deptName === prev.deptName && item.driverId === prev.driverId))
                const alreadyPresent = current !== -1
                if (alreadyPresent) {
                  acc[current].cost = acc[current].cost + prev.cost
                  return acc
                }
                return acc.concat(prev)
              }, [])
              console.log(newObjs1)

              const newObjs3 = driverUnitCost.reduce((acc, prev) => {
                if (acc.length === 0) {
                  return [prev]
                }
                const current = acc.findIndex(item => (item.deptName === prev.deptName && item.driverId === prev.driverId))
                const alreadyPresent = current !== -1
                if (alreadyPresent) {
                  acc[current].cost = acc[current].cost + prev.cost
                  return acc
                }
                return acc.concat(prev)
              }, [])
              console.log(newObjs3)


              const newObjs5 = driverFuelCost.reduce((acc, prev) => {
                if (acc.length === 0) {
                  return [prev]
                }
                const current = acc.findIndex(item => (item.deptName === prev.deptName && item.driverId === prev.driverId))
                const alreadyPresent = current !== -1
                if (alreadyPresent) {
                  acc[current].cost = acc[current].cost + prev.cost
                  return acc
                }
                return acc.concat(prev)
              }, [])
              console.log(newObjs5)

              //console.log(newObjs[0])

             

              

              let grossCostArr = []
              for(let i = 0 ; i < newObjs.length ; i++){
                //console.log(newObjs[i].grossCost)
                grossCostArr = grossCostArr.concat(newObjs[i].grossCost)
              }

              let unitCostArr = []
              for(let i = 0 ; i < newObjs2.length ; i++){
                //console.log(newObjs[i].grossCost)
                unitCostArr = unitCostArr.concat(newObjs2[i].unitCost)
              }
              console.log(unitCostArr)


              let fuelCostArr = []
              for(let i = 0 ; i < newObjs4.length ; i++){
                //console.log(newObjs[i].grossCost)
                fuelCostArr = fuelCostArr.concat(newObjs4[i].fuelCost)
              }
              console.log(fuelCostArr)

              


              

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
        {loading === false ? (
            <div>
              <div class="sidebar">
         
         <a><i className="fa fa-home iconn"></i></a>
         <a href="#C2">Gallons</a>
         <a href="#C4">Unit Cost</a>
         <a href="#C5">Fuel Cost</a>
         <a href="#C6">Anomalies</a>
         </div>
         <Header></Header>
         <div class="content">
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <div >
         
   {/* File Uploader */}
   
         <input
             
             type="file"
             name="file"
             accept=".csv"
             style={{ display: "block", margin: "10px auto" , backgroundColor : 'lightblue' , color : 'white'}}
             onChange={changeHandler}
             
         />
         </div>
         <h2 id="C7"></h2>
         <div className='dateCalender'>
           <div className='singleDiv'>
               <div className='buttonsDiv'>
                 <button className="Button" onClick={() => {setDisplayCalender1(true)}}>Start Date</button>  
                 <div>{minDateDisplay}</div>
               </div>
               {displayCalender1 && <Calendar onChange={onChangeMinDate}  defaultActiveStartDate={new Date("10/4/2021")} minDate={new Date("10/4/2021")} maxDate={new Date("11/8/2021")} />}
           </div>
           <div className='singleDiv'>
                 <div className='buttonsDiv'>
                 <button className="Button" onClick={() => {setDisplayCalender2(true)}}>End Date</button>  
                 <div>{maxDateDisplay}</div>
               </div>
               {displayCalender2 && <Calendar onChange={onChangeMaxDate}  defaultActiveStartDate={new Date("10/4/2021")}  minDate={new Date("10/4/2021")} maxDate={new Date("11/8/2021")} />}
           </div>
         </div>
         <h3 id="C2"></h3>
         <Barchart department={deparr} grossCostArr={grossCostArr} newObjs1={newObjs1} minDate={minDateDisplay} maxDate={maxDateDisplay} graphName="Gallons"></Barchart>
         <div></div>
         <br></br>
         <br></br>
         <br></br>    
         <h2 id="C4"></h2>
         <Barchart  department={deparr} grossCostArr={unitCostArr} newObjs1={newObjs3} minDate={minDateDisplay} maxDate={maxDateDisplay} graphName="Unit Cost"></Barchart>    
         <br></br>
         <br></br>
         <h2 id="C5"></h2>
         <Barchart department={deparr} grossCostArr={fuelCostArr} newObjs1={newObjs5} minDate={minDateDisplay} maxDate={maxDateDisplay} graphName="Fuel Cost"></Barchart>    
         <br></br>
         <br></br>
         <h2 id="C6"></h2>
         <SingleCompanyData department={deparr} data={parsedData}></SingleCompanyData>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <div className='footer'>
              <p>Developed by Maham Ishtiaq</p>
         </div>
         </div>
        
            </div>
            
      ) : (
        <Loading />
      )}
         
        
        
         
        </>
    )
}

export default Main;