import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from '../lib/post'

// SSGの場合(外部からデータを一度だけ取得してくる)
// MEMO: ↓決まった特有の書き方
// MEMO: 外部から取得するデータが1つもないなら必要ない
export async function getStaticProps() {
  const allPostsData = getPostsData()
  // 注意点
  // 1. オブジェクトを返すようにする
  // 2. "pages/*"からしかexport不可
  // 3. コンポーネントとして定義不可
  // 4. 開発環境ではリクエストがあるたびにgetStaticPropsが呼ばれる
  return {
    props: {
      allPostsData,
    },
  }
}

// // SSRの場合(外部からデータを頻繁に取得してくる)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すprops
//     },
//   }
// }

export default function Home(props) {
  const { allPostsData } = props
  console.log({ allPostsData })
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私はフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです
        </p>
        {/* <Link href="/posts/first-post">最初の投稿はこちら</Link>  あとで外す*/}
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝エンジニアのブログ</h2>
        <div className={`${styles.grid}`}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
