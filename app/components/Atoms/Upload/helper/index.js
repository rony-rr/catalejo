export const getArrayTable = async(file, callback) =>{
	const reader = new FileReader();
	reader.readAsBinaryString(file);
	return reader.addEventListener('load', async () => await callback(reader.result));
}