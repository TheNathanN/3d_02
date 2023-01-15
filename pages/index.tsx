import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Canvas from "@/components/Canvas/Canvas"

export default function Home() {
  return (
    <>
      <Head>
        <title>3d_02</title>
        <meta
          name="description"
          content="A 3D scene created by Nathan Nicholson."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Canvas />
      </main>
    </>
  )
}
