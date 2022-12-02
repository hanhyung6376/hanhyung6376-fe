import type { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import styled from 'styled-components';
import * as api from 'api';
import products from '../../api/data/products.json';
import { Product } from '../../types/product';
import { numberFormatter } from '../../utilities/product';

const ProductDetailPage: NextPage<Props> = ({ thumbnail, name, price, error }) => {
  if (error) {
    return <p>존재하지 않는 상품입니다.</p>;
  }
  return (
    <>
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{name}</Name>
        <Price>{numberFormatter(price)}원</Price>
      </ProductInfoWrapper>
    </>
  );
};

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (context) => {
  const id = context.params?.id || '';
  const res = await api.getProduct(id);

  let result: Props = {
    id: '',
    thumbnail: null,
    name: '',
    price: 0,
    error: false,
  };
  if (res.error) {
    const index = parseInt(id);
    if (index && index <= products.length) {
      result = { ...products[index], error: false };
    } else {
      result = { ...result, error: true };
    }
  } else {
    const { data } = res.data;
    const { thumbnail, name, price, id } = data;
    result = { thumbnail, name, price, id, error: false };
  }
  return {
    props: result,
  };
};

interface Props extends Product {
  error: boolean;
}

const ErrorMessage = styled.div``;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
