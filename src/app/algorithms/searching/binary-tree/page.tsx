import { Metadata } from 'next'
import { BinaryTreeSearchUI } from './binaryTreeSearch'

export const metadata: Metadata = {
  title: 'Binary Tree Search',
}

export default function Page() {
  return <BinaryTreeSearchUI />
}