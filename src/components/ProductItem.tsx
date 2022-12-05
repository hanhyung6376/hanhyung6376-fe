import styled from 'styled-components';
import { useEffect } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { Product } from '../types/product';
import { numberFormatter } from '../utilities/product';
import { infiniteAtom } from '../store';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => {
  const router = useRouter();
  const [infinite, setInfinite] = useRecoilState(infiniteAtom);

  router.beforePopState(({ url }) => {
    if (url === '/infinite-scroll') setInfinite({ ...infinite, popState: true });
    return true;
  });

  const onClick = () => {
    setInfinite({ ...infinite, scroll: window.scrollY });
    router.push(`/products/${id}`);
  };

  return (
    <Container onClick={onClick}>
      <Thumbnail>
        <Image src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} layout='fill' alt='image' />
      </Thumbnail>
      <Name>{name}</Name>
      <Price>{numberFormatter(price)}</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.li`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
