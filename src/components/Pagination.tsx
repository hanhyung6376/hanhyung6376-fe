import React, { FC } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from '../hooks/usePagination';

const Pagination: FC<Props> = ({ totalPage }) => {
  const { page, pagination, onNext, onPrev, onClick } = usePagination(totalPage);
  const { prev, next, pageRange } = pagination;
  return (
    <Container>
      <Button onClick={onPrev} disabled={prev}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageRange.map((item) => (
          <Page
            key={item}
            selected={item === page}
            onClick={() => onClick(item)}
            disabled={item === page}
          >
            {item}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={onNext} disabled={next}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

interface Props {
  totalPage: number;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
