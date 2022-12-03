import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import * as api from 'api';
import { Product } from '../types/product';

const NUMBER = 16;

const InfiniteScrollPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState();
  const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

  const fetchData = async () => {
    const res = await api.getProducts({ page, size: NUMBER });
    const { products, totalCount } = res.data.data;
    setData([...data, ...products]);
    if (!total) {
      setTotal(totalCount);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    if (intersecting && hasNext) {
      fetchData();
    }
  }, [intersecting]);

  useEffect(() => {
    if (data.length === total) {
      setHasNext(false);
    }
  }, [data]);

  return (
    <Container>
      <ProductList products={data} />
      <div ref={fetchMoreEl} />
    </Container>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
