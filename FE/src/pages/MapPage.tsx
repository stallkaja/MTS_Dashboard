
import React, { Component }  from 'react';
//import map from '../DOSMap.png'
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
      placeholder="Search for John, Jane or Mary"
      data={[
        {
          key: "john",
          value: "John Doe"
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
      leftIcon={<>🎨</>}
      iconBoxSize="48px"
    />
      {/* <img src={map} alt="map" width="95%" height="95%"/> */}
    </div>
  );
};
  
export default MapPage;