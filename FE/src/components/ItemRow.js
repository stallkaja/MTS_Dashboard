import React from 'react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'

function ItemRow({item, onDelete, onEdit}){
	//console.log(onDelete)
	return(
		<tr>
			<td>{item.MaterialName}</td>
      		<td>{item.Category}</td>
      		<td>{item.AdditionalNotes}</td>
      		<td>{item.Quantity}</td>
      		<td>{item.NVL}</td>
			<td>{item.BEN}</td>
      		<td>{item.PercentComplet}</td>
      		<td>{item.Fixture}</td>
      		<td>{item.AssetNumber}</td>
      		<td>{item.BEN4LPR}</td>
			<td>{item.CurrentState}</td>
      		<td>{item.IndividuallyAssigned}</td>
      		<td>{item.LamPartNumber}</td>
      		<td>{item.LaptopAssignedBEDShift}</td>
      		<td>{item.LaptopAssignedBENShift}</td>
			<td>{item.LaptopAssignedFEDShift}</td>
      		<td>{item.LaptopAssignedFENShift}</td>
      		<td>{item.LaptopAssignedMF}</td>
      		<td>{item.LaptopDepartment}</td>
      		<td>{item.RecordISNumber}</td>
			<td>{item.SerialNumber}</td>
			<td>{item.materialPK}</td>
      		<td><MdModeEdit className="icon" onClick={ () => onEdit(item) }/></td>
      		<td><MdDeleteForever className="icon" onClick={ () => onDelete(item.materialPK) }/></td>
		</tr>
	);
}
export default ItemRow