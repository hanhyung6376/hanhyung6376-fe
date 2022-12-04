import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../types/product';
import { numberFormatter } from '../utilities/product';

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product: { name, thumbnail, price, id } }: ProductItemProps) => (
  <Link href={`/products/${id}`}>
    <Container>
      <Thumbnail>
        <Image src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} layout='fill' alt='image' />
      </Thumbnail>
      <Name>{name}</Name>
      <Price>{numberFormatter(price)}</Price>
    </Container>
  </Link>
);

export default ProductItem;

const Container = styled.a`
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
