declare module './HomePage' {
  import { ReactElement } from 'react';
  const HomePage: () => ReactElement;
  export default HomePage;
}

declare module './CategorySelector' {
  import { ReactElement } from 'react';
  interface CategorySelectorProps {
    onComplete: (categories: string[]) => void;
  }
  const CategorySelector: (props: CategorySelectorProps) => ReactElement;
  export default CategorySelector;
}

declare module './OptionFilter' {
  import { ReactElement } from 'react';
  import { Option } from './utils';
  interface OptionFilterProps {
    options: Option[];
    onComplete: (selected: Option[]) => void;
  }
  const OptionFilter: (props: OptionFilterProps) => ReactElement;
  export default OptionFilter;
}

declare module './TournamentBracket' {
  import { ReactElement } from 'react';
  import { Option } from './utils';
  interface TournamentBracketProps {
    filteredOptions: Option[];
  }
  const TournamentBracket: (props: TournamentBracketProps) => ReactElement;
  export default TournamentBracket;
}

declare module './CsvUpload' {
  import { ReactElement } from 'react';
  const CsvUpload: () => ReactElement;
  export default CsvUpload;
}