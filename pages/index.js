import Head from "next/head";
import useSWR from "swr";
import styles from "../styles/Home.module.css";
import {
  Image,
  CloudinaryContext,
  Placeholder,
} from "cloudinary-react";

export default function Home() {
  const { data, error } = useSWR("/api/getAllPhotos");

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title> Next.js Image Gallery with Cloudinary & Lightroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         
          <a href="https://cloudinary.com">
            Image Gallery - Cloudinary & Lightroom{" "}
          </a>
        </h1>
        <CloudinaryContext
          className={styles.grid}
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}
        >
          {data !== undefined &&
            data.resources.map((pic) => (
              <Image
                key={pic.public_id}
                className={styles.card}
                publicId={pic.public_id}
                secure="true"
                width="800"
                fetchFormat="auto"
                aspectRatio="16:9"
                crop="fill"
                loading="lazy"
                alt={pic.public_id}
              >
                {/* <Transformation effect="lightroom:saturation_-100" /> */}
                {/* <Transformation effect="lightroom:xmp:sepia_deep.xmp" /> */}
                {/* <Transformation height="600" /> */}
                <Placeholder type="blur" />
              </Image>
            ))}
        </CloudinaryContext>
      </main>
    </div>
  );
}
