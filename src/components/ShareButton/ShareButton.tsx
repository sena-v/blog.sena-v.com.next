import { FaFacebook, FaTwitter } from "react-icons/fa"
import { SiHatenabookmark } from "react-icons/si"
import { FacebookShareButton, TwitterShareButton, HatenaShareButton } from "react-share"

import * as styles from "./ShareButton.css"

interface SharingButtonsProps {
  title: string
  url: string
}

export function SharingButtons({ title, url }: SharingButtonsProps) {
  return (
    <div className={styles.shareButtonContainer}>
      <FacebookShareButton url={url} title={title}>
        <FaFacebook size={30} />
      </FacebookShareButton>
      &nbsp;&nbsp;
      <TwitterShareButton url={url} title={title}>
        <FaTwitter size={30} />
      </TwitterShareButton>
      &nbsp;&nbsp;
      <HatenaShareButton url={url} title={title}>
        <SiHatenabookmark size={30} />
      </HatenaShareButton>
    </div>
  )
}
