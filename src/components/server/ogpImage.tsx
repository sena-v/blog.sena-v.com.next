import Image from "next/image"

const OGPImage = (props: { targetPostTitle: string }) => (
  <div style={{ width: 1200, height: 630, position: "relative" }}>
    <Image src="/background.jpg" alt="bgImage" width={1200} height={630} style={{ position: "absolute" }} priority />
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: "auto",
        width: "96%",
        height: "92%",
        borderRadius: "15px",

        fontSize: "64px",
        background: "rgb(255, 255, 255, 0.8)",
        textShadow: "2px 2px 4px #000000",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 110,
          width: "80%",
          height: "50%",
          overflow: "hidden",
        }}
      >
        {props.targetPostTitle}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 60,
        }}
      >
        sena-v.com
      </div>
    </div>
  </div>
)
export { OGPImage }
