export interface NavItem {
    label: string
    href: string
  }
  
  export interface NavSection {
    title: string
    items: NavItem[]
  }
  
  // single source of truth for Header, Sidebar & Breadcrumbs
  export const navConfig: NavSection[] = [
    {
      title: 'Sorting',
      items: [
        { label: 'Bubble Sort',   href: '/algorithms/sorting/bubble-sort' },
        { label: 'Merge Sort',    href: '/algorithms/sorting/merge-sort' },
        { label: 'Quick Sort',    href: '/algorithms/sorting/quick-sort' },
      ],
    },
    {
      title: 'Searching',
      items: [
        { label: 'Binary Search', href: '/algorithms/searching/binary-search' },
        // add more search algs here…
      ],
    },
  ]
