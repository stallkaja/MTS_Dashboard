import React from 'react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'

function headerCell({header}){
	return(
		<th>{header.COLUMN_NAME}</th>
	);
}
export default headerCell