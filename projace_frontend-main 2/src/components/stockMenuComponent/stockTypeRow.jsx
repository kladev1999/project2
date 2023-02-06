import React from "react";

const stockTypeRow = (props) => {
    console.log(props);
  return props.stockType.map(d => (
 
    <tr key={d.stockType_ID}>
      <td>
        <input
          type="checkbox"
          checked={d.select}
          onChange={e => {
            let value = e.target.checked;
            props.setStockType(
              props.stockType.map(sd => {
                if (sd.stockType_ID === d.stockType_ID) {
                  sd.select = value;
                }
                return sd;
              })
            );
          }}
        />
      </td>
      <th scope="row">{d.stockType_ID}</th>
      <td>{d.stockType_Name}</td>
      {/* <td>{d.dob}</td> */}
      <td>{d.stockType_Unit}</td>
      
    </tr>
  ));
}

export default stockTypeRow;
