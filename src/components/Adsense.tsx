import { useEffect } from "react"

interface googleAds extends Window {
  adsbygoogle?: any
}

function Ad(props: any) {
  const { currentPath } = props

  useEffect(() => {
    // 型注釈用に中間変数に取る
    const currentWindow: googleAds = window
    currentWindow.adsbygoogle = currentWindow.adsbygoogle || []
    currentWindow.adsbygoogle.push({})
  }, [currentPath])

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5515095500922112"
        data-ad-slot="7682109354"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-testid="adsbygoogle"
      />
    </div>
  )
}

export default Ad
