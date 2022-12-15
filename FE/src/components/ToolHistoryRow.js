import React from 'react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'

function ItemRow({item, onDelete, onEdit}){
	//console.log(onDelete)
	return(
		<tr>
			<td>{item.NVL}</td>
      		<td>{item.empNumber}</td>
      		<td>{item.oldLoc}</td>
      		<td>{item.curLoc}</td>
      		<td>{item.Time}</td>
		</tr>
	);
}
export default ItemRow