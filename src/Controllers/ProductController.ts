import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../models/Product';
import * as yup from 'yup';

class ProductController {
  public async index(req: Request, res: Response) {
    const products = await getRepository(Product).find();
    return res.json(products);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const product = await getRepository(Product).findOne(id);
    if (!product)
      return res.status(400).json({ message: 'Product not found!' });
    return res.json(product);
  }

  public async store(req: Request, res: Response) {
    const { description, value } = req.body;

    const schema = yup.object().shape({
      description: yup.string().required('Please provide a valid description'),
      value: yup.number().required('Please provide a valid value')
    });

    try {
      schema.validateSync(req.body);
    } catch (error) {
      return res.status(400).json({ message: error.errors[0] });
    }

    const product = new Product();

    product.description = description;
    product.value = value;
    await getRepository(Product).save(product);
    return res.status(201).json(product);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { description, value } = req.body;

    const product = await getRepository(Product).findOne(id);

    if (!product)
      return res.status(400).json({ message: 'Product not found!' });

    product.description = description;
    product.value = value;
    await getRepository(Product).save(product);

    return res.json(product);
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const product = await getRepository(Product).findOne(id);
    if (!product)
      return res.status(400).json({ message: 'Product not found!' });
    await getRepository(Product).delete(id);
    return res.status(204).json();
  }
}

export default new ProductController();
