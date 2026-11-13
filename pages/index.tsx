import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/home/hero'
import { FeaturedCategories } from '@/components/home/featured-categories'
import { TrendingDesigns } from '@/components/home/trending-designs'
import { OneDesign } from '@/components/home/one-design'
import { EditorialBand } from '@/components/home/editorial-band'
import { HowItWorks } from '@/components/home/how-it-works'
import { Reviews } from '@/components/home/reviews'
import { Newsletter } from '@/components/home/newsletter'

export default function HomePage() {
  return (
    <>
      <Header overlay />
      <main id="main">
        <Hero />
        <FeaturedCategories />
        <TrendingDesigns />
        <OneDesign />
        <EditorialBand />
        <HowItWorks />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
