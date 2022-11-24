import { Context, helpers } from "../../deps.ts";
import Product from "../types/product.ts";

const products: Product[] = [];

export const getProducts = (ctx: Context) => {
  if (products.length === 0)
    return (ctx.response.body = {
      success: false,
      message: "No products found",
    });

  ctx.response.body = {
    success: true,
    data: products,
  };
};

export const addProduct = async (ctx: Context) => {
  const body = ctx.request.body();

  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "No data",
    };
    return;
  }

  const newProduct: Product = await body.value;
  newProduct.id = Math.random().toString();
  products.push(newProduct);

  ctx.response.status = 201;
  ctx.response.body = {
    success: true,
    data: newProduct,
  };
};

export const getProduct = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });

  const product = products.find((p) => p.id === id);

  if (!product) {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      message: "No product found",
    };
    return;
  }

  ctx.response.body = {
    success: true,
    data: product,
  };
};

export const updateProduct = async (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });

  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "No data",
    };
    return;
  }

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      message: "No product found",
    };
    return;
  }

  const body = ctx.request.body();
  const updatedProduct: Product = await body.value;

  products[index] = updatedProduct;

  ctx.response.body = {
    success: true,
    data: products,
  };
};

export const deleteProduct = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      message: "No product found",
    };
    return;
  }

  products.splice(index, 1);

  ctx.response.body = {
    success: true,
    message: "Product removed",
  };
};
