// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = Date.now().toString();

interface QRCodeScannerProps {
	fps?: number;
	qrbox?: number;
	aspectRatio?: number;
	disableFlip?: boolean;
	verbose?: boolean;
	qrCodeSuccessCallback: (message: string) => void;
	qrCodeErrorCallback: (error: string) => void;
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: QRCodeScannerProps) => {
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	let config: any = {};
	if (props.fps) {
		config.fps = props.fps;
	}
	if (props.qrbox) {
		config.qrbox = props.qrbox;
	}
	if (props.aspectRatio) {
		config.aspectRatio = props.aspectRatio;
	}
	if (props.disableFlip !== undefined) {
		config.disableFlip = props.disableFlip;
	}
	return config;
};

const QRCodeScanner = (props: QRCodeScannerProps) => {
	useEffect(() => {
		// when component mounts
		const config = createConfig(props);
		const verbose = props.verbose === true;
		// Suceess callback is required.
		if (!props.qrCodeSuccessCallback) {
			throw "qrCodeSuccessCallback is required callback.";
		}
		const html5QrcodeScanner = new Html5QrcodeScanner(
			qrcodeRegionId,
			config,
			verbose,
		);
		html5QrcodeScanner.render(
			props.qrCodeSuccessCallback,
			props.qrCodeErrorCallback,
		);

		// cleanup function when component will unmount
		return () => {
			html5QrcodeScanner.clear().catch((error) => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
		};
	}, []);

	return <div id={qrcodeRegionId} />;
};

export default QRCodeScanner;
