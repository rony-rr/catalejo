import React, { Fragment } from 'react';
import _ from 'lodash';
// import Image from 'next/image';
import { DummyImg } from '../../Atoms/Dummy';

const Img = ({ image, alt, props }) => {
	let src = null;
	if (_.isObject(image)) {
		if (image.publicUrl && image.publicUrl !== '') src = image.publicUrl;
	} else if (image && image !== '') {
		src = image;
	}

	// <Image
	// src={src}
	// alt={alt}
	// {...props}
	// />
	return (
		<Fragment>
			{src ? (
				<img src={src} alt={alt} {...props} />
			) : (
				<DummyImg />
			)}
		</Fragment>
	);
};

export default Img;
