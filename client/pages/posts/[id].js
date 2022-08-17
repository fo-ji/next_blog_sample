import React from 'react'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'

// 注意点：開発環境ではSSRになっているので、少し遅い。ただ、本番でビルドされると軽快に動く。
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
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
      {postData.title}
      <br />
      {postData.date}
      <br />
      {postData.blogContentHTML}
    </Layout>
  )
}
