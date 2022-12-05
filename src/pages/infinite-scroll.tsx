import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import * as api from 'api';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { infiniteAtom } from '../store';

const NUMBER = 16;

const InfiniteScrollPage: NextPage = () => {
  const router = useRouter();
  const [infinite, setInfinite] = useRecoilState(infiniteAtom);
  const reset = useResetRecoilState(infiniteAtom);
  const [total, setTotal] = useState();
  const [hasNext, setHasNext] = useState(true);
  const fetchMoreEl = useRef(null);
  const intersecting = useInfiniteScroll(fetchMoreEl);

  const fetchData = async () => {
    const res = await api.getProducts({ page: infinite.page, size: NUMBER });
    const { products, totalCount } = res.data.data;
    setInfinite({
      ...infinite,
      product: [...infinite.product, ...products],
      page: infinite.page + 1,
    });
    if (!total) {
      setTotal(totalCount);
    }
  };

  useEffect(() => {
    if (intersecting && hasNext) {
      fetchData();
    }
  }, [intersecting]);

  useEffect(() => {
    if (infinite.product.length === total) {
      setHasNext(false);
    }
  }, [infinite.product]);

  useEffect(() => {
    if (infinite.popState) {
      window.scrollTo(0, infinite.scroll);
      setInfinite({ ...infinite, popState: false });
    } else {
      reset();
    }
  }, []);

  return (
    <Container>
      <ProductList products={infinite.product} />
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
