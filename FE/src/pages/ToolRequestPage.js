
import React from 'react';
import toolBoardWrenches from '../images/toolBoardWrenches.jpg';
import wrench1 from '../images/wrench1.jpg'
import './ToolRequestPage.css';
  
const ToolRequestPage = () => {
    const bayCount = 10;
    const options = [];
    const toolBoardWrenches = require('../images/toolBoardWrenches.jpg');
    const [showFields, setShowFields] = React.useState(false)
    const onClick = () => setShowFields(true)
    for(let i = 1;i<bayCount;i++){
        let bayName = "Bay " + i;
        let newEntry = {label: bayName,value:i}
        options.push(newEntry)
    }
    const Fields = () => (
      <div id="Fields" className="Fields">
        <view className="row">
          <table>
            <tr>
              <td>box 1</td>
              <td>box 2</td>
              <td>box 3</td>
              <td>box 4</td>
              <td>box 5</td>
              <td>box 6</td>
              <td>box 7</td>
              <td>box 8</td>
              <td>box 9</td>
              <td>box 10</td>
              <td>box 11</td>
              <td>box 12</td>
            </tr>
            <tr>
              <td><input type="checkbox" id="cb1" />
              <label for="cb1"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb2" />
              <label for="cb2"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb3" />
              <label for="cb3"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb4" />
              <label for="cb4"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb5" />
              <label for="cb5"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb6" />
              <label for="cb6"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb7" />
              <label for="cb7"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb8" />
              <label for="cb8"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb9" />
              <label for="cb5"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb10" />
              <label for="cb6"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb11" />
              <label for="cb7"><img src={wrench1} /></label></td>
              <td><input type="checkbox" id="cb12" />
              <label for="cb8"><img src={wrench1} /></label></td>
            </tr>
          </table>
        </view>
      </div>
      
    )
  return (
      <div>
          <div id='TitleCard'>
              <h1 id='TitleText'>Tool Request Page</h1>
          </div>
          <div id='ReqCard'>
 
          </div>
      <label>
       Bay Number
       <br></br>
       <select onChange={onClick}>
            <option disabled selected value> -- select an option -- </option>
            {options.map((option) => (
            <option value={option.value}>{option.label}</option>
            ))}
       </select>
       { showFields ? <Fields /> : null }
        
     </label>
    </div>
  );
};
  
export default ToolRequestPage;

