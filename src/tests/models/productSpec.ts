import { ProductModel } from '../../models/products';
import product from '../../types/product.type';

const productModel: ProductModel = new ProductModel();

describe('Test product model functionality', () => {
  it('Sould contain index function', () => {
    expect(productModel.index).toBeDefined();
  });
  it('Sould contain create function', () => {
    expect(productModel.create).toBeDefined();
  });
  it('Sould contain show function', () => {
    expect(productModel.show).toBeDefined();
  });
  it('Sould contain show by category function', () => {
    expect(productModel.showByCategory).toBeDefined();
  });
  it('Sould contain delete function', () => {
    expect(productModel.delete).toBeDefined();
  });
  it('Should create new product', async () => {
    const ourProduct: product = {
      name: 'Test Product',
      price: 100,
      category: 'Test Category',
    };
    const prod: product | string = await productModel.create(ourProduct);
    expect(Object(prod)['name']).toBeTruthy();
    expect(Object(prod)['price']).toBeTruthy();
    expect(Object(prod)['category']).toBeTruthy();
  });
  it('Should get the right product using show function', async () => {
    const prod: product | string = await productModel.show("1");
    expect(Object(prod)['name']).toEqual('Test Product');
    expect(Object(prod)['price']).toEqual(100);
    expect(Object(prod)['category']).toEqual('Test Category');
  });
  it('Should get the right product using index function', async () => {
    const prod: product[] | string = await productModel.index();
    expect(Object(prod[0])['name']).toEqual('Test Product');
    expect(Object(prod[0])['price']).toEqual(100);
    expect(Object(prod[0])['category']).toEqual('Test Category');
  });
  it('Should get the right product using show by category function', async () => {
    const prod: product[] | string = await productModel.showByCategory(
      'Test Category'
    );
    expect(prod.length).toBeGreaterThan(0);
  });

  it('Should test delete function', async () => {
    const deletedProduct = await productModel.delete(1);
    expect(Object(deletedProduct)['name']).toEqual('Test Product');
    expect(Object(deletedProduct)['price']).toEqual(100);
    expect(Object(deletedProduct)['category']).toEqual('Test Category');
  });
});
