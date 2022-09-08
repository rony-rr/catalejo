const { Text, Relationship, Slug, Select, CalendarDay, File, Checkbox, Decimal, Integer } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const { fileAdapter, fileAdapterGetHooks } = require('./s3FileAdapter');
const countries = require('./countries');
const notificationOptions = require('./notification');

// Var
const isDev = process.env.NODE_ENV === 'development';
const countriesOptions = countries();

//
// General Fields
//
const name = { type: Text, isRequired: true };
const text = { type: Text };
const number = { type: Integer };
const decimal = { type: Decimal };
const checkbox = { type: Checkbox, defaultValue: false };

const slug = {
	type: Slug,
	from: 'name',
	label: 'Slug (Read-Only)',
	isUnique: true,
	access: {
		update: isDev
	}
};

//
// Contents
//
const excerpt = { type: Text, isMultiline: true };
const wysiwyg = {
	type: Wysiwyg,
	height: 400,
	editorConfig: {
		default_link_target: '_blank',
		link_assume_external_targets: true,
		link_title: false,
		relative_urls : false,
		remove_script_host : false,
		convert_urls : true,
		plugins: [
			'advlist autolink link image lists charmap print preview hr anchor pagebreak',
			'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
			'table emoticons template paste code help'
		],
		toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
			'bullist numlist outdent indent | link image | print preview media fullpage | ' +
			'forecolor backcolor emoticons | code | help',
		menu: {
			file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
			edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
			view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
			insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
			format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
			tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
			table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
			code: { title: 'Code', items: 'code' },
			help: { title: 'Help', items: 'help' }
		}
	}
};

//
// Selects
//

const state = {
	type: Select,
	options: ['active', 'deactivated'],
	defaultValue: 'active',
	dataType: 'string'
};

const stateNotification = {
	type: Select,
	options: notificationOptions.state,
	defaultValue: notificationOptions.state[0],
	dataType: 'string'
};

const tipoNotification = {
	type: Select,
	options: notificationOptions. type,
	defaultValue: notificationOptions. type[0],
	dataType: 'string'
};

//
// Calendar
//
const date = {
	type: CalendarDay
};

const country = {
	type: Select,
	options: countriesOptions,
	dataType: 'string'
};

//
// Image
//
const image = (name = 'image', options = {}) => {
	return {
		...options,
		type: File,
		adapter: fileAdapter,
		hooks: {
			beforeChange: fileAdapterGetHooks(fileAdapter, [name])
		}
	}
};

// const name = {
// 	...text,
// 	adminConfig: {
// 		isReadOnly: true
// 	},
// 	hooks: {
// 		resolveInput: ({ resolvedData, existingItem, originaInput }) => {
// 			let s = 'name';
// 			// Create
// 			// Update
// 			if (resolvedData && resolvedData.title) s = resolvedData.title;
// 			if (existingItem && existingItem.title) s = existingItem.title;

// 			return s;
// 		}
// 	}
// 	// access: {
// 	// 	update: true,
// 	// 	read: false
// 	// }
// };

//
// Relationship
//

const noticiaCategoria = {
	type: Relationship,
	ref: 'NoticiaCategoria',
	many: true
};

const documentoCategoria = {
	type: Relationship,
	ref: 'DocumentoCategoria',
	many: true
};

const oportunidadActualizarCategoria = {
	type: Relationship,
	ref: 'OportunidadesActualizarCategoria',
	many: true
};

const cuenta = {
	type: Relationship,
	ref: 'Cuenta',
	many: true
};

const inversion = {
	type: Relationship,
	ref: 'Inversion',
	many: true
};

const inversionista = {
	type: Relationship,
	ref: 'Cuenta',
	many: true
};

const user = {
	type: Relationship,
	ref: 'User'
};

const temas = {
	type: Relationship,
	many: true,
	ref: 'BlogTema'
};

module.exports = {
	text,
	name,
	slug,
	state,
	stateNotification,
	tipoNotification,
	excerpt,
	wysiwyg,
	decimal,
	image,
	country,
	date,
	checkbox,
	noticiaCategoria,
	documentoCategoria,
	inversion,
	cuenta,
	number,
	oportunidadActualizarCategoria,
	user,
	inversionista,
	temas
};
