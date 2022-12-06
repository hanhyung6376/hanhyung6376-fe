import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ProductList from 'components/ProductList';
import Pagination from 'components/Pagination';
import Error from 'components/common/Error';
import * as api from 'api';
import { Product } from 'types/product';
import { queryStringToNumber } from '../utilities';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const page = queryStringToNumber(router.query.page);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  const fetchData = async (value: number) => {
    const res = await api.getProducts({ page: value, size: 10 });

    if (res.error) {
      setError(true);
    } else {
      const { products, totalCount } = res.data.data;
      setData(products);
      if (total !== Math.ceil(totalCount / 10)) {
        setTotal(Math.ceil(totalCount / 10));
      }
      setError(false);
    }
  };

  useEffect(() => {
    if (page) {
      fetchData(page);
    }
  }, [page]);

  if (error) {
    return <Error message='존재하지 않는 페이지입니다.' />;
  }
  return (
    <Container>
      <ProductList products={data} />
      <Pagination totalPage={total} />
    </Container>
  );
};

export default PaginationPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
