import React from 'react';
import { NoResults, SearchLayout } from '@/components';
import { FcSearch } from 'react-icons/fc';

type SearchHomeProps = {};

const SearchHome: React.FC<SearchHomeProps> = () => {
  return (
    <SearchLayout>
      <div>
        <NoResults text="No searches performed" type="search" />
      </div>
    </SearchLayout>
  );
};
export default SearchHome;
