import { redirect } from 'next/navigation';

export default function AlgorithmsNotFound() {
  // Hitting /algorithms → go to default sorting page
  redirect('/algorithms/sorting/bubble-sort');
}