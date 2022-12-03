import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import Error from 'components/common/Error';
import { useRecoilState } from 'recoil';
import { pageAtom } from '../store';
import * as api from '../api';
import { Product } from '../types/product';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const params = router.query.page;
  const [page, setPage] = useRecoilState(pageAtom);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  const fetchData = async () => {
    const res = await api.getProducts({ page, size: 10 });

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
    const number = Number(params as string);
    if (Number.isInteger(number)) {
      setPage(number);
    } else {
      setError(true);
    }
  }, [params]);

  useEffect(() => {
    if (page > 0) {
      fetchData();
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
