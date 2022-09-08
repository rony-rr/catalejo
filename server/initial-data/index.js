const User = require('./User');
const NoticiaCategoria = require('./NoticiaCategoria')
const Noticia = require('./Noticia');
const Cuenta = require('./Cuenta');
const Inversion = require('./Inversion');
const Rendimiento = require('./Rendimiento');
const NuevaOportunidad = require('./NuevaOportunidad');
const NuevaNotificacion = require('./NuevaNotificacion');

module.exports = async keystone => {
  if (process.env.LOAD_INITIAL_DATA === 'true') {
    // const DataNoticiaCategoria = await NoticiaCategoria(keystone);
    // const DataNoticia = await Noticia(keystone, DataNoticiaCategoria);
    // const DataCuenta= await Cuenta(keystone);
    // const DataInversion= await Inversion(keystone, DataCuenta);
    // const DataRendimiento = await Rendimiento(keystone, DataInversion);
    // const DataOportunidad= await NuevaOportunidad(keystone, DataInversion);
    // const DataNotificaciones = await NuevaNotificacion(keystone);
  }

  await User(keystone);

};
