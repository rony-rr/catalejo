import React from 'react';

export default function useModal(initialState = false) {
	// State
	const [isOpen, setIsOpen] = React.useState(initialState);

	// Handlers
	const open = React.useCallback(() => {
		setIsOpen(true);
	}, []);

	const close = React.useCallback(() => {
		setIsOpen(false);
	}, []);

	const toggle = React.useCallback(() => {
		setIsOpen((s) => !s);
	}, []);

	return {
		isOpen,
		openModal: open,
		closeModal: close,
		toggleModal: toggle,
	};
}
