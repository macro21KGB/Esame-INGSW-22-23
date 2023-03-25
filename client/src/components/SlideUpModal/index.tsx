import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flec-direction: column;
  justify-content: stretch;
  align-items: flex-end ;
`;

const ModalWrapper = styled.div`
  position: relative;
  min-width: 100vw;
  min-height: 10rem;
  background-color: #263657;
  color: #fff;
  z-index: 10;
  border-radius: 10px 10px 0 0;
  padding-bottom: 1rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
`;

const CloseModalButton = styled(animated.button)`
  all: unset;
  cursor: pointer;
  
  position: absolute;
  right: 0;
  top: 0;

  width: 40px;
  height: 40px;
  border: none;
  color: #fff;
  outline: none;

  font-size: 3rem;
  font-weight: 100;
`;

interface SlideUpModalProps {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	children: React.ReactNode;
	onClose?: () => void;
}

const SlideUpModal = ({
	showModal,
	setShowModal,
	children,
	onClose,
}: SlideUpModalProps) => {
	const animation = useSpring({
		config: {
			duration: 250,
		},
		reverse: showModal ? false : true,
		opacity: showModal ? 1 : 0,
		transform: showModal ? "translateY(0%)" : "translateY(100%)",
	});

	const closeModal = () => {
		setShowModal(false);
		if (onClose) onClose();
	};

	return (
		<>
			{showModal ? (
				<ModalBackground>
					<animated.div style={animation}>
						<ModalWrapper>
							<CloseModalButton aria-label='Close modal' onClick={closeModal}>
								&times;
							</CloseModalButton>
							<ModalContent>{children}</ModalContent>
						</ModalWrapper>
					</animated.div>
				</ModalBackground>
			) : null}
		</>
	);
};

export default SlideUpModal;
