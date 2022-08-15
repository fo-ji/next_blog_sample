import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

// mdファイルを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostdData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '') // ファイル名(ID)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // IDとデータを返す
    return {
      id,
      ...matterResult.data,
    }
  })
  return allPostdData
}
