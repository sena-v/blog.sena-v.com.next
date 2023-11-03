import { useEffect } from "react"

interface googleAds extends Window {
  adsbygoogle?: any
}

const Adsense = (props: any) => {
  const { currentPath } = props

  useEffect(() => {
    // 型注釈用に中間変数に取る
    const currentWindow: googleAds = window
    // 未ビルド環境だと失敗するためtry-catchで挟む
    try {
      currentWindow.adsbygoogle = currentWindow.adsbygoogle || []
      currentWindow.adsbygoogle.push({})
    } catch (e) {
      console.error(e, "adsbygoogle")
    }
  }, [currentPath])

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5515095500922112"
        data-ad-slot="3615137069"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default Adsense
