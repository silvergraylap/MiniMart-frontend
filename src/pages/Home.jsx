import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
   const styles = {
      main: { padding: '2rem', textAlign: 'center' },
      heroSection: { backgroundColor: '#e0f2fe', padding: '4rem 2rem', borderRadius: '16px', marginBottom: '2rem' },
      heroTitle: { fontSize: '2.5rem', fontWeight: 'bold' },
      heroSubtitle: { fontSize: '1.2rem', margin: '1rem 0' },
      shopButton: { backgroundColor: 'black', color: 'white', padding: '0.8rem 2rem', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold' },
      sectionTitle: { fontSize: '2rem', fontWeight: 'bold', margin: '3rem 0 1.5rem 0' },
      productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' },
      productCard: { border: '1px solid #eee', borderRadius: '8px', padding: '1rem', textAlign: 'left' },
      productImage: { width: '100%', height: '200px', backgroundColor: '#f0f0f0', borderRadius: '8px', marginBottom: '0.5rem' },
   }

   return (
      <main style={styles.main}>
         {/* Hero Section */}
         <section style={styles.heroSection}>
            <p style={{ color: '#0284c7', fontWeight: 'bold' }}>NEW! SALE NOW</p>
            <h1 style={styles.heroTitle}>웹사이트 새단장</h1>
            <p style={styles.heroSubtitle}>오픈 기념 30% 세일 (7월 1일 ~ 7월 10일)</p>
            <Link to="/shop" style={styles.shopButton}>
               SHOP NOW
            </Link>
         </section>

         {/* 인기 제품 섹션 */}
         <section>
            <h2 style={styles.sectionTitle}>지금 인기있는 제품들</h2>
            <div style={styles.productGrid}>
               {/* 예시 상품 카드 */}
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} style={styles.productCard}>
                     <div style={styles.productImage}></div>
                     <p style={{ fontWeight: 'bold' }}>상품 {i}</p>
                     <p>20대 인기 {i}위</p>
                  </div>
               ))}
            </div>
         </section>
      </main>
   )
}

export default Home
