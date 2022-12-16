import React from 'react';
import ToolRow from '../components/ToolHistoryRow.js'
import TableHeader from '../components/TableHeader.js'

function ItemTable({headers, items, onEdit, onDelete}){
	/*for (var i = 0; i < headers.length; i++) {
		var header = headers[i];
		console.log(header.COLUMN_NAME.materialPK);
	}*/
	//console.log(items[1]);
	return(
		<table className="table" border="1px solid">
			<caption>Items</caption>
			<thead>
				<tr>
				{/*{headers.map((header, i) => <TableHeader header={header} key={i}/> )}*/} 
                <th>NVL</th>
				<th>Employee Badge #</th>
				<th>Old Location </th>
				<th>New Location </th>
                <th>Time stamp </th>
				</tr>
			</thead>
			<tbody>
   {/*             {items.map((item, j) => <ToolRow item={item} onEdit={onEdit} onDelete={onDelete} key={j}/> )}*/}
			</tbody>
		</table>
	);
}
export default	ItemTable
/*
                <th> Name </th>
                <th> Reps </th>
                <th> Weight </th>
                <th> Unit </th>
                <th> Date </th>
                <th> </th>
                <th> </th>
				*/