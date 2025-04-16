'use client'; 
import SortingVisualizer from '../../../shared/components/SortingVisualizer';
import { BubbleSortController } from './controller';

export default function Page() {
  return <SortingVisualizer Controller={BubbleSortController} initialSize={100} />;
}