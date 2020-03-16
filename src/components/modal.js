import React from "react";
import "./modal.scss";
import { Readme } from "./readme";

export const Modal = props => {
	return (
		props.showModal && (
			<div className='modal' onClick={() => props.setModalState(false)}>
				<div className='modal-content'>
					<span className='close' onClick={() => props.setModalState(false)}>
						&times;
					</span>
					<Readme></Readme>
				</div>
			</div>
		)
	);
};
