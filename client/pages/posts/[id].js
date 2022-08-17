import React from 'react'
import Head from 'next/head'

import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'

// 注意点：開発環境ではSSRになっているので、少し遅い。ただ、本番でビルドされると軽快に動く。
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false, // false＝pathsに該当しないパスは404(Nextは自動で生成してる)になる, true＝NextJSが動的にページを生成してくれる, 'blocking'=isFallbackの読み込みがされないがtureと同じ
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

// ファイル名に[]を付けることで任意の文字列を含めることができる
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  )
}
