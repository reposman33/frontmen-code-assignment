import React, { useState, useEffect } from "react";
import "./modal.scss";
import { Readme } from "./readme";

export const Modal = props => {
	const [modalState, setModalState] = useState(true);
	// we need to refer to the modal element later when the animationend event is fired
	const modalRef = React.createRef();

	useEffect(() => {
		// after the element is rendered, bind an eventhandler to the animationend css event. In this we can create a zoomout effect and then hide the modal when user click 'x'
		props.showModal && modalRef.current.addEventListener("animationend", dismissModal);
	});

	const dismissModal = e => {
		// we only want to do this when user closed the modal
		if (e.animationName.toLowerCase().indexOf("zoomout") > -1) {
			// hide the component by calling the setModalState passed from the parent and force a render
			props.setModalState(false);
			// reset modalState state prop of this component so that next time the zoomin class is applied instead of zoomout
			setModalState(true);
		}
	};

	return (
		// only show component when requested from parent
		props.showModal && (
			<div
				// class zoomIn is applied for a zoom in effect; class zoomOut is applied to create a zoom out effect
				className={modalState ? "modal zoomIn" : "modal zoomOut"}
				onClick={() => setModalState(false)}
				ref={modalRef}>
				<div className='modal-content'>
					<span className='close' onClick={() => setModalState(false)}>
						&times;
					</span>
					<Readme></Readme>
				</div>
			</div>
		)
	);
};
