import {
  FacebookShareButton,
  TwitterShareButton,
  HatenaShareButton,
  TwitterIcon,
  FacebookIcon,
  HatenaIcon,
} from "react-share"

type SharingButtonsProps = {
  title: string
  url: string
}

function SharingButtons({ title, url }: SharingButtonsProps) {
  return (
    <>
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      &nbsp;&nbsp;
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
      &nbsp;&nbsp;
      <HatenaShareButton url={url} title={title}>
        <HatenaIcon size={30} round={true} />
      </HatenaShareButton>
    </>
  )
}

export default SharingButtons
