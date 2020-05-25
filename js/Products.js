class Products {
    async getProducts() {
        try {

            let contentful = await client.getEntries({
                content_type: 'skiiShopProducts'
            });

            let products = contentful.items;

            // get all details produts from contentful.com
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                const {desc} = item.fields
                return { title, price, id, image, desc }
            });

            return products;

        } catch (error) {
            console.log(error);
        }

    }
}