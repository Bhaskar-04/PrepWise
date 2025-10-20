import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dummyInterviews } from '@/Constants/Index';
import InterviewCard from '@/components/InterviewCard';

export const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='max-w-lg flex flex-col gap-6'>
        <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
        <p className='text-lg'>Practice on real interview questions & get instant feedback</p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href={"/interview"}>Start an Interview</Link>
        </Button>

      </div>
      <Image src={"/robot.png"} height={400} width={400} className='max-sm:hidden' alt='' />
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Your Interviews</h2>

      <div className='interviews-section'>
        {dummyInterviews.map((interview,idx)=>(
          <InterviewCard key={idx} {...interview} />
        ))}
        {/*<p>You haven&apos;t taken any interviews yet</p>*/}
      </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Take an Interview</h2>

      <div className='interviews-section'>
        {dummyInterviews.map((interview,idx)=>(
          <InterviewCard key={idx} {...interview} />
        ))}
      </div>
    </section>

    </>
  )
}


export default page