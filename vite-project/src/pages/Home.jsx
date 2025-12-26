import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

export default function Home() {
  return (
    <div>
        <Hero/>
        <LatestCollection/>
        <Bestseller/>
        <OurPolicy/>
        <NewsletterBox/>
    </div>
  )
}
