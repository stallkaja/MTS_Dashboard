
import React, { Component }  from 'react';
import dosmap from '../images/DOSMap.png'; /* Imports DOS Map from the image folder, yet gives syntax error. If anyone knows why, let me know. -LeathJo 06/02/23 */
import ReactSearchBox from "react-search-box";
  
const MapPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'Center',
        height: '100vh'
      }}
    >
      <h1>Map Page</h1>
      <ReactSearchBox
      placeholder="Search for Jon, Jane or Mary"
      data={[
        {
          key: "jon",
          value: "Jon Doe"
        },
        {
          key: "jane",
          value: "Jane Doe"
        },
        {
          key: "mary",
          value: "Mary Phillips"
        },
        {
          key: "robert",
          value: "Robert"
        },
        {
          key: "karius",
          value: "Karius"
        }
      ]}
      onSelect={(record: any) => console.log(record)}
      onFocus={() => {
        console.log("This function is called when is focussed");
      }}
      onChange={(value) => console.log(value)}
      autoFocus
      leftIcon={<>🔎</>}
      iconBoxSize="28px"
    />
        {/* This is displaying the map, currently I cannot get it to center underneath the header, but its a WIP, feel free to assist if bored. -LeathJo 06/02/23 */
        <img 
          src={dosmap} alt="map" width="80%" height="80%">
        </img>}
    </div>
  );
};
  
export default MapPage;