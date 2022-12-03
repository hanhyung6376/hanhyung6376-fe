import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { pageAtom } from '../store';

const PAGE_RANGE = 5;

const usePagination = (totalPage: number) => {
  const [page, setPage] = useRecoilState(pageAtom);
  const [pagination, setPagination] = useState<Pagination>({
    prev: false,
    next: false,
    pageRange: [],
  });

  const onPrev = () => {
    const { pageRange } = pagination;
    setPage(pageRange[0] - 1);
  };

  const onClick = (value: number) => {
    setPage(value);
  };

  const onNext = () => {
    const { pageRange } = pagination;
    setPage(pageRange[PAGE_RANGE - 1] + 1);
  };

  useEffect(() => {
    if (!pagination.pageRange.includes(page)) {
      const startIndex = Math.floor((page - 1) / PAGE_RANGE) * PAGE_RANGE + 1;
      const endIndex = startIndex + PAGE_RANGE - 1;
      setPagination({
        prev: startIndex === 1,
        next: endIndex >= totalPage,
        pageRange: Array.from(
          { length: endIndex <= totalPage ? PAGE_RANGE : totalPage - startIndex + 1 },
          (v, i) => startIndex + i
        ),
      });
    }
  }, [page, totalPage]);

  return { page, pagination, onNext, onPrev, onClick };
};

export default usePagination;

interface Pagination {
  prev: boolean;
  pageRange: number[];
  next: boolean;
}
