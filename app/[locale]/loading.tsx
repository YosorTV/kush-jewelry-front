export default function Loading() {

  return (
    <div className='flex h-screen items-center justify-center overflow-hidden bg-base-100'>
      <div className='flex flex-col items-center gap-4'>
        <span className='loading loading-infinity w-12' />
      </div>
    </div>
  );
}
