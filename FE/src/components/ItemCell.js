import React from 'react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'

function itemCell({item}){
    console.log("printing item at cell level")
    console.log(item)
	return(
		<td>{item}</td>
	);
}
export default itemCell