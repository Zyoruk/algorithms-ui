'use client';
import SortingVisualizer from '../../../shared/components/SortingVisualizer';

import { MergeSortController } from './controller';

export default function Page() {
  return <SortingVisualizer Controller={MergeSortController} initialSize={100} />;
}