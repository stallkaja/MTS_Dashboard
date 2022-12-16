import React from 'react';
import ItemRow from '../components/ItemRow.js'
import TableHeader from '../components/TableHeader.js'

function ItemTable({headers, items, onEdit, onDelete}){
	return(
		<table className="table" border="1px solid">
			<caption>Items</caption>
			<thead>
				<tr>
				{headers.map((header, i) => <TableHeader header={header} key={i}/> )}
				</tr>
			</thead>
			<tbody>
                {items.map((item, j) => <ItemRow item={item} onEdit={onEdit} onDelete={onDelete} key={j}/> )}
			</tbody>
		</table>
	);
}
export default	ItemTable
