import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Textarea placeholder="What's on your mind?" className='w-full' />
    </div>
  )
}
