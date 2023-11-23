const importAll = (context) => context.keys().map(context);
const images = importAll(require.context('../assets/produits/', false, /\.(png|jpe?g|svg)$/));

export default images;
