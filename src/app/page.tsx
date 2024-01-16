import InputField from '@/components/InputField';
import { ChipListContextProvider } from '@/context';
import Image from 'next/image'

export default function Home() {
  return (
    <ChipListContextProvider>
      <InputField />
    </ChipListContextProvider>
  );
}