const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {

	const productsFilter = productsList.filter((product) => ids.includes(product.id));

	const category = [... new Set(productsFilter.map((product) => product.category))]

	const getCategories = category.filter( (value, index, arr) =>  arr.indexOf(value) == index).length;
	const countCategories = promotions[getCategories - 1];

	const totalRegularPrice = productsFilter.reduce((sum, product) => sum + product.regularPrice, 0).toFixed(2);

	const totalPromotionPrice = productsFilter.reduce((sum, product) => {
		let valuePromotion = product.promotions.find((valuePromotion) => { return valuePromotion.looks.includes(countCategories); });
		
		if (!valuePromotion) {
			valuePromotion = { price: product.regularPrice };
		}

		return sum + valuePromotion.price;
		
	}, 0).toFixed(2);
	
	const discountValue = (totalRegularPrice - totalPromotionPrice).toFixed(2);

	const discountPercentage = ((discountValue / totalRegularPrice) * 100).toFixed(2) + "%";

	const products = productsFilter.map((product) => {
		return {
			category: product.category,
			name: product.name
		};
	});

	
	const result = {
		products: products,
		promotion: countCategories ,
		totalPrice: totalPromotionPrice ,
		discountValue:discountValue,
		discount: discountPercentage,
	};

	return result;
}

module.exports = { getShoppingCart };