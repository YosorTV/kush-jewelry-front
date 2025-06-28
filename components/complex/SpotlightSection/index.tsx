
import SpotlightCarousel from '@/components/simple/SpotlightCarousel';

export default function SpotlightSection({ data, currency = 41, locale = 'uk' }: any) {
 
  return (
    <section className='relative flex h-auto flex-col bg-neutral'>
      {data?.products?.data?.length > 0 && (
        <SpotlightCarousel locale={locale} currency={currency} title={data.title} data={data.products.data} />
      )}
    </section>
  );
}
