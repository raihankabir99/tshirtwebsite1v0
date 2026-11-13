import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { PageHeader } from '@/components/site/page-header'
import { ProductGrid } from '@/components/commerce/product-grid'
import { BEST_SELLERS, NEW_DROPS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Best Sellers',
  description: 'The pieces our community keeps coming back to — rated 4.9 out of 5.',
}

export default function BestSellersPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHeader
          eyebrow="Most loved"
          title="Best sellers"
          description="The designs and products our community keeps coming back to, worldwide."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Best Sellers' }]}
        />
        <ProductGrid products={[...BEST_SELLERS, ...NEW_DROPS]} />
      </main>
      <Footer />
    </>
  )
}
