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
    interface OptionFilterProps {
      options: any[];
      onComplete: (selected: any[]) => void;
    }
    const OptionFilter: (props: OptionFilterProps) => ReactElement;
    export default OptionFilter;
  }
  
  declare module './TournamentBracket' {
    import { ReactElement } from 'react';
    interface TournamentBracketProps {
      filteredOptions: any[];
    }
    const TournamentBracket: (props: TournamentBracketProps) => ReactElement;
    export default TournamentBracket;
  }
  
  declare module './optionsData' {
    interface Option {
      title: string;
      description: string;
      image: string;
      tags: string[];
    }
    export function filterByCategories(categories: string[]): Option[];
  }