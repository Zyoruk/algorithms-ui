'use client';
import SortingVisualizer from '@/app/shared/components/SortingVisualizer';

import { Controller as QuickSortController } from './controller';

export default function Page() {
  return <SortingVisualizer Controller={QuickSortController} initialSize={100} />;
}